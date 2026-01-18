export interface CommonEntity {
  id: string;
}

export interface Project extends CommonEntity {
  name: string;
  colour?: string;
}

export interface WorkType extends CommonEntity {
  label: string;
  symbol?: string;
}

export interface TimeOff extends CommonEntity {
  date: string;
  label?: string;
}

export interface TimeEntry extends CommonEntity {
  date: string;
  projectId: string;
  workTypeId: string;
  minutes: number;
  comment?: string;
}
