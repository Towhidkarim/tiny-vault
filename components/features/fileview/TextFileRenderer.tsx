import CodeRenderer from './code-renderer';

export default function TextFileRenderer({
  fileName,
  fileURL,
  fileSize,
}: {
  fileName: string;
  fileURL: string;
  fileSize: string;
}) {
  return (
    <div>
      <ul className='flex h-10 w-full flex-row justify-start gap-4 rounded-lg rounded-b-none bg-indigo-500/10 px-5 pt-2'>
        <li
          className='relative grid w-fit min-w-32 place-items-center truncate rounded-sm rounded-b-none px-2 after:absolute after:-right-2 after:h-5 after:w-px after:bg-gray-400 after:content-[""]'
          style={
            true
              ? { backgroundColor: 'white' }
              : { color: 'var(--color-muted-foreground)' }
          }
        >
          <span className='text-sm'>{fileName}</span>
        </li>
        <li className='text-muted-foreground my-auto text-xs'>{fileSize}</li>
      </ul>
      <div className='p-3.5'>
        {/* {filesData[selectedFileIndex].renderedComponent} */}
        <CodeRenderer fileName={fileName} fileURL={fileURL} />
      </div>
    </div>
  );
}
