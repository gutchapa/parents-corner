import React, { useState, useEffect } from 'react';
import StudentProfile from './StudentProfile';
import EventHero from './EventHero';
import CalendarView from './CalendarView';
import TabFiles from './TabFiles';
import CurriculumView from './CurriculumView';
import { Phone } from './Icons';
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

  // Handle Hash Routing (Deep Linking)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTab = TABS.find(t => t.id === hash);
      if (validTab) {
        setActiveTab(validTab.id as TabType);
      }
    };

    // Check on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when tab changes
  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

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
    <div className="min-h-screen flex flex-col">
      {/* Top Strip (Orange) */}
      <div className="bg-brand-500 text-white text-sm py-2">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            <a href="tel:+918056298968" className="flex items-center gap-2 hover:text-brand-100 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-medium">+(91) 80562 98968</span>
            </a>
            <a href="tel:+9199403327479" className="flex items-center gap-2 hover:text-brand-100 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-medium">+(91) 99403 327479</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
             {/* Social icons removed as requested */}
          </div>
        </div>
      </div>

      {/* Main Header (White) */}
      <div className="bg-white shadow-sm border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
           {/* Logo Image */}
           <div className="shrink-0">
             {/* Using a placeholder SVG that represents a tree/logo based on the name */}
             <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <img 
                  src="https://bodhana-learningtree.co.in/wp-content/uploads/2020/06/Bodhana-Logo-1.png" 
                  alt="Bodhana Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-brand-50', 'rounded-full', 'flex', 'items-center', 'justify-center', 'text-brand-500');
                    e.currentTarget.parentElement!.innerText = 'LOGO';
                  }}
                />
             </div>
           </div>

           {/* Text Content */}
           <div className="flex-1">
             <h1 className="text-2xl md:text-3xl font-bold text-brand-500 tracking-tight leading-tight">
               Bodhana & Learning Tree <span className="block md:inline">Montessori</span>
             </h1>
             <p className="text-brand-green font-medium italic mt-1 text-sm md:text-base">
               Montessori at Heart. Cambridge in Mind
             </p>
             <div className="mt-2 text-stone-500 text-xs md:text-sm hidden md:block">
               5/381, Ambedkar Main Rd, Elango Nagar, Perungudi, OMR, Chennai – 600 041
             </div>
           </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 flex-grow w-full">
        {/* Student Profile Card */}
        <StudentProfile student={student} onLogout={onLogout} />

        {/* Hero Carousel */}
        <EventHero images={carouselImages} />

        {/* Upcoming Events Section */}
        <div className="mt-8 mb-4 animate-fade-in">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-stone-700 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                Upcoming Events
              </h3>
              <button onClick={() => handleTabChange('school_calendar')} className="text-sm text-brand-600 hover:text-brand-800 font-medium">View Calendar →</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {events
               .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
               .slice(0, 3)
               .map((event) => (
                 <div key={event.id} className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4 hover:border-brand-300 transition-colors">
                    <div className="bg-brand-50 text-brand-600 rounded-lg p-2 min-w-[60px] text-center border border-brand-100">
                       <div className="text-[10px] font-bold uppercase tracking-wider">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                       <div className="text-xl font-bold leading-none mt-1">{new Date(event.date).getDate()}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-stone-800 truncate">{event.title}</h4>
                       <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                            event.type === 'academic' 
                              ? 'bg-blue-50 text-blue-600 border-blue-100' 
                              : 'bg-orange-50 text-orange-600 border-orange-100'
                          }`}>
                            {event.type === 'academic' ? 'Academic' : 'School Event'}
                          </span>
                       </div>
                    </div>
                 </div>
               ))}
           </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-8">
          <div className="border-b border-stone-200 overflow-x-auto scrollbar-hide">
            <nav className="flex space-x-2 md:space-x-8 min-w-max pb-px" aria-label="Tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as TabType)}
                  className={`
                    whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm md:text-base transition-colors duration-200 rounded-t-lg
                    ${activeTab === tab.id
                      ? 'border-brand-500 text-brand-600 bg-white shadow-sm'
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
      </main>
      
      {/* Footer */}
      <footer className="bg-stone-800 text-stone-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Bodhana & Learning Tree Montessori. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;