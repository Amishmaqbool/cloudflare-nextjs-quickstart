import { Key, ReactNode } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RatingsProps {
  totalRatings: number;
  oneStarRatings?: number;
  twoStarRatings?: number;
  threeStarRatings?: number;
  fourStarRatings?: number;
  fiveStarRatings?: number;
  showTotalOnly?: boolean;
}
export interface AdvertisementButtonProps {
  buttonText: string;
  url: string;
  shouldOpenANewTab: boolean;
  descriptionButton: string;
  organizationLogo: {
    src: string;
    alt: string;
  };
  parameter: string;
}

export interface CategoryProps {
  title: string;
  description?: string;
  slug: string;
  relatedApps?: {
    ratings: any;
    slug: string;
    appLogo?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    title: string;
    bodyCopy: string;
    downloads: string;
    developer: string;
    category: string[];
    androidOs: string;
    version: string;
    price: string;
  }[];
  categoryLogo?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
}

export interface AppProps {
  objectId: Key | null | undefined;
  appLogo: {
    width: number;
    height: number;
    src: string;
    alt: string;
  };
  id: string;
  slug: string;
  title: string;
  bodyCopy: string;
  downloads: string;
  developer: string;
  category: string[];
  androidOs: string;
  version: string;
  price: string;
  ratings: RatingsProps;
  tags: string[];
  advertisementButton?: AdvertisementButtonProps;
  backgroundImage?: string;
  appScreenshots?: {
    src: string;
    width: string;
    height: string;
    alt: string;
  }[];
  showCarousel?: boolean;
  appleStoreButton?: {
    url:string;
  };
  googleAppStoreButton?: {
    url:string;
  };
}

export interface RatingsProps {
  totalRatings: number;
  oneStarRatings?: number;
  twoStarRatings?: number;
  starRatings?: number;
  fourStarRatings?: number;
  fiveStarRatings?: number;
  showTotalOnly?: boolean;
}

export interface PageProps {
  title: string;
  slug: string;
  sections?: any[];
}

export interface LegalPageProps {
  title: string;
  slug: string;
  bodyCopy?: any[];
}

export interface CategoryProps {
  title: string;
  relatedCategories: any[];
}

interface BlogImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface BlogPost {
  description: ReactNode;
  blogPostIssueDate: ReactNode;
  slug: string;
  title: string;
  blogImage?: BlogImage;
}
export interface BlogProps {
  title: string;
  blogPosts?:  BlogPost[];
}
