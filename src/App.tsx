import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ShieldAlert, Cpu, Box, BrainCircuit, Code2 } from 'lucide-react';
import NexusDashboard from './pages/NexusDashboard';
import PhantomDashboard from './pages/PhantomDashboard';
import PrismDashboard from './pages/PrismDashboard';
import VoidboxDashboard from './pages/VoidboxDashboard';
import CortexDashboard from './pages/CortexDashboard';
import AegisDashboard from './pages/AegisDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('nexus');

  const tabs = [
    { id: 'nexus', name: 'NEXUS Orchestrator', icon: Network, color: 'text-neon-blue' },
    { id: 'phantom', name: 'PHANTOM Firewall', icon: ShieldAlert, color: 'text-neon-red' },
    { id: 'prism', name: 'PRISM Gateway', icon: Cpu, color: 'text-neon-purple' },
    { id: 'voidbox', name: 'VOIDBOX Sandbox', icon: Box, color: 'text-gray-400' },
    { id: 'cortex', name: 'CORTEX Memory', icon: BrainCircuit, color: 'text-neon-green' },
    { id: 'aegis', name: 'AEGIS Verifier', icon: Code2, color: 'text-yellow-400' },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-blue/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none" />

      {/* Sidebar */}
      <div className="w-64 glass-panel border-r border-t-0 border-b-0 border-l-0 z-10 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <Network size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              CHIMER<span className="text-neon-blue">.OS</span>
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase">Command Center 2026</p>
        </div>

        <div className="flex-1 px-4 space-y-2 mt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/20"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={18} className={`relative z-10 ${isActive ? tab.color : 'group-hover:text-white transition-colors'}`} />
                <span className="relative z-10 font-medium text-sm">{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border-neon-green/30">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#4ade80]" />
            <div className="text-xs">
              <div className="text-gray-400">System Status</div>
              <div className="text-neon-green font-mono">All Systems Nominal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'nexus' && <NexusDashboard key="nexus" />}
          {activeTab === 'phantom' && <PhantomDashboard key="phantom" />}
          {activeTab === 'prism' && <PrismDashboard key="prism" />}
          {activeTab === 'voidbox' && <VoidboxDashboard key="voidbox" />}
          {activeTab === 'cortex' && <CortexDashboard key="cortex" />}
          {activeTab === 'aegis' && <AegisDashboard key="aegis" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
