import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { useEffect, lazy, Suspense } from "react";
import SocialShare from "@/components/SocialShare";
import { Helmet } from "react-helmet";
import { LazyImage } from "@/components/LazyImage";

const SyntaxHighlighter = lazy(() => 
  import("react-syntax-highlighter").then(mod => ({ default: mod.Prism }))
);

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  useEffect(() => {
    if (post?.id) {
      supabase
        .from("blog_posts")
        .update({ views: (post.views || 0) + 1 })
        .eq("id", post.id)
        .then();
    }
  }, [post?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-96 bg-muted rounded" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Helmet>
        <title>{post.title} - MunAiTech Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Organization",
              "name": "MunAiTech",
              "legalName": "15071995 LLC"
            },
            "datePublished": post.published_at,
            "keywords": post.tags?.join(", ")
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
                </div>
              )}
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{post.read_time} min read</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <SocialShare 
                url={currentUrl}
                title={post.title}
                description={post.excerpt}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-8">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <LazyImage
                src={post.featured_image}
                alt={post.title}
                className="w-full rounded-lg shadow-2xl"
                width={1200}
                height={600}
                srcSet={`
                  ${post.featured_image}?w=600 600w,
                  ${post.featured_image}?w=1200 1200w,
                  ${post.featured_image}?w=1800 1800w
                `}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Post Content */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <ReactMarkdown
              components={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    post.content.includes('```') ? (
                      <Suspense fallback={<div className="bg-gray-900 p-4 rounded">Loading code...</div>}>
                        <SyntaxHighlighter
                          style={{
                            'code[class*="language-"]': { background: '#1e1e1e', color: '#d4d4d4' },
                            'pre[class*="language-"]': { background: '#1e1e1e', padding: '1em', borderRadius: '0.5em' },
                            'comment': { color: '#608b4e' },
                            'string': { color: '#ce9178' },
                            'keyword': { color: '#569cd6' },
                            'function': { color: '#dcdcaa' },
                            'number': { color: '#b5cea8' },
                          }}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </Suspense>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default BlogPost;
