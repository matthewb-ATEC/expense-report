import Report from '../../src/models/report.js'

const initialReports = [
  {
    user: { name: 'Matt Burton' },
    projects: [
      {
        number: 24015,
        name: 'Messer Lilly LP2',
        expenses: [
          {
            date: '2024-11-15',
            costCategory: 'Reimbursable Gas',
            costCode: '62-1011-TRV',
            cost: 120,
            attachments: [],
          },
        ],
      },
    ],
  },
  {
    user: { name: 'Gene Taylor' },
    projects: [
      {
        number: 23013,
        name: 'KBI - Hamlin CNC',
        expenses: [
          {
            date: '2024-11-11',
            costCategory: 'Hotel',
            costCode: '62-1002-TRV',
            cost: 150,
            attachments: [],
          },
          {
            date: '2024-11-12',
            costCategory: 'Car Rental',
            costCode: '62-1004-TRV',
            cost: 71,
            attachments: [],
          },
        ],
      },
    ],
  },
]

const newReport = {
  user: { name: 'Matt Burton' },
  projects: [
    {
      number: 24015,
      name: 'Messer Lilly LP2',
      expenses: [
        {
          date: '2024-11-15',
          costCategory: 'Reimbursable Gas',
          costCode: '62-1011-TRV',
          cost: 120,
          attachments: [],
        },
      ],
    },
  ],
}

const changedReport = {
  user: { name: 'John Burton' },
  projects: [],
}

const newProject = {
  number: 24015,
  name: 'Messer Lilly LP2',
  expenses: [
    {
      date: '2024-11-15',
      costCategory: 'Reimbursable Gas',
      costCode: '62-1011-TRV',
      cost: 150,
      attachments: [],
    },
  ],
}

const changedProject = {
  number: 23013,
  name: 'KBI - Hamlin CNC',
  expenses: [
    {
      date: '2024-11-13',
      costCategory: 'Mileage',
      costCode: '62-1009-TRV',
      purpose: 'Personal',
      fromLocation: '7 Nelson St, Lincoln LN1 1PJ, UK',
      toLocation: '1327 Rockville Pike Suite I.J.K, Rockville, MD 20852',
      roundTrip: true,
      attachments: [],
    },
  ],
}

const reportsInDb = async () => {
  const reports = await Report.find({})
  return reports.map((report) => report.toJSON())
}

export default {
  initialReports,
  reportsInDb,
  newReport,
  changedReport,
  newProject,
  changedProject,
}
