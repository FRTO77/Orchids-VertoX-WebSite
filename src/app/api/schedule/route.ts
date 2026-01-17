import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { title, recipient_email, sender_email, description, meeting_link, meeting_time, user_id } = await req.json();

    // 1. Save to Supabase
    const { data: dbData, error: dbError } = await supabase
      .from('scheduled_meetings')
      .insert([
        { 
          title, 
          recipient_email, 
          sender_email, 
          description, 
          meeting_link, 
          meeting_time,
          user_id
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 2. Send Email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Skipping email sending.");
      return NextResponse.json({ 
        message: "Meeting scheduled in database, but email not sent (RESEND_API_KEY missing)", 
        dbData 
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'VertoX AI <onboarding@resend.dev>',
      to: recipient_email,
      subject: `Meeting Invitation: ${title}`,
      html: `
        <div style="font-family: sans-serif; padding: 32px; color: #18181b; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 24px;">
          <div style="margin-bottom: 24px;">
            <span style="background: #f5f3ff; color: #7c3aed; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold;">NEW MEETING</span>
          </div>
          <h1 style="font-size: 24px; font-weight: 900; margin-bottom: 8px; color: #09090b;">${title}</h1>
          <p style="color: #71717a; margin-bottom: 24px;">You've been invited to a meeting with real-time translation powered by VertoX AI.</p>
          
          <div style="background: #fafafa; padding: 24px; border-radius: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #71717a;"><strong>Time:</strong> ${new Date(meeting_time).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #71717a;"><strong>Organizer:</strong> ${sender_email}</p>
            ${description ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: bold; color: #a1a1aa; text-transform: uppercase;">Description</p>
              <p style="margin: 0; font-size: 14px; color: #3f3f46;">${description}</p>
            </div>
            ` : ''}
          </div>
          
          <a href="${meeting_link}" style="display: block; width: 100%; text-align: center; padding: 16px; background: #7c3aed; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px;">Join Meeting Room</a>
          
          <p style="margin-top: 32px; font-size: 12px; color: #a1a1aa; text-align: center;">
            Experience seamless cross-language collaboration with VertoX AI.
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    return NextResponse.json({ data: emailData });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
