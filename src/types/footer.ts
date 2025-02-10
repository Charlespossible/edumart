// src/types/footer.ts
export interface FooterLink {
    label: string; // Text displayed for the link
    href: string; // URL to navigate to
  }
  
  export interface SocialLink {
    icon: JSX.Element; // Icon for the social link (e.g., from Heroicons)
    href: string; // URL for the social media platform
  }
  