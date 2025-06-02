import {Application} from './application';

export const applicationList : Application[] = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    position: 'Software Engineer',
    status: 'Applied',
    statusHistory: [
      {
        id: 101,
        applicationId: 1,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-20T10:00:00Z')
      }
    ],
    createdAt: new Date('2025-05-21T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 2,
    company: 'Global Corp',
    position: 'Product Manager',
    status: 'Interview',
    statusHistory: [
      {
        id: 102,
        applicationId: 2,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-15T09:00:00Z')
      },
      {
        id: 103,
        applicationId: 2,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-22T14:30:00Z'),
        interviewType: 1,
        notes: 'Phone screen scheduled for next week'
      }
    ],
    createdAt: new Date('2025-05-15T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 3,
    company: 'Innovate Systems',
    position: 'UI/UX Designer',
    status: 'OfferAwarded',
    statusHistory: [
      {
        id: 104,
        applicationId: 3,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-01T11:00:00Z')
      },
      {
        id: 105,
        applicationId: 3,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-08T10:00:00Z')
      },
      {
        id: 106,
        applicationId: 3,
        createdBy: 1,
        status: 'OfferAwarded',
        createdAt: new Date('2025-05-28T16:00:00Z'),
        notes: 'Offer received, review details'
      }
    ],
    createdAt: new Date('2025-05-01T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 4,
    company: 'Data Insights Ltd.',
    position: 'Data Analyst',
    status: 'Rejected',
    statusHistory: [
      {
        id: 107,
        applicationId: 4,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-04-25T10:00:00Z')
      },
      {
        id: 108,
        applicationId: 4,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-10T11:00:00Z'),
        notes: 'Received rejection email'
      }
    ],
    createdAt: new Date('2025-04-25T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 5,
    company: 'FutureTech Solutions',
    position: 'Cloud Architect',
    status: 'Interview',
    statusHistory: [
      {
        id: 109,
        applicationId: 5,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-25T08:00:00Z')
      },
      {
        id: 110,
        applicationId: 5,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-30T10:00:00Z'),
        interviewType: 2,
        notes: 'Technical interview next week'
      }
    ],
    createdAt: new Date('2025-05-25T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 6,
    company: 'NextGen Solutions',
    position: 'Frontend Developer',
    status: 'Applied',
    statusHistory: [
      {
        id: 111,
        applicationId: 6,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-29T09:00:00Z')
      }
    ],
    createdAt: new Date('2025-05-29T00:00:00Z'),
    createdBy: 1
  }
];
