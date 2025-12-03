# User Requirements - Parents Corner Admin Panel

**Project**: Bodhana & Learning Tree Montessori School - Admin Panel
**Last Updated**: December 4, 2025
**Status**: Requirements Definition

---

## 🎯 Overview

Complete admin panel for managing Parents Corner system with full CRUD operations, integrations, and notification management.
migrated to mongo db from supabase.

## 📊 Real-World Usage Patterns

Understanding actual frequency helps prioritize features:

1. **Newsletter**: Monthly upload (12x/year) - Simple PDF/DOCX upload
2. **School Calendar**: Yearly sync from Google Calendar (1x/year + occasional updates)
3. **Reports & Fees**: Per term auto-import from Google Drive (3x/year) ⭐ **PRIORITY**
4. **Event Pictures**: Manual upload (3-4 images per week, ~200x/year)
5. **WhatsApp Notifications**: Manual trigger (admin verifies content first, then clicks "Send")

**Key Principle**: Everything uploaded in Admin Panel → Immediately visible in Parents Corner for respective users.

---

## 📋 Feature Requirements

### 1. Student & Parent Management

#### 1.1 Students CRUD
- **List View**
  - Table with all students
  - Columns: Photo, Admission No, Name, Class, Section, DOB, Status, Actions
  - Search by: Name, Admission Number, Phone
  - Filter by: Class, Section, Status (Active/Inactive)
  - Pagination (50 records per page)
  - Sort by any column

- **Create Student**
  - Form fields: Name, Admission Number, Class, Section, DOB, Blood Group, Photo Upload
  - Link to existing parent(s) via phone number
  - Validation: Unique admission number, valid phone format
  - Photo upload (max 2MB, jpg/png)

- **Edit Student**
  - Inline editing or modal form
  - Update all student fields
  - Change linked parents
  - Update photo

- **Delete Student**
  - Soft delete (mark as inactive) or hard delete option
  - Confirmation dialog with warning
  - Cannot delete if parent has only this student

- **API Endpoints**
  - `GET /api/admin/students` - List all students (with filters/search)
  - `POST /api/admin/students` - Create new student
  - `GET /api/admin/students/[id]` - Get single student
  - `PUT /api/admin/students/[id]` - Update student
  - `DELETE /api/admin/students/[id]` - Delete student

#### 1.2 Parents CRUD
- **List View**
  - Table with all parents
  - Columns: Name, Phone, Email, WhatsApp Opt-In Status, Linked Students, Actions
  - Search by: Name, Phone, Email
  - Filter by: Opt-In Status, Campus
  - View linked students inline

- **Create Parent**
  - Form fields: Name, Phone, Email, Alternate Phone, WhatsApp Opt-In
  - Link to existing student(s)
  - Validation: Unique phone, valid email format

- **Edit Parent**
  - Update all parent fields
  - Manage student links (add/remove)
  - Toggle WhatsApp opt-in status

- **Delete Parent**
  - Cannot delete if linked to students (must unlink first)
  - Confirmation dialog
  - Option to delete all linked students too (cascade)

- **API Endpoints**
  - `GET /api/admin/parents` - List all parents (with filters/search)
  - `POST /api/admin/parents` - Create new parent
  - `GET /api/admin/parents/[id]` - Get single parent
  - `PUT /api/admin/parents/[id]` - Update parent
  - `DELETE /api/admin/parents/[id]` - Delete parent

---

### 2. Academic Calendar & Events Management

#### 2.1 Events CRUD (Calendar Events)
- **List View**
  - Calendar view (month/week/day)
  - Table view with all events
  - Columns: Title, Date, Type, Campus, Description, Actions
  - Filter by: Date range, Event Type, Campus
  - Color coding by event type (Holiday, Exam, Meeting, Activity, etc.)

- **Create Event**
  - Form fields: Title, Date, End Date, Time, Type, Campus, Description
  - Event types: Holiday, Exam, PTM, Workshop, Activity, Celebration
  - Recurring events option (weekly/monthly)
  - Attach documents/images

