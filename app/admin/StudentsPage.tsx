
import React, { useState } from 'react';
import { Card, Button, Input, Badge, Modal, Select, Label } from '../../components/ui/AdminComponents';
import { Search, Plus, Trash2, Edit } from '../../components/Icons';

const StudentsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);

  // Mock Students List
  const students = [
    { id: '1', name: 'Layaa Ramesh', adm: 'BLT-2458', class: 'Grade 3', campus: 'OMR', status: 'Active' },
    { id: '2', name: 'Aarav Gupta', adm: 'BLT-2459', class: 'Grade 4', campus: 'Velachery', status: 'Active' },
  ];

  const openAdd = () => { setEditingStudent(null); setShowModal(true); };
  const openEdit = (s: any) => { setEditingStudent(s); setShowModal(true); };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-stone-800">Students Page</h2>
           <p className="text-stone-500 text-sm">Manage student profiles (Master Directory)</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" /> Add Student</Button>
        </div>
      </div>

      <Card>
        <div className="p-4 flex gap-4 border-b border-stone-100">
           <Input placeholder="Search Name, Admission No..." icon={<Search className="w-4 h-4" />} />
           <Select className="max-w-[150px]">
             <option>All Campuses</option>
             <option>OMR</option>
             <option>Velachery</option>
             <option>Adyar</option>
           </Select>
           <Select className="max-w-[150px]">
             <option>Active</option>
             <option>Inactive</option>
           </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500 font-medium">
              <tr>
                <th className="px-6 py-4">Admission No</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Campus</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-stone-50/50">
                  <td className="px-6 py-4 font-mono text-stone-600">{student.adm}</td>
                  <td className="px-6 py-4 font-bold text-stone-800">{student.name}</td>
                  <td className="px-6 py-4">{student.campus}</td>
                  <td className="px-6 py-4">{student.class}</td>
                  <td className="px-6 py-4"><Badge variant="success">{student.status}</Badge></td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openEdit(student)} className="text-stone-400 hover:text-brand-600"><Edit className="w-4 h-4" /></button>
                    <button className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Expanded Modal to match Master Sheet fields */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingStudent ? "Edit Student Details" : "Add New Student"}>
         <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            
            {/* 1. Profile & Academics */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Profile & Academics</Label>
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input label="Name of the Child" />
                  <Input label="Admission Number" placeholder="BLT-XXXX" />
               </div>
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <Select label="Gender">
                     <option>Male</option>
                     <option>Female</option>
                  </Select>
                  <Input label="Date of Birth" type="date" />
               </div>
               <div className="grid grid-cols-2 gap-4 mb-4">
                   <Input label="Age as on Today" readOnly placeholder="Auto-calc" />
                   <Input label="Aadhar Number" />
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <Select label="Location (Campus)">
                     <option>OMR</option>
                     <option>Velachery</option>
                     <option>Adyar</option>
                  </Select>
                  <Input label="Entity" placeholder="School Board/Legal Entity" />
               </div>
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input label="Date of Joining" type="date" />
               </div>
            </div>

            {/* 2. Class Details */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Class Classification</Label>
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <Select label="Program Level">
                     <option>Toddler</option>
                     <option>Primary</option>
                     <option>Elementary</option>
                     <option>Adolescent</option>
                  </Select>
                  <Input label="Division Name" placeholder="e.g. A, B, Rose, Lily" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <Input label="Grades as per NEP" placeholder="e.g. Grade 3" />
               </div>
            </div>

            {/* 3. Parents Information */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Father's Details</Label>
               <div className="space-y-3 mb-4">
                  <Input label="Father's Name" />
                  <div className="grid grid-cols-2 gap-4">
                     <Input label="Contact No." />
                     <Input label="Email ID" />
                  </div>
               </div>

               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Mother's Details</Label>
               <div className="space-y-3">
                  <Input label="Mother's Name" />
                  <div className="grid grid-cols-2 gap-4">
                     <Input label="Contact No." />
                     <Input label="Email ID" />
                  </div>
               </div>
            </div>

            {/* 4. Contact & Emergency */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Contact & Emergency</Label>
               <Input label="Address for Communication" className="mb-4" />
               <div className="grid grid-cols-2 gap-4">
                  <Input label="Emergency Contact Person" />
                  <Input label="Emergency Ph.No" />
               </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t border-stone-100 sticky bottom-0 bg-white p-2">
               <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
               <Button onClick={() => setShowModal(false)}>Save Student</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default StudentsPage;
