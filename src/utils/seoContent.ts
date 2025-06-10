import type { LocationData } from './csvLoader';

export interface SEOContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  whatTheyDo: string;
  howToChoose: string;
}

export function generateSEOContent(location: LocationData): SEOContent {
  const locationName = location.name;
  const companyCount = location.companies.length;
  
  let locationContext = '';
  if (location.type === 'country') {
    locationContext = `in ${locationName}`;
  } else if (location.type === 'state') {
    locationContext = `in ${locationName}, United States`;
  } else {
    locationContext = location.state 
      ? `in ${locationName}, ${location.state}, United States`
      : `in ${locationName}, ${location.country}`;
  }

  const title = `${companyCount} Best Link Building Agencies ${locationContext} (2024)`;
  
  const description = `Find top link building agencies ${locationContext}. Compare ${companyCount} verified agencies with reviews, pricing, and services to boost your SEO rankings.`;

  const h1 = `Best Link Building Agencies ${locationContext}`;

  const intro = `
    <p>Looking for professional link building agencies ${locationContext}? You've found the most comprehensive directory of verified link building specialists in your area. Our curated list features ${companyCount} top-rated agencies operating ${locationContext}.</p>
    
    <p>Each agency in our directory has been carefully vetted for quality, reliability, and proven results. Whether you're a local business seeking to improve your search visibility or an enterprise company looking to dominate competitive keywords, you'll find the right link building agency partner below.</p>
    
    <p>Compare pricing, services, team sizes, and client reviews to make an informed decision about your link building strategy.</p>
  `;

  const whatTheyDo = `
    <h2>What Do Link Building Agencies ${locationContext} Do?</h2>
    
    <p>Link building agencies ${locationContext} specialize in acquiring high-quality backlinks to improve your website's search engine rankings and domain authority. These professional teams use advanced strategies and industry relationships to secure valuable links from authoritative websites in your industry.</p>
    
    <h3>Core Services Offered by Agencies ${locationContext}:</h3>
    <ul>
      <li><strong>Guest Posting Campaigns:</strong> Creating high-quality content for relevant websites in exchange for authoritative backlinks</li>
      <li><strong>Digital PR & Outreach:</strong> Building relationships with journalists, bloggers, and influencers to earn natural mentions and links</li>
      <li><strong>Broken Link Building:</strong> Identifying and replacing broken links on websites with your valuable content</li>
      <li><strong>Resource Page Link Building:</strong> Getting your business listed on industry resource pages and directories</li>
      <li><strong>Content Marketing for Links:</strong> Creating shareable, linkable assets that naturally attract backlinks</li>
      <li><strong>Competitor Link Analysis:</strong> Analyzing and replicating your competitors' most valuable backlink opportunities</li>
      <li><strong>HARO (Help a Reporter Out):</strong> Providing expert commentary to journalists in exchange for high-authority links</li>
    </ul>
    
    <p>The agencies listed below combine global best practices with deep understanding of the ${location.type === 'city' ? 'local' : 'regional'} market ${locationContext}, ensuring your link building campaigns deliver maximum impact for your specific business goals.</p>
  `;

  const howToChoose = `
    <h2>How to Choose the Right Link Building Agency ${locationContext}</h2>
    
    <p>Selecting the perfect link building agency is crucial for your SEO success and business growth. Here are the essential factors to evaluate when choosing among agencies ${locationContext}:</p>
    
    <h3>1. Proven Track Record & Case Studies</h3>
    <p>Look for agencies with documented success stories, detailed case studies, and verifiable results. The best agencies will be transparent about their methodologies and eager to share client success stories.</p>
    
    <h3>2. White-Hat Techniques Only</h3>
    <p>Ensure the agency strictly follows Google's guidelines and uses only legitimate, ethical link building methods. Avoid agencies that promise unrealistic results or use questionable tactics that could harm your website.</p>
    
    <h3>3. Industry Expertise & Specialization</h3>
    <p>Choose an agency that understands your industry and has experience working with businesses similar to yours ${locationContext}. Industry-specific knowledge leads to better link opportunities and more relevant placements.</p>
    
    <h3>4. Transparent Reporting & Communication</h3>
    <p>The right agency will provide detailed monthly reports showing exactly which links they've built, from which websites, domain authority metrics, and the impact on your search rankings and organic traffic.</p>
    
    <h3>5. Quality Over Quantity Approach</h3>
    <p>Focus on agencies that prioritize high-quality, relevant links over sheer volume. A few excellent, high-authority links are far more valuable than hundreds of low-quality spam links.</p>
    
    <h3>6. Local Market Knowledge</h3>
    <p>Agencies ${locationContext} often have valuable local connections and understand regional business landscapes, which can be particularly beneficial for location-based businesses.</p>
    
    <h3>7. Pricing Transparency & Value</h3>
    <p>Look for agencies that offer clear pricing structures, detailed service breakdowns, and demonstrate clear ROI for their link building services.</p>
    
    <h3>8. Team Expertise & Resources</h3>
    <p>Evaluate the agency's team size, experience levels, and available resources. Larger teams often mean more outreach capacity and specialized expertise in different link building strategies.</p>
    
    <p>Use the detailed profiles, filters, and comparison tools below to evaluate the top link building agencies ${locationContext} and find the perfect match for your business needs, budget, and growth objectives.</p>
  `;

  return {
    title,
    description,
    h1,
    intro,
    whatTheyDo,
    howToChoose
  };
}