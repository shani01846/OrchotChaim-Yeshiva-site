// Homepage and core pages
export const GET_HOMEPAGE = `
  *[_type == "page" && slug == "homepage"][0] {
    _id,
    title_he,
    title_en,
    slug,
    seo_he {
      metaTitle,
      metaDescription,
    },
    seo_en {
      metaTitle,
      metaDescription,
    },
    sections[] {
      _key,
      _type,
      ...
    }
  }
`;

export const GET_PAGE_BY_SLUG = (slug: string, locale: string) => `
  *[_type == "page" && slug == "${slug}"][0] {
    _id,
    title_${locale},
    slug,
    content_${locale},
    seo_${locale} {
      metaTitle,
      metaDescription,
    }
  }
`;

export const GET_STUDENT_STORIES = (limit: number = 10) => `
  *[_type == "studentStory" && isPublished == true] 
  | order(publishedAt desc) 
  [0...${limit}] {
    _id,
    firstName_he,
    firstName_en,
    slug,
    openingLine_he,
    openingLine_en,
    featured,
    photo {
      asset -> { 
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt_he,
      alt_en
    }
  }
`;

export const GET_STORY_BY_SLUG = (slug: string) => `
  *[_type == "studentStory" && slug == "${slug}"][0] {
    _id,
    firstName_he,
    firstName_en,
    story_he,
    story_en,
    impactStatement_he,
    impactStatement_en,
    photo {
      asset -> { 
        url
      },
      alt_he,
      alt_en
    },
    publishedAt,
    seo_he {
      metaTitle,
      metaDescription
    },
    seo_en {
      metaTitle,
      metaDescription
    }
  }
`;

export const GET_TESTIMONIALS = (limit: number = 5) => `
  *[_type == "testimonial" && isPublished == true]
  | order(publishedAt desc)
  [0...${limit}] {
    _id,
    quote_he,
    quote_en,
    author_name_he,
    author_name_en,
    author_role_he,
    author_role_en,
    featured
  }
`;

export const GET_BUILDING_UPDATES = (limit: number = 5) => `
  *[_type == "buildingUpdate" && isPublished == true]
  | order(publishedAt desc)
  [0...${limit}] {
    _id,
    title_he,
    title_en,
    slug,
    excerpt_he,
    excerpt_en,
    image {
      asset -> { url },
      alt_he,
      alt_en
    },
    publishedAt
  }
`;

export const GET_NEWS_ARTICLES = (limit: number = 10) => `
  *[_type == "newsArticle" && isPublished == true]
  | order(publishedAt desc)
  [0...${limit}] {
    _id,
    title_he,
    title_en,
    slug,
    excerpt_he,
    excerpt_en,
    image {
      asset -> { url },
      alt_he,
      alt_en
    },
    publishedAt
  }
`;
