import { addDays, format } from 'date-fns'

export const remindersData = [
  {
    id: 1,
    title: 'First Reminder',
    notes: 'Some text for reminder 1',
    createdAt: format(new Date(), 'MM/dd/yyyy').toString(),
    date: addDays(new Date(), 10).toString(),
    completed: false,
  },
  {
    id: 2,
    title: 'Second Reminder',
    notes:
      'Some text for reminder 2. More text to test how the reminder will look on the homepage of this site that I am making right at this moment.',
    createdAt: format(new Date(), 'MM/dd/yyyy').toString(),
    date: addDays(new Date(), 1).toString(),
    completed: true,
  },
  {
    id: 3,
    title: 'Third Reminder',
    notes: 'Some text for reminder 3',
    createdAt: format(new Date(), 'MM/dd/yyyy').toString(),
    date: addDays(new Date(), 6).toString(),
    completed: false,
  },
]
