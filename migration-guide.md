File Summary Checklist
Before you start, ensure you have manually created/updated these files in your local VS Code project from the code blocks I provided in previous steps:
components/ui/AdminComponents.tsx (Shared UI Library)
components/Icons.tsx (Updated Icon set)
app/admin/AdminLayout.tsx (Sidebar & Header)
app/admin/DashboardPage.tsx (Main Dashboard)
app/admin/StudentsPage.tsx (Student CRUD)
app/admin/ParentsPage.tsx (Parents CRUD)
app/admin/EventsPage.tsx (Events & Google Sync)
app/admin/DocumentsPage.tsx (Reports & Receipts Sync)
app/admin/SchedulerPage.tsx (Meeting Scheduler)
app/admin/NewslettersPage.tsx (Newsletter Upload)
app/admin/CurriculumPage.tsx (Curriculum Upload)
app/admin/CommunicationPage.tsx (WhatsApp)
App.tsx (Updated Router)
📄 MIGRATION_GUIDE.md
Here is the full text content for your MIGRATION_GUIDE.md file. You can copy this into a new file named MIGRATION_GUIDE.md in your project root.
code
Markdown
# Frontend to Next.js + MongoDB Migration Guide

This guide outlines the steps to migrate the **React Admin Panel components** (currently in `app/admin/`) into a production-ready **Next.js 15** environment with **MongoDB** and **GridFS**.

---

## 1. Project Structure Setup

In your Next.js project, create the following folder structure:

```text
/app
  /admin
    /layout.tsx       <-- Rename AdminLayout.tsx to this
    /page.tsx         <-- Rename DashboardPage.tsx to this
    /students
      /page.tsx       <-- Rename StudentsPage.tsx to this
    /parents
      /page.tsx       <-- Rename ParentsPage.tsx to this
    /events
      /page.tsx       <-- Rename EventsPage.tsx to this
    /scheduler
      /page.tsx       <-- Rename SchedulerPage.tsx to this
    /reports
      /page.tsx       <-- Rename DocumentsPage.tsx to this
    /newsletters
      /page.tsx       <-- Rename NewslettersPage.tsx to this
    /curriculum
      /page.tsx       <-- Rename CurriculumPage.tsx to this
    /whatsapp
      /page.tsx       <-- Rename CommunicationPage.tsx to this
/components
  /ui
    AdminComponents.tsx
  Icons.tsx
/lib
  db.ts               <-- Mongoose connection
  models.ts           <-- Mongoose schemas
  google.ts           <-- Google API Clients
2. Dependencies
Install the required backend packages:
code
Bash
npm install mongoose googleapis multer multer-gridfs-storage gridfs-stream next-auth
3. Code Adjustments for Next.js
The provided components use standard React state for navigation. You must update them to use Next.js routing.
A. Update app/admin/layout.tsx (formerly AdminLayout.tsx)
Remove currentPage and onNavigate props.
Use Next.js <Link> component for sidebar navigation.
Before:
code
Tsx
<button onClick={() => onNavigate('students')}>Students</button>
After:
code
Tsx
import Link from 'next/link';

// ...
<Link href="/admin/students" className="...">
  {item.icon} Students
</Link>
B. Update Data Fetching (useEffect -> Server Actions / API)
Currently, pages use static arrays (e.g., const students = [...]). You need to replace this with real data fetching.
Example: app/admin/students/page.tsx
code
Tsx
// 1. Add this at top
'use client';
import { useState, useEffect } from 'react';

// 2. Add Fetch Logic
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('/api/admin/students');
    const data = await res.json();
    setStudents(data);
  };
  fetchData();
}, []);
4. Backend API Implementation (MongoDB)
You need to create API routes to handle the CRUD operations sent from the frontend.
A. Database Connection (lib/db.ts)
code
Ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}
B. Student API Route (app/api/admin/students/route.ts)
code
Ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Student } from '@/lib/models'; // Define your Mongoose Schema

export async function GET() {
  await connectDB();
  const students = await Student.find({});
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newStudent = await Student.create(body);
  return NextResponse.json(newStudent);
}
5. Google Drive & Calendar Integration
A. Google Client Setup (lib/google.ts)
code
Ts
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/calendar.readonly'
  ],
});

export const drive = google.drive({ version: 'v3', auth });
export const calendar = google.calendar({ version: 'v3', auth });
B. Sync API Route (app/api/admin/sync/reports/route.ts)
Connect this to the "Sync Reports" button in DocumentsPage.tsx.
code
Ts
import { NextResponse } from 'next/server';
import { drive } from '@/lib/google';
import { connectDB } from '@/lib/db';
import { Document } from '@/lib/models';

export async function POST() {
  await connectDB();
  
  // 1. List PDF files from specific Drive Folder
  const res = await drive.files.list({
    q: "'FOLDER_ID_HERE' in parents and mimeType='application/pdf'",
    fields: 'files(id, name, webViewLink)',
  });

  const files = res.data.files || [];
  let syncCount = 0;

  // 2. Process Files
  for (const file of files) {
    // Logic: Parse "ADM123_Report.pdf" -> Extract ADM123 -> Find Student -> Save to DB
    // ...
    syncCount++;
  }

  return NextResponse.json({ synced: syncCount });
}
6. GridFS (File Uploads)
For manual uploads (like Newsletters), use multer with multer-gridfs-storage in your API route.
Note: Next.js App Router API routes handle streams differently. For large file uploads, simpler solution is storing file in a local folder or cloud bucket (S3/Supabase Storage), but if sticking to MongoDB GridFS:
You will need a custom route handler using busboy or similar stream parser to pipe the upload directly to GridFS bucket.
7. Environment Variables (.env.local)
code
Env
MONGODB_URI=mongodb://localhost:27017/bodhana_db
GOOGLE_SERVICE_ACCOUNT_KEY={...json...}
NEXTAUTH_SECRET=your_secret_key
code
Code
I have output the guide directly above. You can now copy-paste this text into a file named `MIGRATION_GUIDE.md` on your local system.

# Updated files:

## MIGRATION_GUIDE.md

(Re-generated file content as requested)
