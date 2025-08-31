// src/components/Footer.tsx
import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">DocDo Clinic</h3>
            <p className="text-gray-400">Your trusted partner in health. Providing compassionate and expert medical care.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
              <li className="mb-2"><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
              <li className="mb-2"><a href="#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="text-gray-400">
              <li className="flex items-center justify-center md:justify-start mb-2">
                <MapPin size={16} className="mr-2"/> No. 25, Main Street, Galle.
              </li>
              <li className="flex items-center justify-center md:justify-start mb-2">
                <Phone size={16} className="mr-2"/> 0112 111 1111
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2"/> contact@DocDo.lk
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DocDo Clinic. All Rights Reserved. Developed with care.</p>
        </div>
      </div>
    </footer>
  );
}