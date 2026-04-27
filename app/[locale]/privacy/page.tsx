import React from 'react';
import PrivacyClient from './PrivacyClient';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'mn' ? 'Нууцлалын бодлого' : 'Privacy Policy',
    description: locale === 'mn' ? 'Монголын Сайн Дурынхны Төв (VCM) - Нууцлалын бодлого' : 'Volunteer Center Mongolia (VCM) - Privacy Policy',
  };
}

export default function PrivacyPage() {
  return <PrivacyClient />;
}
