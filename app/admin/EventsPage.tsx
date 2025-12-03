
import React, { useState } from 'react';
import { Card, Button, Input, Badge, Modal, Select, Tabs, TabsList, TabsTrigger, TextArea } from '../../components/ui/AdminComponents';
import { Plus, Trash2, RefreshCw, Upload } from '../../components/Icons';

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-stone-800">Events</h2>
           <p className="text-stone-500 text-sm">Manage school events and holidays</p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary"><RefreshCw className="w-4 h-4 mr-2" /> Google Sync</Button>
           <Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4 mr-2" /> New Event</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
         <TabsList>
            <TabsTrigger value="list" activeValue={activeTab} onClick={() => setActiveTab('list')}>Events List</TabsTrigger>
            <TabsTrigger value="images" activeValue={activeTab} onClick={() => setActiveTab('images')}>Event Images</TabsTrigger>
            <TabsTrigger value="settings" activeValue={activeTab} onClick={() => setActiveTab('settings')}>Sync Settings</TabsTrigger>
         </TabsList>

         {/* LIST TAB */}
         {activeTab === 'list' && (
           <Card>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-stone-50 text-stone-500 font-medium">
                   <tr>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Event Title</th>
                     <th className="px-6 py-4">Type</th>
                     <th className="px-6 py-4">Description</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-stone-100">
                   <tr>
                     <td className="px-6 py-4 font-mono text-stone-600">2024-03-15</td>
                     <td className="px-6 py-4 font-bold text-stone-800">Annual Sports Day</td>
                     <td className="px-6 py-4"><Badge variant="warning">School Event</Badge></td>
                     <td className="px-6 py-4 text-stone-500 truncate max-w-xs">All students required to wear sports uniform.</td>
                     <td className="px-6 py-4 text-right"><button className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </Card>
         )}

         {/* IMAGES TAB */}
         {activeTab === 'images' && (
           <div className="space-y-4">
              <div className="bg-white p-8 border-2 border-dashed border-stone-300 rounded-xl text-center hover:bg-stone-50 cursor-pointer">
                 <Upload className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                 <p className="text-stone-600 font-medium">Drag & Drop Event Photos</p>
                 <p className="text-xs text-stone-400">Up to 20 images at once</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square bg-stone-200 rounded-lg relative group overflow-hidden">
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="text-white bg-red-600 p-2 rounded-full"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         )}
      </Tabs>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Event">
         <div className="space-y-4">
            <Input label="Event Title" placeholder="e.g. Science Fair" />
            <div className="grid grid-cols-2 gap-4">
               <Input label="Date" type="date" />
               <Select label="Type">
                  <option>Academic</option>
                  <option>School Event</option>
                  <option>Holiday</option>
               </Select>
            </div>
            <TextArea label="Description" placeholder="Details visible to parents..." />
            <div className="flex justify-end gap-2 pt-4">
               <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
               <Button onClick={() => setShowModal(false)}>Save Event</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default EventsPage;
