'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutDoctor() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-12 bg-white p-12 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-60 h-60 rounded-full bg-slate-300 shadow-xl border-8 border-white overflow-hidden">
              <Image 
                src="/doctor-photo.jpg"
                alt="Dr. A. B. Perera"
                layout="fill"
                objectFit="cover"
                className="object-center"
              />
            </div>
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Your Family Physician</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Dr. A. B. Perera</h3>
            <p className="text-lg text-gray-500 mb-4">MBBS (Colombo), DFM</p>
            {/* දෝෂය නිවැරදි කළ තැන */}
            <p className="text-gray-600 leading-relaxed max-w-xl">
              With a decade of dedicated service in family medicine, Dr. Perera combines medical expertise with a warm, personal approach. He is committed to understanding each patient&apos;s unique needs to provide the most effective treatment and promote long-term wellness.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}