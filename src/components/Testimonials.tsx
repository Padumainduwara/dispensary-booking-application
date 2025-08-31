'use client';

import { motion } from 'framer-motion';
import { Star, MessageSquareQuote } from 'lucide-react';

const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
  >
    {children}
  </motion.div>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We are committed to providing an exceptional experience.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-gray-50 p-8 rounded-2xl h-full">
              <MessageSquareQuote className="text-blue-400 w-12 h-12 mb-4"/>
              {/* දෝෂය නිවැරදි කළ තැන */}
              <p className="text-gray-600 text-lg italic mb-6">&quot;Dr. Perera is incredibly patient and thorough. The new booking system is a fantastic addition!&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 mr-4"></div>
                <div>
                  <p className="font-bold text-gray-800">S. Silva</p>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-gray-50 p-8 rounded-2xl h-full">
              <MessageSquareQuote className="text-blue-400 w-12 h-12 mb-4"/>
              {/* දෝෂය නිවැරදි කළ තැන */}
              <p className="text-gray-600 text-lg italic mb-6">&quot;A wonderful doctor. He explains everything clearly and puts you at ease. Highly recommended.&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 mr-4"></div>
                <div>
                  <p className="font-bold text-gray-800">Nimali Fernando</p>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}