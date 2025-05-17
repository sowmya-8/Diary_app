export type User = {
  id: string;
  username: string;
  password: string;
};

export type Mood = 'happy' | 'calm' | 'sad' | 'angry' | 'anxious' | 'neutral';

export type DiaryEntry = {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
  updatedAt: string;
};

export type AuthContextType = {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

export type DiaryContextType = {
  entries: DiaryEntry[];
  getEntries: () => void;
  addEntry: (entry: Omit<DiaryEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, entry: Partial<DiaryEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntryById: (id: string) => DiaryEntry | undefined;
};

export type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};