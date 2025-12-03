
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Select, Input } from '../../components/ui/AdminComponents';
import { Upload, GraduationCap, FileText } from '../../components/Icons';

const CurriculumPage: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState('Toddler');

  return (
    <div className="space-y-6 animate-fade-in">
       <div>
         <h2 className="text-2xl font-bold text-stone-800">Curriculum</h2>
         <p className="text-stone-500 text-sm">Upload yearly curriculum documents by program level</p>
       </div>

       <div className="grid md:grid-cols-2 gap-6">
         {/* Manual Upload Card */}
         <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-yellow-600" /> Upload Curriculum
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <Select 
                 label="Program Level"
                 value={activeLevel}
                 onChange={(e) => setActiveLevel(e.target.value)}
               >
                 <option value="Toddler">Toddler</option>
                 <option value="Primary">Primary</option>
                 <option value="Elementary">Elementary</option>
                 <option value="Adolescent">Adolescent</option>
               </Select>
               
               <div className="border-2 border-dashed border-stone-200 rounded-lg p-6 text-center cursor-pointer hover:bg-stone-50 transition-colors">
                  <FileText className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                  <p className="text-sm font-medium text-stone-700">Select Document (PDF/Doc)</p>
                  <p className="text-xs text-stone-400 mt-1">For {activeLevel} Level</p>
               </div>

               <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Upload & Publish</Button>
            </CardContent>
         </Card>

         {/* Existing Files Stats */}
         <Card>
            <CardHeader><CardTitle>Current Curriculum</CardTitle></CardHeader>
            <CardContent>
               <div className="space-y-3">
                  {[
                    { level: 'Toddler', file: 'Toddler_Curr_2024.pdf', date: 'Jun 10, 2024' },
                    { level: 'Primary', file: 'Primary_Syllabus.pdf', date: 'Jun 12, 2024' },
                    { level: 'Elementary', file: 'Elem_Overview.pdf', date: 'Jun 15, 2024' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                       <div className="flex items-center gap-3">
                          <div className="bg-white p-2 rounded shadow-sm text-yellow-600">
                             <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                             <div className="text-sm font-bold text-stone-800">{item.level}</div>
                             <div className="text-xs text-stone-500">{item.file}</div>
                          </div>
                       </div>
                       <div className="text-xs text-stone-400">{item.date}</div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>
       </div>
    </div>
  );
};

export default CurriculumPage;
