import { useState } from "react";
import { Navigation } from '@/components/Navigation';
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import { modelPerformance } from "@/data/mperformance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Activity, TrendingUp } from "lucide-react";

const ModelPerformancePage = () => {
  const [model, setModel] = useState<"kepler" | "tess">("kepler");
  const data = modelPerformance[model];

  // Sample data for ROC & PR graphs
  const rocData = [
    { fpr: 0, tpr: 0 },
    { fpr: 0.1, tpr: 0.7 },
    { fpr: 0.2, tpr: 0.85 },
    { fpr: 0.3, tpr: 0.9 },
    { fpr: 1, tpr: 1 },
  ];

  const prData = [
    { recall: 0, precision: 1 },
    { recall: 0.4, precision: 0.9 },
    { recall: 0.6, precision: 0.85 },
    { recall: 0.8, precision: 0.8 },
    { recall: 1, precision: 0.7 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-primary/20 rounded-lg p-3 shadow-glow">
          <p className="text-sm font-medium">{`X: ${label}`}</p>
          <p className="text-sm text-primary">{`Y: ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  const GraphCard = ({ title, description, data, dataKey, color, Icon }: any) => (
    <Card className="bg-gradient-card border-primary/20 shadow-glow flex-1">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-primary" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={Object.keys(data[0])[0]} tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, r: 4 }}
                activeDot={{
                  r: 6,
                  fill: color,
                  stroke: '#fff',
                  strokeWidth: 2,
                  filter: `drop-shadow(0 0 8px ${color})`,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-space relative">
      <StarfieldBackground />
      <div className="relative z-10">
          {/* Main Content */}
      <div className="relative z-10">
        <Navigation 
          onSearch={() => {}}
          searchQuery=""
        />
        {/* Navigation placeholder */}
        <motion.div
          className="container mx-auto px-4 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-neon bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Model Performance
          </motion.h1>

          {/* Switch */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-medium">Kepler</span>
            <Switch
              checked={model === "tess"}
              onCheckedChange={(checked) =>
                setModel(checked ? "tess" : "kepler")
              }
            />
            <span className="font-medium">TESS</span>
          </motion.div>

          {/* Table */}
          <motion.div
            className="overflow-x-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <table className="table-auto border border-gray-300 w-full text-center rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
              <thead className="bg-gray-100/50">
                <tr>
                  <th className="px-4 py-2">Precision</th>
                  <th className="px-4 py-2">Recall</th>
                  <th className="px-4 py-2">F1 Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">{data.precision}</td>
                  <td className="px-4 py-2">{data.recall}</td>
                  <td className="px-4 py-2">{data.f1score}</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Performance text */}
          <motion.p
            className="text-lg md:text-xl font-semibold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Performance: {data.performance}%
          </motion.p>

          {/* Graphs */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <GraphCard
              title="ROC Curve"
              description="Receiver Operating Characteristic"
              data={rocData}
              dataKey="tpr"
              color="#4FC3F7"
              Icon={TrendingUp}
            />
            <GraphCard
              title="Precision-Recall Curve"
              description="Precision vs Recall"
              data={prData}
              dataKey="precision"
              color="#BB86FC"
              Icon={Activity}
            />
          </motion.div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default ModelPerformancePage;
