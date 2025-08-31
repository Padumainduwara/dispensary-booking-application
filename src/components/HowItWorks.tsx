'use client';

import { motion, Variants } from 'framer-motion'; // <-- Variants type එක import කරන්න
import { CalendarDays, Clock, CheckCircle2 } from 'lucide-react';

const howItWorksSteps = [
  {
    icon: CalendarDays,
    title: "1. Select a Date",
    description: "Browse our calendar and pick an available date that suits your schedule.",
  },
  {
    icon: Clock,
    title: "2. Choose a Time Slot",
    description: "View available time slots for your selected date and choose your preferred appointment time.",
  },
  {
    icon: CheckCircle2,
    title: "3. Confirm Your Booking",
    description: "Fill in your details, confirm your booking, and receive an instant email confirmation.",
  },
];

// --- දෝෂය නිවැරදි කළ තැන ---
const itemVariants: Variants = { // <-- Variants type එක මෙතනට යොදන්න
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10,
      duration: 0.6 
    } 
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How Our Booking Works
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Scheduling your appointment with Dr. Perera is simple and takes just a few steps.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-md">
                <step.icon size={30} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}