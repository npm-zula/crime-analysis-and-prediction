import { useState } from "react";
import { motion } from "framer-motion";
import CrimeMap from "./components/CrimeMap";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [selectedView, setSelectedView] = useState("map");

  return (
    <div className="flex min-h-screen bg-background-light w-full">
      <Sidebar selectedView={selectedView} setSelectedView={setSelectedView} />

      <main className="flex-1 p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-3rem)] bg-background-light rounded-2xl shadow-card p-6 overflow-hidden"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-content-primary">
              {selectedView === "map"
                ? "Crime Hotspots Map"
                : "Analytics Dashboard"}
            </h1>
            <p className="text-content-secondary mt-1">
              {selectedView === "map"
                ? "Interactive visualization of crime hotspots and risk areas"
                : "Comprehensive crime statistics and trends analysis"}
            </p>
          </div>

          <div className="h-[calc(100%-5rem)]">
            {selectedView === "map" ? <CrimeMap /> : <Dashboard />}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
