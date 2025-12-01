
import React, { useState } from 'react';
import { CurriculumSubject } from '../types';
import { ChevronDown } from './Icons';

interface CurriculumViewProps {
  subjects: CurriculumSubject[];
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ subjects }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  return (
    <div className="space-y-6">
      {/* Subject Selection */}
      <div className="w-full max-w-sm">
        <label className="block text-sm font-bold text-stone-700 mb-2">Select Subject</label>
        <div className="relative">
          <select 
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="block w-full appearance-none bg-white border border-stone-300 hover:border-brand-500 px-4 py-3 pr-8 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-stone-800 font-medium"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Content Display */}
      {selectedSubject ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-brand-50 p-6 border-b border-brand-100">
            <h2 className="text-2xl font-bold text-brand-800 mb-2">{selectedSubject.name}</h2>
            <p className="text-stone-700 leading-relaxed">{selectedSubject.description}</p>
          </div>

          {/* Units */}
          <div className="p-6 md:p-8 space-y-8">
            {selectedSubject.units.map((unit, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-brand-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-2 border-white shadow-sm"></div>
                <h3 className="text-lg font-bold text-stone-800 mb-4">{unit.title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unit.topics.map((topic, tIndex) => (
                    <div key={tIndex} className="bg-stone-50 rounded-lg p-3 text-sm text-stone-700 font-medium flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                       {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-12 text-stone-400">
          No curriculum data available.
        </div>
      )}
    </div>
  );
};

export default CurriculumView;
