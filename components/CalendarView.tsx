import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { MONTHS } from '../constants';
import { ChevronDown } from './Icons';

interface CalendarViewProps {
  events: CalendarEvent[];
  type: 'academic' | 'school';
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarView: React.FC<CalendarViewProps> = ({ events, type }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[5]); // Default to June (start of academic year)

  // Split months for desktop view
  // Academic year usually starts in June in this context based on data
  const term1 = MONTHS.slice(5, 12).concat(MONTHS.slice(0, 1)); // Jun - Jan (Just an example split or strictly following the months list)
  // Let's stick to the user's requested split or standard: Jan-Jun, Jul-Dec
  // But strictly speaking for academic calendar, often Jun-May.
  // Let's stick to the Standard Calendar split for display:
  const firstHalf = MONTHS.slice(0, 6); // Jan - Jun
  const secondHalf = MONTHS.slice(6, 12); // Jul - Dec

  // Helper to determine year based on academic flow (June 2023 - May 2024)
  // Data has events in 2023 and 2024.
  const getYearForMonth = (monthName: string) => {
    const monthIndex = MONTHS.indexOf(monthName);
    // If month is Jan-May, it's 2024. If Jun-Dec, it's 2023.
    // This aligns with mock data: June 2023 start.
    return monthIndex < 5 ? 2024 : 2023;
  };

  const getEventsForMonth = (monthName: string) => {
    return events.filter(event => {
      const d = new Date(event.date);
      const eventMonthName = d.toLocaleString('default', { month: 'long' });
      return eventMonthName === monthName && event.type === type;
    });
  };

  const CalendarGrid = ({ month, isMobile = false }: { month: string, isMobile?: boolean }) => {
    const year = getYearForMonth(month);
    const monthIndex = MONTHS.indexOf(month);
    
    // Get number of days in month
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    // Get starting weekday (0 = Sunday)
    const startDay = new Date(year, monthIndex, 1).getDay();
    
    const monthEvents = getEventsForMonth(month);
    
    // Create array for grid
    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const totalSlots = [...blanks, ...days];

    // Check if a day has an event
    const hasEvent = (day: number) => {
      return monthEvents.some(e => new Date(e.date).getDate() === day);
    };

    return (
      <div className={`bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${isMobile ? 'min-h-[350px]' : 'h-full'}`}>
        {/* Header */}
        <div className="bg-orange-50 p-3 border-b border-orange-100 flex justify-between items-center">
          <span className="font-bold text-brand-700">{month}</span>
          <span className="text-xs text-brand-500 font-medium">{year}</span>
        </div>

        {/* Weekdays Header */}
        <div className="grid grid-cols-7 border-b border-stone-100 bg-stone-50">
          {WEEKDAYS.map(day => (
            <div key={day} className="text-center text-[10px] text-stone-400 font-bold py-1.5 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 flex-grow content-start">
          {totalSlots.map((day, index) => {
            const isEventDay = day && hasEvent(day);
            return (
              <div 
                key={index} 
                className={`
                  min-h-[30px] md:min-h-[2.5rem] border-b border-r border-stone-50 flex flex-col items-center justify-start py-1 relative
                  ${!day ? 'bg-stone-50/30' : 'bg-white'}
                `}
              >
                {day && (
                  <>
                    <span className={`
                      text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full
                      ${isEventDay ? 'bg-brand-600 text-white shadow-sm' : 'text-stone-700'}
                    `}>
                      {day}
                    </span>
                    {/* Event Dot Indicator */}
                    {isEventDay && (
                       <div className="hidden md:block absolute bottom-1 w-1 h-1 bg-brand-600 rounded-full"></div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Event List for Desktop Card (Mini) */}
        {!isMobile && monthEvents.length > 0 && (
           <div className="p-2 border-t border-stone-100 bg-stone-50/50">
              <div className="text-[10px] text-stone-500 font-medium truncate">
                {monthEvents.length} event{monthEvents.length > 1 ? 's' : ''}: {monthEvents[0].title}
              </div>
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Mobile View */}
      <div className="block md:hidden">
        <label className="block text-sm font-bold text-stone-700 mb-2">Select Month</label>
        <div className="relative mb-6">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block w-full appearance-none bg-white border border-stone-300 hover:border-brand-500 px-4 py-3 pr-8 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-stone-800 font-bold"
          >
            {MONTHS.map(m => <option key={m} value={m}>{m} {getYearForMonth(m)}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>

        {/* Full Grid Display for Mobile */}
        <CalendarGrid month={selectedMonth} isMobile={true} />

        {/* Detailed Event List below Grid for Mobile */}
        <div className="mt-4 bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
           <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Events in {selectedMonth}</h4>
           {getEventsForMonth(selectedMonth).length === 0 ? (
             <p className="text-stone-500 text-sm italic py-2">No events scheduled.</p>
           ) : (
             <ul className="space-y-3">
               {getEventsForMonth(selectedMonth).map(evt => (
                 <li key={evt.id} className="flex gap-3 items-start">
                   <div className="bg-brand-100 text-brand-700 font-bold text-xs px-2 py-1 rounded min-w-[40px] text-center mt-0.5">
                     {new Date(evt.date).getDate()}
                   </div>
                   <div>
                     <div className="font-semibold text-stone-800 text-sm">{evt.title}</div>
                     <div className="text-xs text-stone-500">{new Date(evt.date).toLocaleDateString()}</div>
                   </div>
                 </li>
               ))}
             </ul>
           )}
        </div>
      </div>

      {/* Desktop View: Split Grids */}
      <div className="hidden md:block space-y-8">
        {/* Jan - Jun */}
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-stone-700">First Term <span className="text-stone-400 text-base font-normal">(Jan - Jun)</span></h3>
           </div>
           <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
             {firstHalf.map(month => (
               <div key={month} className="h-64">
                 <CalendarGrid month={month} />
               </div>
             ))}
           </div>
        </div>

        {/* Jul - Dec */}
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-stone-700">Second Term <span className="text-stone-400 text-base font-normal">(Jul - Dec)</span></h3>
           </div>
           <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
             {secondHalf.map(month => (
               <div key={month} className="h-64">
                 <CalendarGrid month={month} />
               </div>
             ))}
           </div>
        </div>
      </div>

    </div>
  );
};

export default CalendarView;