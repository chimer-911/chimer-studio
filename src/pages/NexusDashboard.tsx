import { motion } from 'framer-motion';
import ReactFlow, { Background, Controls } from 'reactflow';





import { useState, useEffect } from 'react';
export default function NexusDashboard() {
  const [swarm, setSwarm] = useState<any>({ nodes: [], edges: [] });
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetch('http://localhost:3000/api/swarm').then(r => r.json()).then(data => {
        if(data && !data.error) setSwarm(data);
      }).catch(() => {});
    }, 1000);
    return () => clearInterval(fetchInterval);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col p-6"
    >
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Swarm Orchestrator</h2>
          <p className="text-gray-400">Live multi-agent execution topology</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 rounded-lg flex flex-col">
            <span className="text-xs text-gray-400">Active Agents</span>
            <span className="text-xl font-mono text-neon-blue">{swarm?.nodes?.length || 0}</span>
          </div>
          <div className="glass-panel px-4 py-2 rounded-lg flex flex-col">
            <span className="text-xs text-gray-400">Total Tokens</span>
            <span className="text-xl font-mono text-neon-purple text-glow-purple">{0}</span>
          </div>
          <div className="flex items-center ml-2">
            <span className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase bg-[#1a1a1a] text-emerald-400 border border-emerald-500/20 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Execution Live
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-2xl overflow-hidden relative border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <ReactFlow
          nodes={swarm?.nodes || []}
          edges={swarm?.edges || []}
          fitView
          className="bg-transparent"
        >
          <Background color="#4b5563" gap={16} />
          <Controls className="glass-panel border-none fill-white text-black" />
        </ReactFlow>
      </div>
    </motion.div>
  );
}
