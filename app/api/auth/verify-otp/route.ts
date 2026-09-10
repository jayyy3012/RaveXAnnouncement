import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: 'Email and OTP are required' }, { status: 400 });
    }

    // 1. Fetch the OTP record
    const { data: records, error: fetchError } = await supabaseAdmin
      .from('email_otps')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError || !records || records.length === 0) {
      return NextResponse.json({ success: false, message: 'OTP not found or expired' }, { status: 400 });
    }

    const record = records[0];

    // 2. Check if expired
    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ success: false, message: 'OTP has expired' }, { status: 400 });
    }

    // 3. Check attempts
    if (record.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json({ success: false, message: 'Too many verification attempts' }, { status: 400 });
    }

    // 4. Hash the incoming OTP and compare
    const incomingHash = crypto.createHash('sha256').update(otp).digest('hex');

    if (incomingHash !== record.otp_hash) {
      // Increment attempts
      await supabaseAdmin
        .from('email_otps')
        .update({ attempts: record.attempts + 1 })
        .eq('email', record.email);

      return NextResponse.json({ success: false, message: 'Incorrect OTP' }, { status: 400 });
    }

    // 5. Valid OTP! Mark as used / delete it
    await supabaseAdmin
      .from('email_otps')
      .delete()
      .eq('email', record.email);

    // 6. Return success
    // NOTE: This does NOT log the user into Supabase Auth.
    // If you need a Supabase session, you'll need to create one manually or via admin API.
    return NextResponse.json({ 
      success: true, 
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