- **Edit Event**
  - Update all event fields
  - Option to edit single occurrence or all recurring events
  - Add/remove attachments

- **Delete Event**
  - Confirmation dialog
  - Delete single or all recurring instances

- **API Endpoints**
  - `GET /api/admin/events` - List all events (with filters)
  - `POST /api/admin/events` - Create new event
  - `GET /api/admin/events/[id]` - Get single event
  - `PUT /api/admin/events/[id]` - Update event
  - `DELETE /api/admin/events/[id]` - Delete event

#### 2.4 Google Calendar Integration - One-Way Sync (Phase 2)

**Use Case**: School maintains academic calendar in Google Calendar. Sync once per year + occasional updates.

- **One-Way Sync** (Google Calendar → Admin Panel → Parents Corner):
  - Import events from school's Google Calendar
  - No push back to Google (school manages calendar in Google)
  - Auto-sync daily (checks for new/updated events)

- **Configuration**:
  - Connect Google Calendar via OAuth
  - Enter calendar ID to sync (e.g., `school@bodhana.edu`)
  - Map Google Calendar event types to internal event types:
    - Google: "Holiday" → Internal: "Holiday"
    - Google: "Exam" → Internal: "Exam"
    - Google: "PTM" → Internal: "Parent-Teacher Meeting"
  - Set campus filter (if calendar has campus-specific events)

- **Sync Features**:
  - Large "Sync from Google Calendar" button
  - Last sync timestamp display
  - Preview before import (shows new events to be added)
  - Conflict handling: Skip duplicates (match by date + title)
  - Sync log with success/error messages

- **Initial Setup** (Yearly):
  1. Admin clicks "Sync from Google Calendar"
  2. System imports all events for current academic year
  3. Events immediately visible in Parents Corner

- **Ongoing Sync** (Daily):
  - Auto-sync runs daily at midnight
  - Imports new events added in Google Calendar
  - Updates modified events
  - Does NOT delete events removed from Google Calendar (safety)

- **API Endpoints**:
  - `POST /api/admin/google-calendar/connect` - OAuth connection
  - `POST /api/admin/google-calendar/sync` - Manual sync (with preview)
  - `PUT /api/admin/google-calendar/settings` - Update calendar ID, mappings
  - `GET /api/admin/google-calendar/sync-log` - View sync history
  - `GET /api/admin/google-calendar/preview` - Preview events before import

#### 2.2 Event Pictures/Images Upload (Simple Upload)

**Use Case**: Admin uploads 3-4 event photos per week (~200/year).

- **Gallery View**
  - Grid view of all event images (sorted by upload date)
  - Filter by: Event, Date, Campus
  - Image preview modal

- **Upload Images** (Simple Bulk Upload)
  - Drag & drop multiple images or click to select
  - Form fields:
    - Select existing event (dropdown) or enter new event name
    - Date (auto-fills today)
    - Campus (dropdown)
    - Caption/Description (optional)
  - Upload up to 20 images at once
  - Max 5MB per image, jpg/png/webp
  - Auto-generate thumbnails
  - Progress bar for uploads

- **Edit Image**
  - Update caption/description
  - Change linked event
  - Change date

- **Delete Image**
  - Single or bulk delete (checkbox selection)
  - Confirmation dialog

- **Visibility in Parents Corner**:
  - Automatically appears in event gallery
  - Latest images show in carousel (if marked as "featured")

**Note**: Google Photos integration can be added later if needed, but manual upload is simple and sufficient for 3-4 images/week.

- **API Endpoints**
  - `GET /api/admin/event-images` - List all images (with filters)
  - `POST /api/admin/event-images/bulk-upload` - Bulk upload images
  - `GET /api/admin/event-images/[id]` - Get single image
  - `PUT /api/admin/event-images/[id]` - Update image metadata
  - `DELETE /api/admin/event-images/[id]` - Delete single image
  - `POST /api/admin/event-images/bulk-delete` - Delete multiple images

