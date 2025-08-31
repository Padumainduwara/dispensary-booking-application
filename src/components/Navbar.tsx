'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion'; // <-- Variants type එක import කරන්න
import { Menu, X, CalendarPlus } from 'lucide-react';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

const navItems = [
  { name: 'How It Works', href: 'how-it-works' },
  { name: 'Services', href: 'features' },
  { name: 'About Doctor', href: 'about' },
  { name: 'Testimonials', href: 'testimonials' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  // --- දෝෂය නිවැරදි කළ තැන ---
  const menuVariants: Variants = { // <-- Variants type එක මෙතනට යොදන්න
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  };

  const navLinkVariants: Variants = { // <-- මෙතනටත් Variants type එක යොදන්න
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/80"
      >
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            DocDo Clinic
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.href}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                activeClass="!text-blue-600"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
              >
                {item.name}
              </ScrollLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <ScrollLink to="booking" smooth={true} duration={500} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5"
                >
                  <CalendarPlus size={18} />
                  Book Now
                </motion.button>
             </ScrollLink>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 md:hidden z-50"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold text-blue-600">Menu</span>
              <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">
                <X size={28} />
              </button>
            </div>
            <motion.nav 
              className="flex flex-col space-y-2"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {navItems.map((item) => (
                <motion.div key={item.name} variants={navLinkVariants}>
                  <ScrollLink
                    to={item.href}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="block text-gray-800 text-xl font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </ScrollLink>
                </motion.div>
              ))}
               <motion.div variants={navLinkVariants} className="border-t pt-4 mt-4">
                 <ScrollLink to="booking" smooth={true} duration={500} offset={-70} onClick={toggleMenu}>
                    <motion.button
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 text-lg"
                    >
                      <CalendarPlus size={20} />
                      Book an Appointment
                    </motion.button>
                 </ScrollLink>
               </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}