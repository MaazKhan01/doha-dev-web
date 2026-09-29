import type { StaticContent } from '@/types/content'

export const homeEn: StaticContent = {
  meta: {
    title: 'Doha 2036 - A Games For All Summers',
    description:
      'Doha is exploring the opportunity to host the Olympic and Paralympic Games in 2036.',
  },
  chrome: {
    skipToContent: 'Skip to content',
  },
  modals: {
    newsletter: {
      eyebrow: 'Newsletter',
      heading: ['Stay with', 'the journey'],
      body: 'Be the first to hear about the Doha 2036 bid — milestones, announcements and stories from the region.',
      emailLabel: 'Email address',
      emailPlaceholder: 'your@email.com',
      consent:
        'I agree to receive updates from the Doha 2036 Bid Committee and accept the Privacy Notice.',
      submit: 'Sign up',
      submitting: 'Signing up…',
      success: 'Thank you — you are on the list.',
      error: 'Something went wrong. Please try again.',
      close: 'Close',
    },
    contact: {
      eyebrow: 'Contact us',
      heading: ['Get in touch'],
      body: 'Media, partnership or general enquiries — send us a note and the team will come back to you.',
      fields: {
        name: { label: 'Name', placeholder: 'Full name' },
        email: { label: 'Email', placeholder: 'your@email.com' },
        subject: { label: 'Subject', placeholder: 'What is your enquiry about?' },
        message: { label: 'Message', placeholder: 'Write your message…' },
      },
      note: 'We reply within 5 working days.',
      submit: 'Send',
      submitting: 'Sending…',
      success: 'Thank you — your message has been sent.',
      error: 'Something went wrong. Please try again.',
      close: 'Close',
    },
  },
  header: {
    logo: {
      src: '',
      alt: 'Doha — aspiring to welcome the Olympic and Paralympic Games',
    },
    menus: [{ label: 'Contact', href: '#contact', children: [] }],
  },
  hero: {
    heading: [{ text: 'A Games For' }, { text: 'All Summers' }],
    video: {
      // Temporary local cut until the CMS serves the hero media.
      src: '/media/hero.mp4',
      poster: '',
      alt: 'Qatari riders competing in an equestrian race',
    },
  },
  intro: {
    heading: [
      { text: 'Together', accent: true },
      { text: 'in Doha', accent: true },
      { text: 'A Games' },
      { text: 'For All Our' },
      { text: 'Summers' },
    ],
    paragraphs: [
      'Doha is exploring the opportunity to host the Olympic and Paralympic Games in 2036.',
      'Our vision is to deliver an Olympic and Paralympic Games that is fully inclusive, helping the Olympic Movement reach new communities at a time of profound global change.',
      'Building on our track record of hosting major international sporting events, we will create the most athlete-and fan-friendly Games ever, shaping the future of the Olympic Movement for all our summers.',
    ],
    attribution: {
      name: 'Fatima Al Kuwari',
      role: 'CEO of the Doha 2036 Olympic Bid',
    },
  },
  statement: {
    heading: [
      { text: 'Why Doha?', accent: true },
      { text: 'A Changing' },
      { text: 'World' },
      { text: 'Requires' },
      { text: 'A Trusted' },
      { text: 'Host' },
    ],
  },
  valueProps: {
    title: "Qatar's value proposition for 2036 is simple",
    description:
      'We will host the most inclusive, sustainable and engaging Olympic and Paralympic Games ever, bringing the Games to the Middle East and North Africa for the first time in history.',
    items: [
      {
        id: 'ready-infrastructure',
        title: 'Ready Infrastructure',
        body: 'Most of our venues are ready now and our operational teams are fully trained. Doha has a proven and fully operational integrated transport system. Seamless connection exists between world-class training and sports medicine facilities, creating optimal athlete conditions.',
        image: { src: '', alt: 'A fan celebrating at a sporting event in Doha' },
      },
      {
        id: 'compact-connected',
        title: 'Compact & Connected Games',
        body: "All major venues in Doha are located within approximately 130km². This means athletes and fans will benefit from reduced travel times. 80% of the world's population is within an eight-hour flight of Doha.",
        image: { src: '', alt: 'Kayaking through the mangroves of Qatar' },
      },
      {
        id: 'new-olympic-chapter',
        title: 'A New Olympic Chapter',
        body: 'The Olympic and Paralympic Games have never been held in the Arab world. Hosting in Doha would bring the Games closer to 2 billion people in MENA, Africa and Asia in the Global South, renewing global reach and creating new pathways for participation, especially for youth and women.',
        image: { src: '', alt: 'A father and child playing football in the desert' },
      },
    ],
  },
  committee: {
    title: 'Doha 2036 Bid Committee',
    description:
      'The Doha 2036 Bid Committee brings together world-class leaders united by deep experience in delivering global events and a shared passion to create a transformative Olympic and Paralympic Games for the region and the world.',
    members: [
      {
        id: 'chair',
        role: 'Chair',
        name: 'HE Sheikh Joaan bin Hamad Al-Thani',
        image: { src: '', alt: 'HE Sheikh Joaan bin Hamad Al-Thani' },
      },
      {
        id: 'vice-chair',
        role: 'Vice-Chair',
        name: 'HE Sheikha Hind bint Hamad Al-Thani',
        image: { src: '', alt: 'HE Sheikha Hind bint Hamad Al-Thani' },
      },
      {
        id: 'ceo',
        role: 'CEO',
        name: 'Fatima Al Kuwari',
        image: { src: '', alt: 'Fatima Al Kuwari' },
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        id: 'is-doha-bidding',
        question: 'Is Doha bidding for the 2036 Olympic and Paralympic Games?',
        answer:
          'Doha is engaged in dialogue regarding the opportunity to host the Olympic and Paralympic Games in 2036, in accordance with IOC procedures.',
      },
      {
        id: 'why-2036',
        question: 'Why 2036?',
        answer:
          'Qatar has spent two decades building the venues, transport and expertise required to host a Games. By 2036 that infrastructure will be mature, tested and ready, allowing us to deliver a Games that is sustainable from day one.',
      },
      {
        id: 'climate',
        question: 'How would Doha address climate concerns?',
        answer:
          'Doha has extensive experience delivering major events in its climate, from cooled stadiums to scheduling and venue design that puts athlete welfare first.',
      },
      {
        id: 'experience',
        question: "What is Doha's experience hosting global events?",
        answer:
          'Qatar has hosted the FIFA World Cup, the AFC Asian Cup, the World Athletics Championships and hundreds of international federation events, building deep operational expertise.',
      },
      {
        id: 'paralympics',
        question: 'How would the Paralympic Games be integrated?',
        answer:
          'The Paralympic Games are planned as an equal partner from the outset, with accessibility embedded in venue design, transport and the wider city experience.',
      },
      {
        id: 'legacy',
        question: 'What is the long-term legacy vision?',
        answer:
          'A Games that leaves behind stronger sporting pathways for youth and women across MENA, Africa and Asia, alongside venues and programmes that continue to serve the community.',
      },
    ],
  },
  footer: {
    newsletter: {
      label: 'Sign up for our newsletter',
      cta: 'Sign up',
    },
    socials: [
      { id: 'instagram', label: 'Instagram', href: '#' },
      { id: 'facebook', label: 'Facebook', href: '#' },
      { id: 'tiktok', label: 'TikTok', href: '#' },
      { id: 'x', label: 'X', href: '#' },
    ],
    wordmark: ['A Games', 'For All', 'Summers'],
    copyright: '© Qatar Olympic Committee',
    links: [
      { label: 'Legal Notices', href: '/en/legal-notices' },
      { label: 'Privacy', href: '/en/privacy' },
      { label: 'Transparency', href: '/en/transparency' },
    ],
    media: {
      backdrop: { src: '', alt: 'Archive photograph of pearl divers off the coast of Qatar' },
      inset: { src: '', alt: 'Swimmers diving into the water at the start of a race' },
    },
  },
}
