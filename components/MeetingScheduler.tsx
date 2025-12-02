
import React, { useState, useEffect } from 'react';
import { MeetingSlot } from '../types';
import { fetchSlotsForDate } from '../services/mockData';
import { CalendarCheck, ChevronLeft, ChevronRight, ChevronDown } from './Icons';
import { MONTHS } from '../constants';

interface MeetingSchedulerProps {
  onClose: () => void;
}

interface Booking {
  id: string;
  dateStr: string;
  time: string;
  slotId: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ onClose }) => {
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date()); // Visible month
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected day
  
  // Slot Data State
  const [slots, setSlots] = useState<MeetingSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  
  // Booking State (Simulating DB)
  // Pre-fill with one meeting for tomorrow for testing
  const [myBookings, setMyBookings] = useState<Booking[]>([
    {
      id: 'mock-booking-001',
      dateStr: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
      time: '10:15 AM',
      slotId: 'mock-initial-slot'
    }
  ]);
  const [activeTab, setActiveTab] = useState<'book' | 'my-meetings'>('book');

  // Load slots whenever selected date changes
  useEffect(() => {
    const loadSlots = async () => {
      setLoadingSlots(true);
      const dateStr = selectedDate.toISOString().split('T')[0];
      try {
        const fetchedSlots = await fetchSlotsForDate(dateStr);
        setSlots(fetchedSlots);
      } catch (err) {
        console.error("Failed to load slots", err);
      } finally {
        setLoadingSlots(false);
      }
    };
    loadSlots();
  }, [selectedDate]);

  // Calendar Logic
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  // --- Actions ---

  // Helper to remove booking from state without prompts
  const removeBookingInternal = (bookingId: string) => {
    const booking = myBookings.find(b => b.id === bookingId);
    if (!booking) return;

    // 1. Update List
    const updatedBookings = myBookings.filter(b => b.id !== bookingId);
    setMyBookings(updatedBookings);

    // 2. Update Slots UI if we are currently viewing that date
    // We match by time since slot IDs might be regenerated
    if (booking.dateStr === selectedDate.toISOString().split('T')[0]) {
      setSlots(prevSlots => prevSlots.map(s => 
        s.time === booking.time ? { ...s, isBooked: false, bookedByCurrentUser: false } : s
      ));
    }
  };

  const handleBook = (slot: MeetingSlot) => {
    if (!window.confirm(`Confirm meeting on ${selectedDate.toLocaleDateString()} at ${slot.time}?`)) return;

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      dateStr: selectedDate.toISOString().split('T')[0],
      time: slot.time,
      slotId: slot.id
    };

    setMyBookings([...myBookings, newBooking]);
    // Optimistically update local slots UI
    setSlots(slots.map(s => s.id === slot.id ? { ...s, isBooked: true, bookedByCurrentUser: true } : s));
    
    alert("Meeting Booked Successfully!");
    setActiveTab('my-meetings');
  };

  const handleCancel = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this meeting?")) {
      removeBookingInternal(bookingId);
    }
  };

  const handleReschedule = (bookingId: string) => {
    if (window.confirm("Rescheduling will cancel your existing appointment and take you to the calendar to pick a new time. Proceed?")) {
      // 1. Cancel existing
      removeBookingInternal(bookingId);
      // 2. Redirect to book
      setActiveTab('book');
    }
  };

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentDate.getMonth() && 
           selectedDate.getFullYear() === currentDate.getFullYear();
  };

  const hasBookingOnDate = (day: number) => {
     const checkDateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
     return myBookings.some(b => b.dateStr === checkDateStr);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const startDay = getFirstDayOfMonth(currentDate);
    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
         {/* Calendar Header */}
         <div className="bg-brand-50 p-3 flex justify-between items-center border-b border-brand-100">
            <button onClick={handlePrevMonth} className="p-1 hover:bg-brand-100 rounded text-brand-700">
               <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
               <div className="relative group">
                 <select 
                   value={currentDate.getMonth()} 
                   onChange={handleMonthSelect}
                   className="appearance-none bg-transparent font-bold text-brand-800 pr-4 outline-none cursor-pointer"
                 >
                   {MONTHS.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
                 </select>
                 <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-brand-600 pointer-events-none" />
               </div>
               <span className="font-medium text-brand-600">{currentDate.getFullYear()}</span>
            </div>

            <button onClick={handleNextMonth} className="p-1 hover:bg-brand-100 rounded text-brand-700">
               <ChevronRight className="w-5 h-5" />
            </button>
         </div>

         {/* Weekdays */}
         <div className="grid grid-cols-7 bg-stone-50 border-b border-stone-100">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-[10px] text-stone-400 font-bold py-2 uppercase">{d}</div>
            ))}
         </div>

         {/* Grid */}
         <div className="grid grid-cols-7 p-2 gap-1">
            {blanks.map((_, i) => <div key={`blank-${i}`} className="h-8 md:h-10"></div>)}
            {days.map(day => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`
                  h-8 md:h-10 rounded-lg flex flex-col items-center justify-center relative transition-all
                  ${isSelected(day) 
                    ? 'bg-brand-500 text-white shadow-md scale-105 font-bold' 
                    : 'text-stone-700 hover:bg-stone-100'}
                `}
              >
                <span className="text-sm">{day}</span>
                {hasBookingOnDate(day) && (
                  <span className={`w-1 h-1 rounded-full absolute bottom-1 ${isSelected(day) ? 'bg-white' : 'bg-brand-500'}`}></span>
                )}
              </button>
            ))}
         </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-stone-200 flex justify-between items-center shadow-sm z-10">
        <div>
          <h2 className="text-xl font-bold text-brand-800 flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-brand-500" />
            Teacher Meeting Scheduler
          </h2>
          <p className="text-xs text-stone-500">Book a 15-min session (Synced with Google Calendar)</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white">
        <button
          onClick={() => setActiveTab('book')}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'book' ? 'border-brand-500 text-brand-600' : 'border-transparent text-stone-500'}`}
        >
          Book a Slot
        </button>
        <button
          onClick={() => setActiveTab('my-meetings')}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'my-meetings' ? 'border-brand-500 text-brand-600' : 'border-transparent text-stone-500'}`}
        >
          My Meetings
          {myBookings.length > 0 && (
            <span className="ml-2 bg-brand-100 text-brand-600 text-[10px] px-2 py-0.5 rounded-full">{myBookings.length}</span>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        
        {activeTab === 'book' && (
          <div className="flex flex-col md:flex-row gap-6 h-full">
            {/* Left: Calendar Picker */}
            <div className="w-full md:w-1/3">
               <h3 className="text-sm font-bold text-stone-700 mb-3 uppercase tracking-wider">Select Date</h3>
               {renderCalendar()}
               <div className="mt-4 bg-blue-50 text-blue-700 text-xs p-3 rounded-lg border border-blue-100">
                 <p className="font-bold mb-1">📅 Tips:</p>
                 <p>Use the dropdown or arrows to navigate months. Weekends are generally unavailable.</p>
               </div>
            </div>

            {/* Right: Slot Selection */}
            <div className="w-full md:w-2/3">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-stone-700">
                   Available Slots <span className="text-stone-400 font-normal text-sm">for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                 </h3>
                 {loadingSlots && <span className="text-xs text-brand-600 animate-pulse font-medium">Checking Google Calendar...</span>}
              </div>
              
              {!loadingSlots && slots.length === 0 ? (
                 <div className="bg-stone-100 rounded-xl p-8 text-center border-2 border-dashed border-stone-200">
                    <p className="text-stone-500 font-medium">No slots available for this date.</p>
                    <p className="text-xs text-stone-400 mt-1">Please select a different weekday.</p>
                 </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {slots.map(slot => {
                    // Check if *this* specific slot is booked by the current user in our local "DB"
                    const isMyBooking = myBookings.some(b => b.dateStr === selectedDate.toISOString().split('T')[0] && b.time === slot.time);
                    
                    return (
                      <button
                        key={slot.id}
                        disabled={slot.isBooked || isMyBooking}
                        onClick={() => handleBook(slot)}
                        className={`
                          relative p-3 rounded-lg border text-sm font-medium transition-all
                          flex flex-col items-center justify-center gap-1
                          ${isMyBooking
                            ? 'bg-brand-100 border-brand-300 text-brand-700 cursor-not-allowed' 
                            : slot.isBooked 
                              ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-60' 
                              : 'bg-white border-stone-200 text-stone-700 hover:border-brand-500 hover:shadow-md hover:text-brand-600 active:scale-95'
                          }
                        `}
                      >
                        <span>{slot.time}</span>
                        {isMyBooking ? (
                          <span className="text-[10px] font-bold uppercase text-brand-600">Booked by You</span>
                        ) : slot.isBooked ? (
                          <span className="text-[10px] uppercase text-stone-400">Unavailable</span>
                        ) : (
                          <span className="text-[10px] text-green-600 font-bold">Available</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Meetings Tab */}
        {activeTab === 'my-meetings' && (
          <div className="max-w-2xl mx-auto">
            {myBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarCheck className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-lg font-bold text-stone-600">No Scheduled Meetings</h3>
                <p className="text-stone-400 mt-2">Book a slot with the teacher to discuss your child's progress.</p>
                <button 
                  onClick={() => setActiveTab('book')}
                  className="mt-6 text-brand-600 font-bold hover:underline"
                >
                  Go to Booking
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.sort((a,b) => new Date(a.dateStr).getTime() - new Date(b.dateStr).getTime()).map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-50 text-brand-600 rounded-lg p-3 text-center min-w-[70px]">
                        <div className="text-xs font-bold uppercase">{new Date(booking.dateStr).toLocaleString('default', { month: 'short' })}</div>
                        <div className="text-xl font-bold">{new Date(booking.dateStr).getDate()}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-stone-800">Parent-Teacher Meeting</h4>
                        <p className="text-stone-500">
                          {new Date(booking.dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 
                          <br /> at <span className="text-stone-800 font-bold">{booking.time}</span>
                        </p>
                        <p className="text-xs text-brand-600 mt-2 font-medium bg-brand-50 inline-block px-2 py-0.5 rounded border border-brand-100">Confirmed</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                       <button 
                         onClick={() => handleReschedule(booking.id)}
                         className="flex-1 sm:flex-none px-4 py-2 border border-stone-300 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-50 hover:border-stone-400 transition-colors"
                       >
                         Reschedule
                       </button>
                       <button 
                         onClick={() => handleCancel(booking.id)}
                         className="flex-1 sm:flex-none px-4 py-2 border border-red-100 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100 hover:border-red-200 transition-colors"
                       >
                         Cancel
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MeetingScheduler;
