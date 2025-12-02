# Supabase & Google Calendar Setup Guide

This document outlines the database schema, storage configuration, and integration architecture required to move the **Bodhana & Learning Tree Montessori** dashboard from Mock Data to a Production Environment.

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
Stores Academic and School events.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `title` | `text` | Event Name |
| `date` | `date` | Event Date |
| `type` | `text` | `academic` or `school` |
| `description` | `text` | Optional details |

#### `curriculum`
Stores subject details. Using JSONB for flexible unit structures.

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
-- In a real app, you would restrict 'students' table based on authenticated user ID.
-- For this demo/public facing portal structure:

-- Allow public read access to general school data
create policy "Public events" on public.events for select using (true);
create policy "Public carousel" on public.carousel_images for select using (true);
create policy "Public curriculum" on public.curriculum for select using (true);

-- Allow read access to documents if they are public newsletters OR belong to the user
-- (Note: Requires Auth setup to filter by user_id effectively)
create policy "Public newsletters" on public.documents for select using (type = 'newsletter');

-- For now, allowing select on students for the login lookup mechanism
create policy "Allow lookup" on public.students for select using (true);
```

---

## 3. Storage Buckets

Go to **Storage** in the Supabase Dashboard and create a new bucket named `school-assets`.

**Folder Structure:**
*   `/students` - Student profile photos
*   `/documents` - PDFs for reports and fees
*   `/newsletters` - Newsletter PDFs
*   `/events` - Event images

Ensure the bucket is **Public** so the URLs generated can be accessed by the application.

---

## 4. Google Calendar Integration Architecture

The current application uses a **simulation** (`services/googleCalendarService.ts`) to mimic Google Calendar's behavior. To make this real, you cannot store your Google Cloud Secrets in the frontend `index.tsx` or `mockData.ts` files, as they would be visible to anyone.

### Recommended Architecture: Supabase Edge Functions

1.  **Google Cloud Console**:
    *   Create a Project.
    *   Enable **Google Calendar API**.
    *   Create a **Service Account**.
    *   Download the JSON Key file.
    *   Share your specific Google Calendar (e.g., `principal@school.com`) with the Service Account email address.

2.  **Supabase Edge Function (`/functions/calendar-api`)**:
    *   Create a Deno/Node.js function in Supabase.
    *   Store the Service Account JSON credentials in Supabase **Vault/Secrets**.
    *   Implement 3 endpoints in this function:

    **Endpoint A: GET /slots**
    *   Accepts: `date`
    *   Logic: Uses Service Account to query Google Calendar API (`events.list`) for "Busy" times on that date.
    *   Returns: A list of available 15-min slots (filtering out the busy ones).

    **Endpoint B: POST /book**
    *   Accepts: `date`, `time`, `studentName`, `parentEmail`
    *   Logic: Uses Service Account to `events.insert` into your Google Calendar.
    *   Adds metadata to the event description (e.g., "Meeting with Layaa Ramesh's Parent").

    **Endpoint C: POST /cancel**
    *   Accepts: `eventId`
    *   Logic: Calls `events.delete`.

3.  **Frontend Update**:
    *   Update `services/googleCalendarService.ts` to fetch from your Supabase Edge Function URL instead of generating random mock data.

    ```typescript
    // Example Frontend Code Update
    const fetchSlotsForDate = async (date) => {
      const response = await supabase.functions.invoke('calendar-api', {
        body: { action: 'get-slots', date }
      });
      return response.data;
    }
    ```

This ensures your Google Calendar credentials remain secure on the server while providing a seamless booking experience for parents.

---

## 5. How to Import Calendars from Drive (CSV)

To populate the **School Calendar** and **Academic Calendar** tabs in the app, you need to import the data into the Supabase `events` table. You cannot upload a PDF directly to the interactive grid.

1.  **Prepare a CSV File** (e.g., using Excel or Google Sheets) with the following headers:
    
    ```csv
    title,date,type,description
    School Reopens,2024-06-12,school,Start of new academic year
    Unit Test 1,2024-07-15,academic,Covers first 3 chapters
    Independence Day,2024-08-15,school,Flag hoisting at 8 AM
    Term 1 Exam,2024-09-20,academic,
    ```

    *   `date` format must be `YYYY-MM-DD`.
    *   `type` must be exactly `school` or `academic`.

2.  **Go to Supabase Dashboard**:
    *   Navigate to **Table Editor**.
    *   Select the `events` table.
    *   Click **Import Data**.
    *   Upload your CSV file.

3.  **Result**:
    *   The app will automatically read these rows and populate the Monthly Grid View with the correct dots and event lists.