#### 2.3 Carousel Images (Homepage) CRUD
- **List View**
  - Display order (drag to reorder)
  - Preview thumbnails
  - Active/Inactive status
  - Campus filter

- **Add Carousel Image**
  - Upload image (max 5MB)
  - Set title, description, link URL
  - Set display order
  - Campus selection
  - Active/Inactive toggle

- **Edit Carousel Image**
  - Update all fields
  - Reorder position
  - Toggle visibility

- **Delete Carousel Image**
  - Confirmation dialog
  - Reorder remaining images automatically

- **API Endpoints**
  - `GET /api/admin/carousel` - List all carousel images
  - `POST /api/admin/carousel` - Add carousel image
  - `PUT /api/admin/carousel/[id]` - Update carousel image
  - `DELETE /api/admin/carousel/[id]` - Delete carousel image
  - `PUT /api/admin/carousel/reorder` - Reorder images

---

### 3. Meeting Scheduler Management

#### 3.1 Schedule Toggle (On/Off Switch)
- **Feature**: Enable/Disable parent-teacher meeting scheduling
- **Use Case**: Only enabled 3 times per year for PTM periods
- **UI**:
  - Large toggle switch on Admin Dashboard
  - Status indicator: "Scheduling ENABLED" (green) / "Scheduling DISABLED" (red)
  - Last enabled date and by whom
  - Schedule history log

- **When Enabled**:
  - Parents can schedule meetings via Parents Corner
  - Available time slots shown in calendar
  - Email/WhatsApp confirmation sent on booking

- **When Disabled**:
  - Parents see message: "Meeting scheduling currently unavailable"
  - Existing bookings remain visible but no new bookings allowed

- **Settings**:
  - Set available dates range (e.g., Dec 15-20, 2025)
  - Set available time slots (e.g., 9 AM - 12 PM, 2 PM - 5 PM)
  - Set slot duration (e.g., 15 mins per meeting)
  - Set max meetings per teacher per day
  - Set campus-specific availability

- **API Endpoints**
  - `GET /api/admin/meeting-scheduler/status` - Get current status
  - `PUT /api/admin/meeting-scheduler/toggle` - Enable/Disable scheduling
  - `PUT /api/admin/meeting-scheduler/settings` - Update scheduler settings
  - `GET /api/admin/meeting-scheduler/bookings` - View all bookings
  - `DELETE /api/admin/meeting-scheduler/bookings/[id]` - Cancel booking

#### 3.2 Meeting Bookings Management
- **List View**:
  - All scheduled meetings
  - Columns: Parent Name, Student, Teacher, Date, Time, Status, Actions
  - Filter by: Date, Teacher, Campus, Status (Confirmed/Cancelled)
  - Export to CSV

- **Actions**:
  - View booking details
  - Reschedule meeting
  - Cancel meeting (with notification)
  - Mark as completed

---

### 4. Documents Management

#### 4.1 Student Documents CRUD
- **List View**
  - All documents organized by type
  - Types: Term Reports, Fee Receipts, Certificates, Other
  - Filter by: Student, Term, Academic Year, Document Type
  - Search by student name/admission number

- **Upload Document**
  - Manual upload (PDF, DOCX, max 10MB)
  - Link to specific student
  - Set document type, term, academic year
  - Add title, description

- **Edit Document**
  - Update metadata (title, type, term)
  - Replace file
  - Change visibility (public/private)

- **Delete Document**
  - Confirmation dialog
  - Keep in trash for 30 days before permanent delete

- **API Endpoints**
  - `GET /api/admin/documents` - List all documents
  - `POST /api/admin/documents` - Upload document
  - `GET /api/admin/documents/[id]` - Get document metadata
  - `PUT /api/admin/documents/[id]` - Update document
  - `DELETE /api/admin/documents/[id]` - Delete document

#### 4.2 Google Drive Integration - Auto-Import Documents ⭐ **PRIORITY**

**Use Case**: School stores ALL documents in Google Drive. Auto-import term reports and fee receipts per term (3x/year).

