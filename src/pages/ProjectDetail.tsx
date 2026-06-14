import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Lightbulb, Rocket, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import NetworkBackground from "@/components/NetworkBackground";
import Footer from "@/components/Footer";
import { getProject } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="relative min-h-screen bg-background">
      <NetworkBackground />
      <Navigation />

      <main className="relative z-10 pt-20 lg:pt-12">
        <div className="section-container max-w-4xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold text-xs uppercase tracking-wider">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              {project.name}
            </h1>
            <p className="text-base text-muted-foreground mb-6">{project.tagline}</p>

            <div className="glass-card rounded-xl overflow-hidden border border-border mb-8">
              <img src={project.image} alt={project.name} className="w-full h-auto" />
            </div>

            <Section title="Overview">{project.overview}</Section>
            <Section title="My Role">{project.role}</Section>

            <Section title="The Problem">{project.problem}</Section>
            <Section title="The Solution">{project.solution}</Section>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Key Features
              </h2>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 glass-card rounded-xl p-5">
              <h2 className="text-xl font-bold text-foreground mb-3">Impact</h2>
              <p className="text-sm text-muted-foreground mb-4">{project.outcome}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.impact.map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" /> Key Learning
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.learning}</p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" /> What's Next
              </h2>
              <ul className="space-y-2">
                {project.whatsNext.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">→</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
  </div>
);

export default ProjectDetail;
