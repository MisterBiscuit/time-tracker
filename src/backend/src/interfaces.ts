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

export interface TimeEntry {
    id: string;
    date: string;
    projectId: string;
    workTypeId: string;
    minutes: number;
    comment?: string;
}

export interface TimeOff {
    id: string;
    date: string;
    label?: string;
}

export interface AppState {
    projects: Project[];
    workTypes: WorkType[];
    entries: TimeEntry[];
    timeOff: TimeOff[];
}
