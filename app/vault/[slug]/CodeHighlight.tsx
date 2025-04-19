import { BundledLanguage, codeToHtml } from 'shiki';

export default async function CodeHighlight({
  fileUrl,
  lang,
}: {
  fileUrl: string;
  lang: BundledLanguage;
}) {
  try {
    const fileContents = await fetch(fileUrl);
    const textData = await fileContents.text();
    const htmlData = await codeToHtml(textData, {
      lang,
      theme: 'github-light',
    });
    console.log('hello');
    return (
      <div
        className='w-full'
        dangerouslySetInnerHTML={{ __html: htmlData }}
      ></div>
    );
  } catch (e) {
    return <h1>Some Error Occured</h1>;
  }
}
