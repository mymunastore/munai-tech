import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title = "MunAiTech | AI Infrastructure & Cybersecurity Engineering",
  description = "AI infrastructure and cybersecurity engineering company building production-grade intelligent systems for enterprise environments.",
  keywords = "MunAiTech, AI infrastructure, cybersecurity engineering, enterprise AI, AI systems architect, cloud infrastructure",
  image = "https://munai.tech/og-image.jpg",
  url = typeof window !== "undefined" ? window.location.href : "https://munai.tech",
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
      <meta name="author" content="MunAiTech" />
    </Helmet>
  );
};
