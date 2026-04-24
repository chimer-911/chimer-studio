import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Network, ShieldAlert, Cpu, Box, BrainCircuit, Code2, Zap } from 'lucide-react';
import NexusDashboard from './pages/NexusDashboard';
import PhantomDashboard from './pages/PhantomDashboard';
import PrismDashboard from './pages/PrismDashboard';
import VoidboxDashboard from './pages/VoidboxDashboard';
import CortexDashboard from './pages/CortexDashboard';
import AegisDashboard from './pages/AegisDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('nexus');

  const tabs = [
    { id: 'nexus', name: 'NEXUS Orchestrator', icon: Network },
    { id: 'phantom', name: 'PHANTOM Firewall', icon: ShieldAlert },
    { id: 'prism', name: 'PRISM Gateway', icon: Cpu },
    { id: 'voidbox', name: 'VOIDBOX Sandbox', icon: Box },
    { id: 'cortex', name: 'CORTEX Memory', icon: BrainCircuit },
    { id: 'aegis', name: 'AEGIS Verifier', icon: Code2 },
  ];

  return (
    <div className="flex h-screen w-full bg-[#030303] text-gray-200 font-sans overflow-hidden selection:bg-white/10">
      
      {/* Ultra Sleek Sidebar */}
      <div className="w-[280px] bg-[#080808] border-r border-white/[0.03] flex flex-col relative z-20">
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/[0.05] shadow-[0_2px_10px_rgba(0,0,0,1)] flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <h1 className="text-[15px] font-semibold tracking-tight text-white/90">
              Chimer<span className="text-white/30 font-medium">.OS</span>
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 space-y-[2px]">
          <p className="text-[10px] font-medium text-white/20 tracking-[0.2em] uppercase px-3 mb-5">Core Infrastructure</p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative group ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/90'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-white/[0.04] rounded-lg border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                <span className="relative z-10 font-medium text-[13px] tracking-tight">{tab.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Status */}
        <div className="p-5 border-t border-white/[0.02] bg-[#050505]">
          <div className="flex items-center gap-3 px-1">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-20 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-white/80 tracking-wide">System Online</span>
              <span className="text-[10px] text-white/30 font-mono mt-0.5">Latency: 12ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - FIXED OVERLAPPING HERE */}
      <div className="flex-1 relative z-10 overflow-y-auto bg-transparent">
        {/* 2026 Ambient Top Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.015] rounded-[100%] blur-[100px] pointer-events-none" />
        
        <div className="min-h-full p-8 lg:p-12 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full max-w-[1400px] mx-auto"
            >
              {activeTab === 'nexus' && <NexusDashboard />}
              {activeTab === 'phantom' && <PhantomDashboard />}
              {activeTab === 'prism' && <PrismDashboard />}
              {activeTab === 'voidbox' && <VoidboxDashboard />}
              {activeTab === 'cortex' && <CortexDashboard />}
              {activeTab === 'aegis' && <AegisDashboard />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
