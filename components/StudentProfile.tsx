import React from 'react';
import { Student } from '../types';
import { LogOut } from './Icons';

interface StudentProfileProps {
  student: Student;
  onLogout: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onLogout }) => {
  return (
    <div className="relative mt-12 mb-8">
      {/* Logout Button - Absolute Top Right of the card container */}
      <div className="absolute -top-12 right-0 md:top-4 md:right-4 z-20">
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-stone-500 hover:text-red-600 transition-colors bg-white/50 px-3 py-1 rounded-full text-sm font-medium"
          title="Logout"
        >
          <span className="hidden md:inline">Logout</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 pt-16 pb-8 px-6 md:px-10 relative">
        {/* Photo Section - Centered Absolute Top */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-stone-100">
            <img 
              src={student.photoUrl} 
              alt={student.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info Grid - 3 Columns based on specific request */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mt-4">
          
          {/* Column 1: Name, DOB, Age */}
          <div className="space-y-4">
            <div className="flex flex-col md:block">
              <span className="text-stone-500 text-sm font-medium uppercase tracking-wide">Name</span>
              <div className="text-lg font-bold text-stone-800">{student.name}</div>
            </div>
            
            <div className="flex flex-col md:block">
              <span className="text-stone-500 text-sm font-medium uppercase tracking-wide">DOB</span>
              <div className="text-stone-800 font-semibold">{student.dob}</div>
            </div>

            <div className="flex flex-col md:block">
              <span className="text-stone-500 text-sm font-medium uppercase tracking-wide">Age</span>
              <div className="text-stone-800 font-semibold">{student.age} Years</div>
            </div>
          </div>

          {/* Column 2: Admission #, DoJ, Class */}
          <div className="space-y-4 md:border-l md:border-stone-100 md:pl-8">
            <div className="flex flex-col md:block">
              <span className="text-stone-500 text-sm font-medium uppercase tracking-wide">Admission No</span>
              <div className="text-lg font-bold text-brand-700">{student.admissionNo}</div>
            </div>
            
            <div className="flex flex-col md:block">
              <span className="text-stone-500 text-sm font-medium uppercase tracking-wide">Date of Joining</span>
              <div className="text-stone-800 font-semibold">{student.doj}</div>
            </div>

            <div className="flex flex-col md:block">
              <span className="text-stone-500 text-sm font-medium uppercase tracking-wide">Class</span>
              <div className="text-stone-800 font-semibold">{student.classGrade}</div>
            </div>
          </div>

          {/* Column 3: Parents Details */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-stone-100 pt-6 md:pt-0 md:pl-8">
            <h3 className="text-brand-600 font-bold uppercase tracking-wider text-sm mb-2">Parents Information</h3>
            
            <div className="grid grid-cols-[80px_1fr] items-baseline text-left md:text-left">
              <span className="text-stone-500 text-sm">Father:</span>
              <span className="font-medium text-stone-800">{student.fatherName}</span>
            </div>

            <div className="grid grid-cols-[80px_1fr] items-baseline text-left md:text-left">
              <span className="text-stone-500 text-sm">Mother:</span>
              <span className="font-medium text-stone-800">{student.motherName}</span>
            </div>

            <div className="grid grid-cols-[80px_1fr] items-baseline text-left md:text-left">
              <span className="text-stone-500 text-sm">Guardian:</span>
              <span className="font-medium text-stone-800">{student.guardianName || '-'}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;