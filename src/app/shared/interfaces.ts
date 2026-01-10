export interface Project {
  id: string;
  name: string;
  colour?: string;
}

export interface WorkType {
  id: string;
  label: string;
  symbol?: string;
}

export interface TimeOff {
  id: string;
  date: string;
  label?: string;
}

export interface TimeEntry {
  id: string;
  date: string;
  projectId: string;
  workTypeId: string;
  minutes: number;
  comment?: string;
}

export interface DayOverride {
  date: string;
  type: 'BANK_HOLIDAY' | 'TIME_OFF';
  minutes: number;
  comment?: string;
}
