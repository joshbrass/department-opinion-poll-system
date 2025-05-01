export type UserRole = 'student' | 'lecturer';

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  isAdmin: boolean; // true only if role === 'lecturer'
  votedPolls: string[]; // Array of poll IDs the user has voted in
}

export interface IOption {
  id: string;
  answer: string; 
  voteCount: number;
  pollId: string; // Poll this option belongs to
}

export interface IPoll {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  options: string[]; // Array of option IDs
  votedStudents: string[]; // Array of student IDs who voted
  createdBy: string; // Lecturer ID
  startDate: string;
  endDate: string;
  isResultVisible: boolean;
}