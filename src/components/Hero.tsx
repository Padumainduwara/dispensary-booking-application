// src/components/Hero.tsx
'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white text-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-teal-500 to-cyan-400 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      
      <div className="z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-shadow-lg"
        >
          Your Health, Our Priority
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 text-shadow"
        >
          Welcome to DocDo Clinic. Easily book your next appointment with Dr. A. B. Perera.
        </motion.p>
        <motion.a 
          href="#booking"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 150 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-all"
        >
          Book an Appointment
        </motion.a>
      </div>
    </section>
  );
}