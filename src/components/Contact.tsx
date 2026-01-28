import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="relative py-6 lg:py-8 bg-gradient-to-b from-background to-accent/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Header */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs font-medium mb-4">
            <MessageSquare className="w-3 h-3 text-primary" />
            Let's Connect
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Ready to Build{' '}
            <span className="text-gradient-orange">Stable Systems?</span>
          </h2>

          <p className="text-base text-muted-foreground mb-6 max-w-md mx-auto">
            Facing operational challenges or need to stabilize teams? Let's talk.
          </p>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href="mailto:shinde.91a@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-orange group"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/abhishek-shinde91/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 glass-card-hover rounded-lg font-semibold text-sm text-foreground group"
            >
              <Linkedin className="w-4 h-4 text-primary" />
              LinkedIn
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 pt-6 border-t border-border"
          >
            <blockquote className="text-lg text-foreground font-medium italic">
              "Authority wasn't asserted. It was earned through delivery."
            </blockquote>
            <p className="text-sm text-muted-foreground mt-2">— Core Leadership Philosophy</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;