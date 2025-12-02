
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import { 
  fetchStudentProfile, 
  fetchDocuments, 
  fetchEvents, 
  fetchCarouselImages, 
  fetchCurriculum 
} from './services/dataService';
import { Student, DocumentItem, CalendarEvent, CarouselImage } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'parent' | 'admin'>('parent');
  const [loading, setLoading] = useState(false);
  const [loginId, setLoginId] = useState<string>('');

  // Data State
  const [student, setStudent] = useState<Student | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);

  const handleLogin = (role: 'parent' | 'admin') => {
    setUserRole(role);
    setIsAuthenticated(true);
    setLoginId('demo-user'); // In real app, pass actual ID
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStudent(null);
    setUserRole('parent');
  };

  // Fetch Data upon Authentication
  useEffect(() => {
    if (isAuthenticated && userRole === 'parent') {
      const loadData = async () => {
        setLoading(true);
        try {
          // 1. Fetch Student Profile based on login
          const studentData = await fetchStudentProfile(loginId);
          setStudent(studentData);

          // 2. Fetch related data in parallel
          const [docsData, eventsData, imagesData] = await Promise.all([
            fetchDocuments(studentData.id),
            fetchEvents(),
            fetchCarouselImages()
          ]);

          setDocuments(docsData);
          setEvents(eventsData);
          setCarouselImages(imagesData);

        } catch (error) {
          console.error("Error loading dashboard data", error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [isAuthenticated, userRole, loginId]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Render Admin Panel
  if (userRole === 'admin') {
    return <AdminPanel onLogout={handleLogout} />;
  }

  // Render Parent Dashboard
  if (loading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="text-center">
           <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4"></div>
           <p className="text-brand-800 font-medium animate-pulse">Loading Student Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      <Dashboard 
        student={student}
        documents={documents}
        events={events}
        carouselImages={carouselImages}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default App;
