
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/AdminComponents';
import { Users, FileText, CalendarCheck, CalendarIcon } from '../../components/Icons';

const DashboardPage: React.FC = () => {
  const stats = [
    { title: 'Total Students', value: '1,248', icon: <Users className="text-blue-500" />, trend: '+12% this month' },
    { title: 'Active Events', value: '24', icon: <CalendarIcon className="text-orange-500" />, trend: '4 upcoming this week' },
    { title: 'Documents', value: '856', icon: <FileText className="text-green-500" />, trend: '12 uploaded today' },
    { title: 'Pending Meetings', value: '8', icon: <CalendarCheck className="text-purple-500" />, trend: 'Action required' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-stone-800 mt-1">{stat.value}</h3>
                <p className="text-xs text-stone-400 mt-1">{stat.trend}</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Student Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 font-bold text-xs">
                      LR
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-800">Layaa Ramesh</p>
                      <p className="text-xs text-stone-500">Grade 3 - A • Adm: BLT-2458</p>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400">2 mins ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-stone-200 hover:border-brand-500 hover:bg-brand-50 transition-colors text-sm font-medium text-stone-700 flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded">
                 <Users className="w-4 h-4" />
              </div>
              Add New Student
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-stone-200 hover:border-brand-500 hover:bg-brand-50 transition-colors text-sm font-medium text-stone-700 flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded">
                 <CalendarIcon className="w-4 h-4" />
              </div>
              Create Event
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-stone-200 hover:border-brand-500 hover:bg-brand-50 transition-colors text-sm font-medium text-stone-700 flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded">
                 <FileText className="w-4 h-4" />
              </div>
              Upload Newsletter
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
