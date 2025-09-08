import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ALLOWED_TEXT_EXTENSIONS, FILE_TYPES } from './constants';
import {
  ChevronsUpDown,
  Home,
  Search,
  Settings,
  User,
  ChartNoAxesCombined,
  Heart,
  Shield,
  HelpCircle,
  ChartNoAxesGantt,
  ChartColumnBig,
  Star,
  Mail,
  User2,
} from 'lucide-react';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function generateRandomString(length: number = 6) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let generatedString = '';
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.round(Math.random() * chars.length);
    generatedString += chars[randomNumber];
  }
  return generatedString;
}

export function isTextReadable(file: File) {
  const extension = file.name.split('.').pop();
  const plainText = file.type.startsWith('text/');
  const formatSupported =
    typeof extension === 'string'
      ? ALLOWED_TEXT_EXTENSIONS.has(extension)
      : false;

  // const fileReader = new FileReader();
  // fileReader.onload = () => {

  // }
  return plainText || formatSupported;
}

export function getFileType({
  mimeType,
  fileName,
}: {
  mimeType: string;
  fileName: string;
}): (typeof FILE_TYPES)[number] {
  if (mimeType.startsWith('image/')) return 'image';
  else if (mimeType.startsWith('video/')) return 'video';
  else if (mimeType.startsWith('audio/')) return 'audio';
  else if (mimeType.startsWith('text/')) return 'plaintext';
  else if (ALLOWED_TEXT_EXTENSIONS.has(fileName.split('.').pop() ?? ''))
    return 'plaintext';
  else return 'other';
}

export function timeAgo(timestamp: number) {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  const intervals: [number, string][] = [
    [60, 's'],
    [60, 'm'],
    [24, 'h'],
    [7, 'd'],
    [4.34524, 'w'], // average number of weeks per month
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'y'],
  ];
  let i = 0;
  let time = seconds;

  while (i < intervals.length - 1 && time >= intervals[i][0]) {
    time = time / intervals[i][0];
    i++;
  }

  const roundedTime = Math.floor(time);
  const unit = intervals[i][1];
  return `${roundedTime}${unit} ago`;
}

const iconMap = {
  ChevronsUpDown,
  Home,
  Search,
  Settings,
  User,
  ChartNoAxesCombined,
  Heart,
  Shield,
  ChartNoAxesGantt,
  ChartColumnBig,
  Star,
  User2,
  Mail,
};

export type IconName = keyof typeof iconMap;

export function getLucideIcon(name: IconName) {
  return iconMap[name] ?? HelpCircle;
}
