'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, toZonedTime } from 'date-fns-tz';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, CheckCircle2, CalendarX, User, Phone, Mail } from 'lucide-react';

// Define types for our data
type Schedule = {
  id: number;
  available_date: string;
  start_time: string;
  end_time: string;
  time_slot_minutes: number;
};

type TimeSlot = {
  time: string;
  isBooked: boolean;
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function BookingSection() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [defaultMonth, setDefaultMonth] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .gte('available_date', new Date().toISOString().split('T')[0])
        .order('available_date', { ascending: true });

      if (error) {
        console.error('Error fetching schedules:', error);
        setError('Could not load schedule. Please try again later.');
      } else {
        setSchedules(data || []);
        if (data && data.length > 0) {
          setDefaultMonth(new Date(data[0].available_date));
        }
      }
      setIsLoading(false);
    };
    fetchSchedules();
  }, []);

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setTimeSlots([]);
    setSelectedScheduleId(null);

    const dateString = format(date, 'yyyy-MM-dd');
    const scheduleForDay = schedules.find(s => s.available_date === dateString);

    if (scheduleForDay) {
      setSelectedScheduleId(scheduleForDay.id);
      
      const startOfDay = `${dateString}T00:00:00.000Z`;
      const endOfDay = `${dateString}T23:59:59.999Z`;

      const { data: appointments } = await supabase
        .from('appointments')
        .select('appointment_time')
        .gte('appointment_time', startOfDay)
        .lt('appointment_time', endOfDay);
      
      const bookedTimes = appointments?.map(a => {
        const utcDate = new Date(a.appointment_time);
        return format(toZonedTime(utcDate, 'UTC'), 'HH:mm', { timeZone: 'UTC' });
      }) || [];
      
      const slots: TimeSlot[] = [];
      const { start_time, end_time, time_slot_minutes } = scheduleForDay;
      
      // eslint-disable-next-line prefer-const
      let currentTime = new Date(`${dateString}T${start_time}Z`);
      const endTime = new Date(`${dateString}T${end_time}Z`);

      while (currentTime < endTime) {
        const hours = currentTime.getUTCHours().toString().padStart(2, '0');
        const minutes = currentTime.getUTCMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        const isBooked = bookedTimes.includes(timeString);
        slots.push({ time: timeString, isBooked: isBooked });

        currentTime.setUTCMinutes(currentTime.getUTCMinutes() + time_slot_minutes);
      }
      
      setTimeSlots(slots);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !patientName || !patientPhone || !patientEmail || !selectedScheduleId) {
      setError('Please fill all fields and select a time slot.');
      return;
    }
    setIsBooking(true);
    setError(null);
    
    const appointmentTimeInUTC = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedSlot}:00.000Z`);
    
    const { error } = await supabase.from('appointments').insert({
      patient_name: patientName,
      patient_phone: patientPhone,
      patient_email: patientEmail,
      appointment_time: appointmentTimeInUTC.toISOString(),
      schedule_id: selectedScheduleId, 
    });

    if (error) {
      setError('Failed to book appointment. The slot might have just been taken.');
    } else {
      setBookingSuccess(true);
    }
    setIsBooking(false);
  };
  
  if (bookingSuccess) {
    return (
      <section id="booking" className="py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-lg text-center"
          >
            <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6">
              Your appointment for <span className="font-semibold text-blue-600">{format(selectedDate!, 'MMMM dd, yyyy')}</span> at <span className="font-semibold text-blue-600">{selectedSlot}</span> is confirmed. A confirmation email has been sent to you.
            </p>
            <button 
              onClick={() => {
                setBookingSuccess(false);
                setSelectedDate(undefined);
                setSelectedSlot(null);
                setPatientName('');
                setPatientPhone('');
                setPatientEmail('');
              }}
              className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Book Another Appointment
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Book?</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">Select an available date and time to schedule your visit.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl"
        >
          {isLoading && <Loader2 className="animate-spin mx-auto my-24 h-12 w-12 text-blue-500" />}
          
          {!isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div className="flex flex-col items-center lg:border-r lg:border-gray-200 lg:pr-16">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 text-base inline-flex items-center justify-center mr-3">1</span>
                  Select a Date
                </h3>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={date => {
                    const startOfToday = new Date();
                    startOfToday.setHours(0, 0, 0, 0);
                    const isPastDate = date < startOfToday;
                    const isNotScheduled = !schedules.some(s => s.available_date === format(date, 'yyyy-MM-dd'));
                    return isPastDate || isNotScheduled;
                  }}
                  className="text-gray-800"
                  defaultMonth={defaultMonth}
                  styles={{
                    day_selected: { backgroundColor: '#2563eb', color: 'white' },
                    day_today: { color: '#2563eb', fontWeight: 'bold' },
                  }}
                />
              </div>
              
              <div className="text-left">
                <AnimatePresence mode="wait">
                  {selectedDate ? (
                    <motion.div key="slots" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
                      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 text-base inline-flex items-center justify-center mr-3">2</span>
                        Select a Time
                      </h3>
                      {timeSlots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-10">
                          {timeSlots.map(({ time, isBooked }) => (
                            <button
                              key={time}
                              onClick={() => !isBooked && setSelectedSlot(time)}
                              disabled={isBooked}
                              className={`p-2 rounded-lg border-2 font-semibold transition-all duration-200 ${
                                selectedSlot === time 
                                  ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-lg' 
                                  : isBooked
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-400'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8 px-4 bg-gray-50 rounded-lg mb-10">
                          <CalendarX className="mx-auto h-10 w-10 mb-2" />
                          <p>No available slots for this day.</p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                     <motion.div key="placeholder" variants={sectionVariants} initial="hidden" animate="visible" className="flex items-center justify-center h-full text-gray-400 min-h-[250px]">
                        <p className="text-lg text-center">Please select a date to see available times.</p>
                     </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {selectedSlot && (
                    <motion.form key="form" onSubmit={handleBooking} className="space-y-5" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
                       <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 text-base inline-flex items-center justify-center mr-3">3</span>
                        Your Details
                      </h3>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Your Name" value={patientName} onChange={e => setPatientName(e.target.value)} required className="w-full p-3 pl-11 border border-gray-300 bg-gray-50 rounded-lg placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                      </div>
                       <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="tel" placeholder="Your Phone Number" value={patientPhone} onChange={e => setPatientPhone(e.target.value)} required className="w-full p-3 pl-11 border border-gray-300 bg-gray-50 rounded-lg placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="email" placeholder="Your Email" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} required className="w-full p-3 pl-11 border border-gray-300 bg-gray-50 rounded-lg placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                      </div>
                      <button type="submit" disabled={isBooking} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-8 rounded-lg text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center transform hover:scale-[1.02] disabled:bg-gray-400 disabled:from-gray-400 disabled:shadow-none">
                        {isBooking ? <Loader2 className="animate-spin" /> : `Confirm for ${selectedSlot}`}
                      </button>
                      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}