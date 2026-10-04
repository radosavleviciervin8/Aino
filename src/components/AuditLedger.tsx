/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  Terminal, 
  Hash, 
  Search, 
  Download, 
  ShieldAlert, 
  Filter, 
  Key, 
  CheckCircle2,
  Clock,
  Link2
} from 'lucide-react';
import { AuditLogEntry, SeverityLevel } from '../types/security';

interface AuditLedgerProps {
  logs: AuditLogEntry[];
}

export const AuditLedger: React.FC<AuditLedgerProps> = ({ logs }) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesSev = filterSeverity === 'ALL' || log.severity === filterSeverity;
    const matchesSearch = 
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hash.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSev && matchesSearch;
  });

  const handleExportAuditJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sentinel_audit_merkle_chain_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-800/80 px-2 py-0.5 rounded">CRITICAL</span>;
      case 'HIGH':
        return <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-950/60 border border-orange-800/80 px-2 py-0.5 rounded">HIGH</span>;
      case 'ELEVATED':
        return <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">ELEVATED</span>;
      case 'INFO':
        return <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2 py-0.5 rounded">INFO</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Immutable Hash-Chained Merkle Ledger
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400 font-mono">Tamper-Proof Audit Trail</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Cryptographic Audit Log Archive
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Every stop condition trigger, authorization grant, probe denial, and human review decision is cryptographically sealed into a sequential Merkle chain. Any retroactive modification breaks chain integrity.
            </p>
          </div>

          <button
            onClick={handleExportAuditJson}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Merkle Ledger (.json)</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            {['ALL', 'CRITICAL', 'HIGH', 'ELEVATED', 'INFO'].map(sev => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterSeverity === sev ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail or hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Audit Log Entries List */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-xs text-slate-500">
            No audit log entries found matching criteria.
          </div>
        ) : (
          filteredLogs.map((entry, index) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 transition-all space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {entry.id}
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    {entry.actionType.replace(/_/g, ' ')}
                  </span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-xs font-mono text-slate-400">
                    Actor: <span className="text-slate-300 font-semibold">{entry.actor}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {getSeverityBadge(entry.severity)}
                  <span className="text-[11px] font-mono text-slate-500">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-1">
                {entry.details}
              </p>

              {/* Merkle Hash Chaining Footer */}
              <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5 truncate max-w-md">
                  <Hash className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Current Hash:</span>
                  <span className="text-slate-300 truncate">{entry.hash}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate max-w-sm">
                  <Link2 className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="text-slate-500">Parent:</span>
                  <span className="text-slate-500 truncate">{entry.previousHash}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
