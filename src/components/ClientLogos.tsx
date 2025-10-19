import { memo, useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { LazyImage } from "./LazyImage";
import rorkLogo from "@/assets/clients/rork-technologies.png";
import aretLogo from "@/assets/clients/aret-uyo.png";
import ibomLogo from "@/assets/clients/ibom-air.png";
import petalzLogo from "@/assets/clients/petalz-luxe.png";
import foodieLogo from "@/assets/clients/foodie-connect.png";
import mercuriaLogo from "@/assets/clients/mercuria-chops.png";

const ClientLogos = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Pause/resume autoplay based on visibility
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (autoplayRef.current) {
          if (entry.isIntersecting) {
            autoplayRef.current.play();
          } else {
            autoplayRef.current.stop();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const logoMap: Record<string, string> = {
    "Rork Technologies": rorkLogo,
    "Aret Uyo": aretLogo,
    "Ibom Air": ibomLogo,
    "Petalz Luxe": petalzLogo,
    "FoodieConnect": foodieLogo,
    "Mercuria Chops": mercuriaLogo,
  };

  if (!clients || clients.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Trusted by Leading Companies
          </h3>
          <p className="text-muted-foreground">
            Delivering excellence for brands worldwide
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayRef.current]}
          className="w-full"
        >
          <CarouselContent>
            {clients.map((client) => (
              <CarouselItem key={client.id} className="md:basis-1/3 lg:basis-1/5">
                <Card className="p-6 flex items-center justify-center h-24 hover:shadow-lg transition-all hover:scale-105 animate-fade-in">
                  <LazyImage
                    src={logoMap[client.name] || client.logo_url}
                    alt={`${client.name} logo`}
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                    width={96}
                    height={48}
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
});

ClientLogos.displayName = "ClientLogos";

export default ClientLogos;
