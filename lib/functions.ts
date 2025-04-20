import imageIcon from '@/public/assets/icons/file-image.svg';
import audioIcon from '@/public/assets/icons/file-audio.svg';
import docIcon from '@/public/assets/icons/file-doc.svg';
import pdfIcon from '@/public/assets/icons/file-pdf.svg';
import videoIcon from '@/public/assets/icons/file-video.svg';
import otherIcon from '@/public/assets/icons/file-other.svg';
import textIcon from '@/public/assets/icons/file-txt.svg';
import { StaticImageData } from 'next/image';

const fileTypes = [
  'image',
  'video',
  'audio',
  'pdf',
  'doc',
  'plaintext',
  'other',
] as const;
const associatedIcons = [
  imageIcon,
  videoIcon,
  audioIcon,
  pdfIcon,
  docIcon,
  textIcon,
  otherIcon,
] as StaticImageData[];

export function getFileIconImage(mimeType: string): StaticImageData;
export function getFileIconImage(file: File): StaticImageData;

export function getFileIconImage(arg: File | string): StaticImageData {
  const type = typeof arg === 'string' ? arg : arg.type;
  let fileType: (typeof fileTypes)[number] = 'other';
  if (type.startsWith('image/')) fileType = 'image';
  else if (type.startsWith('video/')) fileType = 'video';
  else if (type.startsWith('text/')) fileType = 'plaintext';
  else if (type.startsWith('audio/')) fileType = 'audio';
  else if (type.endsWith('/pdf')) fileType = 'pdf';
  else if (
    type.endsWith('wordprocessingml.document') ||
    type.endsWith('/msword')
  )
    fileType = 'doc';

  const resultIcon = associatedIcons[fileTypes.indexOf(fileType)];
  return resultIcon;
}

export function getIconFromCategory(category: (typeof fileTypes)[number]) {
  return associatedIcons[fileTypes.indexOf(category)];
}
