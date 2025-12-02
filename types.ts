
export interface Student {
  id: string;
  name: string;
  photoUrl: string;
  dob: string;
  doj: string;
  admissionNo: string;
  classGrade: string;
  age: number;
  fatherName: string;
  fatherPhone: string;
  fatherEmail: string;
  motherName: string;
  motherPhone: string;
  motherEmail: string;
  guardianName: string;
  guardianPhone?: string;
  guardianEmail?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  date: string;
  type: 'report' | 'curriculum' | 'fee' | 'newsletter';
  url: string;
  term?: 'Term I' | 'Term II' | 'Term III';
  month?: string; // For newsletters
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  type: 'academic' | 'school';
  description?: string;
}

export interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

export interface CurriculumUnit {
  title: string;
  topics: string[];
}

export interface CurriculumSubject {
  id: string;
  name: string;
  description: string;
  units: CurriculumUnit[];
}

export interface MeetingSlot {
  id: string;
  time: string; // "10:00 AM"
  isBooked: boolean;
  bookedByCurrentUser?: boolean;
}

export interface DailySchedule {
  date: string; // YYYY-MM-DD
  slots: MeetingSlot[];
}

export type TabType = 'reports' | 'curriculum' | 'academic_calendar' | 'school_calendar' | 'fees' | 'newsletter';
