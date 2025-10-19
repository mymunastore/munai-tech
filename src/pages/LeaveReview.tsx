import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TestimonialForm } from "@/components/TestimonialForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const LeaveReview = () => {
  // Scroll to form on page load
  useEffect(() => {
    const formElement = document.getElementById('review-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Leave a Review - MunAiTech | Share Your Experience</title>
        <meta name="description" content="Share your experience working with MunAiTech. Your feedback helps us improve and helps others make informed decisions." />
        <meta name="keywords" content="testimonial, review, client feedback, MunAiTech review" />
        <link rel="canonical" href="https://yourdomain.com/leave-review" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <Star className="w-8 h-8 text-accent" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Share Your <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Experience</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Your feedback matters! Share your experience working with MunAiTech and help others discover quality AI-powered solutions.
              </p>

              {/* Benefits Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Quick & Easy</h3>
                    <p className="text-sm text-muted-foreground">Share your thoughts in just a few minutes</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Star className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Honest Feedback</h3>
                    <p className="text-sm text-muted-foreground">Your genuine experience helps everyone</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <ThumbsUp className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Make an Impact</h3>
                    <p className="text-sm text-muted-foreground">Help others make informed decisions</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Review Form Section */}
        <section id="review-form" className="py-16">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-border bg-card shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">Leave Your Review</CardTitle>
                  <p className="text-center text-muted-foreground">
                    All fields are important to help us understand your experience
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <TestimonialForm />
                </CardContent>
              </Card>

              {/* Privacy Note */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Your review will be reviewed before being published on the website. We respect your privacy and will only display information you consent to share.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LeaveReview;
