import React, { useState } from 'react';
import StudentProfile from './StudentProfile';
import EventHero from './EventHero';
import CalendarView from './CalendarView';
import TabFiles from './TabFiles';
import { Student, DocumentItem, CalendarEvent, CarouselImage, TabType } from '../types';
import { TABS } from '../constants';

interface DashboardProps {
  student: Student;
  documents: DocumentItem[];
  events: CalendarEvent[];
  carouselImages: CarouselImage[];
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ student, documents, events, carouselImages, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('reports');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return <TabFiles documents={documents} type="report" showTerm={true} />;
      case 'curriculum':
        return <TabFiles documents={documents} type="curriculum" />;
      case 'fees':
        return <TabFiles documents={documents} type="fee" showTerm={true} />;
      case 'newsletter':
        return <TabFiles documents={documents} type="newsletter" showMonthFilter={true} />;
      case 'academic_calendar':
        return <CalendarView events={events} type="academic" />;
      case 'school_calendar':
        return <CalendarView events={events} type="school" />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Profile */}
      <StudentProfile student={student} onLogout={onLogout} />

      {/* Hero Carousel */}
      <EventHero images={carouselImages} />

      {/* Tabs Navigation */}
      <div className="mt-8">
        <div className="border-b border-stone-200 overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-2 md:space-x-8 min-w-max pb-px" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm md:text-base transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className="mt-8 min-h-[400px]">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 capitalize hidden md:block">
            {TABS.find(t => t.id === activeTab)?.label}
          </h2>
          <div className="animate-fade-in">
             {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
