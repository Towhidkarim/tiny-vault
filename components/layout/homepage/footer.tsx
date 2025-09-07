import MainLogo from '@/components/main-logo';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Shield,
  Zap,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function FooterSection() {
  const navItems = [
    { title: 'Create Vault', url: '/create' },
    { title: 'How to', url: '/how-to' },
    { title: 'Reviews', url: '/reviews' },
    { title: 'Contact Me', url: '/contact' },
  ];

  const features = [
    { icon: Shield, title: 'Secure', description: 'End-to-end encryption' },
    { icon: Zap, title: 'Fast', description: 'Lightning quick sharing' },
    { icon: Lock, title: 'Private', description: 'Password protected vaults' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Towhidkarim/', label: 'GitHub' },
    // { icon: Twitter, href: '#', label: 'Twitter' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/towhidkarim/',
      label: 'LinkedIn',
    },
    { icon: Mail, href: 'mailto:towhidkarim123@gmail.com', label: 'Email' },
  ];

  return (
    <footer className='bg-white border-gray-100 border-t'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl'>
        <div className='gap-12 lg:gap-16 grid grid-cols-1 md:grid-cols-4'>
          {/* Brand section */}
          <div className='md:col-span-2'>
            <div className='flex items-center space-x-3 mb-6'>
              <MainLogo />
            </div>
            <p className='mb-8 max-w-lg text-gray-600 text-base leading-relaxed'>
              Secure, fast, and private file sharing with zero hassle. Create
              encrypted vaults and share files with complete confidence and
              control.
            </p>

            <div className='gap-3 grid grid-cols-1'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors duration-200'
                >
                  <div className='flex justify-center items-center bg-white shadow-sm rounded-lg w-8 h-8'>
                    <feature.icon className='w-4 h-4 text-blue-600' />
                  </div>
                  <div>
                    <div className='font-medium text-gray-900 text-sm'>
                      {feature.title}
                    </div>
                    <div className='text-gray-500 text-xs'>
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='mb-6 font-semibold text-gray-900 text-sm uppercase tracking-wider'>
              Navigation
            </h3>
            <ul className='space-y-3'>
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    className='text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-6 font-semibold text-gray-900 text-sm uppercase tracking-wider'>
              Connect
            </h3>
            <div className='space-y-3'>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className='group flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-200'
                >
                  <div className='flex justify-center items-center bg-gray-100 group-hover:bg-blue-50 rounded-lg w-8 h-8 transition-colors duration-200'>
                    <social.icon className='w-4 h-4 group-hover:text-blue-600' />
                  </div>
                  <span className='text-sm'>{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-20 pt-8 border-gray-100 border-t'>
          <div className='flex md:flex-row flex-col justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-gray-500 text-sm'>
              © {new Date().getFullYear()} TinyVault. All rights reserved.
            </div>
            <div className='flex space-x-8 text-sm'>
              <Link
                href='/tos'
                className='text-gray-500 hover:text-gray-900 transition-colors duration-200'
              >
                Privacy Policy
              </Link>
              <Link
                href='/tos'
                className='text-gray-500 hover:text-gray-900 transition-colors duration-200'
              >
                Terms of Service
              </Link>
              <Link
                href='/tos'
                className='text-gray-500 hover:text-gray-900 transition-colors duration-200'
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
