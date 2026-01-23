import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-gradient-to-b from-background to-accent/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Header */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4 text-primary" />
            Let's Connect
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Build{' '}
            <span className="text-gradient-orange">Stable Systems?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Whether you're facing operational challenges, need to stabilize underperforming 
            teams, or want to discuss leadership in complex environments—let's talk.
          </p>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:contact@abhishekshinde.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold transition-all duration-300 hover:shadow-orange group"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/abhishekshinde"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 glass-card-hover rounded-xl font-semibold text-foreground group"
            >
              <Linkedin className="w-5 h-5 text-primary" />
              Connect on LinkedIn
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 pt-12 border-t border-border"
          >
            <blockquote className="text-xl md:text-2xl text-foreground font-medium italic">
              "Authority wasn't asserted. It was earned through delivery."
            </blockquote>
            <p className="text-muted-foreground mt-4">— Core Leadership Philosophy</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;