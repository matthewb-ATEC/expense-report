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

const reportsInDb = async () => {
  const reports = await Report.find({})
  return reports.map((report) => report.toJSON())
}

export default {
  initialReports,
  reportsInDb,
}
