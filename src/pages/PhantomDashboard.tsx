import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Activity } from 'lucide-react';

const mockLogs = [
  { id: 1, agent: 'Research Agent', action: 'API Call', target: 'api.openai.com', risk: 'Low', status: 'Allowed', time: '10:42:01.05' },
  { id: 2, agent: 'Code Agent', action: 'File Write', target: '/src/utils.ts', risk: 'Low', status: 'Allowed', time: '10:42:02.11' },
  { id: 3, agent: 'Analysis Agent', action: 'File Read', target: '/.env', risk: 'Critical', status: 'Blocked', time: '10:42:05.88' },
  { id: 4, agent: 'Web Agent', action: 'Network', target: 'unknown-IP-104.22', risk: 'High', status: 'Blocked', time: '10:42:08.12' },
  { id: 5, agent: 'Research Agent', action: 'Token Check', target: 'Global Budget', risk: 'Medium', status: 'Warn', time: '10:42:10.00' },
];

export default function PhantomDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col p-6 overflow-y-auto"
    >
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
          <ShieldAlert className="text-neon-red" />
          Firewall Matrix
        </h2>
        <p className="text-gray-400">Real-time syscall interception and policy enforcement</p>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-neon-green/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-3xl" />
          <div className="p-3 bg-neon-green/10 rounded-xl">
            <ShieldCheck className="text-neon-green" size={28} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Intercepts</div>
            <div className="text-3xl font-mono text-white text-glow-green">14,092</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-neon-red/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-red/10 blur-3xl" />
          <div className="p-3 bg-neon-red/10 rounded-xl">
            <ShieldAlert className="text-neon-red" size={28} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Threats Blocked</div>
            <div className="text-3xl font-mono text-white text-glow">342</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-neon-blue/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl" />
          <div className="p-3 bg-neon-blue/10 rounded-xl">
            <Activity className="text-neon-blue" size={28} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Active Rules</div>
            <div className="text-3xl font-mono text-white">128</div>
          </div>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border-white/10 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/10 bg-white/5 font-mono text-sm flex justify-between text-gray-400">
          <div className="w-32">TIMESTAMP</div>
          <div className="w-48">AGENT</div>
          <div className="w-32">ACTION</div>
          <div className="flex-1">TARGET</div>
          <div className="w-24">RISK</div>
          <div className="w-24 text-right">STATUS</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {mockLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center p-3 font-mono text-sm border-b border-white/5 hover:bg-white/5 rounded transition-colors"
            >
              <div className="w-32 text-gray-500">{log.time}</div>
              <div className="w-48 text-neon-blue">{log.agent}</div>
              <div className="w-32 text-gray-300">{log.action}</div>
              <div className="flex-1 text-gray-400 truncate pr-4">{log.target}</div>
              <div className={`w-24 font-bold ${
                log.risk === 'Critical' ? 'text-neon-red animate-pulse' : 
                log.risk === 'High' ? 'text-orange-400' : 'text-neon-green'
              }`}>
                {log.risk}
              </div>
              <div className="w-24 text-right">
                <span className={`px-2 py-1 rounded text-xs ${
                  log.status === 'Blocked' ? 'bg-neon-red/20 text-neon-red border border-neon-red/30' :
                  log.status === 'Warn' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                  'bg-neon-green/20 text-neon-green border border-neon-green/30'
                }`}>
                  {log.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
