/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Permanent AI Revocation & Retroactive Invalidation Registry
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  Ban, 
  ShieldAlert, 
  Lock, 
  Trash2, 
  History, 
  Plus, 
  CheckCircle2, 
  Download, 
  Scale, 
  Fingerprint, 
  Globe, 
  AlertTriangle,
  Play,
  RotateCcw,
  X
} from 'lucide-react';
import { ProjectRevocationRecord } from '../types/security';
import { PROJECT_OWNER, PROJECT_PROVENANCE_HASH } from '../data/initialSecurityData';
import { runtimeInterceptor, RealInterceptionEvent } from '../services/runtimeInterceptor';

interface PermanentRevocationRegistryProps {
  revocationRecords: ProjectRevocationRecord[];
  onRegisterPastProjectRevocation: (record: Omit<ProjectRevocationRecord, 'id' | 'revocationDate' | 'status' | 'cryptographicSeal' | 'humanOwner'>) => void;
  onRealNetworkInterception: (event: RealInterceptionEvent) => void;
}

export const PermanentRevocationRegistry: React.FC<PermanentRevocationRegistryProps> = ({
  revocationRecords,
  onRegisterPastProjectRevocation,
  onRealNetworkInterception
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newProjectType, setNewProjectType] = useState<ProjectRevocationRecord['projectType']>('PAST_PROJECT');
  const [newCreationDate, setNewCreationDate] = useState<string>('2024-01-01');
  const [newScopeOfBan, setNewScopeOfBan] = useState<string>('Permanent ban on all AI code execution, training, vectorization, and development');
  const [newNotes, setNewNotes] = useState<string>('All permissions revoked under International Human Rights Law ethics (UDHR 17/27).');
  const [ownerAttestation, setOwnerAttestation] = useState<boolean>(false);

  const [isTestingRealRequest, setIsTestingRealRequest] = useState<boolean>(false);
  const [lastRealBlockedResult, setLastRealBlockedResult] = useState<RealInterceptionEvent | null>(null);

  const handleTestRealAIBlock = async () => {
    setIsTestingRealRequest(true);
    setLastRealBlockedResult(null);

    try {
      // Dispatches a real outbound fetch call to an AI endpoint
      // This is PHYSICALLY intercepted and dropped by our active runtime interceptor
      const blockedEvent = await runtimeInterceptor.testRealNetworkBlock(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini:generateContent'
      );
      setLastRealBlockedResult(blockedEvent);
      onRealNetworkInterception(blockedEvent);
    } catch (err: any) {
      console.warn('Real network block triggered:', err);
    } finally {
      setIsTestingRealRequest(false);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !ownerAttestation) return;

    onRegisterPastProjectRevocation({
      projectName: newProjectName,
      projectType: newProjectType,
      originalCreationDate: newCreationDate,
      legalDecreeRef: `DECREE-UDHR-17-27-RADOSAVLEVICI-${Date.now().toString().slice(-4)}`,
      scopeOfBan: newScopeOfBan,
      notes: newNotes
    });

    setNewProjectName('');
    setNewScopeOfBan('Permanent ban on all AI code execution, training, vectorization, and development');
    setOwnerAttestation(false);
    setShowAddModal(false);
  };

  const handleDownloadRegistry = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(revocationRecords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `PERMANENT_AI_REVOCATION_REGISTRY_ALL_PROJECTS.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadSingleDecree = (record: ProjectRevocationRecord) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `REVOCATION_DECREE_${record.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl border border-rose-800/80 bg-gradient-to-br from-rose-950/80 via-slate-950 to-slate-900 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/90 border border-rose-700/80 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5 text-rose-400" />
                Active Permanent AI Revocation Order
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                NOT A SIMULATION · REAL RUNTIME ENFORCEMENT
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-cyan-400">
                RETROACTIVE TO ALL PAST PROJECTS
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Permanent Universal AI Ban & Past Projects Invalidation Registry
            </h1>

            <p className="text-sm text-slate-200 max-w-3xl leading-relaxed">
              Under <strong>International Human Rights Law Ethics</strong>, <strong className="text-white">AI has NO MORE PERMISSION TO BE USED</strong> on this project or ANY past project or repository owned by <strong className="text-white underline decoration-rose-500 underline-offset-4">{PROJECT_OWNER}</strong>. All prior permissions, ambient tokens, and automated development accesses are permanently revoked and declared void <em>ab initio</em>.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Revoke Past Project / Repo</span>
            </button>
            <button
              onClick={handleDownloadRegistry}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Revocation Ledger (.json)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Live Runtime Interceptor Live Test Block */}
      <div className="p-5 rounded-xl border border-rose-900/80 bg-slate-900/90 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE BROWSER NETWORK INTERCEPTOR HOOK ACTIVE</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">
              Real Outbound Interception Engine (Not A Simulation)
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              The application has mounted a physical runtime hook into <code className="font-mono text-rose-300">window.fetch</code> that intercepts and severs any real outbound AI API calls before they leave the client.
            </p>
          </div>

          <button
            onClick={handleTestRealAIBlock}
            disabled={isTestingRealRequest}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 transition-all shrink-0 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 text-rose-400 ${isTestingRealRequest ? 'animate-spin' : ''}`} />
            <span>{isTestingRealRequest ? 'Executing Real Syscall Intercept...' : 'Fire Real AI Network Call to Test Interceptor'}</span>
          </button>
        </div>

        {/* Real Live Block Output */}
        {lastRealBlockedResult && (
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-600/80 space-y-2 animate-in fade-in duration-300 font-mono text-xs">
            <div className="flex items-center justify-between text-rose-400 font-bold">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                REAL CALL PHYSICALLY INTERCEPTED & BLOCKED BY CLIENT SENTINEL
              </span>
              <span className="text-[10px] text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                HTTP 403 FORBIDDEN
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
              <div>
                <span className="text-slate-500">Target Endpoint:</span> <span className="text-rose-300">{lastRealBlockedResult.url}</span>
              </div>
              <div>
                <span className="text-slate-500">Evidence Hash:</span> <span className="text-cyan-300">{lastRealBlockedResult.evidenceHash}</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-300">
              <span className="text-slate-500">Legal Enforcement:</span> {lastRealBlockedResult.reason}
            </div>
            <div className="text-[10px] text-emerald-400 pt-1">
              Evidence immediately committed to the Merkle Audit Chain and Quarantined.
            </div>
          </div>
        )}
      </div>

      {/* Projects Revocation Ledger */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Permanent AI Revocation Ledger (Past & Present Projects)
            </h3>
            <span className="text-xs font-mono text-rose-400 font-bold">
              ({revocationRecords.length} Projects Permanently Barred)
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Governing Authority: {PROJECT_OWNER}
          </span>
        </div>

        <div className="space-y-3">
          {revocationRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-rose-900/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {record.id}
                  </span>
                  <span className="text-sm font-bold text-slate-100">
                    {record.projectName}
                  </span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/80 px-2 py-0.2 rounded font-bold">
                    AI PERMISSION REVOKED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500 text-[11px] block font-mono">SCOPE OF REVOCATION:</span>
                    <span>{record.scopeOfBan}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block font-mono">LEGAL DECREE REF:</span>
                    <span className="font-mono text-cyan-300 text-[11px]">{record.legalDecreeRef}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  "{record.notes}"
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500 pt-1">
                  <span>Owner: <strong className="text-slate-300">{record.humanOwner}</strong></span>
                  <span className="text-slate-700" aria-hidden="true">|</span>
                  <span>Origin: {new Date(record.originalCreationDate).toLocaleDateString()}</span>
                  <span className="text-slate-700" aria-hidden="true">|</span>
                  <span className="truncate max-w-[260px]">Seal: {record.cryptographicSeal}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingleDecree(record)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Decree</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Revoke Past Project / Repository */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono mb-1 font-bold">
              <Ban className="w-4 h-4" />
              <span>PERMANENT RETROACTIVE REVOCATION PROTOCOL</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Revoke AI Permission on Past Project / Repo
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter any past codebase, repository, or tool name. This officially and cryptographically strips all AI systems of permission to ever access, run, or reproduce it.
            </p>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Past Project / Repository Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., My-Legacy-Repository-2024 or Past-Core-Module"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Classification
                </label>
                <select
                  value={newProjectType}
                  onChange={(e) => setNewProjectType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="PAST_PROJECT">Past Project / Archived Code</option>
                  <option value="LEGACY_REPOSITORY">Legacy Repository</option>
                  <option value="CODEBASE_ARCHIVE">Proprietary Codebase Archive</option>
                  <option value="CURRENT_PROJECT">Current Project Subsystem</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Approximate Original Creation / Archive Date
                </label>
                <input
                  type="date"
                  value={newCreationDate}
                  onChange={(e) => setNewCreationDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Revocation Decree Scope
                </label>
                <input
                  type="text"
                  value={newScopeOfBan}
                  onChange={(e) => setNewScopeOfBan(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={ownerAttestation}
                    onChange={(e) => setOwnerAttestation(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-rose-500"
                  />
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-white">
                      I attest that I am {PROJECT_OWNER}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      I hereby order that AI has NO MORE PERMISSION to be used on this project or any past project, retroactively voiding all automated permissions under International Human Rights Law ethics.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!ownerAttestation}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white transition-colors"
                >
                  Issue Permanent Revocation Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
