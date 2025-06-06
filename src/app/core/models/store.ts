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
        createdAt: new Date('2025-05-05T10:00:00Z') // Adjusted to be within 30 days
      },
      {
        id: 108,
        applicationId: 4,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-20T11:00:00Z'),
        notes: 'Received rejection email'
      }
    ],
    createdAt: new Date('2025-05-05T00:00:00Z'), // Adjusted
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
  },
  {
    id: 7,
    company: 'Code Creators',
    position: 'DevOps Engineer',
    status: 'Interview',
    statusHistory: [
      {
        id: 112,
        applicationId: 7,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-10T10:00:00Z') // Adjusted
      },
      {
        id: 113,
        applicationId: 7,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-20T11:00:00Z'), // Adjusted
        interviewType: 1,
        notes: 'Initial HR call completed'
      }
    ],
    createdAt: new Date('2025-05-10T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 8,
    company: 'Digital Dynamics',
    position: 'Marketing Specialist',
    status: 'Rejected',
    statusHistory: [
      {
        id: 114,
        applicationId: 8,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-05T13:00:00Z')
      },
      {
        id: 115,
        applicationId: 8,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-20T10:00:00Z'),
        notes: 'Not a good fit'
      }
    ],
    createdAt: new Date('2025-05-05T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 9,
    company: 'Enterprise Solutions',
    position: 'Business Analyst',
    status: 'OfferAwarded',
    statusHistory: [
      {
        id: 116,
        applicationId: 9,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-01T09:00:00Z') // Adjusted
      },
      {
        id: 117,
        applicationId: 9,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-15T14:00:00Z') // Adjusted
      },
      {
        id: 118,
        applicationId: 9,
        createdBy: 1,
        status: 'OfferAwarded',
        createdAt: new Date('2025-05-25T15:00:00Z'), // Adjusted
        notes: 'Accepted offer'
      }
    ],
    createdAt: new Date('2025-05-01T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 10,
    company: 'Health Innovations',
    position: 'UX Researcher',
    status: 'Applied',
    statusHistory: [
      {
        id: 119,
        applicationId: 10,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-12T10:00:00Z')
      }
    ],
    createdAt: new Date('2025-05-12T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 11,
    company: 'Fintech Futures',
    position: 'Financial Analyst',
    status: 'Interview',
    statusHistory: [
      {
        id: 120,
        applicationId: 11,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-18T11:00:00Z')
      },
      {
        id: 121,
        applicationId: 11,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-26T09:00:00Z'),
        interviewType: 1,
        notes: 'First round virtual interview'
      }
    ],
    createdAt: new Date('2025-05-18T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 12,
    company: 'EduTech Solutions',
    position: 'Content Creator',
    status: 'Rejected',
    statusHistory: [
      {
        id: 122,
        applicationId: 12,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-04T14:00:00Z') // Adjusted
      },
      {
        id: 123,
        applicationId: 12,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-19T10:00:00Z'), // Adjusted
        notes: 'Automated rejection'
      }
    ],
    createdAt: new Date('2025-05-04T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 13,
    company: 'Logistics Innovations',
    position: 'Supply Chain Manager',
    status: 'Interview',
    statusHistory: [
      {
        id: 124,
        applicationId: 13,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-02T09:00:00Z')
      },
      {
        id: 125,
        applicationId: 13,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-15T13:00:00Z'),
        interviewType: 2,
        notes: 'Panel interview scheduled'
      }
    ],
    createdAt: new Date('2025-05-02T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 14,
    company: 'Green Energy Co.',
    position: 'Environmental Engineer',
    status: 'OfferAwarded',
    statusHistory: [
      {
        id: 126,
        applicationId: 14,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-01T10:00:00Z') // Adjusted
      },
      {
        id: 127,
        applicationId: 14,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-10T10:00:00Z') // Adjusted
      },
      {
        id: 128,
        applicationId: 14,
        createdBy: 1,
        status: 'OfferAwarded',
        createdAt: new Date('2025-05-20T16:00:00Z'), // Adjusted
        notes: 'Offer accepted, start date in June'
      }
    ],
    createdAt: new Date('2025-05-01T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 15,
    company: 'CyberSecure Corp',
    position: 'Security Analyst',
    status: 'Applied',
    statusHistory: [
      {
        id: 129,
        applicationId: 15,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-28T08:00:00Z')
      }
    ],
    createdAt: new Date('2025-05-28T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 16,
    company: 'Retail Innovations',
    position: 'E-commerce Manager',
    status: 'Interview',
    statusHistory: [
      {
        id: 130,
        applicationId: 16,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-10T12:00:00Z')
      },
      {
        id: 131,
        applicationId: 16,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-25T14:00:00Z'),
        interviewType: 1,
        notes: 'Recruiter call next week'
      }
    ],
    createdAt: new Date('2025-05-10T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 17,
    company: 'Automotive Future',
    position: 'Mechanical Engineer',
    status: 'Rejected',
    statusHistory: [
      {
        id: 132,
        applicationId: 17,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-02T10:00:00Z') // Adjusted
      },
      {
        id: 133,
        applicationId: 17,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-18T09:00:00Z'), // Adjusted
        notes: 'Overqualified for the role'
      }
    ],
    createdAt: new Date('2025-05-02T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 18,
    company: 'BioPharma R&D',
    position: 'Research Scientist',
    status: 'Interview',
    statusHistory: [
      {
        id: 134,
        applicationId: 18,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-07T11:00:00Z')
      },
      {
        id: 135,
        applicationId: 18,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-20T10:00:00Z'),
        interviewType: 2,
        notes: 'Lab visit scheduled'
      }
    ],
    createdAt: new Date('2025-05-07T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 19,
    company: 'Media House Pro',
    position: 'Video Editor',
    status: 'Applied',
    statusHistory: [
      {
        id: 136,
        applicationId: 19,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-31T09:00:00Z')
      }
    ],
    createdAt: new Date('2025-05-31T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 20,
    company: 'Consulting Allies',
    position: 'Management Consultant',
    status: 'OfferAwarded',
    statusHistory: [
      {
        id: 137,
        applicationId: 20,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-01T10:00:00Z') // Adjusted
      },
      {
        id: 138,
        applicationId: 20,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-15T11:00:00Z') // Adjusted
      },
      {
        id: 139,
        applicationId: 20,
        createdBy: 1,
        status: 'OfferAwarded',
        createdAt: new Date('2025-05-25T14:00:00Z'), // Adjusted
        notes: 'Signed contract'
      }
    ],
    createdAt: new Date('2025-05-01T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 21,
    company: 'Travel Ventures',
    position: 'Travel Coordinator',
    status: 'Applied',
    statusHistory: [
      {
        id: 140,
        applicationId: 21,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-06-01T10:00:00Z')
      }
    ],
    createdAt: new Date('2025-06-01T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 22,
    company: 'Fashion Forward',
    position: 'Fashion Buyer',
    status: 'Interview',
    statusHistory: [
      {
        id: 141,
        applicationId: 22,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-19T09:00:00Z')
      },
      {
        id: 142,
        applicationId: 22,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-06-03T11:00:00Z'),
        interviewType: 1,
        notes: 'Portfolio review'
      }
    ],
    createdAt: new Date('2025-05-19T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 23,
    company: 'Foodie Innovations',
    position: 'Food Scientist',
    status: 'Rejected',
    statusHistory: [
      {
        id: 143,
        applicationId: 23,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-04T14:00:00Z') // Adjusted
      },
      {
        id: 144,
        applicationId: 23,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-15T10:00:00Z'),
        notes: 'Hired internal candidate'
      }
    ],
    createdAt: new Date('2025-05-04T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 24,
    company: 'Sports Dynamics',
    position: 'Sports Analyst',
    status: 'OfferAwarded',
    statusHistory: [
      {
        id: 145,
        applicationId: 24,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-05T11:00:00Z') // Adjusted
      },
      {
        id: 146,
        applicationId: 24,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-20T13:00:00Z') // Adjusted
      },
      {
        id: 147,
        applicationId: 24,
        createdBy: 1,
        status: 'OfferAwarded',
        createdAt: new Date('2025-05-30T16:00:00Z'), // Adjusted
        notes: 'Final offer'
      }
    ],
    createdAt: new Date('2025-05-05T00:00:00Z'), // Adjusted
    createdBy: 1
  },
  {
    id: 25,
    company: 'Artistic Studios',
    position: 'Graphic Designer',
    status: 'Applied',
    statusHistory: [
      {
        id: 148,
        applicationId: 25,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-06-02T09:00:00Z')
      }
    ],
    createdAt: new Date('2025-06-02T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 26,
    company: 'Manufacturing Excellence',
    position: 'Production Engineer',
    status: 'Interview',
    statusHistory: [
      {
        id: 149,
        applicationId: 26,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-14T10:00:00Z')
      },
      {
        id: 150,
        applicationId: 26,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-29T15:00:00Z'),
        interviewType: 2,
        notes: 'On-site interview'
      }
    ],
    createdAt: new Date('2025-05-14T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 27,
    company: 'Global Innovations',
    position: 'Research Analyst',
    status: 'Applied',
    statusHistory: [
      {
        id: 151,
        applicationId: 27,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-06-03T10:00:00Z')
      }
    ],
    createdAt: new Date('2025-06-03T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 28,
    company: 'Dynamic Solutions',
    position: 'System Administrator',
    status: 'Interview',
    statusHistory: [
      {
        id: 152,
        applicationId: 28,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-22T11:00:00Z')
      },
      {
        id: 153,
        applicationId: 28,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-06-01T14:00:00Z'),
        interviewType: 1,
        notes: 'Technical assessment scheduled'
      }
    ],
    createdAt: new Date('2025-05-22T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 29,
    company: 'Vanguard Ventures',
    position: 'Investment Analyst',
    status: 'Rejected',
    statusHistory: [
      {
        id: 154,
        applicationId: 29,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-10T09:00:00Z')
      },
      {
        id: 155,
        applicationId: 29,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-25T16:00:00Z'),
        notes: 'Experience mismatch'
      }
    ],
    createdAt: new Date('2025-05-10T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 30,
    company: 'Future Builders',
    position: 'Construction Manager',
    status: 'OfferAwarded',
    statusHistory: [
      {
        id: 156,
        applicationId: 30,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-08T10:00:00Z')
      },
      {
        id: 157,
        applicationId: 30,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-20T11:00:00Z')
      },
      {
        id: 158,
        applicationId: 30,
        createdBy: 1,
        status: 'OfferAwarded',
        createdAt: new Date('2025-06-02T15:00:00Z'),
        notes: 'Offer accepted'
      }
    ],
    createdAt: new Date('2025-05-08T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 31,
    company: 'Aqua Innovations',
    position: 'Marine Biologist',
    status: 'Applied',
    statusHistory: [
      {
        id: 159,
        applicationId: 31,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-06-04T09:00:00Z')
      }
    ],
    createdAt: new Date('2025-06-04T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 32,
    company: 'Urban Development',
    position: 'City Planner',
    status: 'Interview',
    statusHistory: [
      {
        id: 160,
        applicationId: 32,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-24T10:00:00Z')
      },
      {
        id: 161,
        applicationId: 32,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-06-03T13:00:00Z'),
        interviewType: 1,
        notes: 'Policy review'
      }
    ],
    createdAt: new Date('2025-05-24T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 33,
    company: 'Aero Dynamics',
    position: 'Aerospace Engineer',
    status: 'Rejected',
    statusHistory: [
      {
        id: 162,
        applicationId: 33,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-11T11:00:00Z')
      },
      {
        id: 163,
        applicationId: 33,
        createdBy: 1,
        status: 'Rejected',
        createdAt: new Date('2025-05-29T10:00:00Z'),
        notes: 'Skills gap'
      }
    ],
    createdAt: new Date('2025-05-11T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 34,
    company: 'Virtual Reality Labs',
    position: 'Unity Developer',
    status: 'Interview',
    statusHistory: [
      {
        id: 164,
        applicationId: 34,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-16T10:00:00Z')
      },
      {
        id: 165,
        applicationId: 34,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-06-04T12:00:00Z'),
        interviewType: 2,
        notes: 'Live coding session'
      }
    ],
    createdAt: new Date('2025-05-16T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 35,
    company: 'Global Retailers',
    position: 'Merchandise Planner',
    status: 'Applied',
    statusHistory: [
      {
        id: 166,
        applicationId: 35,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-06-02T14:00:00Z')
      }
    ],
    createdAt: new Date('2025-06-02T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 36,
    company: 'Secure Systems Co.',
    position: 'Network Engineer',
    status: 'Interview',
    statusHistory: [
      {
        id: 167,
        applicationId: 36,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-23T09:00:00Z')
      },
      {
        id: 168,
        applicationId: 36,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-06-01T10:00:00Z'),
        interviewType: 1,
        notes: 'Initial screening call'
      }
    ],
    createdAt: new Date('2025-05-23T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 37,
    company: 'Innovate AI',
    position: 'AI Engineer',
    status: 'Test',
    statusHistory: [
      {
        id: 169,
        applicationId: 37,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-15T10:00:00Z')
      },
      {
        id: 170,
        applicationId: 37,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-25T14:00:00Z')
      },
      {
        id: 171,
        applicationId: 37,
        createdBy: 1,
        status: 'Test',
        createdAt: new Date('2025-06-01T11:00:00Z'),
        notes: 'Online coding test sent'
      }
    ],
    createdAt: new Date('2025-05-15T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 38,
    company: 'Synergy Systems',
    position: 'Fullstack Developer',
    status: 'Test',
    statusHistory: [
      {
        id: 172,
        applicationId: 38,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-18T09:00:00Z')
      },
      {
        id: 173,
        applicationId: 38,
        createdBy: 1,
        status: 'Test',
        createdAt: new Date('2025-06-03T10:00:00Z'),
        notes: 'Technical assessment scheduled'
      }
    ],
    createdAt: new Date('2025-05-18T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 39,
    company: 'DataStream Analytics',
    position: 'Data Scientist',
    status: 'Test',
    statusHistory: [
      {
        id: 174,
        applicationId: 39,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-10T10:00:00Z')
      },
      {
        id: 175,
        applicationId: 39,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-20T11:00:00Z')
      },
      {
        id: 176,
        applicationId: 39,
        createdBy: 1,
        status: 'Test',
        createdAt: new Date('2025-05-30T15:00:00Z'),
        notes: 'Take-home assignment sent'
      }
    ],
    createdAt: new Date('2025-05-10T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 40,
    company: 'Cloud Innovations',
    position: 'DevOps Engineer',
    status: 'Test',
    statusHistory: [
      {
        id: 177,
        applicationId: 40,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-21T10:00:00Z')
      },
      {
        id: 178,
        applicationId: 40,
        createdBy: 1,
        status: 'Test',
        createdAt: new Date('2025-06-04T09:00:00Z'),
        notes: 'System design challenge'
      }
    ],
    createdAt: new Date('2025-05-21T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 41,
    company: 'Web Solutions Pro',
    position: 'Web Developer',
    status: 'Test',
    statusHistory: [
      {
        id: 179,
        applicationId: 41,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-28T10:00:00Z')
      },
      {
        id: 180,
        applicationId: 41,
        createdBy: 1,
        status: 'Test',
        createdAt: new Date('2025-06-04T13:00:00Z'),
        notes: 'Frontend coding exercise'
      }
    ],
    createdAt: new Date('2025-05-28T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 42,
    company: 'Global Health Systems',
    position: 'Healthcare Consultant',
    status: 'Withdrawn',
    statusHistory: [
      {
        id: 181,
        applicationId: 42,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-05T10:00:00Z')
      },
      {
        id: 182,
        applicationId: 42,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-15T11:00:00Z')
      },
      {
        id: 183,
        applicationId: 42,
        createdBy: 1,
        status: 'Withdrawn',
        createdAt: new Date('2025-05-20T16:00:00Z'),
        notes: 'Candidate withdrew due to another offer'
      }
    ],
    createdAt: new Date('2025-05-05T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 43,
    company: 'Bright Future Academy',
    position: 'Educator',
    status: 'Withdrawn',
    statusHistory: [
      {
        id: 184,
        applicationId: 43,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-12T14:00:00Z')
      },
      {
        id: 185,
        applicationId: 43,
        createdBy: 1,
        status: 'Withdrawn',
        createdAt: new Date('2025-05-28T09:00:00Z'),
        notes: 'Recruiter withdrew application (role filled)'
      }
    ],
    createdAt: new Date('2025-05-12T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 44,
    company: 'Creative Marketing Agency',
    position: 'Graphic Designer',
    status: 'Withdrawn',
    statusHistory: [
      {
        id: 186,
        applicationId: 44,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-01T09:00:00Z')
      },
      {
        id: 187,
        applicationId: 44,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-05-10T10:00:00Z')
      },
      {
        id: 188,
        applicationId: 44,
        createdBy: 1,
        status: 'Withdrawn',
        createdAt: new Date('2025-05-22T12:00:00Z'),
        notes: 'Company decided not to fill the position'
      }
    ],
    createdAt: new Date('2025-05-01T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 45,
    company: 'Future Mobility Group',
    position: 'Automotive Engineer',
    status: 'Withdrawn',
    statusHistory: [
      {
        id: 189,
        applicationId: 45,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-19T11:00:00Z')
      },
      {
        id: 190,
        applicationId: 45,
        createdBy: 1,
        status: 'Withdrawn',
        createdAt: new Date('2025-06-03T10:00:00Z'),
        notes: 'Candidate found a more suitable role'
      }
    ],
    createdAt: new Date('2025-05-19T00:00:00Z'),
    createdBy: 1
  },
  {
    id: 46,
    company: 'SecureNet Solutions',
    position: 'Cybersecurity Analyst',
    status: 'Withdrawn',
    statusHistory: [
      {
        id: 191,
        applicationId: 46,
        createdBy: 1,
        status: 'Applied',
        createdAt: new Date('2025-05-26T08:00:00Z')
      },
      {
        id: 192,
        applicationId: 46,
        createdBy: 1,
        status: 'Interview',
        createdAt: new Date('2025-06-02T10:00:00Z')
      },
      {
        id: 193,
        applicationId: 46,
        createdBy: 1,
        status: 'Withdrawn',
        createdAt: new Date('2025-06-04T15:00:00Z'),
        notes: 'Application withdrawn by candidate'
      }
    ],
    createdAt: new Date('2025-05-26T00:00:00Z'),
    createdBy: 1
  }
];
