// supabase/functions/send-confirmation-email/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

serve(async (req) => {
  try {
    const { record } = await req.json();

    if (!record || !record.patient_name || !record.patient_email || !record.appointment_time) {
      return new Response(JSON.stringify({ error: "Missing required booking data." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const patientName = record.patient_name;
    const patientEmail = record.patient_email;
    const appointmentTime = new Date(record.appointment_time);

    // --- START: NEW MODERN EMAIL TEMPLATE ---
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmed!</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
          body {
            font-family: 'Poppins', sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }
          .header {
            background-color: #2563eb;
            color: #ffffff;
            padding: 40px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 40px;
            color: #333333;
            line-height: 1.6;
          }
          .details-box {
            background-color: #f8f9fa;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 30px 0;
            border-radius: 8px;
          }
          .details-box p {
            margin: 10px 0;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #888888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>DocDo Clinic</h1>
          </div>
          <div class="content">
            <h2>Booking Confirmed!</h2>
            <p>Dear ${patientName},</p>
            <p>Your appointment at DocDo Clinic is confirmed. We are pleased to have you.</p>
            <div class="details-box">
              <p><strong>Date:</strong> ${appointmentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> ${appointmentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
            <p>If you need to cancel or reschedule, please contact us.</p>
            <p>We look forward to seeing you.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} DocDo Clinic. All Rights Reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    // --- END: NEW MODERN EMAIL TEMPLATE ---

    const { data, error } = await resend.emails.send({
      from: "DocDo Clinic <onboarding@resend.dev>",
      to: patientEmail,
      subject: "Your Appointment Confirmation at DocDo Clinic",
      html: emailHtml,
    });

    if (error) {
      console.error({ error });
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 422,
      });
    }

    return new Response(JSON.stringify({ message: "Email sent successfully", data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
     console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});