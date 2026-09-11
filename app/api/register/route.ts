import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { error } = await supabaseAdmin
      .from('registrations')
      .insert([
        {
          name: data.name || null,
          email: data.email,
          country: data.country || null,
          city: data.city || null,
          genre: data.genre || null,
          base: data.base || null,
          source: data.source || null,
          // interests is an array, we can store it if the column is text[] or jsonb
          interests: data.interests || []
        }
      ]);

    if (error) {
      console.error('Error inserting into Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { count, error: countError } = await supabaseAdmin
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({ success: true, position: count || 0 });
  } catch (err: any) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
