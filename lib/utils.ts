import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ALLOWED_TEXT_EXTENSIONS, FILE_TYPES } from './constants';

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
