import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const ClientLogos = () => {
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
  });

  if (!clients || clients.length === 0) return null;

  return (
    <section className="py-16 bg-background">
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
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {clients.map((client) => (
              <CarouselItem key={client.id} className="md:basis-1/3 lg:basis-1/5">
                <Card className="p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow">
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ClientLogos;
