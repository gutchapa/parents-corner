
import React, { useState } from 'react';
import { DailySchedule, MeetingSlot } from '../types';
import { mockMeetingSchedule } from '../services/mockData';
import { CalendarCheck, ChevronDown } from './Icons';

interface MeetingSchedulerProps {
  onClose: () => void;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ onClose }) => {
  // Simulating local state for bookings (in a real app, this syncs with backend)
  const [scheduleData, setScheduleData] = useState<DailySchedule[]>(mockMeetingSchedule);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'book' | 'my-meetings'>('book');

  const selectedDay = scheduleData[selectedDateIndex];

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleBook = (slotId: string) => {
    if (!window.confirm("Confirm booking for this slot?")) return;

    const updatedSchedule = scheduleData.map(day => ({
      ...day,
      slots: day.slots.map(slot => {
        if (slot.id === slotId) {
          return { ...slot, isBooked: true, bookedByCurrentUser: true };
        }
        return slot;
      })
    }));
    setScheduleData(updatedSchedule);
    alert("Meeting Confirmed! You can view it in 'My Meetings'.");
  };

  const handleCancel = (slotId: string) => {
    if (!window.confirm("Are you sure you want to cancel this meeting?")) return;

    const updatedSchedule = scheduleData.map(day => ({
      ...day,
      slots: day.slots.map(slot => {
        if (slot.id === slotId) {
          return { ...slot, isBooked: false, bookedByCurrentUser: false };
        }
        return slot;
      })
    }));
    setScheduleData(updatedSchedule);
  };

  const handleReschedule = (slotId: string) => {
    if (!window.confirm("To reschedule, we will cancel this appointment and take you to the booking screen. Proceed?")) return;
    
    // Cancel first
    handleCancel(slotId);
    // Switch to booking tab
    setActiveTab('book');
  };

  // Get all bookings for current user
  const myBookings: { date: string, slot: MeetingSlot }[] = [];
  scheduleData.forEach(day => {
    day.slots.forEach(slot => {
      if (slot.bookedByCurrentUser) {
        myBookings.push({ date: day.date, slot });
      }
    });
  });

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-stone-200 flex justify-between items-center shadow-sm z-10">
        <div>
          <h2 className="text-xl font-bold text-brand-800 flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-brand-500" />
            Teacher Meeting Scheduler
          </h2>
          <p className="text-xs text-stone-500">Book a 30-min session with the Class Teacher</p>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        
        {activeTab === 'book' && (
          <div className="flex flex-col md:flex-row gap-6 h-full">
            {/* Left: Date Selection */}
            <div className="w-full md:w-1/3 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm h-fit">
               <div className="bg-brand-50 p-3 border-b border-brand-100 font-bold text-brand-800 text-center">
                 Select Date
               </div>
               <div className="divide-y divide-stone-100 max-h-[300px] overflow-y-auto">
                 {scheduleData.map((day, idx) => (
                   <button
                    key={day.date}
                    onClick={() => setSelectedDateIndex(idx)}
                    className={`w-full text-left p-4 flex justify-between items-center hover:bg-stone-50 transition-colors ${selectedDateIndex === idx ? 'bg-orange-50 border-l-4 border-brand-500' : ''}`}
                   >
                     <div>
                       <div className={`font-bold ${selectedDateIndex === idx ? 'text-brand-700' : 'text-stone-700'}`}>
                         {formatDate(day.date)}
                       </div>
                       <div className="text-xs text-stone-400 mt-1">
                         {day.slots.filter(s => !s.isBooked).length} slots available
                       </div>
                     </div>
                     {selectedDateIndex === idx && <div className="w-2 h-2 bg-brand-500 rounded-full"></div>}
                   </button>
                 ))}
               </div>
            </div>

            {/* Right: Slot Selection */}
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-bold text-stone-700 mb-4">
                Available Time Slots <span className="text-stone-400 font-normal text-sm">for {formatDate(selectedDay.date)}</span>
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedDay.slots.map(slot => (
                  <button
                    key={slot.id}
                    disabled={slot.isBooked}
                    onClick={() => handleBook(slot.id)}
                    className={`
                      relative p-3 rounded-lg border text-sm font-medium transition-all
                      flex flex-col items-center justify-center gap-1
                      ${slot.bookedByCurrentUser 
                        ? 'bg-brand-100 border-brand-300 text-brand-700 cursor-not-allowed' 
                        : slot.isBooked 
                          ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-60' 
                          : 'bg-white border-stone-200 text-stone-700 hover:border-brand-500 hover:shadow-md hover:text-brand-600 active:scale-95'
                      }
                    `}
                  >
                    <span>{slot.time}</span>
                    {slot.bookedByCurrentUser ? (
                      <span className="text-[10px] font-bold uppercase text-brand-600">Booked by You</span>
                    ) : slot.isBooked ? (
                      <span className="text-[10px] uppercase text-stone-400">Unavailable</span>
                    ) : (
                      <span className="text-[10px] text-green-600 font-bold">Available</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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
                {myBookings.map(({ date, slot }) => (
                  <div key={slot.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-50 text-brand-600 rounded-lg p-3 text-center min-w-[70px]">
                        <div className="text-xs font-bold uppercase">{new Date(date).toLocaleString('default', { month: 'short' })}</div>
                        <div className="text-xl font-bold">{new Date(date).getDate()}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-stone-800">Parent-Teacher Meeting</h4>
                        <p className="text-stone-500">{formatDate(date)} at <span className="text-stone-800 font-bold">{slot.time}</span></p>
                        <p className="text-xs text-brand-600 mt-1 font-medium bg-brand-50 inline-block px-2 py-0.5 rounded">Confirmed</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                       <button 
                         onClick={() => handleReschedule(slot.id)}
                         className="flex-1 sm:flex-none px-4 py-2 border border-stone-300 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-50 hover:border-stone-400 transition-colors"
                       >
                         Reschedule
                       </button>
                       <button 
                         onClick={() => handleCancel(slot.id)}
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
