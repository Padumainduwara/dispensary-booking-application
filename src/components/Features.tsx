// src/components/Features.tsx
'use client';

import { motion } from 'framer-motion';
import { Stethoscope, HeartPulse, ShieldCheck } from 'lucide-react';

const features = [
  { icon: Stethoscope, title: "General Consultation", description: "Comprehensive check-ups and diagnosis for non-emergency conditions." },
  { icon: HeartPulse, title: "Chronic Disease Management", description: "Ongoing care and management for conditions like diabetes and hypertension." },
  { icon: ShieldCheck, title: "Preventive Care", description: "Health screenings and lifestyle advice to help you stay healthy." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900">Our Core Services</h2>
          <p className="text-lg text-gray-600 mt-2">Providing quality care for you and your family.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}