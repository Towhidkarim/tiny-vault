import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ALLOWED_TEXT_EXTENSIONS } from './constants';

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
  const extension = file.type;
  const plainText = extension.startsWith('text/');
  const formatSupported = ALLOWED_TEXT_EXTENSIONS.has(extension);

  // const fileReader = new FileReader();
  // fileReader.onload = () => {

  // }
  return plainText || formatSupported;
}
