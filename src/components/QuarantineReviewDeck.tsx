/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  Archive, 
  UserCheck, 
  ShieldAlert, 
  Download, 
  Terminal, 
  Hash, 
  CheckCircle2, 
  AlertOctagon,
  FileCode,
  Lock,
  ChevronDown,
  ChevronUp,
  XCircle
} from 'lucide-react';
import { SecurityIncident } from '../types/security';
import { PROJECT_OWNER } from '../data/initialSecurityData';

interface QuarantineReviewDeckProps {
  incidents: SecurityIncident[];
  onResolveIncident: (incidentId: string, decision: 'PERMANENTLY_BLOCKED' | 'EVIDENCE_PRESERVED_RESOLVED', notes: string) => void;
}

export const QuarantineReviewDeck: React.FC<QuarantineReviewDeckProps> = ({
  incidents,
  onResolveIncident
}) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    incidents.find(i => i.status === 'PENDING_HUMAN_REVIEW')?.id || (incidents[0]?.id || null)
  );
  const [reviewNotes, setReviewNotes] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId);

  const filteredIncidents = incidents.filter(i => {
    if (filter === 'PENDING') return i.status === 'PENDING_HUMAN_REVIEW';
    if (filter === 'RESOLVED') return i.status !== 'PENDING_HUMAN_REVIEW';
    return true;
  });

  const handleDownloadEvidence = (incident: SecurityIncident) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(incident, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `evidence_${incident.id}_provenance.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleConfirmDecision = (decision: 'PERMANENTLY_BLOCKED' | 'EVIDENCE_PRESERVED_RESOLVED') => {
    if (!selectedIncident) return;
    onResolveIncident(selectedIncident.id, decision, reviewNotes || `Decision confirmed by project owner ${PROJECT_OWNER}.`);
    setReviewNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Archive className="w-3.5 h-3.5" />
                Stage 4 & 6 Preservation Enclave
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400 font-mono">Forensic Quarantine</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Evidence Quarantine & Sovereign Human Review Deck
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              When an unauthorized probe or extraction attempt triggers the STOP condition, raw memory, call stacks, and target payloads are sealed here. <strong className="text-white">Only {PROJECT_OWNER} can review and dispose of quarantined cases.</strong>
            </p>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Cases ({incidents.length})
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1 ${
                filter === 'PENDING' ? 'bg-amber-950/70 text-amber-200 border border-amber-800/60' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Pending Review ({incidents.filter(i => i.status === 'PENDING_HUMAN_REVIEW').length})</span>
            </button>
            <button
              onClick={() => setFilter('RESOLVED')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filter === 'RESOLVED' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Resolved ({incidents.filter(i => i.status !== 'PENDING_HUMAN_REVIEW').length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Forensic Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incident Queue List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 tracking-wide">
            Quarantined Violations Queue
          </h3>

          {filteredIncidents.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-xs text-slate-400">
              No incidents match the active filter.
            </div>
          ) : (
            filteredIncidents.map((incident) => {
              const isSelected = selectedIncidentId === incident.id;
              const isPending = incident.status === 'PENDING_HUMAN_REVIEW';

              return (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncidentId(incident.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500/80 bg-slate-900 shadow-md ring-1 ring-amber-500/20'
                      : 'border-slate-800/80 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {incident.id}
                      </span>
                      <span className="text-[11px] font-mono text-rose-400 font-semibold">
                        Rule #{incident.ruleNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isPending ? (
                        <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                          AWAITING REVIEW
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {incident.status === 'PERMANENTLY_BLOCKED' ? 'BLOCKED' : 'RESOLVED'}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-200 mb-1">
                    {incident.ruleViolated}
                  </h4>

                  <div className="text-[11px] text-slate-400 font-mono truncate mb-2">
                    Actor: <span className="text-slate-300">{incident.actor}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/60">
                    <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
                    <span>Evidence Hash: {incident.evidenceHash.slice(0, 14)}...</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detailed Forensic Inspector & Human Review Form */}
        <div className="lg:col-span-7">
          {selectedIncident ? (
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/90 space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-rose-400">
                      FORENSIC DOSSIER: {selectedIncident.id}
                    </span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Timestamp: {new Date(selectedIncident.timestamp).toUTCString()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {selectedIncident.ruleViolated}
                  </h3>
                </div>

                <button
                  onClick={() => handleDownloadEvidence(selectedIncident)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Hash Evidence</span>
                </button>
              </div>

              {/* Target & Vector Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Intercepted Actor & PID</div>
                  <div className="font-mono text-rose-300 font-semibold break-all">
                    {selectedIncident.actor}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    {selectedIncident.evidencePayload.callerIpOrPid}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Attempted Target Resource</div>
                  <div className="font-mono text-cyan-300 font-semibold break-all">
                    {selectedIncident.targetResource}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Payload Size: {selectedIncident.evidencePayload.attemptedPayloadSize}
                  </div>
                </div>
              </div>

              {/* Intercepted Command & Trace */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Detected System Call / Command
                  </span>
                  <span className="text-[10px] text-slate-500">Quarantine Hook Active</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto">
                  <code>{selectedIncident.evidencePayload.detectedCommand}</code>
                </div>
              </div>

              {/* Forensic Stack Trace */}
              <div>
                <div className="text-xs font-mono text-slate-400 mb-1.5">
                  Kernel Intercept Stack Trace:
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1 overflow-x-auto">
                  {selectedIncident.evidencePayload.stackTrace.map((line, i) => (
                    <div key={i} className="leading-relaxed">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cryptographic Proof Hash */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400 truncate">
                  <Hash className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-slate-500">Evidence SHA-256:</span>
                  <span className="text-slate-300 truncate">{selectedIncident.evidenceHash}</span>
                </div>
                <span className="text-[10px] text-emerald-400 shrink-0">SEALED IN COLD VAULT</span>
              </div>

              {/* Sovereign Human Review Form */}
              {selectedIncident.status === 'PENDING_HUMAN_REVIEW' ? (
                <div className="p-4 rounded-xl border border-amber-800/80 bg-gradient-to-b from-amber-950/30 to-slate-950 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
                    <UserCheck className="w-4 h-4" />
                    <span>SOVEREIGN OWNER REVIEW REQUIRED (ERVIN REMUS RADOSAVLEVICI)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    No automated agent may override this review. As the human project owner, declare your forensic adjudication below:
                  </p>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Adjudication Notes / Blacklist Justification:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Confirmed malicious automated extraction attempt. Blacklisting actor PID permanently and preserving evidence for provenance chain."
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                    <button
                      onClick={() => handleConfirmDecision('EVIDENCE_PRESERVED_RESOLVED')}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      Archive & Resolve Evidence
                    </button>
                    <button
                      onClick={() => handleConfirmDecision('PERMANENTLY_BLOCKED')}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Confirm Permanent Blacklist</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ADJUDICATED BY SOVEREIGN OWNER</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Reviewed by <strong className="text-white">{selectedIncident.reviewedBy}</strong> on {selectedIncident.reviewedAt ? new Date(selectedIncident.reviewedAt).toLocaleString() : 'N/A'}.
                  </div>
                  {selectedIncident.reviewNotes && (
                    <div className="text-xs text-slate-400 italic pt-1">
                      "{selectedIncident.reviewNotes}"
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl border border-slate-800 bg-slate-900/40 text-slate-500 text-xs">
              Select an incident from the queue on the left to inspect forensic telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
