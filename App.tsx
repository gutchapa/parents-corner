import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { mockStudent, mockDocuments, mockEvents, mockCarouselImages } from './services/mockData';

const App: React.FC = () => {
  // Simple state to handle authentication flow
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {isAuthenticated ? (
        <Dashboard 
          student={mockStudent}
          documents={mockDocuments}
          events={mockEvents}
          carouselImages={mockCarouselImages}
          onLogout={handleLogout}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;