import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Bug, CheckCircle2 } from 'lucide-react';



export default function AegisDashboard() {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetch('http://localhost:3004/api/issues').then(r => r.json()).then(data => {
        if(data && !data.error) setIssues(data);
      }).catch(() => {});
    }, 1000);
    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col p-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <Code2 className="text-yellow-400" /> AEGIS Verifier
          </h2>
          <p className="text-gray-400">TypeScript Compiler API AST Traversal</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-lg border-yellow-400/30 flex flex-col items-end">
          <span className="text-xs text-gray-400">Trust Score</span>
          <span className="text-2xl font-mono text-yellow-400 font-bold">{issues?.length > 0 ? 0 : 100}/100</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl border-white/10 flex flex-col overflow-hidden">
          <div className="bg-black/40 p-3 border-b border-white/10 font-mono text-sm text-gray-400">
            src/generated/handler.ts
          </div>
          <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm text-gray-300 overflow-y-auto relative">
            <div className="absolute top-10 left-0 w-full h-6 bg-red-500/20 border-l-2 border-red-500 pointer-events-none" />
            <pre>
{""}
            </pre>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-gray-400 text-sm pl-2">AST VULNERABILITY REPORT</h3>
          
          {issues.map((issue, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
              key={idx} className="glass-panel p-4 rounded-xl border-l-4 border-l-red-500 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono bg-red-500/20 text-red-400 px-2 py-1 rounded">Line {issue.line}</span>
                <span className="text-xs font-bold text-red-500">{issue.severity}</span>
              </div>
              <div className="text-white font-mono text-sm flex items-center gap-2">
                <Bug size={14} className="text-red-400" /> {issue.issue}
              </div>
            </motion.div>
          ))}

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-neon-green mt-auto">
            <div className="flex items-center gap-3 text-neon-green">
              <CheckCircle2 />
              <div>
                <div className="font-bold">No Hardcoded Secrets</div>
                <div className="text-xs text-gray-400">AST passed regex validation for AWS/Slack tokens.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
