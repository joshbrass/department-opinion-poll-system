import Thumbnail1 from '../assets/images/flag1.jpg';
import Thumbnail2 from '../assets/images/flag2.jpg';
// Mock Data
export const users = [
    {
        id: 's1',
        fullName: 'okoro Peter',
        email: 'okoroprter@gmail.com',
        password: 'emma123',
        role: 'student',
        isAdmin: false,
        votedPolls: ['p1']
    },
    {
        id: 's2',
        fullName: 'Chika Okoro',
        email: 'chika.okoro@student.edu',
        password: 'chika456',
        role: 'student',
        isAdmin: false,
        votedPolls: ['p1', 'p2']
    },
    {
        id: 'l1',
        fullName: 'Dr. Maxwell Adigwe',
        email: 'maxwell.adigwe@school.edu',
        password: 'lecturer123',
        role: 'lecturer',
        isAdmin: true,
        votedPolls: []
    }
];
export const options = [
    { id: 'o1', answer: 'Dr. Smith', voteCount: 23, pollId: 'p1' },
    { id: 'o2', answer: 'Prof. Johnson', voteCount: 12, pollId: 'p1' },
    { id: 'o3', answer: 'Ms. Adaobi', voteCount: 30, pollId: 'p1' },
    { id: 'o4', answer: 'Yes', voteCount: 45, pollId: 'p2' },
    { id: 'o5', answer: 'No', voteCount: 17, pollId: 'p2' },
    { id: 'o6', answer: 'Extend by 2 hours', voteCount: 20, pollId: 'p2' }
];
export const polls = [
    {
        id: 'p1',
        title: 'Who is the best lecturer in the department?',
        description: 'Vote for the best lecturer of the year.',
        thumbnail: Thumbnail1,
        options: ['o1', 'o2', 'o3'],
        votedStudents: ['s1', 's2'],
        createdBy: 'l1',
        startDate: '2025-04-01',
        endDate: '2025-04-30',
        isResultVisible: true
    },
    {
        id: 'p2',
        title: 'Should we extend library hours?',
        description: 'Vote on whether library hours should be extended until 10 PM.',
        thumbnail: Thumbnail2,
        options: ['o4', 'o5', 'o6'],
        votedStudents: ['s2'],
        createdBy: 'l1',
        startDate: '2025-04-10',
        endDate: '2025-05-10',
        isResultVisible: false
    }
];
