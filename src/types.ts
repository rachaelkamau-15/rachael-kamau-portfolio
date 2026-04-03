export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Software Engineering' | 'Cybersecurity' | 'Cloud Security';
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  mediumUrl?: string;
  tags: string[];
}

export interface MediumArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  medium: string;
  github: string;
  credly?: string;
}