**Drive Folder Structure Example**:
```
/Bodhana School Drive/
├── Term Reports/
│   ├── 2025-26/
│   │   ├── Term 1/
│   │   │   ├── ADM001_TermReport.pdf
│   │   │   ├── ADM002_TermReport.pdf
│   │   │   └── ...
│   │   ├── Term 2/
│   │   └── Term 3/
├── Fee Receipts/
│   ├── 2025-26/
│   │   ├── Term 1/
│   │   │   ├── ADM001_FeeReceipt.pdf
│   │   │   └── ...
│   │   ├── Term 2/
│   │   └── Term 3/
└── Other Documents/
```

- **Auto-Import Features**:
  - Connect to school's Google Drive (OAuth)
  - Monitor configured folders for new files
  - Auto-import when files added to Drive
  - **Filename pattern matching**: `ADM{admission_number}_{DocumentType}.pdf`
  - Auto-map to students using admission number in filename
  - Set document type (Term Report, Fee Receipt, Certificate)
  - Set term and academic year from folder path

- **Manual Sync**:
  - Button: "Sync from Google Drive Now"
  - Select specific folder or sync all configured folders
  - Preview files before import (shows which students will receive)
  - Manually map unmapped files (if filename pattern doesn't match)
  - Bulk approve import

- **Sync Settings**:
  - Configure Drive folder IDs for each document type
  - Set filename patterns for auto-mapping (regex support)
  - Set sync frequency: Manual / Daily / Every 6 hours
  - Email notifications on sync errors
  - Slack/WhatsApp notification when new documents imported

- **Sync Log Dashboard**:
  - Last sync timestamp
  - Files imported in last sync
  - Unmapped files (need manual attention)
  - Sync errors/warnings
  - History of all syncs

- **API Endpoints**
  - `POST /api/admin/google-drive/connect` - Authenticate with Drive (OAuth)
  - `GET /api/admin/google-drive/folders` - List available folders in Drive
  - `POST /api/admin/google-drive/sync` - Trigger manual sync
  - `PUT /api/admin/google-drive/settings` - Update sync settings
  - `GET /api/admin/google-drive/sync-log` - View sync history
  - `GET /api/admin/google-drive/unmapped` - Get unmapped files
  - `POST /api/admin/google-drive/map-file` - Manually map file to student

---

### 5. Curriculum Management

#### 5.1 Curriculum CRUD
- **List View**
  - All curriculum items by class/age group
  - Columns: Class, Subject/Area, Topic, Term, Description, Actions
  - Filter by: Class, Subject, Term

- **Create Curriculum Item**
  - Form fields: Class, Subject, Topic, Description, Term, Week Number
  - Attach documents/lesson plans
  - Add learning objectives

- **Edit Curriculum**
  - Update all fields
  - Reorder topics
  - Add/remove attachments

- **Delete Curriculum**
  - Confirmation dialog
  - Archive instead of hard delete

- **API Endpoints**
  - `GET /api/admin/curriculum` - List curriculum items
  - `POST /api/admin/curriculum` - Create curriculum item
  - `PUT /api/admin/curriculum/[id]` - Update curriculum item
  - `DELETE /api/admin/curriculum/[id]` - Delete curriculum item

---

### 6. Newsletter Management

#### 6.1 Monthly Newsletter Management (Simplified)

**Use Case**: School uploads newsletter PDF/DOCX once per month (12x/year).

- **List View**
  - All newsletters by month/year
  - Columns: Title, Month, Year, File, Uploaded Date, Published Status, Actions
  - Preview/Download file

- **Upload Newsletter**
  - Simple form:
    - Month & Year dropdown
    - Title (optional, auto-generates: "Newsletter - January 2026")
    - Upload file (PDF or DOCX, max 10MB)
    - Status: Draft (default) or Published
  - Validation: Only one newsletter per month
  - Can replace file before publishing

- **Edit Newsletter**
  - Update title, month, year
  - Replace file (if needed - before notifying parents!)
  - Change status: Draft → Published

- **Delete Newsletter**
  - Soft delete (unpublish, move to archive)
  - Hard delete option (permanent)

- **Publish & Notify** (Two-Step Process):
  1. **Step 1**: Upload newsletter → Status: Draft
  2. **Step 2**: Admin reviews → Click "Publish & Notify Parents"
     - Changes status to Published
     - Makes visible in Parents Corner
     - Opens WhatsApp notification form (pre-filled with newsletter template)
     - Admin clicks "Send Notification" to notify all opted-in parents

- **API Endpoints**
  - `GET /api/admin/newsletters` - List newsletters
  - `POST /api/admin/newsletters` - Upload newsletter
  - `GET /api/admin/newsletters/[id]` - Get newsletter details
  - `PUT /api/admin/newsletters/[id]` - Update newsletter
  - `PUT /api/admin/newsletters/[id]/publish` - Publish (make visible in Parents Corner)
  - `DELETE /api/admin/newsletters/[id]` - Delete newsletter

---

### 7. WhatsApp Notifications Management

#### 7.1 Notification Templates CRUD
- **List View**
  - All MSG91 templates
  - Columns: Template Name, Template ID, Variables, Status, Last Used, Actions
  - Filter by: Status (Active/Inactive), Category

- **Create Template**
  - Template name (internal reference)
  - MSG91 template ID
  - Template content preview
  - Variable placeholders (e.g., `{{name}}`, `{{date}}`)
  - Category (Event, Newsletter, Reminder, General)

- **Edit Template**
  - Update template mapping
  - Test template with sample data
  - View usage history

- **Delete Template**
  - Cannot delete if used in scheduled notifications
  - Confirmation dialog

- **API Endpoints**
  - `GET /api/admin/whatsapp-templates` - List all templates
  - `POST /api/admin/whatsapp-templates` - Create template
  - `GET /api/admin/whatsapp-templates/[id]` - Get template
  - `PUT /api/admin/whatsapp-templates/[id]` - Update template
  - `DELETE /api/admin/whatsapp-templates/[id]` - Delete template
  - `POST /api/admin/whatsapp-templates/[id]/test` - Send test message

#### 7.2 Send Notifications - Manual Triggering (Option B)

**Key Principle**: Admin uploads content first, reviews it, THEN manually sends notification.

**Common Notification Scenarios**:
1. Newsletter uploaded → Admin reviews → Click "Notify Parents"
2. Reports available in Drive → Admin syncs → Click "Notify Parents"
3. New event added → Admin clicks "Notify Parents about Event"
4. Meeting scheduler opened → Admin clicks "Notify Parents about PTM"

- **Send Notification Form**:
  - **Context-Aware Launch**:
    - From Newsletter page: Pre-fills newsletter template + link
    - From Events page: Pre-fills event template + event details
    - From Documents page: Pre-fills document template
    - From standalone page: Select any template

  - **Form Fields**:
    - Select template from dropdown (or pre-filled)
    - Select recipients:
      - ✅ All parents with WhatsApp opt-in (default)
      - ✅ Filter by class/section
      - ✅ Filter by campus
      - ✅ Select individual parents (multi-select)
      - ✅ Upload phone number CSV
    - Fill template variables (dynamic form based on template)
      - Example: `{{name}}`, `{{event_date}}`, `{{document_type}}`
    - Preview message before sending
    - Send timing:
      - ✅ Send immediately
      - ✅ Schedule for specific date/time

- **Preview & Test**:
  - Live preview shows message with filled variables
  - "Send Test" button → Send to admin's number first
  - Shows recipient count (e.g., "Will send to 247 parents")

- **Send Confirmation Dialog**:
  - "You are about to send to 247 parents. Continue?"
  - Show recipient count
  - Estimated delivery time
  - Cannot undo once sent
  - Checkbox: "I have reviewed the message"

- **After Sending**:
  - Success message: "Notification sent to 247 parents"
  - Auto-redirect to notification history
  - Can view delivery status in real-time

- **API Endpoints**
  - `POST /api/admin/whatsapp/send` - Send notification immediately
  - `POST /api/admin/whatsapp/schedule` - Schedule notification for later
  - `GET /api/admin/whatsapp/scheduled` - List scheduled notifications
  - `PUT /api/admin/whatsapp/scheduled/[id]` - Edit scheduled notification
  - `DELETE /api/admin/whatsapp/scheduled/[id]` - Cancel scheduled notification
  - `POST /api/admin/whatsapp/test` - Send test message to admin

#### 7.3 Notification History
- **List View**:
  - All sent notifications
  - Columns: Date, Template, Recipients Count, Delivery Status, Sent By, Actions
  - Filter by: Date range, Template, Status, Campus
  - Search by parent name/phone

- **Notification Details**:
  - View message content
  - View recipient list with individual delivery status
  - Delivery stats: Sent, Delivered, Read, Failed
  - Resend to failed recipients

- **Export**:
  - Export history to CSV
  - Export delivery report for specific notification

- **API Endpoints**
  - `GET /api/admin/whatsapp/history` - List notification history
  - `GET /api/admin/whatsapp/history/[id]` - Get notification details
  - `GET /api/admin/whatsapp/history/[id]/report` - Get delivery report
  - `POST /api/admin/whatsapp/history/[id]/resend` - Resend to failed

---

## 🔐 Security & Permissions

### Admin Authentication
- Secure login for admin users
- Role-based access control:
  - **Super Admin**: Full access to all features
  - **School Admin**: Manage students, parents, events, documents
  - **Teacher**: View-only access to assigned students
  - **Office Staff**: Manage documents, send notifications

### API Security
- JWT-based authentication
- Rate limiting on all endpoints
- Input validation and sanitization
- File upload virus scanning
- CORS restrictions

---

## 📊 Dashboard Overview

### Admin Dashboard Widgets
1. **Quick Stats**:
   - Total Students
   - Total Parents
   - WhatsApp Opt-In Rate
   - Upcoming Events (next 7 days)
   - Pending Document Uploads

2. **Recent Activity**:
   - Last 10 notifications sent
   - Recent parent logins
   - Recent document uploads
   - Recent Google Drive syncs

3. **Quick Actions**:
   - Send WhatsApp Notification (button)
   - Upload Student Documents (button)
   - Add New Event (button)
   - Toggle Meeting Scheduler (switch)
   - Sync from Google Drive (button)

4. **Meeting Scheduler Status**:
   - Large toggle switch
   - Current status (Enabled/Disabled)
   - Next scheduled PTM period
   - Total bookings today

---

## 🎨 UI/UX Requirements

### Design System
- Consistent with current Bodhana website theme
- Tailwind CSS + shadcn/ui components
- Responsive design (desktop-first, tablet/mobile friendly)
- Dark mode support (optional)

### Tables
- DataTables with:
  - Search
  - Sort
  - Filter
  - Pagination
  - Bulk actions (select multiple rows)
  - Export to CSV/Excel

### Forms
- Form validation (client + server)
- Error messages inline
- Success notifications (toast/alert)
- Autosave drafts (for newsletters)
- File upload with progress bar

### Modals
- Confirmation dialogs for destructive actions
- Form modals for quick add/edit
- Preview modals for documents/images

---

## 🔧 Technical Implementation

### Technology Stack
- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB 4.4.29 (already set up)
- **File Storage**: GridFS (already implemented)
- **Authentication**: NextAuth.js (to be implemented)
- **Google Drive API**: googleapis package
- **WhatsApp API**: MSG91 (already integrated)

### File Structure
```
app/
├── admin/                          # Admin panel pages (NEW)
│   ├── layout.tsx                  # Admin layout with sidebar
│   ├── page.tsx                    # Dashboard
│   ├── students/
│   │   ├── page.tsx                # Student list
│   │   ├── [id]/page.tsx           # Edit student
│   │   └── new/page.tsx            # Add student
│   ├── parents/                    # Parent management
│   ├── events/                     # Events management
│   ├── documents/                  # Documents management
│   ├── curriculum/                 # Curriculum management
│   ├── newsletters/                # Newsletter management
│   ├── whatsapp/                   # WhatsApp management
│   ├── meeting-scheduler/          # Meeting scheduler
│   └── settings/                   # Admin settings
│
├── api/admin/                      # Admin API endpoints (NEW)
│   ├── students/
│   │   ├── route.ts                # GET (list), POST (create)
│   │   └── [id]/route.ts           # GET, PUT, DELETE
│   ├── parents/                    # Parent CRUD endpoints
│   ├── events/                     # Event CRUD endpoints
│   ├── event-images/               # Event images CRUD
│   ├── carousel/                   # Carousel CRUD
│   ├── documents/                  # Documents CRUD
│   ├── curriculum/                 # Curriculum CRUD
│   ├── newsletters/                # Newsletter CRUD
│   ├── whatsapp-templates/         # WhatsApp template CRUD
│   ├── whatsapp/
│   │   ├── send/route.ts           # Send notification
│   │   ├── schedule/route.ts       # Schedule notification
│   │   └── history/route.ts        # View history
│   ├── meeting-scheduler/
│   │   ├── status/route.ts         # Get status
│   │   ├── toggle/route.ts         # Enable/disable
│   │   └── settings/route.ts       # Update settings
│   └── google-drive/               # Google Drive integration
│       ├── connect/route.ts
│       ├── sync/route.ts
│       └── settings/route.ts
│
lib/mongodb/
├── models.ts                       # Add new models (Newsletter, WhatsAppTemplate, MeetingScheduler)
└── gridfs.ts                       # Already implemented
```

---

## 📅 Implementation Priority

### Phase 1: Core CRUD (1 hour - Part 1)
1. Students CRUD (list, create, edit, delete)
2. Parents CRUD (list, create, edit, delete)
3. Events CRUD (list, create, edit, delete)
4. Admin layout and navigation

### Phase 2: Documents, Media & Advanced Features (1 hour - Part 2)
5. Documents CRUD
6. Event Images CRUD
7. Carousel Images CRUD
8. Meeting Scheduler (toggle + bookings)
9. Newsletter Management
10. Google Calendar Integration (sync academic/school calendar)
11. File upload enhancements

### Phase 3: Curriculum Management
12. Curriculum CRUD

### Phase 4: Integrations
13. Google Drive Integration
14. WhatsApp Template Management
15. WhatsApp Notification Triggering
16. Notification History

### Phase 5: Polish & Testing
17. Dashboard widgets
18. Bulk operations
19. Export features
20. Testing & bug fixes
21. Documentation

---

## ✅ Success Criteria

### Functionality
- ✅ All CRUD operations work without errors
- ✅ Google Drive sync imports files correctly
- ✅ WhatsApp notifications deliver successfully
- ✅ Meeting scheduler toggle works as expected
- ✅ Forms validate properly
- ✅ File uploads handle large files

### Performance
- ✅ Page load time < 2 seconds
- ✅ API response time < 500ms
- ✅ File upload progress shown
- ✅ Pagination for large datasets

### Usability
- ✅ Intuitive navigation
- ✅ Clear error messages
- ✅ Confirmation for destructive actions
- ✅ Mobile-responsive design

### Security
- ✅ Authentication required
- ✅ Role-based permissions enforced
- ✅ File uploads validated
- ✅ SQL injection prevented (using Mongoose)
- ✅ XSS protection

---

## 📝 Notes

- **CSV Upload**: Already implemented for bulk import of students and events
- **MongoDB**: Already set up with 12 collections
- **WhatsApp API**: MSG91 integration already working
- **File Storage**: GridFS already implemented for PDFs and images
- **Authentication**: Needs to be implemented using NextAuth.js

---

## 🚀 Ready to Start!

This document defines all CRUD features needed for the Parents Corner Admin Panel.

**Next Step**: Implement Phase 1 - Core CRUD operations for Students, Parents, and Events.

---

**Questions or clarifications needed? Let's discuss before starting implementation!**
