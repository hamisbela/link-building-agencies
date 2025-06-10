import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export interface CompanyData {
  id: string;
  longDescription: string;
  website: string;
  companyName: string;
  hourlyRate: string;
  numberOfEmployees: string;
  city: string;
  country: string;
  isUS: boolean;
  services: string[];
}

export interface LocationData {
  type: 'country' | 'state' | 'city';
  name: string;
  country: string;
  state?: string;
  companies: CompanyData[];
}

let companiesCache: CompanyData[] | null = null;

export async function loadCompanies(): Promise<CompanyData[]> {
  if (companiesCache) {
    return companiesCache;
  }

  const csvPath = path.join(process.cwd(), 'data', 'companies.csv');
  
  // Check if CSV file exists
  if (!fs.existsSync(csvPath)) {
    console.warn('CSV file not found, using sample data');
    return getSampleData();
  }

  return new Promise((resolve, reject) => {
    const companies: CompanyData[] = [];
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        const company: CompanyData = {
          id: `${row['Company Name']?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${companies.length}`,
          longDescription: row['Company Long Description'] || '',
          website: row['Website'] || '',
          companyName: row['Company Name'] || '',
          hourlyRate: row['Hourly Rate'] || '',
          numberOfEmployees: row['Number Of Employees'] || '',
          city: row['City'] || '',
          country: row['Country'] || '',
          isUS: row['US'] === 'Yes',
          services: row['Services'] ? row['Services'].split(',').map((s: string) => s.trim()).filter((s: string) => s) : []
        };
        companies.push(company);
      })
      .on('end', () => {
        companiesCache = companies;
        resolve(companies);
      })
      .on('error', reject);
  });
}

function getSampleData(): CompanyData[] {
  return [
    {
      id: 'search-found-1',
      longDescription: 'Search and found, a renowned SEO company in Pakistan helps you to get a highly SEO optimized website that will rank top in google searches.',
      website: 'https://searchnfound.com/',
      companyName: 'Search & found',
      hourlyRate: '$25 - $49 / hr',
      numberOfEmployees: '2 - 9',
      city: 'Karachi',
      country: 'Pakistan',
      isUS: false,
      services: ['Affiliate Marketing', 'Branding', 'Digital Strategy', 'Content Marketing', 'Link earning & development', 'SEO']
    },
    {
      id: 'synergist-digital-2',
      longDescription: 'Synergist Digital Media is a digital marketing agency specializing in Web Development, SEO, Content Marketing, Pay Per Click, Reputation Management.',
      website: 'https://synergistdigitalmedia.com/',
      companyName: 'Synergist Digital Media',
      hourlyRate: '$150 - $199 / hr',
      numberOfEmployees: '10 - 49',
      city: 'Philadelphia',
      country: 'PA',
      isUS: true,
      services: ['Pay Per Click', 'Web Development', 'Social Media Marketing', 'Link earning & development', 'SEO']
    },
    {
      id: 'traction-marketing-3',
      longDescription: 'Whether you\'re looking for a single marketing service or a fully outsourced marketing department, we\'re ready to help.',
      website: 'https://tractionmarketing.nz/',
      companyName: 'Traction Marketing',
      hourlyRate: '$200 - $300 / hr',
      numberOfEmployees: '10 - 49',
      city: 'Christchurch',
      country: 'New Zealand',
      isUS: false,
      services: ['Pay Per Click', 'Digital Strategy', 'Email Marketing', 'Link earning & development', 'SEO']
    },
    {
      id: 'thinkbig-media-4',
      longDescription: 'Now get 19X More Brand Exposure Online with 1st-Page Search Results & a 5-Star Reputation Making You the 1st Choice for Buyers.',
      website: 'https://thinkbigandgrowmedia.com/',
      companyName: 'ThinkBigandGrow Media',
      hourlyRate: '$50 - $99 / hr',
      numberOfEmployees: '2 - 9',
      city: 'Las Vegas',
      country: 'NV',
      isUS: true,
      services: ['Digital Strategy', 'Pay Per Click', 'Web Design', 'Link earning & development', 'SEO']
    }
  ];
}

export async function getLocationPages(): Promise<LocationData[]> {
  const companies = await loadCompanies();
  const locationMap = new Map<string, LocationData>();

  companies.forEach(company => {
    // Country pages
    const countryKey = `country-${company.country}`;
    if (!locationMap.has(countryKey)) {
      locationMap.set(countryKey, {
        type: 'country',
        name: company.country,
        country: company.country,
        companies: []
      });
    }
    locationMap.get(countryKey)!.companies.push(company);

    // State pages (for US companies)
    if (company.isUS) {
      const stateKey = `state-${company.country}`;
      if (!locationMap.has(stateKey)) {
        locationMap.set(stateKey, {
          type: 'state',
          name: company.country,
          country: 'United States',
          state: company.country,
          companies: []
        });
      }
      locationMap.get(stateKey)!.companies.push(company);
    }

    // City pages
    const cityKey = `city-${company.city}-${company.country}`;
    if (!locationMap.has(cityKey)) {
      locationMap.set(cityKey, {
        type: 'city',
        name: company.city,
        country: company.isUS ? 'United States' : company.country,
        state: company.isUS ? company.country : undefined,
        companies: []
      });
    }
    locationMap.get(cityKey)!.companies.push(company);
  });

  return Array.from(locationMap.values());
}

export function generateLocationSlug(location: LocationData): string {
  if (location.type === 'country') {
    return `location/${location.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  } else if (location.type === 'state') {
    return `location/united-states/${location.state!.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  } else {
    const countrySlug = location.country.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const citySlug = location.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    if (location.state) {
      const stateSlug = location.state.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return `location/united-states/${stateSlug}/${citySlug}`;
    } else {
      return `location/${countrySlug}/${citySlug}`;
    }
  }
}