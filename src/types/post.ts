export interface Author {
  name: string;
  image?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  author: string | Author;
  image?: string;
  tags?: string[];
  category?: string;
}
