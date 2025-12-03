
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Switch, Button, Badge } from '../../components/ui/AdminComponents';
import { Trash2, RefreshCw } from '../../components/Icons';

const SchedulerPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       {/* Master Toggle */}
       <Card className="bg-gradient-to-r from-stone-800 to-stone-900 text-white">
          <CardContent className="flex justify-between items-center p-8">
             <div>
                <h2 className="text-2xl font-bold mb-2">PTM Scheduler Status</h2>
                <p className="text-stone-300">Toggle this to allow parents to book slots.</p>
             </div>
             <div className="flex items-center gap-4">
                <span className="font-bold text-green-400">ENABLED</span>
                <Switch checked={true} onCheckedChange={() => {}} />
             </div>
          </CardContent>
       </Card>

       <Card>
          <CardHeader className="flex justify-between items-center">
             <CardTitle>Google Calendar Integration</CardTitle>
             <Button variant="secondary" size="sm"><RefreshCw className="w-3 h-3 mr-2" /> Sync Availability</Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-500 mb-4">
              This system syncs directly with the connected Google Calendar. Slots shown to parents are based on "Free" times in your calendar. 
              No manual import is required.
            </p>
          </CardContent>
       </Card>

       <Card>
          <CardHeader className="flex justify-between items-center">
             <CardTitle>Upcoming Bookings</CardTitle>
             <div className="flex gap-2">
                <Button variant="outline" size="sm">Export CSV</Button>
             </div>
          </CardHeader>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                   <tr>
                      <th className="px-6 py-4">Date & Time</th>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Parent</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                   <tr>
                      <td className="px-6 py-4">
                         <div className="font-bold text-stone-800">10:00 AM</div>
                         <div className="text-stone-500 text-xs">Tomorrow</div>
                      </td>
                      <td className="px-6 py-4">Layaa Ramesh</td>
                      <td className="px-6 py-4 text-stone-600">Ramesh B</td>
                      <td className="px-6 py-4"><Badge variant="success">Confirmed</Badge></td>
                      <td className="px-6 py-4 text-right">
                         <Button variant="danger" size="sm"><Trash2 className="w-3 h-3" /></Button>
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>
       </Card>
    </div>
  );
};

export default SchedulerPage;
