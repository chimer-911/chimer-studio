import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRightLeft, DollarSign, Zap } from 'lucide-react';



export default function PrismDashboard() {
  const [routes, setRoutes] = useState<any[]>([]);
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetch('http://localhost:3002/api/routes').then(r => r.json()).then(data => {
        if(data && !data.error) setRoutes(data);
      }).catch(() => {});
    }, 1000);
    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col p-6 overflow-y-auto">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <Cpu className="text-neon-purple" /> PRISM Gateway
          </h2>
          <p className="text-gray-400">Zero-Shot Semantic Model Routing & Cost Optimization</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-4 border-neon-purple/30">
          <DollarSign className="text-neon-green" />
          <div>
            <div className="text-xs text-gray-400">Total Saved (24h)</div>
            <div className="text-xl font-mono text-neon-green text-glow-green">$0.00</div>
          </div>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-2xl border-white/10 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/10 bg-white/5 font-mono text-sm flex text-gray-400">
          <div className="flex-1">PROMPT SNIPPET</div>
          <div className="w-48">SEMANTIC INTENT</div>
          <div className="w-32">CONFIDENCE</div>
          <div className="w-40">ROUTED TO</div>
          <div className="w-24 text-right">SAVED</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {routes.map((route) => (
            <motion.div key={route.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center p-4 font-mono text-sm border-b border-white/5 hover:bg-white/5 transition-colors">
              <div className="flex-1 text-gray-300 truncate pr-4">"{route.prompt}"</div>
              <div className="w-48 text-neon-purple flex items-center gap-2">
                <Zap size={14} /> {route.classification}
              </div>
              <div className="w-32">
                <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
                  <div className="bg-neon-purple h-2 rounded-full shadow-[0_0_10px_#c084fc]" style={{ width: `${route.confidence * 100}%` }}></div>
                </div>
              </div>
              <div className="w-40 flex items-center gap-2">
                <ArrowRightLeft size={14} className="text-gray-500" />
                <span className={route.routedTo === 'CACHE' ? 'text-neon-green' : 'text-neon-blue'}>{route.routedTo}</span>
              </div>
              <div className="w-24 text-right text-neon-green">{route.costSaved}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
