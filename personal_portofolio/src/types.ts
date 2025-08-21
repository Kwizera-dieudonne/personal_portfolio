export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}