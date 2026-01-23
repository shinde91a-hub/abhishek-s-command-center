import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Briefcase, Target, TrendingUp, CheckCircle2, AlertTriangle, Lightbulb, Building2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NetworkBackground from '@/components/NetworkBackground';
import { caseStudies } from '@/data/caseStudies';
import CaseStudyChart from '@/components/CaseStudyChart';

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <NetworkBackground />
      <Navigation />

      <main className="relative z-10 pt-20 lg:pt-0 lg:pl-24">
        {/* Header Section */}
        <section className="py-12 lg:py-20">
          <div className="section-container">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                to="/#decisions"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Decision Logs
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Case Study
                  </span>
                  <span className="text-muted-foreground">{caseStudy.year}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {caseStudy.title}
                </h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-primary" />
                    {caseStudy.role}
                  </div>
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4 text-primary" />
                    {caseStudy.company}
                  </div>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {caseStudy.executiveSummary}
                </p>
              </motion.div>

              {/* Fortune 100 Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6 rounded-2xl h-fit"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Fortune 100 Relevance</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {caseStudy.fortune100Relevance}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Data Insight Section */}
        <section className="py-12 bg-accent/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                Data Insight
              </h2>
              <CaseStudyChart chartType={caseStudy.chartType} chartData={caseStudy.chartData} />
            </motion.div>
          </div>
        </section>

        {/* Strategic Narrative */}
        <section className="py-16">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Situation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Situation</h3>
                </div>
                <ul className="space-y-3">
                  {caseStudy.situation.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Challenge</h3>
                </div>
                <ul className="space-y-3">
                  {caseStudy.challenge.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Approach</h3>
                </div>
                <ul className="space-y-3">
                  {caseStudy.approach.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Results</h3>
                </div>
                <ul className="space-y-3">
                  {caseStudy.results.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Takeaway */}
        <section className="py-16 bg-gradient-to-b from-background to-accent/20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Key Takeaway
              </h2>
              <blockquote className="text-xl md:text-2xl text-foreground font-medium italic mb-6">
                "{caseStudy.keyTakeaway}"
              </blockquote>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center mt-8">
                {caseStudy.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full glass-card text-sm text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="section-container text-center">
            <Link
              to="/#decisions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold transition-all duration-300 hover:shadow-orange hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              View All Decision Logs
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;