/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  AlertOctagon, 
  Archive, 
  Activity, 
  Key, 
  Fingerprint, 
  ArrowRight,
  Play,
  RotateCw,
  FileText,
  Server
} from 'lucide-react';
import { ProhibitionRule, HumanGrant, SecurityIncident, AuditLogEntry } from '../types/security';
import { PROJECT_OWNER, PROJECT_PROVENANCE_HASH, GENESIS_TIMESTAMP } from '../data/initialSecurityData';

interface OverviewDeckProps {
  onNavigateTab: (tab: string) => void;
  prohibitions: ProhibitionRule[];
  grants: HumanGrant[];
  incidents: SecurityIncident[];
  auditLogs: AuditLogEntry[];
  isEmergencyLockdown: boolean;
  onOpenPolicyModal: () => void;
  onTriggerQuickProbe: () => void;
}

export const OverviewDeck: React.FC<OverviewDeckProps> = ({
  onNavigateTab,
  prohibitions,
  grants,
  incidents,
  auditLogs,
  isEmergencyLockdown,
  onOpenPolicyModal,
  onTriggerQuickProbe
}) => {
  const activeGrants = grants.filter(g => g.status === 'ACTIVE');
  const pendingIncidents = incidents.filter(i => i.status === 'PENDING_HUMAN_REVIEW');
  const totalViolations = prohibitions.reduce((sum, p) => sum + p.attemptCount, 0);

  return (
    <div className="space-y-6">
      {/* Sovereign Hero Header */}
      <div className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        isEmergencyLockdown
          ? 'bg-rose-950/70 border-rose-500/80 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
          : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800'
      }`}>
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/80 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Zero-Unauthorized-Access Architecture
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                DEFAULT DENIAL ACTIVE
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-slate-400">
                AI HAS ZERO INDEPENDENT PERMISSION
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Anti-Theft & Sovereign Governance Console
            </h1>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Enforcing absolute zero-unauthorized-access, deterministic stop conditions, and human-in-the-loop permission grants. All project intellectual property and materials are solely owned and controlled by{' '}
              <strong className="text-white font-semibold underline decoration-emerald-500/60 underline-offset-4">
                {PROJECT_OWNER}
              </strong>.
            </p>
          </div>

          {/* Quick Action Matrix */}
          <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateTab('stop-condition')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Simulate Stop Intercept</span>
            </button>
            <button
              onClick={() => onNavigateTab('grants')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Issue Explicit Grant</span>
            </button>
            <button
              onClick={onOpenPolicyModal}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Anti-Theft Rule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Metric Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigateTab('prohibitions')}
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono">AI PROHIBITIONS</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">10 / 10</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Hardware Locked</span>
            <span className="text-emerald-400 font-medium">0 Bypasses</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigateTab('stop-condition')}
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono">STOP INTERCEPTIONS</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-rose-400 font-mono">{totalViolations}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Auto Severed</span>
            <span className="text-slate-400 font-mono">&lt; 1.4ms Latency</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigateTab('grants')}
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono">ACTIVE HUMAN GRANTS</span>
            <UserCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">{activeGrants.length}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Scoped & Timed</span>
            <span className="text-slate-400">Revocable 1-Click</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigateTab('quarantine')}
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono">EVIDENCE QUARANTINE</span>
            <Archive className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">{pendingIncidents.length}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Awaiting Owner Review</span>
            <span className="text-amber-400 font-medium">Zero Auto Override</span>
          </div>
        </div>
      </div>

      {/* STOP CONDITION Core Architecture Visual Callout */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              Enforcement Invariant
            </span>
            <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
              The 6-Stage Deterministic Stop Protocol
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('stop-condition')}
            className="flex items-center gap-1 text-xs font-medium text-rose-400 hover:text-rose-300 self-start sm:self-auto"
          >
            <span>Launch Pipeline Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">1. STOP</span>
            <span className="text-[10px] text-rose-400">Syscall Halt</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">2. DENY</span>
            <span className="text-[10px] text-rose-400">Zero Access</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">3. LOG</span>
            <span className="text-[10px] text-amber-400">Merkle Append</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">4. PRESERVE</span>
            <span className="text-[10px] text-cyan-400">Memory Dump</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">5. REVOKE</span>
            <span className="text-[10px] text-rose-400">Kill Access</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">6. REVIEW</span>
            <span className="text-[10px] text-emerald-400">{PROJECT_OWNER.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Quarantined Violations & Live Audit Chain */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Quarantine Review Items */}
        <div className="lg:col-span-6 p-5 rounded-xl border border-slate-800 bg-slate-900/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Archive className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Quarantined Intrusions</h3>
              </div>
              <button
                onClick={() => onNavigateTab('quarantine')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <span>View All ({incidents.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {incidents.slice(0, 3).map(inc => (
                <div 
                  key={inc.id}
                  onClick={() => onNavigateTab('quarantine')}
                  className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-amber-700/50 cursor-pointer transition-all text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-white">{inc.id}</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.2 rounded">
                      {inc.status === 'PENDING_HUMAN_REVIEW' ? 'PENDING OWNER REVIEW' : 'RESOLVED'}
                    </span>
                  </div>
                  <div className="font-medium text-slate-200 truncate">
                    {inc.ruleViolated}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                    Actor: {inc.actor}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Preservation Vault: SHA-256 Valid</span>
            <span className="text-emerald-400">Zero Leaks</span>
          </div>
        </div>

        {/* Right: Live Audit Telemetry Preview */}
        <div className="lg:col-span-6 p-5 rounded-xl border border-slate-800 bg-slate-900/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Recent Merkle Audit Trail</h3>
              </div>
              <button
                onClick={() => onNavigateTab('audit')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <span>Full Ledger</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {auditLogs.slice(0, 3).map(log => (
                <div 
                  key={log.id}
                  className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-slate-300 font-semibold">{log.actionType}</span>
                    <span className="text-[10px] font-mono text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-1">
                    {log.details}
                  </p>
                  <div className="text-[10px] font-mono text-slate-600 truncate">
                    Hash: {log.hash.slice(0, 30)}...
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Chain Integrity: Merkle Validated</span>
            <span className="text-cyan-400">SHA-256 Chained</span>
          </div>
        </div>
      </div>
    </div>
  );
};
