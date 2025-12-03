
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Select, TextArea } from '../../components/ui/AdminComponents';
import { MessageCircle } from '../../components/Icons';

const CommunicationPage: React.FC = () => {
  const [template, setTemplate] = useState('Reports Published');
  const [message, setMessage] = useState('');

  const templates: Record<string, string> = {
    'Reports Published': "Dear Parents,\n\nThe report cards for Term I have been published to the Parents Corner. Please login to view detailed feedback on your child's progress.\n\nRegards,\nBodhana Admin",
    'Term Fees Notification': "Dear Parents,\n\nThis is a notification regarding the Term Fees for the upcoming session. Please ensure payment is made before the due date to avoid late charges.\n\nRegards,\nAccounts Team",
    'Term Fees Reminder': "Dear Parents,\n\nThis is a gentle reminder that the Term Fees payment is due next week. If already paid, please ignore this message.\n\nRegards,\nAccounts Team",
    'Workshop Notification': "Dear Parents,\n\nWe are organizing a 'Parenting in Montessori' workshop this Saturday at 10 AM. We invite you to join us.\n\nRegards,\nBodhana Admin",
    'Workshop Reminder': "Dear Parents,\n\nReminder: The 'Parenting in Montessori' workshop is tomorrow at 10 AM. We look forward to seeing you there!\n\nRegards,\nBodhana Admin"
  };

  useEffect(() => {
    setMessage(templates[template] || '');
  }, [template]);

  return (
    <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
      
      {/* Send Message Form */}
      <div className="lg:col-span-2 space-y-6">
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" /> 
                  Send WhatsApp Notification
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <Select 
                    label="Select Template" 
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                  >
                     <option>Reports Published</option>
                     <option>Term Fees Notification</option>
                     <option>Term Fees Reminder</option>
                     <option>Workshop Notification</option>
                     <option>Workshop Reminder</option>
                  </Select>
                  <Select label="Audience">
                     <option>All Parents (Opt-in)</option>
                     <option>Grade 3 Only</option>
                     <option>OMR Campus</option>
                     <option>Velachery Campus</option>
                     <option>Adyar Campus</option>
                     <option>Specific Parent...</option>
                  </Select>
               </div>
               
               <div>
                  <label className="text-sm font-medium text-stone-700 mb-1 block">Message Content (Editable)</label>
                  <TextArea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px] font-sans text-base"
                    placeholder="Message content will appear here..."
                  />
               </div>

               <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                  <span className="text-xs text-stone-500">Will be sent to <strong>248</strong> parents via WhatsApp</span>
                  <Button className="bg-green-600 hover:bg-green-700">Send Notification</Button>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* History */}
      <div className="space-y-6">
         <Card>
            <CardHeader><CardTitle>Recent History</CardTitle></CardHeader>
            <CardContent className="p-0">
               {[1,2,3].map(i => (
                  <div key={i} className="p-4 border-b border-stone-100 last:border-0 hover:bg-stone-50">
                     <div className="flex justify-between mb-1">
                        <span className="font-bold text-sm text-stone-800">Fees Reminder</span>
                        <span className="text-xs text-stone-400">2h ago</span>
                     </div>
                     <p className="text-xs text-stone-500 truncate">Dear Parents, Reminder to pay Term II...</p>
                  </div>
               ))}
            </CardContent>
         </Card>
      </div>
    </div>
  );
};

export default CommunicationPage;
