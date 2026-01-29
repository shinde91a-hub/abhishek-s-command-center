import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NetworkBackground from '@/components/NetworkBackground';
import { caseStudies } from '@/data/caseStudies';
import MetricsGrid from '@/components/case-study/MetricsGrid';
import Fortune100Sidebar from '@/components/case-study/Fortune100Sidebar';
import SituationAnalysis from '@/components/case-study/SituationAnalysis';
import StrategicApproach from '@/components/case-study/StrategicApproach';
import ResultsSection from '@/components/case-study/ResultsSection';
import KeyTakeaway from '@/components/case-study/KeyTakeaway';

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
        <section className="py-8 lg:py-12">
          <div className="section-container">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                to="/#decisions"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Decision Logs
              </Link>
            </motion.div>

            {/* Title and Role/Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {caseStudy.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-primary">Role: {caseStudy.role}</span>
                <span className="text-muted-foreground">Context: {caseStudy.context}</span>
              </div>
            </motion.div>

            {/* Executive Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-muted-foreground mt-2 leading-relaxed max-w-4xl">
                {caseStudy.executiveSummary}
              </p>
            </motion.div>

            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-foreground mb-2">
                The <span className="text-primary">Challenge</span>
              </h2>
              <p className="text-muted-foreground">{caseStudy.theChallenge}</p>
            </motion.div>

            {/* Data Insights + Fortune 100 */}
            <div className="grid lg:grid-cols-5 gap-8 mb-16">
              {/* Metrics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-3"
              >
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Data <span className="text-primary">Insights</span>
                </h2>
                <MetricsGrid metrics={caseStudy.metrics} />
              </motion.div>

              {/* Fortune 100 Sidebar */}
              <div className="lg:col-span-2">
                <Fortune100Sidebar
                  relevance={caseStudy.fortune100Relevance}
                  points={caseStudy.fortune100Points}
                  patternText={caseStudy.patternText}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Situation Analysis */}
        <section className="py-12">
          <div className="section-container">
            <SituationAnalysis situation={caseStudy.situation} />
          </div>
        </section>

        {/* Strategic Approach */}
        <section className="py-12">
          <div className="section-container">
            <StrategicApproach approach={caseStudy.approach} />
          </div>
        </section>

        {/* Results & Impact */}
        <section className="py-12">
          <div className="section-container">
            <ResultsSection
              operationalResults={caseStudy.operationalResults}
              organizationalResults={caseStudy.organizationalResults}
            />
          </div>
        </section>

        {/* Key Takeaway */}
        <section className="py-12">
          <div className="section-container max-w-3xl">
            <KeyTakeaway takeaway={caseStudy.keyTakeaway} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="section-container text-center">
            <Link
              to="/#decisions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold transition-all duration-300 hover:shadow-orange hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Decision Logs
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;
