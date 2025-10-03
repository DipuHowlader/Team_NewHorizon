import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExoplanetData } from '@/types/exoplanet';
import { TrendingDown, Activity } from 'lucide-react';

interface ScientificChartProps {
  exoplanet: ExoplanetData;
  className?: string;
}

export const ScientificChart = ({ exoplanet, className = "" }: ScientificChartProps) => {
  const isTransitData = exoplanet?.graph_data?.some(d => d.brightness !== undefined) || false;
  const isRadialVelocityData = exoplanet?.graph_data?.some(d => d.velocity !== undefined) || false;  

  const getChartConfig = () => {
    if (isTransitData) {
      return {
        title: "Transit Light Curve",
        description: "Brightness dip during planetary transit",
        dataKey: "brightness",
        yLabel: "Relative Brightness",
        xLabel: "Time (hours)",
        color: "#4FC3F7",
        icon: TrendingDown
      };
    } else if (isRadialVelocityData) {
      return {
        title: "Radial Velocity Curve", 
        description: "Star's velocity variation due to planetary orbit",
        dataKey: "velocity",
        yLabel: "Radial Velocity (m/s)",
        xLabel: "Time (days)",
        color: "#BB86FC",
        icon: Activity
      };
    } else {
      return {
        title: "Discovery Data",
        description: "Scientific measurement data",
        dataKey: "brightness",
        yLabel: "Signal",
        xLabel: "Time",
        color: "#4FC3F7",
        icon: Activity
      };
    }
  };

  const config = getChartConfig();
  const Icon = config.icon;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-primary/20 rounded-lg p-3 shadow-glow">
          <p className="text-sm font-medium">{`${config.xLabel}: ${label}`}</p>
          <p className="text-sm text-primary">
            {`${config.yLabel}: ${payload[0].value.toFixed(4)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`${className} bg-gradient-card border-primary/20 shadow-glow`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-primary" />
          <span>{config.title}</span>
        </CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={exoplanet.graph_data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={config.dataKey}
                stroke={config.color}
                strokeWidth={2}
                dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                activeDot={{ 
                  r: 6, 
                  fill: config.color,
                  stroke: '#fff',
                  strokeWidth: 2,
                  filter: 'drop-shadow(0 0 8px ' + config.color + ')'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Analysis:</strong> This {config.title.toLowerCase()} shows the scientific evidence 
            used to discover {exoplanet.name} through the {exoplanet.discovery_method} method in {exoplanet.discovery_year}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};