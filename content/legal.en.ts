import type { LegalPage } from '@/types/content'

/**
 * Placeholder legal copy from the design. Final wording comes from the Bid
 * Committee's legal advisers, through the CMS.
 */

const help: LegalPage['help'] = {
  title: 'Questions about this page?',
  body: 'Use the contact form and the team will come back to you.',
  cta: 'Contact us',
}

export const legalEn: LegalPage[] = [
  {
    slug: 'legal-notices',
    meta: {
      title: 'Legal Notices - Doha 2036',
      description: 'The terms on which the Doha 2036 website is provided.',
    },
    title: ['Legal', 'Notices'],
    intro:
      'These notices set out the terms on which this website is provided. Placeholder copy — final wording to be supplied by the Doha 2036 Bid Committee and its legal advisers.',
    sections: [
      {
        id: 'publisher',
        title: 'Publisher',
        paragraphs: [
          'This website is published by the Doha 2036 Bid Committee, Doha, State of Qatar. Registered office address, commercial registration number and the name of the publication director to be confirmed.',
          'For any question relating to these notices, use the contact form on this site.',
        ],
      },
      {
        id: 'hosting',
        title: 'Hosting',
        paragraphs: [
          'Hosting provider name, legal form, registered address and contact details to be confirmed before launch. The provider operates the servers on which this site is stored and delivered.',
        ],
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual property',
        paragraphs: [
          'The site, its structure, text, images, video, logos and the Doha 2036 wordmark are protected works. Reproduction, representation or adaptation, in whole or in part, is not permitted without prior written consent, except for private use.',
          'Olympic and Paralympic marks remain the property of their respective owners and are used with permission.',
        ],
      },
      {
        id: 'liability',
        title: 'Liability',
        paragraphs: [
          'Content is provided for information only and may be updated at any time. While the Committee takes care to keep information accurate, no warranty is given as to completeness or fitness for a particular purpose.',
        ],
      },
      {
        id: 'external-links',
        title: 'External links',
        paragraphs: [
          'This site may link to third-party websites. Those sites are not under the Committee’s control and the Committee accepts no responsibility for their content or their own data practices.',
        ],
      },
      {
        id: 'governing-law',
        title: 'Governing law',
        paragraphs: [
          'These notices are governed by the laws of the State of Qatar. Placeholder to be confirmed with legal counsel.',
        ],
      },
    ],
    help,
  },
  {
    slug: 'privacy',
    meta: {
      title: 'Privacy - Doha 2036',
      description: 'How the Doha 2036 website handles personal data.',
    },
    title: ['Privacy'],
    intro:
      'How this website collects and uses personal data. Placeholder copy — final wording to be supplied by the Doha 2036 Bid Committee and its legal advisers.',
    sections: [
      {
        id: 'data-we-collect',
        title: 'Data we collect',
        paragraphs: ['Placeholder — to be supplied by the Committee’s legal advisers.'],
      },
      {
        id: 'your-rights',
        title: 'Your rights',
        paragraphs: ['Placeholder — to be supplied by the Committee’s legal advisers.'],
      },
    ],
    help,
  },
  {
    slug: 'transparency',
    meta: {
      title: 'Transparency - Doha 2036',
      description: 'How the Doha 2036 Bid Committee reports on its work.',
    },
    title: ['Transparency'],
    intro:
      'How the Bid Committee reports on its work. Placeholder copy — final wording to be supplied by the Doha 2036 Bid Committee and its legal advisers.',
    sections: [
      {
        id: 'governance',
        title: 'Governance',
        paragraphs: ['Placeholder — to be supplied by the Committee’s legal advisers.'],
      },
    ],
    help,
  },
]
