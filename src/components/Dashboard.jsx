import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, Metric, Text, Title } from "@tremor/react";

// Mock data for demonstration
const crimeData = [
  { date: "Jan", crimes: 65, solved: 45 },
  { date: "Feb", crimes: 59, solved: 38 },
  { date: "Mar", crimes: 80, solved: 60 },
  { date: "Apr", crimes: 81, solved: 61 },
  { date: "May", crimes: 56, solved: 48 },
  { date: "Jun", crimes: 55, solved: 45 },
];

const crimeTypes = [
  { name: "Theft", value: 456, color: "#3b82f6" },
  { name: "Assault", value: 351, color: "#ef4444" },
  { name: "Burglary", value: 271, color: "#f59e0b" },
  { name: "Robbery", value: 191, color: "#10b981" },
];

const categories = [
  {
    title: "Total Incidents",
    metric: "2,851",
    description: "Last 6 months",
    trend: "+12%",
    status: "warning",
  },
  {
    title: "High-Risk Areas",
    metric: "12",
    description: "Current hotspots",
    trend: "-3",
    status: "success",
  },
  {
    title: "Response Time",
    metric: "8.2 min",
    description: "Average",
    trend: "-1.5 min",
    status: "success",
  },
  {
    title: "Case Resolution",
    metric: "76%",
    description: "Success rate",
    trend: "+5%",
    status: "success",
  },
];

function LocationSearch() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-content-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-content-light/20 rounded-xl 
                 bg-background-light focus:ring-2 focus:ring-primary-400 focus:border-primary-400
                 placeholder-content-light text-content-primary"
        placeholder="Search location or area..."
      />
    </div>
  );
}

function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full overflow-auto pr-2 custom-scrollbar"
    >
      <div className="space-y-6 min-h-full pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((item) => (
            <Card
              key={item.title}
              className="bg-background-light shadow-card hover:shadow-card-lg transition-shadow"
            >
              <Text className="text-content-light text-sm">{item.title}</Text>
              <div className="flex items-baseline justify-between mt-2">
                <Metric className="text-content-primary text-xl lg:text-2xl">
                  {item.metric}
                </Metric>
                <Text className={`text-accent-${item.status} text-sm`}>
                  {item.trend}
                </Text>
              </div>
              <Text className="text-content-secondary mt-1 text-xs lg:text-sm">
                {item.description}
              </Text>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <Card className="lg:col-span-2 bg-background-light shadow-card">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <Title className="text-content-primary text-lg lg:text-xl">
                  Crime Trends
                </Title>
                <Text className="text-content-light mt-1 text-sm">
                  Monthly crime statistics
                </Text>
              </div>
              <div className="w-full sm:w-auto max-w-sm">
                <LocationSearch />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={crimeData}>
                <defs>
                  <linearGradient id="colorCrimes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                    color: "#0f172a",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="crimes"
                  name="Total Crimes"
                  stroke="#3b82f6"
                  fill="url(#colorCrimes)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="solved"
                  name="Solved Cases"
                  stroke="#10b981"
                  fill="url(#colorSolved)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-background-light shadow-card">
            <Title className="text-content-primary mb-6 text-lg lg:text-xl">
              Crime Distribution
            </Title>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={crimeTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {crimeTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                    color: "#0f172a",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-1 gap-2">
              {crimeTypes.map((type) => (
                <div
                  key={type.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className="w-2 h-2 lg:w-3 lg:h-3 rounded-full mr-2"
                      style={{ backgroundColor: type.color }}
                    />
                    <Text className="text-content-secondary text-sm">
                      {type.name}
                    </Text>
                  </div>
                  <Text className="font-medium text-content-primary text-sm">
                    {type.value}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
