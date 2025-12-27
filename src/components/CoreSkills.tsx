const CoreSkills = () => {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Core Skills
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Frontend</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Backend</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>REST APIs</li>
                <li>Supabase</li>
                <li>Firebase</li>
              </ul>
            </div>

            {/* Databases */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Databases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
            </div>

            {/* Cloud & DevOps */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Cloud & DevOps</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>AWS</li>
                <li>Vercel</li>
                <li>Docker</li>
                <li>Git / GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreSkills;
