import DefaultWrapper from '@/components/default-wrapper';
import SectionSubtitle from '@/components/SectionSubtitle';
import SectionTitle from '@/components/SectionTitle';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import {
  Download,
  FileCode2,
  FileText,
  Hash,
  Section,
  ShieldIcon,
} from 'lucide-react';

const features = [
  {
    Icon: FileText,
    name: 'Drag & Drop Upload',
    description:
      'Easily upload files—docs, code, images—using a simple drag-and-drop interface.',
    href: '/create',
    cta: 'Upload now',
    background: <img className='-top-20 -right-20 absolute opacity-60' />,
    className:
      'lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3 max-h-[300px] md:max-h-full',
  },
  {
    Icon: FileCode2,
    name: 'Live Code & Text Editor',
    description:
      'Create or paste text and code snippets with real-time editing and preview.',
    href: '/create',
    cta: 'Try it',
    background: <img className='-bottom-24 -left-24 absolute opacity-60' />,
    className:
      'lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 max-h-[300px] md:max-h-full',
  },
  {
    Icon: ShieldIcon,
    name: 'Password-Protected Vaults',
    description:
      'Secure your vaults with passwords stored safely in cookies for privacy.',
    href: '/create',
    cta: 'Secure your vault',
    background: <img className='-right-16 -bottom-16 absolute opacity-60' />,
    className:
      'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 max-h-[300px] md:max-h-full',
  },
  {
    Icon: Hash,
    name: 'Unique Shareable URLs',
    description:
      'Every vault gets its own unique link—instantly shareable and easy to access.',
    href: '/create',
    cta: 'Share now',
    background: <img className='-top-20 -left-20 absolute opacity-60' />,
    className:
      'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 max-h-[300px] md:max-h-full',
  },
  {
    Icon: Download,
    name: 'Download as ZIP',
    description:
      'Download files individually or grab the entire vault as a ZIP bundle.',
    href: '/create',
    cta: 'Download options',
    background: <img className='-top-24 -right-24 absolute opacity-60' />,
    className:
      'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3 max-h-[300px] md:max-h-full',
  },
];

export function FeatureSection() {
  return (
    <section className='my-10'>
      <DefaultWrapper>
        <SectionTitle>Features</SectionTitle>
        <SectionSubtitle>
          We offer several lucrative features better than alternatives
        </SectionSubtitle>
        <br />
        <BentoGrid className='lg:grid-rows-2'>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </DefaultWrapper>
    </section>
  );
}
