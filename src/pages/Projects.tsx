import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, User, Calendar, Tag, Wrench, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import NetworkBackground from "@/components/NetworkBackground";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const Projects = () => {
  const featured = projects[0];
  const others = projects.slice(1);

  return (
    <div className="relative min-h-screen bg-background">
      <NetworkBackground />
      <Navigation />

      <main className="relative z-10 pt-20 lg:pt-12">
        <div className="section-container max-w-6xl">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Featured Project */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-primary font-semibold text-xs uppercase tracking-wider">
              Featured Project
            </span>

            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 mt-3 items-start">
              {/* Left: Info */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  1. {featured.name}
                </h1>
                <p className="text-base text-muted-foreground mb-2">
                  {featured.cardBlurb}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {featured.overview}
                </p>

                <dl className="space-y-3 text-sm mb-6">
                  <MetaRow icon={User} label="Role" value={featured.role.split(" · ")[0]} />
                  <MetaRow icon={Calendar} label="Duration" value={featured.duration} />
                  <MetaRow icon={Tag} label="Category" value={featured.category} />
                  <MetaRow icon={Wrench} label="Tools" value={featured.tools} />
                </dl>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/projects/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:shadow-orange transition-all"
                  >
                    View Case Study
                  </Link>
                  {featured.livePreview && (
                    <a
                      href={featured.livePreview}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 glass-card-hover rounded-lg font-semibold text-sm"
                    >
                      Live Preview <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Image */}
              <div className="glass-card rounded-xl overflow-hidden border border-border">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Impact strip */}
            <div className="mt-6 glass-card rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground">Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    {featured.outcome}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {featured.impact.map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Other Projects */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Other Projects</h2>
            <div className="space-y-5">
              {others.map((p, idx) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass-card-hover rounded-xl p-5 grid md:grid-cols-[200px_1fr_auto] gap-5 items-center"
                >
                  <div className="rounded-lg overflow-hidden border border-border bg-card">
                    <img src={p.image} alt={p.name} className="w-full h-auto" loading="lazy" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-md bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {idx + 2}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{p.cardBlurb}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {p.tags.map((t) => (
                        <span key={t} className="inline-flex items-center gap-1 text-primary">
                          • {t}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {p.duration}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:shadow-orange transition-all whitespace-nowrap"
                  >
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const MetaRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary shrink-0">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  </div>
);

export default Projects;
