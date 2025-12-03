
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../../components/ui/AdminComponents';
import { Users, FileText, CalendarIcon, MessageCircle, Newspaper } from '../../components/Icons';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* High Visibility Stats Row */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Total Students - Main Highlight */}
        <Card className="bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-xl border-none">
           <CardContent className="p-8">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <h2 className="text-brand-100 font-bold text-lg uppercase tracking-wider">Total Students</h2>
                    <div className="text-6xl font-extrabold mt-2 tracking-tight">1,248</div>
                 </div>
                 <div className="bg-white/20 p-4 rounded-full">
                    <Users className="w-12 h-12 text-white" />
                 </div>
              </div>

              {/* Campus Breakdown Grid - Bold & Bright */}
              <div className="grid grid-cols-3 gap-0 divide-x divide-white/20 border-t border-white/20 pt-6">
                 
                 {/* OMR */}
                 <div className="text-center px-4">
                    <div className="text-brand-100 text-xs font-bold uppercase mb-1">OMR</div>
                    <div className="text-3xl font-extrabold">520</div>
                    <div className="mt-2 inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                      +12 New
                    </div>
                 </div>

                 {/* Velachery */}
                 <div className="text-center px-4">
                    <div className="text-brand-100 text-xs font-bold uppercase mb-1">Velachery</div>
                    <div className="text-3xl font-extrabold">410</div>
                    <div className="mt-2 inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                      +5 New
                    </div>
                 </div>

                 {/* Adyar */}
                 <div className="text-center px-4">
                    <div className="text-brand-100 text-xs font-bold uppercase mb-1">Adyar</div>
                    <div className="text-3xl font-extrabold">318</div>
                    <div className="mt-2 inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                      +8 New
                    </div>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <Card className="bg-orange-50 border-orange-100">
             <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-stone-500 font-bold text-sm uppercase">Events</p>
                 <h3 className="text-3xl font-extrabold text-stone-800 mt-1">4</h3>
                 <p className="text-xs text-orange-600 font-bold mt-1">Next 7 Days</p>
               </div>
               <CalendarIcon className="w-8 h-8 text-orange-400" />
             </CardContent>
           </Card>

           <Card className="bg-green-50 border-green-100">
             <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-stone-500 font-bold text-sm uppercase">WhatsApp</p>
                 <h3 className="text-3xl font-extrabold text-stone-800 mt-1">98%</h3>
                 <p className="text-xs text-green-600 font-bold mt-1">Opt-in Rate</p>
               </div>
               <MessageCircle className="w-8 h-8 text-green-400" />
             </CardContent>
           </Card>

           <Card className="bg-blue-50 border-blue-100">
             <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-stone-500 font-bold text-sm uppercase">Reports</p>
                 <h3 className="text-3xl font-extrabold text-stone-800 mt-1">850</h3>
                 <p className="text-xs text-blue-600 font-bold mt-1">Synced</p>
               </div>
               <FileText className="w-8 h-8 text-blue-400" />
             </CardContent>
           </Card>
           
           <Card className="bg-purple-50 border-purple-100">
             <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-stone-500 font-bold text-sm uppercase">Receipts</p>
                 <h3 className="text-3xl font-extrabold text-stone-800 mt-1">1.2k</h3>
                 <p className="text-xs text-purple-600 font-bold mt-1">Synced</p>
               </div>
               <FileText className="w-8 h-8 text-purple-400" />
             </CardContent>
           </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:border-brand-500 hover:bg-brand-50">
               <Newspaper className="w-6 h-6 text-brand-600" />
               <span>Upload Newsletter</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50">
               <Users className="w-6 h-6 text-blue-600" />
               <span>Add Student</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:border-orange-500 hover:bg-orange-50">
               <CalendarIcon className="w-6 h-6 text-orange-600" />
               <span>Add Event</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:border-green-500 hover:bg-green-50">
               <MessageCircle className="w-6 h-6 text-green-600" />
               <span>Send Notification</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
