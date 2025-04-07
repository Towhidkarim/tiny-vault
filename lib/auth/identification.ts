import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import crypto, { hash } from 'crypto';

type TTokenPayload = {
  headerImprint: string;
  uniqueID: string;
};
const SECRET = 'server secret';

//Create Device user device fingerprint using header values
export function generateDeviceImprint(headers: Headers, hashed = true) {
  const headerParameters = [
    'user-agent',
    'accept',
    'accept-language',
    'accept-encoding',
    'dnt',
    'sec-fetch-site',
    'sec-fetch-mode',
    'sec-fetch-dest',
    'sec-fetch-user',
    'sec-ch-ua',
    'sec-ch-ua-platform',
    'sec-ch-ua-mobile',
  ];
  const headerString = headerParameters
    .map((value) => headers.get(value))
    .join('-');
  const imprint = crypto
    .createHash('sha256')
    .update(headerString)
    .digest('hex');

  return hashed ? imprint : headerString;
}

//Verify the given fingerprint by matching with the headers
export function verifyDeviceImprint(headers: Headers, givenImprint: string) {
  const deviceImprint = generateDeviceImprint(headers);
  return deviceImprint === givenImprint;
}

//generate jwt
export function generateIdentifierToken({
  headerImprint,
  uniqueID,
}: {
  headerImprint: string;
  uniqueID: string;
}) {
  const token = jwt.sign(
    {
      headerImprint,
      uniqueID,
    },
    SECRET,
  );

  return token;
}

type TVerificationResult =
  | {
      verified: true;
      result: TTokenPayload;
    }
  | { verified: false; errorMessage: string };

//verify jwt and get the payload
export function verifyIdentifierToken(token: string): TVerificationResult {
  try {
    const result = jwt.verify(token, SECRET) as TTokenPayload;
    return { verified: true, result };
  } catch (error) {
    return {
      verified: false,
      errorMessage: 'Unable to verify authorization token',
    };
  }
}
