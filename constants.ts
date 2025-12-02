
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const TABS = [
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'reports', label: 'Reports' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'academic_calendar', label: 'Academic Calendar' },
  { id: 'school_calendar', label: 'School Calendar' },
  { id: 'fees', label: 'Fees Receipts' },
] as const;

// Replace this with your actual Calendly scheduling URL
export const CALENDLY_URL = "https://calendly.com/";
