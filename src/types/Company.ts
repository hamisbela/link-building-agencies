export interface SocialMedia {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  url: string;
}

export interface Service {
  name: string;
  description: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
  services: Service[];
  averageReview: number;
  website: string;
  socialMedia: SocialMedia[];
  email: string;
  phone: string;
  address: string;
}