
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../components/ui/AdminComponents';
import { RefreshCw } from '../../components/Icons';

const DocumentsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div>
         <h2 className="text-2xl font-bold text-stone-800">Reports & Receipts</h2>
         <p className="text-stone-500 text-sm">Sync term reports and fee receipts from Google Drive</p>
       </div>

      <div className="grid md:grid-cols-2 gap-6">
         {/* Drive Sync Reports */}
         <Card className="border-l-4 border-l-blue-600">
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-600" /> Sync Reports
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-stone-600 mb-6">
                  Import PDF Report Cards. Ensure files are named <code>ADM_Report.pdf</code>.
               </p>
               <div className="flex justify-between text-sm mb-4 bg-stone-50 p-3 rounded">
                  <span>Folder Status:</span> <span className="text-green-600 font-bold">Connected</span>
               </div>
               <Button className="w-full bg-blue-600 hover:bg-blue-700">Sync Reports Now</Button>
            </CardContent>
         </Card>

         {/* Drive Sync Receipts */}
         <Card className="border-l-4 border-l-purple-600">
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-purple-600" /> Sync Receipts
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-stone-600 mb-6">
                  Import Fee Receipts. Ensure files are named <code>ADM_Receipt.pdf</code>.
               </p>
               <div className="flex justify-between text-sm mb-4 bg-stone-50 p-3 rounded">
                  <span>Folder Status:</span> <span className="text-green-600 font-bold">Connected</span>
               </div>
               <Button className="w-full bg-purple-600 hover:bg-purple-700">Sync Receipts Now</Button>
            </CardContent>
         </Card>
      </div>

      {/* Stats */}
      <Card>
         <CardHeader><CardTitle>Sync Statistics</CardTitle></CardHeader>
         <CardContent className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl text-center">
               <div className="text-3xl font-bold text-blue-600">850</div>
               <div className="text-sm font-medium text-blue-800">Reports Synced</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl text-center">
               <div className="text-3xl font-bold text-purple-600">1,240</div>
               <div className="text-sm font-medium text-purple-800">Receipts Synced</div>
            </div>
         </CardContent>
      </Card>

      <Card>
         <CardHeader><CardTitle>Recent Imports</CardTitle></CardHeader>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-stone-50 text-stone-500">
                  <tr>
                     <th className="px-6 py-3">File Name</th>
                     <th className="px-6 py-3">Student</th>
                     <th className="px-6 py-3">Type</th>
                     <th className="px-6 py-3">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-stone-100">
                  <tr>
                     <td className="px-6 py-3 font-mono">BLT2458_T1_Report.pdf</td>
                     <td className="px-6 py-3">Layaa Ramesh</td>
                     <td className="px-6 py-3">Report</td>
                     <td className="px-6 py-3"><Badge variant="success">Imported</Badge></td>
                  </tr>
                  <tr>
                     <td className="px-6 py-3 font-mono">BLT2458_T1_Receipt.pdf</td>
                     <td className="px-6 py-3">Layaa Ramesh</td>
                     <td className="px-6 py-3">Receipt</td>
                     <td className="px-6 py-3"><Badge variant="success">Imported</Badge></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};

export default DocumentsPage;
