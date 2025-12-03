
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '../../components/ui/AdminComponents';
import { Search, Upload, Plus, Trash2, FileText } from '../../components/Icons';

const StudentsPage: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);

  // Mock Students List
  const students = [
    { id: '1', name: 'Layaa Ramesh', adm: 'BLT-2458', class: 'Grade 3 - A', parent: 'Ramesh B' },
    { id: '2', name: 'Aarav Gupta', adm: 'BLT-2459', class: 'Grade 4 - B', parent: 'Sanjay G' },
    { id: '3', name: 'Meera Kapoor', adm: 'BLT-2460', class: 'Grade 2 - C', parent: 'Anjali K' },
    { id: '4', name: 'Vihaan Reddy', adm: 'BLT-2461', class: 'Grade 1 - A', parent: 'Pradeep R' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-stone-800">Students Directory</h2>
           <p className="text-stone-500 text-sm">Manage student profiles and admissions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowUpload(true)}>
            <Upload className="w-4 h-4 mr-2" /> Import CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-stone-50/50">
        <CardContent className="p-4 flex gap-4">
           <Input placeholder="Search by name or admission no..." icon={<Search className="w-4 h-4" />} />
           <select className="h-10 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500">
             <option>All Grades</option>
             <option>Grade 1</option>
             <option>Grade 2</option>
             <option>Grade 3</option>
           </select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Admission No</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Parent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-stone-800">{student.name}</td>
                  <td className="px-6 py-4 text-stone-600 font-mono">{student.adm}</td>
                  <td className="px-6 py-4 text-stone-600">{student.class}</td>
                  <td className="px-6 py-4 text-stone-600">{student.parent}</td>
                  <td className="px-6 py-4">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-stone-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Modal (Simulation) */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <Card className="w-full max-w-lg animate-fade-in shadow-2xl">
             <CardHeader className="flex justify-between items-center">
               <CardTitle>Import Students</CardTitle>
               <button onClick={() => setShowUpload(false)} className="text-stone-400 hover:text-stone-600">✕</button>
             </CardHeader>
             <CardContent>
                <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                     <FileText className="w-6 h-6" />
                   </div>
                   <p className="text-stone-800 font-medium">Click to upload CSV</p>
                   <p className="text-xs text-stone-500 mt-1">Headers: admission_no, name, dob, class...</p>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="secondary" onClick={() => setShowUpload(false)}>Cancel</Button>
                  <Button onClick={() => { alert('Upload started...'); setShowUpload(false); }}>Upload Data</Button>
                </div>
             </CardContent>
           </Card>
        </div>
      )}

    </div>
  );
};

export default StudentsPage;
