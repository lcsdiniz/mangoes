import { format } from 'date-fns';

export function formatChapterName(chapter: string) {
  if (Number.isNaN(Number(chapter))) {
    return chapter;
  }
  return `Chapter ${chapter}`;
}

export function formatLastUpdate(date: string) {
  return format(new Date(date), "MMMM dd',' yyyy");
}
