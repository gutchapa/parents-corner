import { Student, DocumentItem, CalendarEvent, CarouselImage } from '../types';

export const mockStudent: Student = {
  id: 'ST-2023-001',
  name: 'Aarav Sharma',
  photoUrl: 'https://picsum.photos/id/64/200/200',
  dob: '2016-05-15',
  doj: '2020-06-01',
  admissionNo: 'BLT-2458',
  classGrade: 'Grade 3 - A',
  age: 8,
  fatherName: 'Rajesh Sharma',
  motherName: 'Priya Sharma',
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
  
  // Curriculum
  { id: 'c1', title: 'Grade 3 Math Syllabus', date: '2023-06-01', type: 'curriculum', url: '#' },
  { id: 'c2', title: 'Science Topics Breakdown', date: '2023-06-01', type: 'curriculum', url: '#' },

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
