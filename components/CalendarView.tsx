import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { MONTHS } from '../constants';
import { ChevronDown } from './Icons';

interface CalendarViewProps {
  events: CalendarEvent[];
  type: 'academic' | 'school';
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, type }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[0]); // Default to January

  const firstHalf = MONTHS.slice(0, 6); // Jan - Jun
  const secondHalf = MONTHS.slice(6, 12); // Jul - Dec

  // Filter events for a specific month
  const getEventsForMonth = (monthName: string) => {
    return events.filter(event => {
      const d = new Date(event.date);
      const eventMonthName = d.toLocaleString('default', { month: 'long' });
      return eventMonthName === monthName && event.type === type;
    });
  };

  const MonthCard = ({ month }: { month: string }) => {
    const monthEvents = getEventsForMonth(month);
    
    return (
      <div className="bg-white border border-stone-200 rounded-lg shadow-sm h-full flex flex-col hover:border-brand-300 transition-colors">
        <div className="bg-stone-100 p-2 text-center border-b border-stone-200 font-semibold text-brand-800 rounded-t-lg">
          {month}
        </div>
        <div className="p-2 flex-grow min-h-[100px] overflow-y-auto custom-scrollbar">
          {monthEvents.length === 0 ? (
            <p className="text-xs text-stone-400 text-center mt-4 italic">No events</p>
          ) : (
            <ul className="space-y-2">
              {monthEvents.map(evt => (
                <li key={evt.id} className="text-xs bg-brand-50 border-l-2 border-brand-500 p-1.5 rounded">
                  <div className="font-bold text-brand-900">{new Date(evt.date).getDate()} {month.slice(0,3)}</div>
                  <div className="text-stone-700 leading-tight">{evt.title}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  const renderGrid = (months: string[], title: string) => (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-stone-700 mb-4 border-l-4 border-brand-500 pl-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {months.map((month) => (
          <div key={month} className="h-48">
            <MonthCard month={month} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* Mobile View: Dropdown (Only visible on very small screens if desired, but grid is responsive now. Keeping Dropdown for extra small) */}
      <div className="block md:hidden mb-6">
        <label className="block text-sm font-medium text-stone-700 mb-2">Select Month</label>
        <div className="relative">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block w-full appearance-none bg-white border border-stone-300 hover:border-brand-500 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-stone-700"
          >
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4 h-64">
          <MonthCard month={selectedMonth} />
        </div>
      </div>

      {/* Desktop/Tablet View: Split Grids */}
      <div className="hidden md:block">
        {renderGrid(firstHalf, "January - June")}
        {renderGrid(secondHalf, "July - December")}
      </div>
    </div>
  );
};

export default CalendarView;