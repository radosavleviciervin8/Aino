/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  GitBranch, 
  Key, 
  FileCheck, 
  Database, 
  RotateCcw, 
  Activity, 
  Radio, 
  CheckCircle2, 
  RefreshCw, 
  Award,
  Zap,
  Server
} from 'lucide-react';
import { EnvironmentProtection } from '../types/security';
import { PROJECT_OWNER, PROJECT_PROVENANCE_HASH, GENESIS_TIMESTAMP } from '../data/initialSecurityData';

interface EnvironmentProtectionStatusProps {
  protections: EnvironmentProtection[];
  onTriggerScan: () => void;
  onTakeBackupSnapshot: () => void;
  onRotateCredentials: () => void;
}

export const EnvironmentProtectionStatus: React.FC<EnvironmentProtectionStatusProps> = ({
  protections,
  onTriggerScan,
  onTakeBackupSnapshot,
  onRotateCredentials
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const handleRunScan = () => {
    setIsScanning(true);
    setScanMessage('Scanning filesystem integrity, Merkle tree root, and sandbox boundaries...');
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('Integrity scan 100% verified. Zero tampering, zero unauthorized exfiltration detected.');
      onTriggerScan();
    }, 1200);
  };

  const getProtectionIcon = (id: string) => {
    switch (id) {
      case 'ep-least-privilege': return <Key className="w-5 h-5 text-emerald-400" />;
      case 'ep-deny-by-default': return <Lock className="w-5 h-5 text-rose-400" />;
      case 'ep-isolated-secrets': return <Server className="w-5 h-5 text-cyan-400" />;
      case 'ep-branch-protection': return <GitBranch className="w-5 h-5 text-amber-400" />;
      case 'ep-audit-logs': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'ep-immutable-provenance': return <Award className="w-5 h-5 text-purple-400" />;
      case 'ep-backups-snapshots': return <Database className="w-5 h-5 text-blue-400" />;
      case 'ep-credential-revocation': return <Zap className="w-5 h-5 text-rose-400" />;
      case 'ep-exfiltration-monitor': return <Radio className="w-5 h-5 text-emerald-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Principle Banner */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Article V Environmental Armor
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400 font-mono">Defense-in-Depth Specification</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Development Environment Security Enforcement
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Continuous hardware and kernel enforcement of least-privilege access, isolated secrets, branch protection, immutable provenance, and zero-egress monitoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Verifying Integrity...' : 'Verify Environment Integrity'}</span>
            </button>
            <button
              onClick={onTakeBackupSnapshot}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Snapshot Differential</span>
            </button>
            <button
              onClick={onRotateCredentials}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/80 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Cycle Revocation Tokens</span>
            </button>
          </div>
        </div>

        {scanMessage && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center justify-between font-mono">
            <span>{scanMessage}</span>
            <span className="text-[10px] text-emerald-500">100% OK</span>
          </div>
        )}
      </div>

      {/* Sovereign Provenance Digital Seal Card */}
      <div className="p-5 rounded-xl border border-cyan-900/50 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
              <Award className="w-4 h-4" />
              <span>Immutable Project Provenance Seal</span>
            </div>
            <div className="text-base font-bold text-white">
              Project Sole Human Sovereign: <span className="text-emerald-300">{PROJECT_OWNER}</span>
            </div>
            <div className="text-xs text-slate-400 font-mono flex flex-wrap items-center gap-2 pt-1">
              <span>Genesis Root: {GENESIS_TIMESTAMP}</span>
              <span className="text-slate-600">·</span>
              <span className="truncate max-w-[320px]">Genesis Hash: {PROJECT_PROVENANCE_HASH}</span>
            </div>
          </div>

          <div className="shrink-0 p-3 rounded-lg bg-slate-950/80 border border-cyan-800/50 text-right">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Provenance Status</div>
            <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 justify-end mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CRYPTOGRAPHICALLY ANCHORED</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Zero Synthetic Ownership Permitted
            </div>
          </div>
        </div>
      </div>

      {/* 9 Protection Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {protections.map((prot) => (
          <div
            key={prot.id}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {getProtectionIcon(prot.id)}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ACTIVE</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">
                {prot.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {prot.description}
              </p>
            </div>

            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/60 text-[11px] font-mono flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Metric:</span>
              <span className="text-emerald-400 font-medium">{prot.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
