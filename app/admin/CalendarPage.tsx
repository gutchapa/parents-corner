
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../components/ui/AdminComponents';
import { RefreshCw, Upload, CalendarIcon } from '../../components/Icons';

const CalendarPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
         <h2 className="text-2xl font-bold text-stone-800">Calendar Management</h2>
         <p className="text-stone-500 text-sm">Manage academic events and sync schedules</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Google Sync */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Google Calendar Sync</CardTitle>
                <p className="text-sm text-stone-500 mt-1">Sync Academic Calendar from Google account</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <RefreshCw className="w-6 h-6" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               <div className="flex items-center justify-between text-sm bg-stone-50 p-3 rounded-lg">
                 <span className="text-stone-600">Status</span>
                 <Badge variant="success">Connected</Badge>
               </div>
               <div className="flex items-center justify-between text-sm bg-stone-50 p-3 rounded-lg">
                 <span className="text-stone-600">Last Sync</span>
                 <span className="font-medium">Today, 10:42 AM</span>
               </div>
               <Button className="w-full mt-2" onClick={() => alert("Syncing with Google Calendar API...")}>
                 Sync Now
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* CSV Upload */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
             <div className="flex justify-between items-start">
               <div>
                 <CardTitle>Upload Events CSV</CardTitle>
                 <p className="text-sm text-stone-500 mt-1">Bulk import events from spreadsheet</p>
               </div>
               <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                 <Upload className="w-6 h-6" />
               </div>
             </div>
          </CardHeader>
          <CardContent>
             <div className="border-2 border-dashed border-stone-200 rounded-lg p-6 text-center cursor-pointer hover:bg-stone-50 transition-colors">
                <p className="text-sm font-medium text-stone-700">Drag & drop CSV file</p>
                <p className="text-xs text-stone-400 mt-1">Columns: title, date, type (academic/school)</p>
             </div>
             <Button variant="secondary" className="w-full mt-4" onClick={() => document.getElementById('event-upload')?.click()}>
               Select File
             </Button>
             <input type="file" id="event-upload" className="hidden" accept=".csv" onChange={(e) => alert(`File selected: ${e.target.files?.[0]?.name}`)} />
          </CardContent>
        </Card>

      </div>

      {/* Recent Events List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events (Preview)</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-stone-50 border-b border-stone-100 text-stone-500">
               <tr>
                 <th className="px-6 py-3">Event Title</th>
                 <th className="px-6 py-3">Date</th>
                 <th className="px-6 py-3">Type</th>
                 <th className="px-6 py-3">Source</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-stone-100">
               <tr>
                 <td className="px-6 py-3 font-medium">Science Fair 2024</td>
                 <td className="px-6 py-3">Mar 15, 2024</td>
                 <td className="px-6 py-3"><Badge variant="warning">Academic</Badge></td>
                 <td className="px-6 py-3 text-xs text-stone-400">Google Cal</td>
               </tr>
               <tr>
                 <td className="px-6 py-3 font-medium">Annual Sports Meet</td>
                 <td className="px-6 py-3">Apr 02, 2024</td>
                 <td className="px-6 py-3"><Badge>School</Badge></td>
                 <td className="px-6 py-3 text-xs text-stone-400">CSV Import</td>
               </tr>
             </tbody>
           </table>
        </div>
      </Card>
    </div>
  );
};

export default CalendarPage;
