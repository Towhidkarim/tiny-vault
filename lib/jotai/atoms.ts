import { atom } from 'jotai';
import { isTextReadable } from '../utils';

export const filesToBeUploaded = atom<File[]>([]);

export const fileMetaData = atom((get) => {
  const files = get(filesToBeUploaded);
  let dataList: { textReadable: boolean }[] = [];
  for (let file of files) dataList.push({ textReadable: isTextReadable(file) });
  return dataList;
});
