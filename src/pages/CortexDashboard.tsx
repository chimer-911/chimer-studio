import { motion } from 'framer-motion';
import { BrainCircuit, Search, Database } from 'lucide-react';

export default function CortexDashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col p-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <BrainCircuit className="text-neon-green" /> CORTEX Memory
          </h2>
          <p className="text-gray-400">ONNX Cosine Similarity & Vector Storage</p>
        </div>
        <div className="glass-panel flex items-center gap-3 px-4 py-2 rounded-lg border-neon-green/30">
          <Database className="text-neon-green" size={18} />
          <span className="font-mono text-white">4,092 Embeddings</span>
        </div>
      </header>

      <div className="mb-6 glass-panel p-4 rounded-xl border-white/10 flex items-center gap-4 focus-within:border-neon-green/50 transition-colors">
        <Search className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Semantic search via Xenova/all-MiniLM-L6-v2..." 
          className="w-full bg-transparent outline-none text-white font-mono placeholder:text-gray-600"
        />
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-green/5 via-background to-background" />
          <BrainCircuit size={64} className="text-neon-green/20 mb-4" />
          <h3 className="text-lg font-mono text-gray-300 z-10">Vector Space Visualization</h3>
          <p className="text-sm text-gray-500 z-10 text-center mt-2 max-w-xs">3D projection of the 384-dimensional embedding space is currently rendering...</p>
        </div>

        <div className="glass-panel rounded-2xl border-white/10 p-6 overflow-y-auto">
          <h3 className="font-mono text-gray-400 mb-4 text-sm">RECENTLY ACCESSED MEMORIES</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-neon-green/30 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-neon-green bg-neon-green/10 px-2 py-1 rounded">Distance: 0.9{9-i}</span>
                  <span className="text-xs text-gray-500">{i}h ago</span>
                </div>
                <p className="text-sm text-gray-300 font-mono">
                  {i === 1 ? "The user prefers strictly typed TypeScript configurations with noImplicitAny enabled." : 
                   i === 2 ? "Database connection strings must always use environment variables." :
                   "Last known working configuration for the orchestration engine was v0.1.4."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
