'use server';

import { getSingletonHighlighter, codeToHtml } from 'shiki';

export default async function generateMarkupAction(
  text: string,
  fileExtension: string,
) {
  const highlighter = await getSingletonHighlighter();
  const languages = highlighter.getLoadedLanguages();
  const lang = languages.includes(fileExtension) ? fileExtension : 'plaintext';
  await highlighter.loadTheme('github-light');
  const htmlData = codeToHtml(text, {
    lang: lang,
    theme: 'github-light',
  });
  return htmlData;
}
