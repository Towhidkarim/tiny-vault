import Navbar from '@/components/navbar';
import React from 'react';

export default function page() {
  return (
    <main className='mx-auto max-w-7xl'>
      <Navbar />

      <div className='space-y-8 mx-auto p-6 max-w-4xl'>
        {/* Terms of Service */}
        <section className='bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl'>
          <h2 className='mb-4 font-bold text-2xl'>Terms of Service</h2>
          <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
            By using Tiny Vault, you agree to comply with these terms. Tiny
            Vault is a lightweight file-sharing platform designed for temporary
            storage and sharing of small files. You are responsible for the
            content you upload, and you must not upload illegal, harmful, or
            copyrighted material without permission.
          </p>
          <p className='mt-2 text-gray-700 dark:text-gray-300 leading-relaxed'>
            Tiny Vault does not require accounts, and all uploaded files may be
            stored temporarily on our servers. While we strive to maintain
            uptime and security, we are not liable for data loss, unauthorized
            access, or misuse. By using Tiny Vault, you acknowledge that your
            use is at your own risk and that you agree to these terms.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className='bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl'>
          <h2 className='mb-4 font-bold text-2xl'>Privacy Policy</h2>
          <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
            Your privacy is important to us. Tiny Vault does not require account
            creation, and we do not collect personal information unless you
            voluntarily provide it (e.g., through optional alias or feedback
            forms).
          </p>
          <p className='mt-2 text-gray-700 dark:text-gray-300 leading-relaxed'>
            Files uploaded are temporarily stored and linked to a unique
            session-based identifier (JWT) tied to your device.
            Password-protected vaults are encrypted in transit and stored
            securely. We do not share your files or identifiers with third
            parties unless required by law.
          </p>
          <p className='mt-2 text-gray-700 dark:text-gray-300 leading-relaxed'>
            We may use cookies or local storage to maintain session data and
            improve user experience. By using Tiny Vault, you consent to our use
            of these technologies in accordance with this privacy policy.
          </p>
        </section>
      </div>
    </main>
  );
}
