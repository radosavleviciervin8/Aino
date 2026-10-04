/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React from 'react';
import { 
  ShieldAlert, 
  Lock, 
  UserCheck, 
  AlertOctagon, 
  FileText, 
  Terminal, 
  RefreshCw,
  Fingerprint,
  Globe,
  Ban
} from 'lucide-react';
import { PROJECT_OWNER } from '../data/initialSecurityData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingReviewsCount: number;
  activeGrantsCount: number;
  totalViolationsBlocked: number;
  isEmergencyLockdown: boolean;
  onToggleEmergencyLockdown: () => void;
  onOpenPolicyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  pendingReviewsCount,
  activeGrantsCount,
  totalViolationsBlocked,
  isEmergencyLockdown,
  onToggleEmergencyLockdown,
  onOpenPolicyModal
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Topmost Sovereign Authority Bar */}
      <div className="bg-slate-900/80 px-4 py-1.5 border-b border-slate-800/60 flex flex-wrap items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <div className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM ENFORCING</span>
          </div>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>Zero-Unauthorized-Access Defense Level 1</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-slate-400">Default Denial: Active</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-rose-400 font-mono font-medium">{totalViolationsBlocked} Intrusions Blocked</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Project Sovereign:</span>
            <span className="font-semibold text-white tracking-wide">{PROJECT_OWNER}</span>
          </div>
          <span className="text-slate-700" aria-hidden="true">|</span>
          <span className="text-slate-400 font-mono text-[11px]">Human Control Only · AI Is Not Owner</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-lg border transition-colors ${
              isEmergencyLockdown 
                ? 'bg-rose-950/80 border-rose-500/80 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                : 'bg-slate-900 border-slate-700/80 text-rose-500'
            }`}>
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-tight">ZERO-ACCESS SENTINEL</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Anti-Theft Gov
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Human-in-the-Loop Sovereign Protection Deck
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Control Deck
            </button>
            <button
              onClick={() => setActiveTab('prohibitions')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'prohibitions'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              10 Prohibitions
            </button>
            <button
              onClick={() => setActiveTab('stop-condition')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'stop-condition'
                  ? 'bg-rose-950/70 text-rose-200 shadow-sm border border-rose-700/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span>Stop Condition</span>
            </button>
            <button
              onClick={() => setActiveTab('grants')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'grants'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Human Grants ({activeGrantsCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('quarantine')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'quarantine'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Quarantine</span>
              {pendingReviewsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('protections')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'protections'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Environment
            </button>
            <button
              onClick={() => setActiveTab('human-rights')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'human-rights'
                  ? 'bg-cyan-950/70 text-cyan-200 shadow-sm border border-cyan-700/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>UN Human Rights Law</span>
            </button>
            <button
              onClick={() => setActiveTab('revocation-registry')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'revocation-registry'
                  ? 'bg-rose-950/80 text-rose-200 shadow-sm border border-rose-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Ban className="w-3.5 h-3.5 text-rose-400" />
              <span>AI Ban & Past Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'audit'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Audit Ledger</span>
            </button>
          </nav>

          {/* Quick Actions & Master Stop */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPolicyModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors"
              title="View full Anti-Theft & Zero-Unauthorized-Access Legal Policy"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Anti-Theft Rule</span>
            </button>

            {/* Emergency Global Lockdown Switch */}
            <button
              onClick={onToggleEmergencyLockdown}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all ${
                isEmergencyLockdown
                  ? 'bg-rose-600 text-white border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse'
                  : 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border-rose-800/80 hover:border-rose-600'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isEmergencyLockdown ? 'SYSTEM HARD LOCKED' : 'EMERGENCY LOCKDOWN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'overview' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
        >
          Control Deck
        </button>
        <button
          onClick={() => setActiveTab('prohibitions')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'prohibitions' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
        >
          10 Rules
        </button>
        <button
          onClick={() => setActiveTab('stop-condition')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'stop-condition' ? 'bg-rose-900/50 text-rose-300' : 'text-slate-400'}`}
        >
          Stop Condition
        </button>
        <button
          onClick={() => setActiveTab('grants')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'grants' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
        >
          Grants ({activeGrantsCount})
        </button>
        <button
          onClick={() => setActiveTab('quarantine')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'quarantine' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
        >
          Quarantine ({pendingReviewsCount})
        </button>
        <button
          onClick={() => setActiveTab('protections')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'protections' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
        >
          Environment
        </button>
        <button
          onClick={() => setActiveTab('human-rights')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'human-rights' ? 'bg-cyan-900/60 text-cyan-200' : 'text-slate-400'}`}
        >
          UN Human Rights
        </button>
        <button
          onClick={() => setActiveTab('revocation-registry')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'revocation-registry' ? 'bg-rose-900/70 text-rose-200 font-bold' : 'text-slate-400'}`}
        >
          AI Ban (Past & Present)
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'audit' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
        >
          Audit Ledger
        </button>
      </div>
    </header>
  );
};
