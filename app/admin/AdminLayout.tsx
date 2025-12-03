
import React, { useState } from 'react';
import { LogOut, LayoutDashboard, Users, CalendarIcon, FileText, Settings, User } from '../../components/Icons';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout, currentPage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> }, // Need to make sure this icon exists or use generic
    { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon className="w-5 h-5" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      {/* Sidebar */}
      <aside 
        className={`bg-stone-900 text-stone-300 flex-shrink-0 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="h-16 flex items-center justify-center border-b border-stone-800">
          <div className="font-bold text-white text-xl tracking-tight">
            {isSidebarOpen ? 'Admin Portal' : 'BLT'}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                ${currentPage === item.id ? 'bg-brand-600 text-white shadow-md' : 'hover:bg-stone-800 text-stone-400'}
                ${!isSidebarOpen && 'justify-center'}
              `}
              title={item.label}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-stone-800 transition-colors ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 capitalize">{currentPage}</h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700">
                   <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-stone-700 pr-2">Administrator</span>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
