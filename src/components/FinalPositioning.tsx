import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FinalPositioning = memo(() => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-primary/[0.03]" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              MunAiTech builds intelligent infrastructure that powers modern organizations and national systems.
            </h2>
            
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="h-px w-12 bg-border" />
                <span className="text-sm font-medium uppercase tracking-widest">We do not build applications</span>
                <span className="h-px w-12 bg-border" />
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  We build systems that operate at scale.
                </span>
              </p>
            </div>
          </div>

          <Link to="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:shadow-xl transition-all text-base px-10 py-6 group font-semibold rounded-xl"
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

FinalPositioning.displayName = "FinalPositioning";

export default FinalPositioning;
