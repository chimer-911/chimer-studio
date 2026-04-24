import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Terminal, Lock } from 'lucide-react';



export default function VoidboxDashboard() {
  const [containers, setContainers] = useState([]);
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetch('http://localhost:3003/api/containers').then(r => r.json()).then(data => {
        if(data && !data.error) setContainers(data);
      }).catch(() => {});
    }, 1000);
    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
          <Box className="text-gray-400" /> VOIDBOX Runtime
        </h2>
        <p className="text-gray-400">Airgapped Dockerode Container Isolation</p>
      </header>

      <div className="grid grid-cols-2 gap-6 h-full pb-6">
        <div className="flex flex-col gap-6">
          {containers.map((container) => (
            <div key={container.id} className="glass-panel p-6 rounded-2xl border-white/10 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_#4ade80]" />
                <span className="text-xs font-mono text-neon-green">{container.status}</span>
              </div>
              <h3 className="text-xl font-mono text-white mb-4">{container.id}</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Image</span>
                  <span className="text-neon-blue">{container.image}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Memory</span>
                  <span className="text-white">{container.memory}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">CPU</span>
                  <span className="text-white">{container.cpu}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-500 flex items-center gap-2"><Lock size={14}/> Network</span>
                  <span className="text-neon-red">{container.network}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-2xl border-white/10 flex flex-col overflow-hidden relative">
          <div className="bg-black/40 p-3 border-b border-white/10 flex items-center gap-2 text-gray-400 font-mono text-sm">
            <Terminal size={16} /> stdout stream (c-8f92a)
          </div>
          <div className="flex-1 p-4 font-mono text-sm text-green-400 bg-black/60 overflow-y-auto">
            <div>&gt; Executing untrusted AI payload...</div>
            <div className="text-gray-500 mt-2">Loading dependencies...</div>
            <div className="mt-1">Calculating graph topology...</div>
            <div className="mt-1">Done. Output saved to /tmp/out.json</div>
            <div className="text-neon-blue mt-4">&gt; Process completed with exit code 0.</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
