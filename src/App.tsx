import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
    <div className="flex h-screen w-full bg-transparent overflow-hidden">
      {/* Sidebar - Linear Style */}
      <div className="w-[260px] bg-[#0c0c0c] border-r border-white/[0.04] z-10 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.4)]">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border border-white/[0.08] flex items-center justify-center shadow-inner">
              <Network size={14} className="text-[#a0a0a0]" />
            </div>
            <h1 className="text-sm font-semibold tracking-tight text-white">
              Chimer<span className="text-gray-500 font-normal">.OS</span>
            </h1>
          </div>
        </div>

        <div className="px-3 mb-2">
          <p className="text-[10px] font-semibold text-gray-600 tracking-wider uppercase pl-3 mb-2">Infrastructure</p>
        </div>

        <div className="flex-1 px-3 space-y-[2px]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative group ${
                  isActive ? 'bg-[#1e1e1e] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' : 'text-gray-400 hover:bg-[#161616] hover:text-gray-200'
                }`}
              >
                <Icon size={15} strokeWidth={isActive ? 2.5 : 2} className={`relative z-10 ${isActive ? tab.color : 'text-gray-500 group-hover:text-gray-400 transition-colors'}`} />
                <span className="relative z-10 font-medium text-[13px] tracking-tight">{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/[0.04] bg-[#0a0a0a]">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_8px_rgba(58,176,127,0.8)]" />
              <span className="text-[11px] font-medium text-gray-400">All Systems Nominal</span>
            </div>
            <span className="text-[10px] text-gray-600 font-mono">v1.0</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 overflow-hidden bg-transparent">
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
