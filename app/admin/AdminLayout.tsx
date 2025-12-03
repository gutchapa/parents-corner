
import React, { useState } from 'react';
import { 
  LogOut, LayoutDashboard, Users, CalendarIcon, FileText, Settings, User, 
  MessageCircle, Newspaper, CalendarCheck, GraduationCap
} from '../../components/Icons';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout, currentPage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
    { id: 'parents', label: 'Parents', icon: <User className="w-5 h-5" /> },
    { id: 'events', label: 'Events', icon: <CalendarIcon className="w-5 h-5" /> },
    { id: 'scheduler', label: 'Meeting Scheduler', icon: <CalendarCheck className="w-5 h-5" /> },
    { id: 'documents', label: 'Reports & Receipts', icon: <FileText className="w-5 h-5" /> },
    { id: 'newsletters', label: 'Newsletters', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'curriculum', label: 'Curriculum', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'communication', label: 'WhatsApp', icon: <MessageCircle className="w-5 h-5" /> },
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

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 shadow-sm flex-shrink-0">
          <h2 className="text-lg font-bold text-stone-800 capitalize flex items-center gap-2">
            {menuItems.find(i => i.id === currentPage)?.icon}
            {menuItems.find(i => i.id === currentPage)?.label || currentPage}
          </h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700">
                   <User className="w-5 h-5" />
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-xs font-bold text-stone-800">Admin User</div>
                  <div className="text-[10px] text-stone-500">Super Admin</div>
                </div>
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
