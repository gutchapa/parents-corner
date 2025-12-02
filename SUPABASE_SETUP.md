# Supabase & Application Setup Guide

This document outlines the database schema, storage configuration, and administrative workflows for the **Bodhana & Learning Tree Montessori** dashboard.

---

## 1. Supabase Database Schema

You will need to create the following tables in your Supabase project.

### Tables

#### `students`
Stores profile information for students and parents.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` |
| `admission_no` | `text` | Unique Admission Number (e.g., BLT-2458) |
| `name` | `text` | Student Name |
| `photo_url` | `text` | Public URL of student photo |
| `dob` | `date` | Date of Birth |
| `doj` | `date` | Date of Joining |
| `class_grade` | `text` | e.g., "Grade 3 - A" |
| `age` | `int4` | Calculated age |
| `father_name` | `text` | |
| `father_phone` | `text` | Login ID / Contact |
| `father_email` | `text` | |
| `mother_name` | `text` | |
| `mother_phone` | `text` | Login ID / Contact |
| `mother_email` | `text` | |
| `guardian_name` | `text` | Optional |
| `guardian_phone` | `text` | Optional |
| `guardian_email` | `text` | Optional |

#### `documents`
Stores metadata for PDFs (Reports, Fees, Newsletters).

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `student_id` | `uuid` | Foreign Key -> `students.id`. Nullable for public docs like Newsletters. |
| `title` | `text` | Display title |
| `date` | `date` | Document date |
| `type` | `text` | `report`, `fee`, `newsletter`, `curriculum` |
| `url` | `text` | Public URL to the PDF in Storage |
| `term` | `text` | `Term I`, `Term II`, `Term III` (for reports/fees) |
| `month` | `text` | e.g., "June", "July" (for newsletters) |

#### `events`
Stores Academic and School events for the Calendar Tabs.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `title` | `text` | Event Name |
| `date` | `date` | Event Date |
| `type` | `text` | `academic` or `school` |
| `description` | `text` | Optional details |

#### `curriculum`
Stores subject details.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `text` | e.g., "math", "science" |
| `class_grade` | `text` | e.g., "Grade 3 - A" |
| `name` | `text` | Subject Name |
| `description` | `text` | Subject Overview |
| `units` | `jsonb` | Array of `{ title: string, topics: string[] }` |

#### `carousel_images`
Images for the scrolling hero section.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `url` | `text` | Image URL |
| `alt` | `text` | Alt text / Caption |

---

## 2. SQL Setup Script

Run this in your Supabase **SQL Editor** to create the tables and secure them.

```sql
-- 1. Create Students Table
create table public.students (
  id uuid default gen_random_uuid() primary key,
  admission_no text unique not null,
  name text not null,
  photo_url text,
  dob date,
  doj date,
  class_grade text,
  age int,
  father_name text,
  father_phone text,
  father_email text,
  mother_name text,
  mother_phone text,
  mother_email text,
  guardian_name text,
  guardian_phone text,
  guardian_email text
);

-- 2. Create Documents Table
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id), -- If null, it's public (like newsletter)
  title text not null,
  date date not null,
  type text not null check (type in ('report', 'fee', 'newsletter', 'curriculum')),
  url text not null,
  term text,
  month text
);

-- 3. Create Events Table
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date date not null,
  type text not null check (type in ('academic', 'school')),
  description text
);

-- 4. Create Curriculum Table
create table public.curriculum (
  id text primary key, -- e.g. 'math-grade3'
  class_grade text not null,
  name text not null,
  description text,
  units jsonb -- Stores the nested unit/topic structure
);

-- 5. Create Carousel Images Table
create table public.carousel_images (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  alt text
);

-- 6. Enable Row Level Security (RLS)
alter table public.students enable row level security;
alter table public.documents enable row level security;
alter table public.events enable row level security;
alter table public.curriculum enable row level security;
alter table public.carousel_images enable row level security;

-- 7. Policies (Simplified for 'Parents Corner' read-only access)
create policy "Public events" on public.events for select using (true);
create policy "Public carousel" on public.carousel_images for select using (true);
create policy "Public curriculum" on public.curriculum for select using (true);
create policy "Public newsletters" on public.documents for select using (type = 'newsletter');
create policy "Allow lookup" on public.students for select using (true);

-- 8. Allow Admin Insert (Warning: In production, enforce this via Auth Role)
create policy "Allow insert events" on public.events for insert with check (true);
create policy "Allow insert students" on public.students for insert with check (true);
```

---

## 3. Storage Buckets

Go to **Storage** in the Supabase Dashboard and create a new bucket named `school-assets`.

**Folder Structure:**
*   `/students` - Student profile photos
*   `/documents` - PDFs for reports and fees
*   `/newsletters` - Newsletter PDFs
*   `/events` - Event images

Ensure the bucket is **Public**.

---

## 4. Admin Workflow: Importing Calendars

The app features an **Admin Panel** to easily upload data without needing to access the database directly.

### Step 1: Prepare your Google Sheet (The "Master" Calendar)
We recommend maintaining a Google Sheet for your school calendar. This serves as your source of truth.

1.  Create a Google Sheet with exactly these 4 columns:
    *   `title` (Name of the event)
    *   `date` (Format: YYYY-MM-DD, e.g., 2024-06-15)
    *   `type` (Values must be: `academic` or `school`)
    *   `description` (Optional details)

    **Example Rows:**
    ```csv
    title,date,type,description
    School Reopens,2024-06-12,school,New Academic Year
    Unit Test 1,2024-07-15,academic,Math and Science
    Independence Day,2024-08-15,school,Flag Hoisting
    Term 1 Exam,2024-09-20,academic,All subjects
    ```

### Step 2: Download as CSV
In Google Sheets, go to **File > Download > Comma Separated Values (.csv)**.

### Step 3: Upload via Admin Panel
1.  Open the App.
2.  On the Login Screen, click **"Login as Admin"** at the bottom.
3.  Enter Username: `admin` and any password.
4.  In the Dashboard, locate the **"Upload Calendar Events"** box.
5.  Select your CSV file.
6.  The app will process the file and upload the events to Supabase instantly.
7.  Parents will immediately see the updated calendar in their dashboard.

---

## 5. Google Calendar Integration (Meeting Scheduler)

**Note:** The "Meeting Scheduler" feature (where parents book slots) is distinct from the "School Calendar" (Events list).

*   **School Calendar**: Uses the CSV import method described above.
*   **Meeting Scheduler**: Connects to the Principal/Teacher's Google Calendar to find free time slots.

### Production Setup for Scheduler

1.  **Google Cloud Console**:
    *   Enable **Google Calendar API**.
    *   Create a **Service Account** and download the JSON key.
    *   Share your personal Google Calendar with the Service Account email address.

2.  **Supabase Edge Function**:
    *   Since the frontend cannot securely store the Google API Key, you must deploy a Supabase Edge Function (server-side code).
    *   This function will accept a request (e.g., "Get Slots for 2024-06-15"), query Google, and return the busy/free times.

3.  **Frontend Config**:
    *   In `services/googleCalendarService.ts`, replace the `fetchSlotsForDate` mock function with a `fetch` call to your new Edge Function.
