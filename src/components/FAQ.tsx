// src/components/FAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  { question: "How do I book an appointment?", answer: "Simply scroll to the booking section on this page, select an available date and time slot, and enter your name and phone number to confirm." },
  { question: "What are the clinic hours?", answer: "The doctor is available from 4:00 PM to 8:00 PM on weekdays. Please check the calendar for real-time availability." },
  { question: "Do I need to pay online?", answer: "We offer both online payment via PayHere for your convenience and the option to pay at the counter when you arrive for your appointment." },
  { question: "Can I cancel or reschedule my appointment?", answer: "Yes, you can cancel your appointment using the link sent to you via SMS. For rescheduling, please cancel the existing booking and make a new one." }
];

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        {isOpen ? <Minus className="text-blue-600"/> : <Plus className="text-gray-500"/>}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </motion.div>
        <motion.div 
          className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {faqData.map((item, index) => <AccordionItem key={index} {...item} />)}
        </motion.div>
      </div>
    </section>
  );
}