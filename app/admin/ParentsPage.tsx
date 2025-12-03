
import React, { useState } from 'react';
import { Card, Button, Input, Badge, Modal, Switch, Label } from '../../components/ui/AdminComponents';
import { Search, Plus, Edit, Trash2, MessageCircle, User } from '../../components/Icons';

const ParentsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Mock Parents based on Master Sheet structure
  const parents = [
    { id: '1', father: 'Ramesh Bhaskaramurthy', mother: 'Uma Sankaran', phone: '9876543210', children: ['Layaa Ramesh'], whatsapp: true },
    { id: '2', father: 'Vikram Gupta', mother: 'Sonia Gupta', phone: '9988776655', children: ['Aarav Gupta'], whatsapp: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-stone-800">Parents Page</h2>
           <p className="text-stone-500 text-sm">Manage parent profiles (Master Directory)</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4 mr-2" /> Add Parent Family</Button>
      </div>

      <Card>
        <div className="p-4 flex gap-4 border-b border-stone-100">
           <Input placeholder="Search Parent Name, Phone..." icon={<Search className="w-4 h-4" />} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500 font-medium">
              <tr>
                <th className="px-6 py-4">Father Name</th>
                <th className="px-6 py-4">Mother Name</th>
                <th className="px-6 py-4">Primary Contact</th>
                <th className="px-6 py-4">Children</th>
                <th className="px-6 py-4">WhatsApp</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {parents.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/50">
                  <td className="px-6 py-4 font-bold text-stone-800">{p.father}</td>
                  <td className="px-6 py-4 font-bold text-stone-800">{p.mother}</td>
                  <td className="px-6 py-4">{p.phone}</td>
                  <td className="px-6 py-4">
                     <div className="flex flex-wrap gap-1">
                        {p.children.map((c, i) => (
                          <Badge key={i} variant="info" className="flex items-center gap-1"><User className="w-3 h-3" /> {c}</Badge>
                        ))}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     {p.whatsapp ? (
                       <Badge variant="success" className="flex w-fit items-center gap-1"><MessageCircle className="w-3 h-3" /> Opt-in</Badge>
                     ) : (
                       <Badge variant="default">Opt-out</Badge>
                     )}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="text-stone-400 hover:text-brand-600"><Edit className="w-4 h-4" /></button>
                    <button className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Expanded Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Parent Family Profile">
         <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            
            {/* Father Info */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Father's Information</Label>
               <Input label="Father's Name" className="mb-3" />
               <div className="grid grid-cols-2 gap-4">
                  <Input label="Contact No." />
                  <Input label="Email ID" />
               </div>
            </div>

            {/* Mother Info */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Mother's Information</Label>
               <Input label="Mother's Name" className="mb-3" />
               <div className="grid grid-cols-2 gap-4">
                  <Input label="Contact No." />
                  <Input label="Email ID" />
               </div>
            </div>

            {/* Address */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
               <Label className="text-brand-600 font-bold uppercase text-xs mb-3 border-b border-stone-200 pb-1">Communication</Label>
               <Input label="Address for Communication" className="mb-3" />
               <Switch checked={true} onCheckedChange={() => {}} label="Enable WhatsApp Notifications" />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-stone-100 sticky bottom-0 bg-white p-2">
               <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
               <Button onClick={() => setShowModal(false)}>Save Family</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default ParentsPage;
