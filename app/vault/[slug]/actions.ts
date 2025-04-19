'use server';
import { BundledLanguage, codeToHtml } from 'shiki';

export default async function highlightFile(
  textFileUrl: string,
  lang: BundledLanguage,
) {
  const fileContents = await fetch(textFileUrl);
  const textData = await fileContents.text();
  const htmlData = await codeToHtml(textData, {
    lang,
    theme: 'github-light',
  });

  return htmlData;
}
