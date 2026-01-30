import { Helmet } from "react-helmet";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  breadcrumbs?: BreadcrumbItem[];
  type?: 'website' | 'article' | 'person';
  articleData?: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    image?: string;
  };
}

export const StructuredData = ({ breadcrumbs, type = 'website', articleData }: StructuredDataProps) => {
  const baseUrl = "https://munai.tech";
  
  // WebSite schema for search engines
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kingsley Munachi - Web Developer Portfolio",
    "alternateName": "MunAiTech",
    "url": baseUrl,
    "description": "Web Developer with 5+ years experience specializing in React, Next.js, Node.js, TypeScript, and AI integration.",
    "author": {
      "@type": "Person",
      "name": "Kingsley Munachi",
      "jobTitle": "Full-Stack Web Developer",
      "url": baseUrl
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // BreadcrumbList schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  } : null;

  // Person schema for about page
  const personSchema = type === 'person' ? {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kingsley Munachi",
    "alternateName": "MunAiTech",
    "url": baseUrl,
    "image": `${baseUrl}/og-about.jpg`,
    "jobTitle": "Full-Stack Web Developer & AI Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "15071995 LLC"
    },
    "sameAs": [
      "https://github.com/munai-tech",
      "https://linkedin.com/in/kingsley-munachi"
    ],
    "knowsAbout": [
      "React", "Next.js", "TypeScript", "Node.js", 
      "AI Integration", "Web Development", "UI/UX Design"
    ]
  } : null;

  // Article schema for blog posts
  const articleSchema = type === 'article' && articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.headline,
    "datePublished": articleData.datePublished,
    "dateModified": articleData.dateModified || articleData.datePublished,
    "author": {
      "@type": "Person",
      "name": articleData.author,
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "MunAiTech",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.ico`
      }
    },
    "image": articleData.image || `${baseUrl}/og-blog.jpg`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": baseUrl
    }
  } : null;

  return (
    <Helmet>
      {/* Always include WebSite schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* BreadcrumbList if provided */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* Person schema for about page */}
      {personSchema && (
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      )}
      
      {/* Article schema for blog posts */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};
