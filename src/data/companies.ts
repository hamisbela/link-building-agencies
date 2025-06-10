import type { Company } from '../types/Company';

export const companies: Company[] = [
  {
    id: '1',
    name: 'LinkMaster Pro',
    description: 'Premium link building services with focus on quality content and white-hat techniques.',
    country: 'United States',
    city: 'San Francisco',
    services: [
      {
        name: 'Guest Posting',
        description: 'High-quality guest posts on relevant websites'
      },
      {
        name: 'Broken Link Building',
        description: 'Finding and replacing broken links with your content'
      }
    ],
    averageReview: 4.8,
    website: 'https://linkmasterpro.com',
    socialMedia: [
      { platform: 'twitter', url: 'https://twitter.com/linkmasterpro' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/linkmasterpro' }
    ],
    email: 'contact@linkmasterpro.com',
    phone: '+1 (555) 123-4567',
    address: '123 Market Street, San Francisco, CA 94105'
  },
  {
    id: '2',
    name: 'SEO Link Builders',
    description: 'Specialized in creating natural backlink profiles for businesses.',
    country: 'United Kingdom',
    city: 'London',
    services: [
      {
        name: 'Digital PR',
        description: 'Building links through press releases and media coverage'
      },
      {
        name: 'Skyscraper Technique',
        description: 'Creating superior content and earning backlinks'
      }
    ],
    averageReview: 4.6,
    website: 'https://seolinkbuilders.co.uk',
    socialMedia: [
      { platform: 'twitter', url: 'https://twitter.com/seolinkbuilders' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/seolinkbuilders' }
    ],
    email: 'info@seolinkbuilders.co.uk',
    phone: '+44 20 7123 4567',
    address: '45 Oxford Street, London, W1D 2DZ'
  },
  {
    id: '3',
    name: 'Global Link Solutions',
    description: 'International link building agency specializing in multilingual outreach.',
    country: 'Germany',
    city: 'Berlin',
    services: [
      {
        name: 'International Outreach',
        description: 'Multilingual link building campaigns'
      },
      {
        name: 'Content Translation',
        description: 'Content localization and international link acquisition'
      }
    ],
    averageReview: 4.7,
    website: 'https://globallinksolutions.de',
    socialMedia: [
      { platform: 'twitter', url: 'https://twitter.com/globallinksol' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/globallinksolutions' }
    ],
    email: 'contact@globallinksolutions.de',
    phone: '+49 30 1234 5678',
    address: 'Friedrichstraße 123, 10117 Berlin, Germany'
  },
  {
    id: '4',
    name: 'Link Authority',
    description: 'Focused on building high-authority backlinks for enterprise clients.',
    country: 'Canada',
    city: 'Toronto',
    services: [
      {
        name: 'Authority Link Building',
        description: 'Securing links from high-authority domains'
      },
      {
        name: 'Competitor Analysis',
        description: 'In-depth backlink gap analysis and acquisition'
      }
    ],
    averageReview: 4.9,
    website: 'https://linkauthority.ca',
    socialMedia: [
      { platform: 'twitter', url: 'https://twitter.com/linkauthority' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/linkauthority' }
    ],
    email: 'info@linkauthority.ca',
    phone: '+1 (416) 555-0123',
    address: '789 Bay Street, Toronto, ON M5H 2N2'
  }
];