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
    title: 'Process Transformation: Approvals Operations',
    company: 'ID Medical',
    role: 'Process Executive',
    year: '2020',
    executiveSummary: 'Inherited a failing pilot approvals process with no documentation, unclear ownership, and growing stakeholder escalations. Independently restructured operations, established performance visibility, and scaled a two-person process into a single-owner model—eliminating backlogs and restoring stakeholder confidence without additional headcount or tooling investment.',
    situation: [
      'Approvals process launched as pilot during COVID downsizing',
      'No defined workflows or documentation',
      'Two-person team was non-functional',
      'Mounting backlogs and missed communications',
      'Distributed accountability across overstretched managers',
    ],
    challenge: [
      'No formal authority or process ownership',
      'No additional resources, budget, or tooling',
      'No existing performance baseline or historical data',
      'Silent failure risk with reputational cost',
    ],
    approach: [
      'Conducted parallel audits on historical and live cases',
      'Created lightweight daily tracker capturing intake volume, closures, pending items, blockers',
      'Joined cross-functional meetings to clarify scope and set realistic timelines',
      'Allocated capacity: 80% to backlog clearance, 20% to current intake',
      'Presented enhancement roadmap with defined timelines',
    ],
    results: [
      'Cleared 2-month backlog in 6-7 weeks',
      'Reduced average response time from 5+ days to 1 day',
      'Increased throughput from 22 to 35+ requests/day/person',
      '37% improvement in on-time completion rates',
      'Transitioned to sole process owner',
      'Second team member reassigned; process continued without replacement',
    ],
    keyTakeaway: 'When systems fail, the gap between identifying the problem and fixing it is where leadership happens. I didn\'t wait for permission to lead—I created clarity, demonstrated control through measurable outcomes, and earned expanded responsibility.',
    skills: ['Process Design & Optimization', 'Stakeholder Management', 'Data-Driven Decision-Making', 'Ownership Mentality', 'Change Management'],
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
    title: 'Productivity Optimization: Behavioral Intervention',
    company: 'ID Medical',
    role: 'Process Executive, Approvals Team',
    year: '2020-2021',
    executiveSummary: 'Identified and eliminated silent productivity loss caused by sequential tool usage patterns in a high-volume approvals environment. Increased throughput 37% and reduced backlog processing time by 20-30% without new tools, automation, or additional headcount—purely through habit conditioning and workflow redesign.',
    situation: [
      'High-volume approvals workflow requiring 3-4 internal tools per request',
      'Tool load times: 20-30 seconds per system',
      'Team habit: sequential tool usage with passive wait time between loads',
      '50 seconds of idle time per request',
      'Across 160-200 requests/day, this created 13.5 hours of lost capacity weekly',
    ],
    challenge: [
      'No control over tool performance or infrastructure',
      'No budget for automation or new systems',
      'No appetite for formal retraining programs',
      'Pressure to improve output without increasing workload or hours',
      'Inefficiency felt unavoidable—normalized as "system lag"',
    ],
    approach: [
      'Mapped actual time spent per request including wait states',
      'Demonstrated cumulative time loss in team sessions',
      'Trained team on parallel processing techniques and keyboard shortcuts',
      'Created soft expectations around time gaps between request closures',
      'Consistent messaging: "Time is part of the system. Use it deliberately."',
    ],
    results: [
      'Reduced average time per request from 25+ mins to 12-15 minutes',
      'Increased daily throughput from 22 to 35+ requests per person',
      'Backlog reduction accelerated 20-30% faster than baseline',
      'New habit patterns sustained beyond intervention period',
      'Output increased without extending work hours or adding headcount',
    ],
    keyTakeaway: 'Most productivity problems aren\'t tool problems—they\'re workflow and awareness problems. You can\'t automate away bad habits. I don\'t start with automation—I start by understanding how work is actually done.',
    skills: ['Workflow Analysis', 'Behavioral Change Management', 'Data-Driven Persuasion', 'Coaching & Capability Building', 'Constraint-Based Optimization'],
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
    title: 'Product Migration & Incident Response',
    company: 'IDeaS - A SAS Company',
    role: 'Technical Support & Monitoring (promoted twice in 2 years)',
    year: '2014-2018',
    executiveSummary: 'Supported high-stakes product migrations and managed incident response for client-critical systems at IDeaS, where downtime had direct financial impact. Advanced from entry-level monitoring to trusted escalation point through systematic documentation, cross-team coordination, and calm execution under pressure—earning two promotions within two years.',
    situation: [
      'Client-facing systems supporting banks and hotel chains',
      'Product migrations and upgrades touching live production environments',
      'Major incidents requiring rapid cross-functional response',
      'Real-time financial consequences for system instability',
      'Entry-level position with limited decision-making authority',
    ],
    challenge: [
      'Incomplete or evolving documentation during migrations',
      'Cross-team dependencies with unclear ownership',
      'Fast-moving escalations with costly mistake potential',
      'Need for real-time coordination across distributed teams',
      'Junior position with limited formal authority during critical moments',
    ],
    approach: [
      'Created and maintained repeatable SOPs for incidents and escalation paths',
      'Translated monitoring signals into actionable context for resolution teams',
      'Tracked status updates across parallel workstreams',
      'Ensured clean handoffs between shifts and specializations',
      'Participated in buddy program, training 2-3 new joiners',
    ],
    results: [
      'Product migrations completed without uncontrolled client impact',
      'Dependencies documented and socialized across teams',
      'Reduced time-to-resolution through clearer coordination',
      'Two promotions within two years',
      'Became go-to escalation point despite junior title',
      'Built reputation as stabilizing force when systems failed',
    ],
    keyTakeaway: 'I optimize for clarity over heroics. I reduce chaos instead of adding opinions. In real systems, calm execution matters more than perfect plans. Trust is built through reliability under pressure.',
    skills: ['Incident Management', 'Cross-Functional Coordination', 'Documentation & Knowledge Management', 'Stakeholder Communication', 'Mentorship & Knowledge Transfer'],
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
    title: 'Career Continuity: Re-entry and Credibility Rebuild',
    company: 'Tech Mahindra / Fareportal',
    role: 'Associate / Operations Support',
    year: '2018-2020',
    executiveSummary: 'Following an 11-month employment gap, accepted execution-level roles at Tech Mahindra and Fareportal to re-establish professional credibility. Prioritized consistent performance over title or scope, using these positions as deliberate stepping stones to rebuild market positioning and create pathways to higher-responsibility roles.',
    situation: [
      '11-month gap in employment (2018-2019)',
      'Re-entering job market without recent performance signal',
      'Limited leverage from previous experience',
      'Market positioned for transactional, short-tenure roles',
      'Execution-focused roles with minimal decision-making authority',
    ],
    challenge: [
      'Training-heavy environment (Tech Mahindra batch program)',
      'Operational support work with limited visibility',
      'Need to rebuild market credibility from scratch',
      'Limited ownership opportunities',
    ],
    approach: [
      'Treated training program as production environment',
      'Focused on speed, accuracy, and knowledge retention',
      'Consistently ranked as top performer within cohort',
      'Provided informal peer support to strengthen batch outcomes',
      'Absorbed operational mechanics of high-volume transaction systems',
    ],
    results: [
      'Completed Tech Mahindra program as top-tier performer',
      'Handled 1000+ calls with near perfect scores',
      'Maintained clean performance record across both tenures',
      'Re-established professional reference base',
      'Created foundation for transition to ID Medical (2020)',
    ],
    keyTakeaway: 'Master the role in front of you, regardless of its perceived status. Rebuild credibility through performance, not positioning. This phase enabled everything that followed.',
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
    title: 'Compliance Team Turnaround: Stabilizing Delivery',
    company: 'ID Medical',
    role: 'Acting Team Lead / Process Owner',
    year: '2021-2022',
    executiveSummary: 'Assumed responsibility for one of ID Medical\'s oldest compliance teams during a period of delivery instability and internal resistance. Inherited a month-long backlog, unclear accountability, and skepticism due to lack of formal authority. Rebuilt delivery through capacity reallocation, visibility-driven accountability, and habit-level workflow changes. Cleared backlog within 6-8 weeks and stabilized throughput, becoming the first team in the compliance department to return to zero backlog.',
    situation: [
      'Legacy immunizations compliance team with ~8-9 members',
      'Close to one month of accumulated backlog',
      'No reliable productivity or throughput reporting',
      'Historical delivery issues affecting stakeholder confidence',
      'Three tenured members expected to step into leadership',
    ],
    challenge: [
      'No formal authority or mandate to restructure roles',
      'Skepticism toward role due to lack of title or pay revision',
      'Work intake and prioritization inconsistent',
      'Team resistance rooted in perceived legitimacy, not capability',
      'Limited tolerance for disruption given compliance sensitivity',
    ],
    approach: [
      'Introduced deliberate workload split: ~80% backlog clearance, ~20% current requests',
      'Implemented simple productivity and throughput tracking',
      'Defined KPIs aligned to flow (throughput, cycle time) not effort (hours logged)',
      'Focused on fixing flow before addressing capability',
      'Used visibility rather than escalation to enforce standards',
    ],
    results: [
      'Backlog reduced from ~1 month to zero within 6-8 weeks',
      'Team became first in compliance department to clear backlog',
      'Achieved predictable daily throughput: 35 requests/day average',
      'Reduced average case resolution time from 2-3 days to 1 day',
      'Escalations reduced by 43% quarter-over-quarter',
      'Role transitioned from "acting" to de facto team lead',
    ],
    keyTakeaway: 'Authority wasn\'t asserted. It was earned through delivery. In resistance environments, legitimacy is built through consistency, transparency, and results—not mandates.',
    skills: ['Team Leadership', 'Backlog Management & Capacity Planning', 'KPI Design', 'Stakeholder Confidence Rebuilding', 'Conflict Resolution via Data'],
    fortune100Relevance: 'Most large organizations have teams where authority is unclear, legacy expectations conflict with new direction, and delivery issues are cultural. This case proves ability to stabilize underperforming teams without formal power and build accountability systems that teams accept rather than resist.',
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
