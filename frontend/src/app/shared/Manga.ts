import { Chapter } from './Chapter';

export interface Manga {
  id?: string;
  name: string;
  author?: string;
  description?: string;
  date?: string;
  cover: string;
  status?: string;
  chapters?: Chapter;
}
