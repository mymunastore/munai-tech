import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title = "Kingsley Munachi - AI Full-Stack Developer & Web Designer",
  description = "Senior Web Designer & AI Full-Stack App Developer with 5+ years of experience. Specializing in React, TypeScript, AI integration, and custom SaaS development.",
  keywords = "web developer, AI developer, full-stack developer, React developer, TypeScript, web design, UI/UX, Kingsley Munachi",
  image = "/og-image.jpg",
  url = "https://munai.tech",
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Kingsley Munachi" />
    </Helmet>
  );
};
