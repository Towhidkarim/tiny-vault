import getFullVaultData from '@/data-access/actions/getFullVaultData';
import CodeRenderer from './code-renderer.server';
import { formatFileSize } from '@/lib/utils';
import FileDisplay from './FileDisplay';
import generateMarkup from './generateMarkup';

type MultiFileFetcherProps = Exclude<
  Awaited<ReturnType<typeof getFullVaultData>>,
  null
>;

export type TProcessedFileData = {
  fileName: string;
  fileType: 'plaintext' | 'image' | 'video' | 'audio' | 'other';
  fileURL: string;
  fileSize: string;
  renderedComponent: React.ReactNode;
};

export default async function MultiFileFetcher({
  vaultFullData,
}: {
  vaultFullData: MultiFileFetcherProps;
}) {
  const { filesData, vaultName, vaultDescription } = vaultFullData;
  const textBasedFiles = filesData.filter(
    (item) => item.fileType === 'plaintext',
  );
  const getRendererComponent = async (fileData: (typeof filesData)[number]) => {
    if (fileData.fileType === 'plaintext') {
      const fileResponse = await fetch(fileData.fileURL);
      const fileText = await fileResponse.text();
      const extention = fileData.fileName.split('.').pop() ?? 'plaintext';
      const markupText = await generateMarkup(fileText, extention);
      return <CodeRenderer text={fileText} fileExtension={extention} />;
      // return markupText;
    } else return '';
  };

  const processedFileData: TProcessedFileData[] = await Promise.all(
    filesData.map(async (fileData) => {
      const renderedComponent = await getRendererComponent(fileData);
      const { fileName, fileSize, fileURL, fileType } = fileData;
      return {
        fileName,
        fileSize: formatFileSize(fileSize),
        fileURL,
        fileType,
        renderedComponent,
      };
    }),
  );

  return (
    <div>
      <FileDisplay
        processedFileData={processedFileData}
        processedVaultData={{
          vaultDescription: vaultDescription ?? '',
          vaultName,
        }}
      />
    </div>
  );
}
