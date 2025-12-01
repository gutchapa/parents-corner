import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { FileText, Download, ChevronDown } from './Icons';
import { MONTHS } from '../constants';

interface TabFilesProps {
  documents: DocumentItem[];
  type: 'report' | 'fee' | 'curriculum' | 'newsletter';
  showTerm?: boolean;
  showMonthFilter?: boolean;
}

const TabFiles: React.FC<TabFilesProps> = ({ documents, type, showTerm, showMonthFilter }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[6]); // Default to July
  const [selectedTerm, setSelectedTerm] = useState<string>('All');
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);

  // Filter based on type
  let filteredDocs = documents.filter(doc => doc.type === type);

  // Filter based on Month (for Newsletters)
  if (showMonthFilter) {
    filteredDocs = filteredDocs.filter(doc => doc.month === selectedMonth);
  }

  // Filter based on Term (for Reports)
  if (type === 'report' && selectedTerm !== 'All') {
    filteredDocs = filteredDocs.filter(doc => doc.term === selectedTerm);
  }

  const handleRead = (doc: DocumentItem) => {
    setViewingDoc(doc);
  };

  const closeReader = () => {
    setViewingDoc(null);
  };

  return (
    <div className="space-y-4">
      {/* Filters Container */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Month Filter for Newsletter */}
        {showMonthFilter && (
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-stone-700 mb-2">Filter by Month</label>
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="block w-full appearance-none bg-white border border-stone-300 px-4 py-2 pr-8 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 text-stone-700 outline-none"
              >
                {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}

        {/* Term Filter for Reports */}
        {type === 'report' && (
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-stone-700 mb-2">Filter by Term</label>
            <div className="relative">
              <select 
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="block w-full appearance-none bg-white border border-stone-300 px-4 py-2 pr-8 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 text-stone-700 outline-none"
              >
                <option value="All">All Terms</option>
                <option value="Term I">Term I</option>
                <option value="Term II">Term II</option>
                <option value="Term III">Term III</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {filteredDocs.length === 0 ? (
          <div className="p-8 text-center text-stone-400">
            No documents found for this selection.
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {filteredDocs.map((doc) => (
              <li key={doc.id} className="p-4 hover:bg-stone-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-50 text-brand-600 p-3 rounded-lg group-hover:bg-brand-100 transition-colors">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800">{doc.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <span>{doc.date}</span>
                      {showTerm && doc.term && (
                        <>
                          <span>•</span>
                          <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                            {doc.term}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {type === 'newsletter' && (
                    <button 
                      onClick={() => handleRead(doc)}
                      className="flex items-center gap-2 bg-brand-600 text-white hover:bg-brand-700 font-medium text-sm px-4 py-2 rounded-lg transition-all shadow-sm"
                    >
                      <span>Read Now</span>
                    </button>
                  )}
                  
                  {type !== 'newsletter' && (
                    <a 
                      href={doc.url} 
                      className="flex items-center gap-2 text-brand-600 hover:text-brand-800 font-medium text-sm border border-brand-200 hover:border-brand-400 px-4 py-2 rounded-lg transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading ${doc.title}... (Mock Action)`);
                      }}
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Newsletter Reader Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
              <h3 className="font-bold text-lg text-stone-800">{viewingDoc.title}</h3>
              <button 
                onClick={closeReader}
                className="text-stone-500 hover:text-stone-800 p-2 hover:bg-stone-200 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Modal Content - Simulated PDF Viewer */}
            <div className="flex-1 overflow-y-auto bg-stone-200 p-4 md:p-8 flex justify-center">
              <div className="bg-white shadow-lg w-full max-w-2xl min-h-[800px] p-8 md:p-12 relative">
                {/* Mock Content imitating a Newsletter */}
                <div className="border-b-2 border-brand-500 pb-4 mb-8 flex justify-between items-end">
                   <div>
                     <h1 className="text-3xl font-bold text-brand-800">NEWSLETTER</h1>
                     <p className="text-stone-500 font-medium">{viewingDoc.month} Edition</p>
                   </div>
                   <div className="text-right">
                     <p className="font-serif italic text-stone-400">Bodhana & Learning Tree Montessori</p>
                   </div>
                </div>
                
                <div className="space-y-6 text-stone-800">
                  <h2 className="text-xl font-bold">Principal's Message</h2>
                  <p className="leading-relaxed">
                    Dear Parents, <br/><br/>
                    We are delighted to share the highlights of this month. Our students have shown remarkable progress in both academic and co-curricular activities. 
                    (This is a simulated view of the PDF content stored in Supabase).
                  </p>
                  
                  <div className="h-48 bg-stone-100 rounded flex items-center justify-center text-stone-400">
                    [Image Placeholder: Class Activities]
                  </div>
                  
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Parent-Teacher Meeting: 25th {viewingDoc.month}</li>
                    <li>Science Exhibition Preparation</li>
                    <li>Community Outreach Program</li>
                  </ul>
                </div>

                <div className="absolute bottom-8 left-0 w-full text-center text-stone-400 text-sm">
                  Page 1 of 4
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-200 bg-white flex justify-end gap-2">
              <button 
                onClick={closeReader}
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 flex items-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabFiles;