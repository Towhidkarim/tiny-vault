import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import {
  ALLOWED_TEXT_EXTENSIONS,
  cookieKeys,
  redisKeys,
} from '@/lib/constants';
import useFileRemoteCache from '@/lib/hooks/useFileRemoteCache';
import { TFilesTable } from '@/db/schema';
import {
  generateDeviceImprint,
  validateToken,
  verifyDeviceImprint,
  verifyIdentifierToken,
} from '@/lib/auth/identification';
import { getFileType } from '@/lib/utils';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  publicFileUploader: f({
    text: {
      maxFileSize: '512KB',
      maxFileCount: 8,
    },
    image: {
      maxFileSize: '4MB',
      maxFileCount: 4,
    },
    audio: {
      maxFileSize: '8MB',
      maxFileCount: 4,
    },
    pdf: {
      maxFileSize: '32MB',
      maxFileCount: 8,
    },
    blob: {
      maxFileSize: '32MB',
      maxFileCount: 4,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const cookies = req.cookies;
      const forwarded = req.headers.get('x-forwarded-for');
      if (!forwarded) throw new UploadThingError('No IP address found');
      const ip = forwarded.split(',')[0];

      // console.log('Client IP in UploadThing middleware:', ip);
      // console.log(ip);

      const token = cookies.get(cookieKeys.publicVaultCookie)?.value;
      if (token === undefined) throw new UploadThingError('Unauthorized');

      const verificationResult = await verifyIdentifierToken(token);
      // console.log(verificationResult);
      if (verificationResult.verified)
        return { vaultID: verificationResult.result.uniqueID };
      else throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //   console.log('Upload complete for userId:', metadata.userId);
      //   console.log('file url', file.ufsUrl);
      const { put } = await useFileRemoteCache<TFilesTable>();
      put({
        key: `${redisKeys.publicValut}:${metadata.vaultID}`,
        data: {
          id: file.key,
          parentVaultID: metadata.vaultID,
          fileName: file.name,
          fileType: getFileType({ fileName: file.name, mimeType: file.type }),
          createdAt: Date.now().toString(),
          fileSize: file.size,
          fileURL: file.ufsUrl,
        },
      });
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { fileKey: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
