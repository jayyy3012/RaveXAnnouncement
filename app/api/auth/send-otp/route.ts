import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';

// If RESEND_API_KEY is missing, we'll gracefully fallback or error, 
// but for development you might just log it if there's no key.
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
const FROM_EMAIL = process.env.OTP_FROM_EMAIL || 'noreply@ravex.live';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // 1. Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // 2. Hash OTP for secure storage
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    
    // Expiry: 5 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // 3. Delete any existing OTPs for this email to invalidate them
    await supabaseAdmin
      .from('email_otps')
      .delete()
      .eq('email', email);

    // 4. Store new OTP hash
    const { error: dbError } = await supabaseAdmin
      .from('email_otps')
      .insert([
        {
          email,
          otp_hash: otpHash,
          expires_at: expiresAt.toISOString(),
          attempts: 0
        }
      ]);

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ success: false, message: 'Failed to generate OTP. Did you run the SQL script?' }, { status: 500 });
    }

    // 5. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      const { error: resendError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your RaveX Verification Code',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your verification code</h2>
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #8b5cf6;">${otp}</p>
            <p>This code expires in 5 minutes.</p>
            <p style="color: #666; font-size: 12px; margin-top: 40px;">
              If you didn't request this code, you can safely ignore this email.
            </p>
          </div>
        `
      });

      if (resendError) {
        console.error('Resend Error:', resendError);
        return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
      }
    } else {
      console.log('No RESEND_API_KEY found, printing OTP to console for development:', otp);
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });

  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
