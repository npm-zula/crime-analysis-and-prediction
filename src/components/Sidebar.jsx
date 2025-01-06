import { motion } from "framer-motion";
import PropTypes from "prop-types";

const menuItems = [
  { id: "map", label: "Crime Map", icon: "🗺️" },
  { id: "dashboard", label: "Analytics", icon: "📊" },
];

const mapControls = [
  { id: "heatmap", label: "Heatmap View", icon: "🌡️" },
  { id: "clusters", label: "Cluster View", icon: "📍" },
  { id: "predictions", label: "Predictions", icon: "📈" },
  { id: "filters", label: "Time Filters", icon: "⏱️" },
];

function Sidebar({ selectedView, setSelectedView }) {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 lg:w-72 md:w-20 bg-background-light shadow-card p-6 z-50 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-center space-x-3 mb-8">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl">🔍</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-blue rounded-full flex items-center justify-center shadow-sm">
            <span className="text-[10px]">AI</span>
          </div>
        </div>
        <div className="md:hidden lg:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Crime Predictor
          </h1>
          <p className="text-xs text-content-secondary">AI-Powered Analysis</p>
        </div>
      </div>

      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{
              scale: 1.02,
              backgroundColor:
                selectedView === item.id
                  ? "rgb(56 189 248)"
                  : "rgb(241 245 249)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedView(item.id)}
            className={`w-full p-4 rounded-xl flex items-center transition-all duration-200 relative
              ${
                selectedView === item.id
                  ? "bg-primary-400/10 shadow-sm"
                  : "text-content-secondary hover:bg-background-dark"
              }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span
              className={`font-medium ml-3 md:hidden lg:block transition-opacity duration-200
              ${
                selectedView === item.id
                  ? "text-primary-500 font-semibold"
                  : "text-content-secondary"
              }`}
            >
              {item.label}
            </span>
            {selectedView === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {selectedView === "map" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="px-4">
            <h2 className="text-sm font-semibold text-content-secondary mb-2">
              Map Controls
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full px-4 py-2 rounded-lg bg-background-dark border border-primary-100 
                         focus:ring-2 focus:ring-primary-400 focus:border-primary-400
                         text-sm text-content-primary placeholder-content-secondary"
              />
            </div>
          </div>

          <div className="space-y-1">
            {mapControls.map((control) => (
              <button
                key={control.id}
                className="w-full p-3 rounded-lg flex items-center text-content-secondary hover:bg-background-dark
                         hover:text-primary-500 transition-all duration-200"
              >
                <span className="text-lg mr-3">{control.icon}</span>
                <span className="text-sm font-medium md:hidden lg:block">
                  {control.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}

Sidebar.propTypes = {
  selectedView: PropTypes.string.isRequired,
  setSelectedView: PropTypes.func.isRequired,
};

export default Sidebar;
