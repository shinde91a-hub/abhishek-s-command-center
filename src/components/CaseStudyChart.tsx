import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChartProps {
  chartType: 'timeline' | 'bar' | 'flow';
  chartData: any;
}

const CaseStudyChart = ({ chartType, chartData }: ChartProps) => {
  if (chartType === 'timeline') {
    return (
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{chartData.title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData.data}>
              <defs>
                <linearGradient id="backlogGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8C00" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF8C00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="week" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="glass-card p-3 rounded-lg shadow-lg">
                        <p className="font-semibold text-foreground">{data.week}</p>
                        <p className="text-sm text-muted-foreground">{data.label}</p>
                        <p className="text-primary font-medium">{data.backlog}% remaining</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="backlog"
                stroke="#FF8C00"
                strokeWidth={3}
                fill="url(#backlogGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Milestone Labels */}
        <div className="flex justify-between mt-4 text-sm">
          {chartData.data.map((item: any, index: number) => (
            <div key={index} className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                item.backlog === 0 ? 'bg-primary' : 'bg-muted'
              }`} />
              <span className="text-muted-foreground text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (chartType === 'bar') {
    return (
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{chartData.title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.data} layout="vertical">
              <XAxis 
                type="number" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 12 }}
                domain={[0, 40]}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 14, fontWeight: 500 }}
                width={60}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card p-3 rounded-lg shadow-lg">
                        <p className="font-semibold text-foreground">{payload[0].payload.name}</p>
                        <p className="text-primary font-medium">{payload[0].value} requests/day</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="requests" 
                radius={[0, 8, 8, 0]}
                fill="#FF8C00"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
            {chartData.improvement}
          </span>
        </div>
      </div>
    );
  }

  if (chartType === 'flow') {
    return (
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-6">{chartData.title}</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {chartData.nodes.map((node: any, index: number) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center gap-4"
            >
              <div className={`px-6 py-4 rounded-xl text-center min-w-[140px] ${
                node.type === 'problem' 
                  ? 'bg-destructive/10 border border-destructive/20'
                  : node.type === 'solution'
                  ? 'bg-accent border border-border'
                  : 'bg-primary text-primary-foreground'
              }`}>
                <div className={`flex items-center justify-center gap-2 ${
                  node.type === 'result' ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {node.type === 'result' && <CheckCircle2 className="w-4 h-4" />}
                  <span className="font-medium text-sm">{node.label}</span>
                </div>
              </div>
              {index < chartData.nodes.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-6 text-sm">
          Documentation and coordination reduced "chaos noise" and enabled structured incident resolution
        </p>
      </div>
    );
  }

  return null;
};

export default CaseStudyChart;