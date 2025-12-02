
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { LogOut, FileText } from './Icons';

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, tableName: 'events' | 'students') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split(',').map(h => h.trim());

        const dataToInsert = rows.slice(1).map(row => {
          const values = row.split(',');
          const obj: any = {};
          headers.forEach((header, index) => {
            // Basic CSV parsing (handling simple commas)
            let val = values[index]?.trim();
            // Remove quotes if present
            if (val && val.startsWith('"') && val.endsWith('"')) {
              val = val.slice(1, -1);
            }
            obj[header] = val;
          });
          return obj;
        });

        console.log(`Uploading ${dataToInsert.length} rows to ${tableName}...`, dataToInsert);

        // Insert into Supabase
        const { error } = await supabase
          .from(tableName)
          .insert(dataToInsert);

        if (error) throw error;

        setMessage({ type: 'success', text: `Successfully uploaded ${dataToInsert.length} records to ${tableName}.` });

      } catch (err: any) {
        console.error(err);
        setMessage({ type: 'error', text: `Upload failed: ${err.message || 'Unknown error'}` });
      } finally {
        setUploading(false);
        // Reset file input
        e.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-800">Admin Dashboard</h1>
            <p className="text-stone-500">Manage School Data</p>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-stone-600 hover:text-red-600 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-stone-200"
          >
            <span>Logout</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Calendar Events Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-800 mb-2">Upload Calendar Events</h2>
            <p className="text-sm text-stone-500 mb-6">
              Upload a CSV file with headers: <br/>
              <code className="bg-stone-100 px-1 rounded">title,date,type,description</code>
            </p>
            
            <label className={`
              block w-full text-center px-4 py-3 rounded-lg border-2 border-dashed transition-colors cursor-pointer
              ${uploading ? 'bg-stone-100 border-stone-300 cursor-wait' : 'border-brand-300 hover:bg-brand-50 hover:border-brand-500 text-brand-700'}
            `}>
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                onChange={(e) => handleFileUpload(e, 'events')}
                disabled={uploading}
              />
              {uploading ? 'Processing...' : 'Select Events CSV'}
            </label>
          </div>

          {/* Student Data Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-800 mb-2">Upload Students Data</h2>
            <p className="text-sm text-stone-500 mb-6">
              Upload a CSV file with headers matching the database columns (admission_no, name, dob, etc).
            </p>
            
            <label className={`
              block w-full text-center px-4 py-3 rounded-lg border-2 border-dashed transition-colors cursor-pointer
              ${uploading ? 'bg-stone-100 border-stone-300 cursor-wait' : 'border-blue-300 hover:bg-blue-50 hover:border-blue-500 text-blue-700'}
            `}>
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                onChange={(e) => handleFileUpload(e, 'students')}
                disabled={uploading}
              />
              {uploading ? 'Processing...' : 'Select Students CSV'}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
