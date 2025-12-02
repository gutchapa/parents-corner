
import { Student, DocumentItem, CalendarEvent, CarouselImage, CurriculumSubject, DailySchedule, MeetingSlot } from '../types';

export const mockStudent: Student = {
  id: 'ST-2023-001',
  name: 'Layaa Ramesh',
  photoUrl: '',
  dob: '2016-05-15',
  doj: '2020-06-01',
  admissionNo: 'BLT-2458',
  classGrade: 'Grade 3 - A',
  age: 8,
  fatherName: 'Ramesh Bhaskaramurthy',
  fatherPhone: '+91 98765 43210',
  fatherEmail: 'ramesh.b@example.com',
  motherName: 'Uma Sankaran',
  motherPhone: '+91 98765 43211',
  motherEmail: 'uma.s@example.com',
  guardianName: 'N/A'
};

export const mockCarouselImages: CarouselImage[] = [
  { id: '1', url: 'https://picsum.photos/id/10/800/300', alt: 'Sports Day' },
  { id: '2', url: 'https://picsum.photos/id/20/800/300', alt: 'Science Fair' },
  { id: '3', url: 'https://picsum.photos/id/26/800/300', alt: 'Art Exhibition' },
  { id: '4', url: 'https://picsum.photos/id/28/800/300', alt: 'Field Trip' },
];

export const mockDocuments: DocumentItem[] = [
  // Reports
  { id: 'r1', title: 'Progress Report', date: '2023-09-30', type: 'report', url: '#', term: 'Term I' },
  { id: 'r2', title: 'Assessment Sheet', date: '2023-12-20', type: 'report', url: '#', term: 'Term II' },
  
  // Fees
  { id: 'f1', title: 'Tuition Fee Receipt', date: '2023-06-05', type: 'fee', url: '#', term: 'Term I' },
  { id: 'f2', title: 'Bus Fee Receipt', date: '2023-06-05', type: 'fee', url: '#', term: 'Term I' },
  { id: 'f3', title: 'Tuition Fee Receipt', date: '2023-10-05', type: 'fee', url: '#', term: 'Term II' },

  // Newsletters
  { id: 'n1', title: 'June Highlights', date: '2023-06-30', type: 'newsletter', url: '#', month: 'June' },
  { id: 'n2', title: 'July Rainy Days', date: '2023-07-31', type: 'newsletter', url: '#', month: 'July' },
  { id: 'n3', title: 'August Independence', date: '2023-08-31', type: 'newsletter', url: '#', month: 'August' },
];

export const mockEvents: CalendarEvent[] = [
  { id: 'e1', title: 'School Reopens', date: '2023-06-12', type: 'school' },
  { id: 'e2', title: 'Unit Test 1 Starts', date: '2023-07-15', type: 'academic' },
  { id: 'e3', title: 'Independence Day', date: '2023-08-15', type: 'school' },
  { id: 'e4', title: 'Term 1 Exam', date: '2023-09-20', type: 'academic' },
  { id: 'e5', title: 'Diwali Break', date: '2023-11-10', type: 'school' },
  { id: 'e6', title: 'Sports Day', date: '2023-12-05', type: 'school' },
  { id: 'e7', title: 'Science Fair', date: '2024-02-28', type: 'academic' },
  { id: 'e8', title: 'Annual Day', date: '2024-03-15', type: 'school' },
];

export const mockCurriculumSubjects: CurriculumSubject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Grade 3 Mathematics focuses on strengthening foundational concepts in arithmetic, introducing basic geometry, and developing logical reasoning skills through practical problem-solving.',
    units: [
      {
        title: 'Unit 1: Number Systems',
        topics: ['4-digit numbers', 'Place Value & Face Value', 'Rounding off', 'Roman Numerals']
      },
      {
        title: 'Unit 2: Basic Operations',
        topics: ['Addition & Subtraction of 4-digit numbers', 'Multiplication Tables (1-15)', 'Simple Division', 'Word Problems']
      },
      {
        title: 'Unit 3: Geometry',
        topics: ['Point, Line, and Ray', '2D Shapes and properties', 'Introduction to 3D Shapes', 'Measuring Length']
      }
    ]
  },
  {
    id: 'science',
    name: 'Environmental Science',
    description: 'The EVS curriculum is designed to help students understand their surroundings, the importance of nature, basic biological processes, and community living.',
    units: [
      {
        title: 'Unit 1: Our Environment',
        topics: ['Living and Non-living things', 'Plants around us', 'Animals and their homes', 'Saving Water']
      },
      {
        title: 'Unit 2: The Human Body',
        topics: ['Sense Organs', 'Internal Organs', 'Health and Hygiene', 'Food and Nutrition']
      },
      {
        title: 'Unit 3: Matter and Materials',
        topics: ['Solids, Liquids, and Gases', 'Types of houses', 'Clothing materials']
      }
    ]
  },
  {
    id: 'english',
    name: 'English Language',
    description: 'English curriculum aims to enhance communication skills through reading comprehension, grammar usage, creative writing, and vocabulary building.',
    units: [
      {
        title: 'Unit 1: Grammar',
        topics: ['Nouns (Common, Proper, Collective)', 'Verbs and Tenses', 'Adjectives', 'Punctuation']
      },
      {
        title: 'Unit 2: Literature',
        topics: ['Story: The Magic Garden', 'Poem: Bird Talk', 'Story: Nina and the Baby Sparrows']
      },
      {
        title: 'Unit 3: Composition',
        topics: ['Paragraph Writing', 'Picture Composition', 'Informal Letters']
      }
    ]
  }
];

// --- MEETING SCHEDULER SIMULATION ---

// Time slots for a standard day - 15 minute intervals
const STANDARD_SLOTS = [
  '09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', 
  '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
  '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
  '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM',
  '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM'
];

/**
 * Simulates fetching slots from a Google Calendar backend.
 * Generates random availability for the given date.
 */
export const fetchSlotsForDate = async (dateStr: string): Promise<MeetingSlot[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const date = new Date(dateStr);
      const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat

      // Weekend logic: No slots on Sunday (0) or Saturday (6)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        resolve([]);
        return;
      }

      // Generate slots
      // To simulate "Real" calendar, we deterministically seed randomness based on date string
      // So checking the same date twice returns same slots.
      const seed = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const slots: MeetingSlot[] = STANDARD_SLOTS.map((time, index) => {
        const uniqueId = `${dateStr}-${time.replace(/[:\s]/g, '')}`;
        // Randomly mark some as booked based on seed
        const isBooked = ((seed + index) % 5 === 0); // Less blocked slots for more options
        
        return {
          id: uniqueId,
          time,
          isBooked: isBooked, // True = Busy in Google Calendar
          bookedByCurrentUser: false
        };
      });

      resolve(slots);
    }, 600); // Simulate network delay
  });
};
