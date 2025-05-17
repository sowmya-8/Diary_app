import { User, DiaryEntry } from '../types';

// User related functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUserByUsername = (username: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.username === username);
};

export const verifyUser = (username: string, password: string): User | null => {
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Diary entries related functions
export const getEntries = (userId: string): DiaryEntry[] => {
  const entries = localStorage.getItem(`entries_${userId}`);
  return entries ? JSON.parse(entries) : [];
};

export const saveEntries = (userId: string, entries: DiaryEntry[]): void => {
  localStorage.setItem(`entries_${userId}`, JSON.stringify(entries));
};

export const addEntry = (entry: DiaryEntry): void => {
  const entries = getEntries(entry.userId);
  entries.push(entry);
  saveEntries(entry.userId, entries);
};

export const updateEntry = (entryId: string, userId: string, updatedEntry: Partial<DiaryEntry>): void => {
  const entries = getEntries(userId);
  const index = entries.findIndex((entry) => entry.id === entryId);
  
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updatedEntry, updatedAt: new Date().toISOString() };
    saveEntries(userId, entries);
  }
};

export const deleteEntry = (entryId: string, userId: string): void => {
  const entries = getEntries(userId);
  const filteredEntries = entries.filter((entry) => entry.id !== entryId);
  saveEntries(userId, filteredEntries);
};

// Theme preference
export const getThemePreference = (): boolean => {
  const theme = localStorage.getItem('theme');
  return theme ? JSON.parse(theme) : false;
};

export const saveThemePreference = (isDarkMode: boolean): void => {
  localStorage.setItem('theme', JSON.stringify(isDarkMode));
};

// Game scores
export const saveGameScore = (userId: string, score: number): void => {
  const scores = getGameScores(userId);
  scores.push({ score, date: new Date().toISOString() });
  localStorage.setItem(`game_scores_${userId}`, JSON.stringify(scores));
};

export const getGameScores = (userId: string): Array<{ score: number, date: string }> => {
  const scores = localStorage.getItem(`game_scores_${userId}`);
  return scores ? JSON.parse(scores) : [];
};

export const getBestScore = (userId: string): number => {
  const scores = getGameScores(userId);
  if (scores.length === 0) return 0;
  return Math.max(...scores.map((s) => s.score));
};