import React, { useState } from 'react';
import StudentProfile from './StudentProfile';
import EventHero from './EventHero';
import CalendarView from './CalendarView';
import TabFiles from './TabFiles';
import CurriculumView from './CurriculumView';
import { Student, DocumentItem, CalendarEvent, CarouselImage, TabType } from '../types';
import { TABS } from '../constants';
import { mockCurriculumSubjects } from '../services/mockData';

interface DashboardProps {
  student: Student;
  documents: DocumentItem[];
  events: CalendarEvent[];
  carouselImages: CarouselImage[];
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ student, documents, events, carouselImages, onLogout }) => {
  // Default to newsletter as it is now the first tab
  const [activeTab, setActiveTab] = useState<TabType>('newsletter');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return <TabFiles documents={documents} type="report" showTerm={true} />;
      case 'curriculum':
        return <CurriculumView subjects={mockCurriculumSubjects} />;
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
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* School Header */}
      <header className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-stone-100 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-600 rounded-full flex items-center justify-center shrink-0 shadow-lg text-white">
          {/* Placeholder Logo Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 tracking-tight">Bodhana & Learning Tree Montessori</h1>
          <div className="mt-2 text-stone-500 text-sm md:text-base space-y-1">
            <p>5/381, Ambedkar Main Rd, Elango Nagar, Perungudi, OMR, Chennai – 600 041, Tamilnadu, India</p>
            <p className="text-xs uppercase tracking-wide font-semibold text-brand-400">Excellence in Education</p>
          </div>
        </div>
      </header>

      {/* Student Profile Card */}
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
                  whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm md:text-base transition-colors duration-200 rounded-t-lg
                  ${activeTab === tab.id
                    ? 'border-brand-500 text-brand-700 bg-brand-50/50'
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-stone-800 capitalize hidden md:block border-l-4 border-brand-500 pl-3">
              {TABS.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="animate-fade-in">
             {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;