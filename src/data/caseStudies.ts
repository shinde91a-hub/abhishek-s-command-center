export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  year: string;
  executiveSummary: string;
  situation: string[];
  challenge: string[];
  approach: string[];
  results: string[];
  keyTakeaway: string;
  skills: string[];
  fortune100Relevance: string;
  chartType: 'timeline' | 'bar' | 'flow';
  chartData: any;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'process-recovery',
    title: 'Process Transformation',
    company: 'ID Medical',
    role: 'Process Executive',
    year: '2020',
    executiveSummary: 'Inherited a failing pilot approvals process with no documentation, unclear ownership, and growing stakeholder escalations. Independently restructured operations, established performance visibility, and scaled a two-person process into a single-owner model—eliminating backlogs and restoring stakeholder confidence without additional headcount or tooling investment.',
    situation: [
      'Approvals process launched as pilot during COVID downsizing',
      'No defined workflows or documentation',
      'Two-person team was non-functional',
      'Mounting backlogs and missed communications',
    ],
    challenge: [
      'No formal authority or process ownership',
      'No additional resources, budget, or tooling',
      'No existing performance baseline',
      'Silent failure risk with reputational cost',
    ],
    approach: [
      'Conducted parallel audits on historical and live cases',
      'Created lightweight daily tracker for intake, closures, and blockers',
      'Joined cross-functional meetings to set realistic timelines',
      'Allocated 80% to backlog clearance, 20% to current intake',
    ],
    results: [
      'Cleared 2-month backlog in 6-7 weeks',
      'Reduced average response time from 5+ days to 1 day',
      'Increased throughput from 22 to 35+ requests/day',
      '37% improvement in on-time completion rates',
      'Transitioned to sole process owner',
    ],
    keyTakeaway: 'When systems fail, the gap between identifying the problem and fixing it is where leadership happens.',
    skills: ['Process Design', 'Stakeholder Management', 'Data-Driven Decisions', 'Change Management'],
    fortune100Relevance: 'This case proves capability to take ownership of broken processes without formal authority, build accountability through visibility, and deliver measurable results under resource constraints—skills critical for navigating complex enterprise environments.',
    chartType: 'timeline',
    chartData: {
      title: 'Backlog Clearance Timeline',
      data: [
        { week: 'Week 0', backlog: 100, label: '~2 months backlog' },
        { week: 'Week 2', backlog: 75, label: 'Audit complete' },
        { week: 'Week 4', backlog: 45, label: 'Process stabilized' },
        { week: 'Week 6', backlog: 15, label: 'Near zero' },
        { week: 'Week 8', backlog: 0, label: 'Zero backlog' },
      ],
    },
  },
  {
    slug: 'productivity-optimization',
    title: 'Behavioral Productivity Optimization',
    company: 'ID Medical',
    role: 'Process Executive, Approvals Team',
    year: '2020-2021',
    executiveSummary: 'Identified and eliminated silent productivity loss caused by sequential tool usage patterns in a high-volume approvals environment. Increased throughput 37% and reduced backlog processing time by 20-30% without new tools, automation, or additional headcount—purely through habit conditioning and workflow redesign.',
    situation: [
      'High-volume approvals requiring 3-4 internal tools per request',
      'Tool load times of 20-30 seconds per system',
      'Team habit: sequential tool usage with passive wait time',
      '50 seconds of idle time per request creating 13.5 hours lost weekly',
    ],
    challenge: [
      'No control over tool performance or infrastructure',
      'No budget for automation or new systems',
      'Pressure to improve output without increasing hours',
      'Inefficiency felt unavoidable—normalized as "system lag"',
    ],
    approach: [
      'Mapped actual time spent per request including wait states',
      'Demonstrated cumulative time loss in team sessions',
      'Trained team on parallel processing techniques',
      'Created soft expectations around closure time gaps',
    ],
    results: [
      'Reduced time per request from 25+ mins to 12-15 minutes',
      'Increased daily throughput from 22 to 35+ requests/person',
      'Backlog reduction accelerated 20-30% faster',
      'New habit patterns sustained beyond intervention period',
    ],
    keyTakeaway: 'Most productivity problems aren\'t tool problems—they\'re workflow and awareness problems. You can\'t automate away bad habits.',
    skills: ['Workflow Analysis', 'Behavioral Change', 'Data-Driven Persuasion', 'Coaching'],
    fortune100Relevance: 'Demonstrates ability to identify hidden inefficiencies that compound at scale, and implement behavioral solutions that create sustainable change without requiring capital investment or system changes.',
    chartType: 'bar',
    chartData: {
      title: 'Daily Throughput Comparison',
      data: [
        { name: 'Before', requests: 22, fill: '#e5e5e5' },
        { name: 'After', requests: 35, fill: '#FF8C00' },
      ],
      improvement: '59% increase',
    },
  },
  {
    slug: 'incident-response',
    title: 'Incident Response & Crisis Management',
    company: 'IDeaS - A SAS Company',
    role: 'Technical Support & Monitoring',
    year: '2014-2018',
    executiveSummary: 'Supported high-stakes product migrations and managed incident response for client-critical systems at IDeaS, where downtime had direct financial impact. Advanced from entry-level monitoring to trusted escalation point through systematic documentation, cross-team coordination, and calm execution under pressure—earning two promotions within two years.',
    situation: [
      'Client-facing systems supporting banks and hotel chains',
      'Product migrations touching live production environments',
      'Major incidents requiring rapid cross-functional response',
      'Real-time financial consequences for system instability',
    ],
    challenge: [
      'Incomplete or evolving documentation during migrations',
      'Cross-team dependencies with unclear ownership',
      'Fast-moving escalations with costly mistake potential',
      'Junior position with limited formal authority',
    ],
    approach: [
      'Created repeatable SOPs for incidents and escalation paths',
      'Translated monitoring signals into actionable context',
      'Tracked status updates across parallel workstreams',
      'Participated in buddy program, training 2-3 new joiners',
    ],
    results: [
      'Product migrations completed without uncontrolled impact',
      'Reduced time-to-resolution through clearer coordination',
      'Two promotions within two years',
      'Became go-to escalation point despite junior title',
    ],
    keyTakeaway: 'I optimize for clarity over heroics. I reduce chaos instead of adding opinions. Trust is built through reliability under pressure.',
    skills: ['Incident Management', 'Cross-Functional Coordination', 'Documentation', 'Mentorship'],
    fortune100Relevance: 'Foundational experience in managing revenue-critical systems under pressure. Demonstrates the discipline of systematic documentation, calm crisis response, and building team resilience—essential for enterprise-scale operations.',
    chartType: 'flow',
    chartData: {
      title: 'Incident Resolution Flow',
      nodes: [
        { id: 'chaos', label: 'Chaos & Noise', type: 'problem' },
        { id: 'docs', label: 'Documentation Bridge', type: 'solution' },
        { id: 'coord', label: 'Cross-Team Coordination', type: 'solution' },
        { id: 'resolution', label: 'Structured Resolution', type: 'result' },
      ],
    },
  },
  {
    slug: 'operational-excellence',
    title: 'Career Re-entry & Credibility Rebuild',
    company: 'Tech Mahindra / Fareportal',
    role: 'Associate / Operations Support',
    year: '2018-2020',
    executiveSummary: 'Following an 11-month employment gap, accepted execution-level roles at Tech Mahindra and Fareportal to re-establish professional credibility. Prioritized consistent performance over title or scope, using these positions as deliberate stepping stones to rebuild market positioning and create pathways to higher-responsibility roles.',
    situation: [
      '11-month gap in employment (2018-2019)',
      'Re-entering job market without recent performance signal',
      'Market positioned for transactional, short-tenure roles',
      'Limited visibility or ownership opportunities',
    ],
    challenge: [
      'Execution-focused roles with minimal decision-making',
      'Training-heavy environment (Tech Mahindra batch)',
      'Limited leverage from previous experience',
      'Need to rebuild market credibility from scratch',
    ],
    approach: [
      'Treated training program as production environment',
      'Focused on speed, accuracy, and knowledge retention',
      'Consistently ranked as top performer within cohort',
      'Provided informal peer support to strengthen batch outcomes',
    ],
    results: [
      'Completed program as top-tier performer',
      'Maintained clean performance record across both tenures',
      'Re-established professional reference base',
      'Created foundation for transition to ID Medical',
    ],
    keyTakeaway: 'Master the role in front of you, regardless of its perceived status. Rebuild credibility through performance, not positioning.',
    skills: ['Operational Discipline', 'Consistent Execution', 'Resilience', 'Strategic Patience'],
    fortune100Relevance: 'Shows character and strategic thinking—willingness to rebuild from the ground up, maintain execution excellence regardless of role level, and treat every position as an opportunity to demonstrate reliability.',
    chartType: 'timeline',
    chartData: {
      title: 'Career Rebuild Trajectory',
      data: [
        { week: '2018', backlog: 10, label: 'Career gap' },
        { week: 'Tech Mahindra', backlog: 35, label: 'Top performer' },
        { week: 'Fareportal', backlog: 55, label: 'Operations excellence' },
        { week: 'ID Medical', backlog: 85, label: 'Process ownership' },
        { week: '2022+', backlog: 100, label: 'Leadership' },
      ],
    },
  },
  {
    slug: 'leadership-without-authority',
    title: 'Compliance Team Turnaround',
    company: 'ID Medical',
    role: 'Acting Team Lead / Process Owner',
    year: '2021-2022',
    executiveSummary: 'Assumed responsibility for one of ID Medical\'s oldest compliance teams during delivery instability and internal resistance. Inherited a month-long backlog, unclear accountability, and skepticism due to lack of formal authority. Rebuilt delivery through capacity reallocation and visibility-driven accountability. Became the first team to return to zero backlog.',
    situation: [
      'Legacy immunizations compliance team with 8-9 members',
      'Close to one month of accumulated backlog',
      'No reliable productivity or throughput reporting',
      'Three tenured members expected to step into leadership',
    ],
    challenge: [
      'No formal authority or mandate to restructure',
      'Skepticism toward role due to lack of title/pay revision',
      'Work intake and prioritization inconsistent',
      'Team resistance rooted in perceived legitimacy',
    ],
    approach: [
      'Rebalanced team: 80% backlog clearance, 20% current intake',
      'Implemented daily productivity and throughput tracking',
      'Defined KPIs aligned to flow, not effort',
      'Focused on fixing flow before performance judgment',
    ],
    results: [
      'Backlog reduced from ~1 month to zero in 6-8 weeks',
      'First compliance team to clear backlog',
      'Achieved 35 requests/day average throughput',
      'Escalations reduced by 43% quarter-over-quarter',
      'Role transitioned to de facto team lead',
    ],
    keyTakeaway: 'Authority wasn\'t asserted. It was earned through delivery. In resistance environments, legitimacy is built through consistency, transparency, and results.',
    skills: ['Team Leadership', 'Backlog Management', 'KPI Design', 'Stakeholder Rebuilding', 'Conflict Resolution'],
    fortune100Relevance: 'Proves ability to stabilize underperforming teams without formal power, build accountability systems that teams accept rather than resist, and navigate political complexity through outcome-focused leadership.',
    chartType: 'timeline',
    chartData: {
      title: 'Backlog Reduction to Zero',
      data: [
        { week: 'Week 0', backlog: 100, label: '~1 month backlog' },
        { week: 'Week 2', backlog: 70, label: 'Tracking implemented' },
        { week: 'Week 4', backlog: 40, label: 'Flow optimized' },
        { week: 'Week 6', backlog: 15, label: 'Near zero' },
        { week: 'Week 8', backlog: 0, label: 'First team at zero' },
      ],
    },
  },
];