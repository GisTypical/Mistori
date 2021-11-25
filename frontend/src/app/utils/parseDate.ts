import { Manga } from '../shared/Manga';

export const parseDate = (mangas: Manga[]) => {
  for (const manga of mangas) {
    const mangaYear = new Date(manga.date).getFullYear();
    const mangaMonth = new Date(manga.date).getMonth() + 1;
    const mangaDay = new Date(manga.date).getDate();
    manga.date = `${mangaMonth}/${mangaDay}/${mangaYear}`;
  }
};
