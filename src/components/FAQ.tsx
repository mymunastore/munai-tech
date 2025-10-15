import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity and scope. A simple website typically takes 2-4 weeks, while complex web applications can take 8-12 weeks or more. I provide detailed timelines during the consultation phase."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in modern web technologies including React, TypeScript, Node.js, and cloud platforms like AWS and Supabase. I also have expertise in AI integration, using OpenAI and other AI services to build intelligent applications."
    },
    {
      question: "Do you offer maintenance and support after project completion?",
      answer: "Yes! I offer ongoing maintenance and support packages tailored to your needs. This includes bug fixes, updates, security patches, and feature enhancements. We can discuss the best support plan during our consultation."
    },
    {
      question: "How do you handle project communication?",
      answer: "I believe in transparent and frequent communication. We'll have regular check-ins via your preferred method (email, Slack, video calls), and I provide access to project management tools where you can track progress in real-time."
    },
    {
      question: "What is your pricing structure?",
      answer: "I offer both project-based and hourly rates depending on the nature of the work. Use my Project Calculator to get an instant estimate, or contact me for a detailed quote based on your specific requirements."
    },
    {
      question: "Can you work with my existing team or codebase?",
      answer: "Absolutely! I'm experienced in collaborating with existing teams and working with legacy codebases. Whether you need to augment your team, refactor existing code, or build new features, I can seamlessly integrate into your workflow."
    },
    {
      question: "Do you provide design services?",
      answer: "While my primary focus is development, I collaborate with talented designers and can recommend partners. I can also implement designs you provide, ensuring pixel-perfect execution and responsive layouts."
    },
    {
      question: "What happens if I need changes after the project is completed?",
      answer: "All projects include a warranty period for bug fixes. For feature changes or enhancements, we can discuss options including hourly rates or monthly retainer agreements. I'm committed to your long-term success."
    }
  ];

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? I've got answers
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
};

export default FAQ;
