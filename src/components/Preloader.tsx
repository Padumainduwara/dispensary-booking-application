'use client';

import { motion, Variants } from 'framer-motion'; // <-- Variants type එක import කරන්න

// --- දෝෂය නිවැරදි කළ තැන ---
const containerVariants: Variants = { // <-- Variants type එක මෙතනට යොදන්න
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const dotVariants: Variants = { // <-- Variants type එක මෙතනටත් යොදන්න
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function Preloader() {
  const brandName = "DocDO Clinic";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex items-center justify-center"
        variants={containerVariants}
      >
        {brandName.split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-3xl md:text-4xl font-bold text-blue-600"
            variants={dotVariants}
            style={{ display: 'inline-block', marginRight: char === ' ' ? '0.5rem' : '0' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}