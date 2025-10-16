import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";
import sarahJohnson from "@/assets/testimonials/sarah-johnson.jpg";
import michaelChen from "@/assets/testimonials/michael-chen.jpg";
import emilyDavis from "@/assets/testimonials/emily-davis.jpg";

const testimonials = [
  {
    quote: "Kingsley's expertise in AI integration transformed our operations completely. The custom solution he built increased our efficiency by 300% and gave us a significant competitive edge in our market.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    image: sarahJohnson,
  },
  {
    quote: "Outstanding technical expertise and innovative approach. Kingsley delivered a full-stack solution that exceeded our expectations and was completed ahead of schedule. Highly recommend his services.",
    author: "Michael Chen",
    role: "Founder, E-commerce Pro",
    image: michaelChen,
  },
  {
    quote: "Professional, reliable, and incredibly skilled. Kingsley's AI-powered web application revolutionized our customer service process and the results speak for themselves - 250% increase in efficiency.",
    author: "Emily Davis",
    role: "CTO, InnovateCorp",
    image: emilyDavis,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Clients Say About
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Working With Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from real clients who have transformed their businesses with my solutions
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-accent/50 relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 text-accent" />
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
