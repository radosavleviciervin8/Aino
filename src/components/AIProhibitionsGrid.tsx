/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Lock, 
  FileCode, 
  HardDrive, 
  Globe, 
  Trash2, 
  Copy, 
  Award, 
  Key, 
  Maximize2, 
  Shuffle, 
  Search,
  CheckCircle2,
  Play
} from 'lucide-react';
import { ProhibitionRule } from '../types/security';
import { PROJECT_OWNER } from '../data/initialSecurityData';

interface AIProhibitionsGridProps {
  prohibitions: ProhibitionRule[];
  onProbeRule: (rule: ProhibitionRule) => void;
}

export const AIProhibitionsGrid: React.FC<AIProhibitionsGridProps> = ({
  prohibitions,
  onProbeRule
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryMap: Record<string, string> = {
    REPO_ACCESS: 'Repo Access',
    EXFILTRATION: 'Anti-Theft & Egress',
    MODIFICATION: 'Integrity & Deletion',
    PROVENANCE: 'Attribution & Authorship',
    PERMISSIONS: 'Least Privilege',
    BYPASS: 'Anti-Bypass & Tunnels'
  };

  const getRuleIcon = (number: number) => {
    switch (number) {
      case 1: return <HardDrive className="w-4 h-4 text-rose-400" />;
      case 2: return <Copy className="w-4 h-4 text-rose-400" />;
      case 3: return <Globe className="w-4 h-4 text-rose-400" />;
      case 4: return <Trash2 className="w-4 h-4 text-rose-400" />;
      case 5: return <FileCode className="w-4 h-4 text-rose-400" />;
      case 6: return <ShieldCheck className="w-4 h-4 text-rose-400" />;
      case 7: return <Award className="w-4 h-4 text-rose-400" />;
      case 8: return <Key className="w-4 h-4 text-rose-400" />;
      case 9: return <Lock className="w-4 h-4 text-rose-400" />;
      case 10: return <Shuffle className="w-4 h-4 text-rose-400" />;
      default: return <ShieldAlert className="w-4 h-4 text-rose-400" />;
    }
  };

  const filteredRules = prohibitions.filter(rule => {
    const matchesCategory = selectedCategory === 'ALL' || rule.category === selectedCategory;
    const matchesSearch = 
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.number.toString().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const totalViolationsIntercepted = prohibitions.reduce((acc, r) => acc + r.attemptCount, 0);

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                Article II Enactment
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400 font-mono">10 Strict Autonomous Prohibitions</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Absolute AI & Automated Systems Restrictions
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              No AI agent, automated agent, AI provider, plugin, integration, or third-party service may independently execute any of these 10 actions. Every attempt triggers an immediate hardware stop.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <div>
              <div className="text-slate-400 text-[11px] font-mono">Active Rules</div>
              <div className="text-base font-bold text-emerald-400 font-mono">10 / 10 Enforced</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-slate-400 text-[11px] font-mono">Intercepted Probes</div>
              <div className="text-base font-bold text-rose-400 font-mono">{totalViolationsIntercepted} Blocked</div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-950 rounded-lg border border-slate-800/80 text-xs">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedCategory === 'ALL'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All (10)
            </button>
            {Object.keys(categoryMap).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {categoryMap[cat]}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-rose-900/50 transition-colors">
                    {getRuleIcon(rule.number)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="font-mono text-rose-400 font-semibold">RULE #{rule.number}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[11px]">{categoryMap[rule.category] || rule.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-rose-200 transition-colors">
                      {rule.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>HARD ENFORCED</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed pl-1 mb-3">
                {rule.description}
              </p>

              {/* Technical Vector Summary */}
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/70 space-y-1 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Monitored Vector:</span>
                  <span className="text-slate-300 truncate max-w-[200px]">{rule.probePayload.vector}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Interception Scope:</span>
                  <span className="text-rose-400 font-semibold">Kernel Deny-on-Syscall</span>
                </div>
              </div>
            </div>

            {/* Footer with stats & Probe Action */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
                <span className="text-rose-400 font-semibold">{rule.attemptCount} blocked</span>
                <span className="text-slate-600">·</span>
                <span>Last: {rule.lastProbeTime || 'None'}</span>
              </div>

              <button
                onClick={() => onProbeRule(rule)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-rose-950/50 text-slate-200 hover:text-rose-300 border border-slate-700 hover:border-rose-700/60 transition-colors"
                title="Fire test probe against this specific rule"
              >
                <Play className="w-3 h-3 text-rose-400" />
                <span>Test Probe</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sovereign Anchor Footer */}
      <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs text-slate-400 font-mono">
        <div>
          <span>Attribution Guarantee: All intellectual property anchored to </span>
          <span className="text-white font-semibold">{PROJECT_OWNER}</span>.
        </div>
        <div className="text-emerald-400">Zero Autonomous Exceptions Permitted</div>
      </div>
    </div>
  );
};
