export type Status = 'Applied' | 'Test' | 'Interview' | 'OfferAwarded' | 'Rejected' | 'Withdrawn';
export const statuses: Status[] = ['Applied', 'Test', 'Interview', 'OfferAwarded', 'Rejected', 'Withdrawn'];

export interface StatusDetails {
  colorClass: string;
  progress: number;
  iconClass: string;
  textClass: string;
}

export interface StatusHistory {
    id: number;
    applicationId: number;
    createdBy: number;
    status: Status;
    createdAt: string;
    notes?: string;
    testType?: string;
    interviewType?: number;
}

export interface Application {
    id: number;
    company: string;
    position: string;
    status: Status;
    statusHistory: StatusHistory[];
    website?: string;
    applicationType?: string;
    createdAt: number;
    createdBy: number;
}

export interface PaginatedApplications {
    items: any;
    applications: Application[];
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    totalPages: number;
    page: number;
    size: number;
}

export const statusDetailsMap: Record<Status, StatusDetails> = {
  Applied: {
    colorClass: 'bg-blue-500',
    progress: 10,
    iconClass: 'bi bi-send',
    textClass: 'text-blue-500'
  },
  Test: {
    colorClass: 'bg-yellow-500',
    progress: 30,
    iconClass: 'bi bi-clipboard-check',
    textClass: 'text-yellow-500'
  },
  Interview: {
    colorClass: 'bg-purple-500',
    progress: 60,
    iconClass: 'bi bi-person-lines-fill',
    textClass: 'text-purple-500'
  },
  OfferAwarded: {
    colorClass: 'bg-green-500',
    progress: 100,
    iconClass: 'bi bi-award',
    textClass: 'text-green-500'
  },
  Rejected: {
    colorClass: 'bg-red-500',
    progress: 100,
    iconClass: 'bi bi-x-circle',
    textClass: 'text-red-500'
  },
  Withdrawn: {
    colorClass: 'bg-gray-500',
    progress: 100,
    iconClass: 'bi bi-arrow-counterclockwise',
    textClass: 'text-gray-500'
  }
};