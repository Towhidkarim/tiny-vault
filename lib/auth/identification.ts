import 'server-only';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import crypto, { hash } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';

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
export async function generateIdentifierToken({
  headerImprint,
  uniqueID,
}: {
  headerImprint: string;
  uniqueID: string;
}) {
  const encodedSecret = new TextEncoder().encode(SECRET);
  const token = new SignJWT({ headerImprint, uniqueID })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(encodedSecret);

  const res = await token;
  return res;
}

type TVerificationResult =
  | {
      verified: true;
      result: TTokenPayload;
    }
  | { verified: false; errorMessage: string };

//verify jwt and get the payload
export async function verifyIdentifierToken(
  token: string,
): Promise<TVerificationResult> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET),
      { algorithms: ['HS256'] },
    );
    return { verified: true, result: payload as TTokenPayload };
  } catch (error) {
    return {
      verified: false,
      errorMessage: 'Unable to verify authorization token',
    };
  }
}

export async function validateToken(token: string, headers: Headers) {
  const tokenData = await verifyIdentifierToken(token);
  if (!tokenData.verified) return false;
  const imprintVerified = verifyDeviceImprint(
    headers,
    tokenData.result.headerImprint,
  );
  if (!imprintVerified) return false;
  return true;
}
