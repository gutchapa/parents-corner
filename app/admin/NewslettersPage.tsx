
import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Select, Input } from '../../components/ui/AdminComponents';
import { Plus, Newspaper, Upload, Trash2 } from '../../components/Icons';

const NewslettersPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const newsletters = [
    { id: '1', title: 'June 2024 Highlights', month: 'June', year: '2024', status: 'Published' },
    { id: '2', title: 'July 2024 - Rainy Days', month: 'July', year: '2024', status: 'Published' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-stone-800">Newsletters</h2>
           <p className="text-stone-500 text-sm">Manage published newsletters</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4 mr-2" /> Upload Newsletter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {newsletters.map(n => (
            <Card key={n.id} className="relative group">
               <div className="aspect-[3/4] bg-stone-100 flex items-center justify-center border-b border-stone-100 rounded-t-xl">
                  <Newspaper className="w-16 h-16 text-stone-300" />
               </div>
               <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-stone-800">{n.title}</h3>
                     <Badge variant="success">{n.status}</Badge>
                  </div>
                  <p className="text-sm text-stone-500 mb-4">{n.month} {n.year}</p>
                  
                  <div className="flex gap-2">
                     <Button variant="secondary" className="w-full" size="sm">View PDF</Button>
                     <Button variant="danger" size="sm" className="px-3"><Trash2 className="w-4 h-4" /></Button>
                  </div>
               </div>
            </Card>
         ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Newsletter">
         <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <Select label="Month">
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
               </Select>
               <Select label="Year">
                  <option>2024</option>
                  <option>2025</option>
               </Select>
            </div>
            <Input label="Title (Optional)" placeholder="e.g. Special Edition" />
            
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
               <Upload className="w-6 h-6 mx-auto text-stone-400 mb-2" />
               <p className="text-sm text-stone-600">Select PDF File</p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
               <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
               <Button onClick={() => setShowModal(false)}>Publish</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default NewslettersPage;
