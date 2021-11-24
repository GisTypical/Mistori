import { Chapter } from './Chapter';

export interface Manga {
  id: string;
  name: string;
  author: string;
  description?: string;
  date: string;
  cover: string | File;
  status: string;
  uploadedBy: string;
  chapters: Chapter[];
  isFollower: boolean;
}

export interface MangasObject {
  mangas: Manga[];
}
