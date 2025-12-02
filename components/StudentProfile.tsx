import React from 'react';
import { Student } from '../types';
import { LogOut, User } from './Icons';

interface StudentProfileProps {
  student: Student;
  onLogout: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onLogout }) => {
  return (
    <div className="relative mt-16 mb-8">
      {/* Logout Button - Absolute Top Right of the card container */}
      <div className="absolute -top-12 right-0 md:top-4 md:right-4 z-20">
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-stone-500 hover:text-red-600 transition-colors bg-white/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium shadow-sm"
          title="Logout"
        >
          <span className="hidden md:inline">Logout</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 pt-20 pb-8 px-4 md:px-10 relative">
        {/* Photo Section - Centered Absolute Top */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-brand-50 flex items-center justify-center">
            {student.photoUrl ? (
              <img 
                src={student.photoUrl} 
                alt={student.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-brand-200" />
            )}
          </div>
        </div>

        {/* Student Details Split - Left and Right (Maintained on Mobile) */}
        <div className="grid grid-cols-2 gap-4 md:gap-16 mt-4 relative z-10">
          
          {/* Left Side: Name, DOB, Age - Aligned Right towards the photo */}
          <div className="space-y-5 text-right">
            <div>
              <span className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5 md:mb-1">Name</span>
              <div className="text-lg md:text-2xl font-bold text-stone-800 leading-tight break-words">{student.name}</div>
            </div>
            
            <div>
              <span className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5 md:mb-1">DOB</span>
              <div className="text-stone-800 font-medium text-sm md:text-lg">{student.dob}</div>
            </div>

            <div>
              <span className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5 md:mb-1">Age</span>
              <div className="text-stone-800 font-medium text-sm md:text-lg">{student.age} Years</div>
            </div>
          </div>

          {/* Right Side: Admission, DOJ, Class - Aligned Left away from the photo */}
          <div className="space-y-5 text-left">
            <div>
              <span className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5 md:mb-1">Admission No</span>
              <div className="text-lg md:text-2xl font-bold text-brand-600 leading-tight break-words">{student.admissionNo}</div>
            </div>
            
            <div>
              <span className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5 md:mb-1">Date of Joining</span>
              <div className="text-stone-800 font-medium text-sm md:text-lg">{student.doj}</div>
            </div>

            <div>
              <span className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5 md:mb-1">Class</span>
              <div className="text-stone-800 font-medium text-sm md:text-lg">{student.classGrade}</div>
            </div>
          </div>

        </div>

        {/* Parents Information Section - Bottom Row */}
        <div className="mt-10 pt-8 border-t border-stone-100">
          <div className="text-center mb-6">
            <h3 className="text-brand-600 font-bold uppercase tracking-widest text-xs border-b border-brand-100 pb-1 inline-block">Parents Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Father */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Father</div>
              <div className="font-bold text-stone-800 text-lg mb-2">{student.fatherName}</div>
              <div className="space-y-1.5">
                 <div className="text-sm text-stone-600 flex items-center gap-2">
                    <span className="opacity-60 text-lg leading-none">✉</span> 
                    <span className="truncate">{student.fatherEmail}</span>
                 </div>
                 <div className="text-sm text-stone-600 flex items-center gap-2">
                    <span className="opacity-60 text-lg leading-none">📞</span> 
                    <span>{student.fatherPhone}</span>
                 </div>
              </div>
            </div>

            {/* Mother */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Mother</div>
              <div className="font-bold text-stone-800 text-lg mb-2">{student.motherName}</div>
              <div className="space-y-1.5">
                 <div className="text-sm text-stone-600 flex items-center gap-2">
                    <span className="opacity-60 text-lg leading-none">✉</span> 
                    <span className="truncate">{student.motherEmail}</span>
                 </div>
                 <div className="text-sm text-stone-600 flex items-center gap-2">
                    <span className="opacity-60 text-lg leading-none">📞</span> 
                    <span>{student.motherPhone}</span>
                 </div>
              </div>
            </div>

            {/* Guardian */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Guardian</div>
              <div className="font-bold text-stone-800 text-lg mb-2">{student.guardianName || 'N/A'}</div>
              {student.guardianName !== 'N/A' && (
                <div className="space-y-1.5">
                  {student.guardianEmail && (
                    <div className="text-sm text-stone-600 flex items-center gap-2">
                      <span className="opacity-60 text-lg leading-none">✉</span> 
                      <span className="truncate">{student.guardianEmail}</span>
                    </div>
                  )}
                  {student.guardianPhone && (
                    <div className="text-sm text-stone-600 flex items-center gap-2">
                      <span className="opacity-60 text-lg leading-none">📞</span> 
                      <span>{student.guardianPhone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;