import { supabase } from './supabase';
import { mockStudent, mockDocuments, mockEvents, mockCarouselImages, mockCurriculumSubjects } from './mockData';
import { Student, DocumentItem, CalendarEvent, CarouselImage, CurriculumSubject } from '../types';

/**
 * FETCH STUDENT PROFILE
 * Fetches student data by Login ID (or Admission No).
 * Fallback: mockStudent
 */
export const fetchStudentProfile = async (loginId: string): Promise<Student> => {
  try {
    // Attempt to fetch from Supabase 'students' table
    // Assumes table has columns matching the Student interface
    const { data, error } = await supabase
      .from('students')
      .select('*')
      // You might use admissionNo or a specific user_id linked to auth
      .or(`admissionNo.eq.${loginId},fatherPhone.eq.${loginId}`) 
      .single();

    if (error || !data) throw error;
    
    return data as Student;
  } catch (err) {
    console.warn('Supabase fetch failed (Student), utilizing Mock Data.', err);
    // In a real app, check if err is "connection error" vs "user not found"
    return mockStudent;
  }
};

/**
 * FETCH DOCUMENTS (Reports, Fees, Newsletters)
 * Fallback: mockDocuments
 */
export const fetchDocuments = async (studentId: string): Promise<DocumentItem[]> => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      // Fetch public docs (like newsletters) OR private docs for this student
      .or(`student_id.eq.${studentId},type.eq.newsletter`)
      .order('date', { ascending: false });

    if (error || !data) throw error;

    return data as DocumentItem[];
  } catch (err) {
    console.warn('Supabase fetch failed (Documents), utilizing Mock Data.', err);
    return mockDocuments;
  }
};

/**
 * FETCH EVENTS (Academic & School)
 * Fallback: mockEvents
 */
export const fetchEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error || !data) throw error;

    return data as CalendarEvent[];
  } catch (err) {
    console.warn('Supabase fetch failed (Events), utilizing Mock Data.', err);
    return mockEvents;
  }
};

/**
 * FETCH CURRICULUM
 * Fallback: mockCurriculumSubjects
 */
export const fetchCurriculum = async (classGrade: string): Promise<CurriculumSubject[]> => {
  try {
    // Assumes a 'curriculum' table where data is stored, possibly as JSONB for units
    const { data, error } = await supabase
      .from('curriculum')
      .select('*')
      .eq('class_grade', classGrade);

    if (error || !data) throw error;

    return data as CurriculumSubject[];
  } catch (err) {
    console.warn('Supabase fetch failed (Curriculum), utilizing Mock Data.', err);
    return mockCurriculumSubjects;
  }
};

/**
 * FETCH HERO IMAGES
 * Fallback: mockCarouselImages
 */
export const fetchCarouselImages = async (): Promise<CarouselImage[]> => {
  try {
    const { data, error } = await supabase
      .from('carousel_images')
      .select('*');

    if (error || !data) throw error;
    return data as CarouselImage[];
  } catch (err) {
    console.warn('Supabase fetch failed (Carousel), utilizing Mock Data.');
    return mockCarouselImages;
  }
};
