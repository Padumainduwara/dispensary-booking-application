# DocDo Clinic: Online Appointment Booking System

**DocDo Clinic** is a modern, full-stack web application designed to streamline the appointment booking process for a medical clinic. It provides patients with a seamless, user-friendly interface to schedule appointments with Dr. A. B. Perera.

The application features a responsive single-page design with smooth animations and a powerful backend handled by Supabase.

## Key Features

- **Interactive Landing Page**: A beautifully designed single-page layout that includes:
    -   **Hero Section**: Welcoming patients with a clear call-to-action.
    -   **How It Works**: A simple 3-step guide to booking an appointment.
    -   **Core Services**: Outlines the clinic's main services like general consultations and preventive care.
    -   **About the Doctor**: A section to introduce the physician.
    -   **Testimonials & FAQ**: Builds trust and answers common questions.

- **Dynamic Appointment Booking**:
    -   Fetches real-time schedules and availability from the Supabase database.
    -   An interactive calendar (`react-day-picker`) allows patients to select available dates.
    -   Time slots are dynamically generated based on the selected date's schedule, with booked slots disabled.
    -   A secure form to collect patient information (name, phone, email) to confirm the booking.

- **Automated Email Confirmations**:
    -   Uses a Supabase Edge Function to automatically send a professionally styled confirmation email to the patient upon successful booking.
    -   Integrates with the **Resend** email service for reliable delivery.

- **Smooth User Experience**:
    -   Includes a preloader and smooth page transitions powered by **Framer Motion** for an enhanced user experience.
    -   The navbar is designed to hide on scroll-down and reappear on scroll-up for better content visibility.

## Tech Stack

This project is built with a modern and powerful tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) 15 (with Turbopack)
-   **Language**: TypeScript
-   **Backend**: [Supabase](https://supabase.io)
    -   **Database**: Supabase PostgreSQL for storing schedules and appointments.
    -   **Edge Functions**: For serverless functions like sending emails.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **UI Components**:
    -   [Lucide React](https://lucide.dev/) for icons.
    -   [React Day Picker](https://react-day-picker.js.org/) for the calendar component.
-   **Email Service**: [Resend](https://resend.com)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A Supabase account

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/dispensary-booking-app.git](https://github.com/your-username/dispensary-booking-app.git)
    cd dispensary-booking-app
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Supabase credentials. You can find these in your Supabase project settings.
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
   

4.  **Set up Supabase:**
    -   Create a new project on Supabase.
    -   In the SQL Editor, create the necessary tables for `schedules` and `appointments`.
    -   Deploy the `send-confirmation-email` Edge Function from the `supabase/functions` directory. You will need to set the `RESEND_API_KEY` as an environment variable in your Supabase project settings.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
   

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
