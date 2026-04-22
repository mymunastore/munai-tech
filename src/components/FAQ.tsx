import { memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = memo(() => {
  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity and scope. A simple website typically takes 2-4 weeks, while complex web applications can take 8-12 weeks or more. We provide detailed timelines during the consultation phase."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in modern web technologies including React, TypeScript, Node.js, and cloud platforms like AWS and Supabase. We also have deep expertise in AI integration and cybersecurity engineering."
    },
    {
      question: "Do you offer maintenance and support after project completion?",
      answer: "Yes! We offer ongoing maintenance and support packages tailored to your needs. This includes bug fixes, updates, security patches, and feature enhancements. We can discuss the best support plan during our consultation."
    },
    {
      question: "How do you handle project communication?",
      answer: "We believe in transparent and frequent communication. We'll have regular check-ins via your preferred method (email, Slack, video calls), and provide access to project management tools where you can track progress in real-time."
    },
    {
      question: "What is your pricing structure?",
      answer: "We offer both project-based and hourly rates depending on the nature of the work. Contact us for a detailed quote based on your specific requirements, and we'll find a structure that works for your budget and timeline."
    },
    {
      question: "Can you work with my existing team or codebase?",
      answer: "Absolutely! We're experienced in collaborating with existing teams and working with legacy codebases. Whether you need to augment your team, refactor existing code, or build new features, we can seamlessly integrate into your workflow."
    },
    {
      question: "Do you provide design services?",
      answer: "While our primary focus is engineering, we collaborate with talented designers and can recommend partners. We also implement designs you provide, ensuring pixel-perfect execution and responsive layouts."
    },
    {
      question: "What happens if I need changes after the project is completed?",
      answer: "All projects include a warranty period for bug fixes. For feature changes or enhancements, we can discuss options including hourly rates or monthly retainer agreements. We're committed to your long-term success."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? I'd love to hear from you.
            </p>
            <a 
              href="/contact" 
              className="text-primary hover:underline font-medium"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

FAQ.displayName = "FAQ";

export default FAQ;
