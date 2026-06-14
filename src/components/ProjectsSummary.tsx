import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const ProjectsSummary = () => {
  return (
    <section id="projects" className="relative py-8 lg:py-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between flex-wrap gap-3 mb-6"
        >
          <div>
            <span className="text-primary font-semibold text-xs uppercase tracking-wider">
              Things I've Built
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Projects
            </h2>
            <p className="text-base text-muted-foreground mt-1 max-w-xl">
              Operational tools I designed and shipped to solve real delivery problems.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p, idx) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                to={`/projects/${p.slug}`}
                className="group block glass-card-hover rounded-xl overflow-hidden h-full"
              >
                <div className="aspect-video overflow-hidden bg-card border-b border-border">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {p.cardBlurb}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-3 group-hover:gap-1.5 transition-all">
                    View Case Study <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSummary;
