export interface MetricCard {
  icon: string;
  label: string;
  value: string;
  subtext?: string;
}

export interface ApproachItem {
  title: string;
  description: string;
  impact: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  context: string;
  year: string;
  executiveSummary: string;
  theChallenge: string;
  situation: string[];
  approach: ApproachItem[];
  operationalResults: string[];
  organizationalResults: string[];
  keyTakeaway: string;
  skills: string[];
  fortune100Relevance: string;
  fortune100Points: string[];
  metrics: MetricCard[];
  patternText?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'process-recovery',
    title: 'Process Transformation: Approvals Operations',
    company: 'ID Medical',
    role: 'Process Executive',
    context: 'COVID-era operational scaling with failing pilot process',
    year: '2020',
    executiveSummary: 'Inherited a failing pilot approvals process with no documentation, unclear ownership, and growing stakeholder escalations. Independently restructured operations, established performance visibility, and scaled a two-person process into a single-owner model—eliminating backlogs and restoring stakeholder confidence without additional headcount or tooling investment.',
    theChallenge: 'Transform failing pilot into production-ready operations without resources',
    situation: [
      'Pilot approvals process launched during COVID downsizing',
      'No defined workflows or documentation',
      'Inconsistent execution with non-functional two-person team',
      'No audit mechanisms or quality controls',
      'Mounting backlogs and eroding stakeholder trust',
    ],
    approach: [
      {
        title: 'Established Baseline Visibility',
        description: 'Conducted parallel audits on historical and live cases. Created lightweight daily tracker capturing intake, closures, pending items, and blockers.',
        impact: 'Transparency established across team leads and management',
      },
      {
        title: 'Redefined Stakeholder Engagement',
        description: 'Joined cross-functional meetings to clarify scope, set realistic timelines, and manage expectations.',
        impact: 'Communication shifted from reactive to proactive',
      },
      {
        title: 'Designed Sustainable Workload Model',
        description: 'Allocated capacity strategically: 80% to backlog clearance, 20% to current intake.',
        impact: 'Prevented new work from compounding while reducing arrears',
      },
      {
        title: 'Implemented Incremental Improvements',
        description: 'Identified process inefficiencies and tooling gaps. Presented enhancement roadmap with defined timelines.',
        impact: 'Changes implemented within existing constraints—no budget required',
      },
    ],
    operationalResults: [
      'Cleared 2-month backlog in 6-7 weeks',
      'Reduced average response time from 5+ days to 1 day',
      'Increased daily throughput from 22 to 35+ requests per person',
      'Achieved 37% improvement in on-time completion rates',
    ],
    organizationalResults: [
      'Transitioned from shared ownership to sole process owner',
      'Absorbed additional responsibilities as function expanded',
      'Stabilized stakeholder confidence across client and internal teams',
      'Moved process from pilot to production-ready operations',
    ],
    keyTakeaway: 'When systems fail, the gap between identifying the problem and fixing it is where leadership happens.',
    skills: ['Process Design & Optimization', 'Stakeholder Management', 'Data-Driven Decision-Making', 'Ownership Mentality', 'Change Management'],
    fortune100Relevance: 'Why this specific case proves readiness for global-scale operations:',
    fortune100Points: [
      'Transform failing operations without additional resources',
      'Build ownership and accountability in ambiguous environments',
      'Scale processes from pilot to production readiness',
      'Manage stakeholder expectations during operational transformation',
    ],
    metrics: [
      { icon: 'timer', label: 'Backlog Clearance', value: '2 months → 0', subtext: '6-7 weeks' },
      { icon: 'zap', label: 'Response Time', value: '1 day', subtext: '-80%' },
      { icon: 'trending-up', label: 'Throughput', value: '35+ requests/day', subtext: '+59%' },
      { icon: 'check-circle', label: 'On-time Completion', value: '+37%', subtext: 'Sustained' },
    ],
    patternText: 'The pattern is repeatable: Visibility → Accountability → Flow → Performance → Authority',
  },
  {
    slug: 'productivity-optimization',
    title: 'Productivity Optimization: Behavioral Intervention',
    company: 'ID Medical',
    role: 'Process Executive, Approvals Team',
    context: 'High-volume operations with hidden efficiency losses',
    year: '2020-2021',
    executiveSummary: 'Identified and eliminated silent productivity loss caused by sequential tool usage patterns in a high-volume approvals environment. Increased throughput 37% and reduced backlog processing time by 20-30% without new tools, automation, or additional headcount—purely through habit conditioning and workflow redesign.',
    theChallenge: 'Eliminate hidden productivity losses without new tools or budget',
    situation: [
      'High-volume approvals workflow requiring 3-4 internal tools per request',
      'Tool load times: 20-30 seconds per system',
      'Team habit: sequential tool usage with passive wait time',
      '50 seconds of idle time per request accumulated',
      'Across 160-200 requests/day, 13.5 hours of lost capacity weekly',
    ],
    approach: [
      {
        title: 'Mapped Hidden Time Loss',
        description: 'Documented actual time spent per request including wait states. Quantified cumulative impact across daily volume.',
        impact: 'Made invisible inefficiency visible and measurable',
      },
      {
        title: 'Demonstrated Impact Visually',
        description: 'Presented cumulative time loss analysis in team sessions. Showed weekly capacity impact in terms team could relate to.',
        impact: 'Team understood the problem wasn\'t tools—it was workflow',
      },
      {
        title: 'Introduced Parallel Processing',
        description: 'Trained team on parallel tool loading and keyboard shortcuts. Created new workflow patterns that utilized wait time.',
        impact: 'Idle time converted to productive work',
      },
      {
        title: 'Established Soft Expectations',
        description: 'Created expectations around time gaps between request closures. Consistent messaging: "Time is part of the system. Use it deliberately."',
        impact: 'New habits sustained beyond intervention period',
      },
    ],
    operationalResults: [
      'Reduced average time per request from 25+ mins to 12-15 minutes',
      'Increased daily throughput from 22 to 35+ requests per person',
      'Backlog reduction accelerated 20-30% faster than baseline',
      'New habit patterns sustained beyond intervention period',
    ],
    organizationalResults: [
      'Output increased without extending work hours',
      'No additional headcount required',
      'Team capability permanently elevated',
      'Approach documented for cross-team application',
    ],
    keyTakeaway: 'Most productivity problems aren\'t tool problems—they\'re workflow and awareness problems. I don\'t start with automation—I start by understanding how work is actually done.',
    skills: ['Workflow Analysis', 'Behavioral Change Management', 'Data-Driven Persuasion', 'Coaching & Capability Building', 'Constraint-Based Optimization'],
    fortune100Relevance: 'Why this matters at enterprise scale:',
    fortune100Points: [
      'Identify hidden inefficiencies that compound at scale',
      'Implement behavioral solutions without capital investment',
      'Create sustainable change through habit modification',
      'Prove ROI through measurable productivity gains',
    ],
    metrics: [
      { icon: 'timer', label: 'Time Per Request', value: '25 → 12 mins', subtext: '-52%' },
      { icon: 'trending-up', label: 'Daily Throughput', value: '35+ requests', subtext: '+59%' },
      { icon: 'zap', label: 'Backlog Speed', value: '+20-30%', subtext: 'Faster clearance' },
      { icon: 'check-circle', label: 'Habit Retention', value: 'Sustained', subtext: 'Long-term' },
    ],
    patternText: 'Observation → Analysis → Demonstration → Training → Habit Formation',
  },
  {
    slug: 'incident-response',
    title: 'Product Migration & Incident Response',
    company: 'IDeaS - A SAS Company',
    role: 'Technical Support & Monitoring',
    context: 'Client-critical systems with real-time financial impact',
    year: '2014-2018',
    executiveSummary: 'Supported high-stakes product migrations and managed incident response for client-critical systems at IDeaS, where downtime had direct financial impact. Advanced from entry-level monitoring to trusted escalation point through systematic documentation, cross-team coordination, and calm execution under pressure—earning two promotions within two years.',
    theChallenge: 'Ensure zero-impact migrations while building credibility from junior position',
    situation: [
      'Client-facing systems supporting banks and hotel chains',
      'Product migrations touching live production environments',
      'Major incidents requiring rapid cross-functional response',
      'Real-time financial consequences for system instability',
      'Entry-level position with limited decision-making authority',
    ],
    approach: [
      {
        title: 'Built Systematic Documentation',
        description: 'Created and maintained repeatable SOPs for incidents and escalation paths. Ensured knowledge was accessible, not tribal.',
        impact: 'Reduced dependency on individual knowledge during crises',
      },
      {
        title: 'Bridged Technical and Operational Context',
        description: 'Translated monitoring signals into actionable context for resolution teams. Made technical issues understandable for stakeholders.',
        impact: 'Faster decision-making during incidents',
      },
      {
        title: 'Coordinated Across Workstreams',
        description: 'Tracked status updates across parallel workstreams. Ensured clean handoffs between shifts and specializations.',
        impact: 'No information lost between team transitions',
      },
      {
        title: 'Invested in Team Capability',
        description: 'Participated in buddy program, training 2-3 new joiners. Transferred knowledge systematically, not just on-demand.',
        impact: 'Team resilience improved beyond individual contribution',
      },
    ],
    operationalResults: [
      'Product migrations completed without uncontrolled client impact',
      'Dependencies documented and socialized across teams',
      'Reduced time-to-resolution through clearer coordination',
      'Built reputation as stabilizing force during system failures',
    ],
    organizationalResults: [
      'Two promotions within two years',
      'Became go-to escalation point despite junior title',
      'Created documentation standards adopted by broader team',
      'Mentored new team members through structured program',
    ],
    keyTakeaway: 'I optimize for clarity over heroics. I reduce chaos instead of adding opinions. In real systems, calm execution matters more than perfect plans.',
    skills: ['Incident Management', 'Cross-Functional Coordination', 'Documentation & Knowledge Management', 'Stakeholder Communication', 'Mentorship & Knowledge Transfer'],
    fortune100Relevance: 'Foundational experience for enterprise operations:',
    fortune100Points: [
      'Manage revenue-critical systems under pressure',
      'Build systematic documentation for operational resilience',
      'Coordinate across distributed teams during incidents',
      'Develop junior talent through structured mentorship',
    ],
    metrics: [
      { icon: 'shield', label: 'Migration Success', value: '100%', subtext: 'Zero uncontrolled impact' },
      { icon: 'trending-up', label: 'Career Growth', value: '2 promotions', subtext: 'In 2 years' },
      { icon: 'users', label: 'Team Mentored', value: '2-3 joiners', subtext: 'Buddy program' },
      { icon: 'file-text', label: 'SOPs Created', value: 'Standardized', subtext: 'Team-adopted' },
    ],
    patternText: 'Documentation → Coordination → Clarity → Trust → Authority',
  },
  {
    slug: 'operational-excellence',
    title: 'Career Continuity: Re-entry and Credibility Rebuild',
    company: 'Tech Mahindra / Fareportal',
    role: 'Associate / Operations Support',
    context: 'Career gap requiring strategic positioning restart',
    year: '2018-2020',
    executiveSummary: 'Following an 11-month employment gap, accepted execution-level roles at Tech Mahindra and Fareportal to re-establish professional credibility. Prioritized consistent performance over title or scope, using these positions as deliberate stepping stones to rebuild market positioning and create pathways to higher-responsibility roles.',
    theChallenge: 'Rebuild professional credibility after extended career gap',
    situation: [
      '11-month gap in employment (2018-2019)',
      'Re-entering job market without recent performance signal',
      'Limited leverage from previous experience',
      'Market positioned for transactional, short-tenure roles',
      'Execution-focused roles with minimal decision-making authority',
    ],
    approach: [
      {
        title: 'Treated Training as Production',
        description: 'Approached Tech Mahindra batch program with production-level intensity. Focused on speed, accuracy, and knowledge retention.',
        impact: 'Consistently ranked as top performer within cohort',
      },
      {
        title: 'Provided Peer Support',
        description: 'Offered informal support to strengthen batch outcomes. Helped peers without competing against them.',
        impact: 'Built reputation as team player, not just individual performer',
      },
      {
        title: 'Absorbed Operational Mechanics',
        description: 'Studied high-volume transaction systems beyond immediate role requirements. Built foundation for process understanding.',
        impact: 'Prepared for higher-complexity roles ahead',
      },
      {
        title: 'Maintained Clean Record',
        description: 'Focused on consistent execution across both tenures. Prioritized reliability over visibility.',
        impact: 'Re-established professional reference base',
      },
    ],
    operationalResults: [
      'Completed Tech Mahindra program as top-tier performer',
      'Handled 1000+ calls with near perfect scores',
      'Maintained clean performance record across both tenures',
      'Absorbed operational mechanics of high-volume systems',
    ],
    organizationalResults: [
      'Re-established professional reference base',
      'Created foundation for transition to ID Medical (2020)',
      'Demonstrated strategic patience and execution discipline',
      'Proved reliability under minimal supervision',
    ],
    keyTakeaway: 'Master the role in front of you, regardless of its perceived status. Rebuild credibility through performance, not positioning. This phase enabled everything that followed.',
    skills: ['Operational Discipline', 'Consistent Execution', 'Resilience', 'Strategic Patience'],
    fortune100Relevance: 'Character indicators for enterprise leadership:',
    fortune100Points: [
      'Willingness to rebuild from ground up',
      'Maintain execution excellence regardless of role level',
      'Treat every position as opportunity to demonstrate reliability',
      'Strategic thinking even in tactical positions',
    ],
    metrics: [
      { icon: 'phone', label: 'Calls Handled', value: '1000+', subtext: 'Near perfect scores' },
      { icon: 'award', label: 'Cohort Ranking', value: 'Top Tier', subtext: 'Consistent' },
      { icon: 'check-circle', label: 'Performance', value: 'Clean Record', subtext: 'Both tenures' },
      { icon: 'target', label: 'Outcome', value: 'ID Medical', subtext: 'Foundation built' },
    ],
    patternText: 'Acceptance → Execution → Consistency → Credibility → Opportunity',
  },
  {
    slug: 'leadership-without-authority',
    title: 'Compliance Team Turnaround: Stabilizing Delivery',
    company: 'ID Medical',
    role: 'Acting Team Lead / Process Owner',
    context: 'Legacy team with delivery instability and internal resistance',
    year: '2021-2022',
    executiveSummary: 'Assumed responsibility for one of ID Medical\'s oldest compliance teams during a period of delivery instability and internal resistance. Inherited a month-long backlog, unclear accountability, and skepticism due to lack of formal authority. Rebuilt delivery through capacity reallocation, visibility-driven accountability, and habit-level workflow changes. Cleared backlog within 6-8 weeks and stabilized throughput, becoming the first team in the compliance department to return to zero backlog.',
    theChallenge: 'Stabilize underperforming team without formal authority or mandate',
    situation: [
      'Legacy immunizations compliance team with ~8-9 members',
      'Close to one month of accumulated backlog',
      'No reliable productivity or throughput reporting',
      'Historical delivery issues affecting stakeholder confidence',
      'Three tenured members expected to step into leadership',
    ],
    approach: [
      {
        title: 'Introduced Strategic Workload Split',
        description: 'Implemented deliberate allocation: ~80% backlog clearance, ~20% current requests. Protected progress while maintaining service.',
        impact: 'Backlog reduction became predictable, not reactive',
      },
      {
        title: 'Built Visibility Infrastructure',
        description: 'Implemented simple productivity and throughput tracking. Made performance visible without creating surveillance culture.',
        impact: 'Team self-corrected based on visible data',
      },
      {
        title: 'Defined Flow-Based KPIs',
        description: 'Aligned metrics to flow (throughput, cycle time) not effort (hours logged). Measured outcomes, not activity.',
        impact: 'Team understood what mattered and why',
      },
      {
        title: 'Used Visibility Over Escalation',
        description: 'Enforced standards through transparency rather than authority. Let data drive accountability conversations.',
        impact: 'Team accepted standards they could verify themselves',
      },
    ],
    operationalResults: [
      'Backlog reduced from ~1 month to zero within 6-8 weeks',
      'Team became first in compliance department to clear backlog',
      'Achieved predictable daily throughput: 35 requests/day average',
      'Reduced average case resolution time from 2-3 days to 1 day',
    ],
    organizationalResults: [
      'Escalations reduced by 43% quarter-over-quarter',
      'Role transitioned from "acting" to de facto team lead',
      'Established template for team turnarounds',
      'Built trust with previously skeptical team members',
    ],
    keyTakeaway: 'Authority wasn\'t asserted. It was earned through delivery. In resistance environments, legitimacy is built through consistency, transparency, and results—not mandates.',
    skills: ['Team Leadership', 'Backlog Management & Capacity Planning', 'KPI Design', 'Stakeholder Confidence Rebuilding', 'Conflict Resolution via Data'],
    fortune100Relevance: 'Proving capability for complex organizational challenges:',
    fortune100Points: [
      'Stabilize underperforming teams without formal power',
      'Build accountability systems teams accept rather than resist',
      'Navigate legacy expectations conflicting with new direction',
      'Earn authority through delivery, not mandate',
    ],
    metrics: [
      { icon: 'timer', label: 'Backlog Clearance', value: '1 month → 0', subtext: '6-8 weeks' },
      { icon: 'trending-up', label: 'Daily Throughput', value: '35 requests', subtext: 'Predictable' },
      { icon: 'zap', label: 'Resolution Time', value: '1 day', subtext: 'From 2-3 days' },
      { icon: 'trending-down', label: 'Escalations', value: '-43%', subtext: 'Quarter-over-quarter' },
    ],
    patternText: 'Visibility → Accountability → Flow → Trust → Authority',
  },
];
