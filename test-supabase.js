const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('email_otps').insert([
    {
      email: 'test@example.com',
      otp_hash: '123',
      expires_at: new Date().toISOString(),
      attempts: 0
    }
  ]);
  console.log('Error:', error);
}

test();
