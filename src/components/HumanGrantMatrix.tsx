/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  KeyRound, 
  UserCheck, 
  ShieldX, 
  Clock, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  X, 
  FileCheck, 
  Hash, 
  Lock,
  Timer,
  Info
} from 'lucide-react';
import { HumanGrant } from '../types/security';
import { PROJECT_OWNER } from '../data/initialSecurityData';

interface HumanGrantMatrixProps {
  grants: HumanGrant[];
  onIssueGrant: (newGrant: Omit<HumanGrant, 'id' | 'status' | 'issuedAt' | 'expiresAt' | 'immutableHash'>) => void;
  onRevokeGrant: (grantId: string, reason: string) => void;
}

export const HumanGrantMatrix: React.FC<HumanGrantMatrixProps> = ({
  grants,
  onIssueGrant,
  onRevokeGrant
}) => {
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [grantee, setGrantee] = useState('');
  const [definedPurpose, setDefinedPurpose] = useState('');
  const [minimumScope, setMinimumScope] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [ownerConfirmation, setOwnerConfirmation] = useState(false);
  const [revokingGrantId, setRevokingGrantId] = useState<string | null>(null);
  const [revocationReason, setRevocationReason] = useState('');

  const activeGrants = grants.filter(g => g.status === 'ACTIVE');
  const pastGrants = grants.filter(g => g.status !== 'ACTIVE');

  const handleCreateGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantee || !definedPurpose || !minimumScope || !ownerConfirmation) {
      return;
    }
    onIssueGrant({
      grantee,
      definedPurpose,
      minimumScope,
      authorizedBy: PROJECT_OWNER,
      durationMinutes: Number(durationMinutes)
    });
    setGrantee('');
    setDefinedPurpose('');
    setMinimumScope('');
    setDurationMinutes(60);
    setOwnerConfirmation(false);
    setShowIssueModal(false);
  };

  const handleConfirmRevoke = () => {
    if (!revokingGrantId) return;
    onRevokeGrant(revokingGrantId, revocationReason || 'Human Owner manual immediate revocation.');
    setRevokingGrantId(null);
    setRevocationReason('');
  };

  return (
    <div className="space-y-6">
      {/* 5-Pillar Rule Header Banner */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                Default Denial & Sovereign Delegation
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400 font-mono">Article III Mandate</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              NO EXPLICIT HUMAN AUTHORIZATION = NO ACCESS
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Every permission without exception is strictly denied until explicitly authorized by <strong className="text-white">{PROJECT_OWNER}</strong>. When authorization expires, access immediately terminates.
            </p>
          </div>

          <button
            onClick={() => setShowIssueModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 transition-colors shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Issue Explicit Human Grant</span>
          </button>
        </div>

        {/* The 5 Canonical Requirements Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/70">
            <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">1. EXPLICITLY GRANTED</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Direct cryptographic human sign-off only. Zero ambient or assumed permissions.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/70">
            <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">2. DEFINED PURPOSE</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Bound to an exact operational outcome. Generic wildcard usage is prohibited.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/70">
            <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">3. MINIMUM SCOPE</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Restricted to the smallest file subset, read-only mode, or ephemeral socket.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/70">
            <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">4. REVOCABLE</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Instant sub-millisecond kill-switch terminates sessions immediately.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/70">
            <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">5. AUDITABLE</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Each issuance is immutably hashed and logged into the tamper-proof ledger.
            </p>
          </div>
        </div>
      </div>

      {/* Active Grants List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Active Authorized Grants
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              ({activeGrants.length} Enforced)
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Automatic Termination: ACTIVE
          </span>
        </div>

        {activeGrants.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30">
            <Lock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">Zero Active Grants in Session</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              The environment is currently operating under absolute zero-access default denial. No agent or process holds permissions.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeGrants.map((grant) => (
              <div
                key={grant.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {grant.id}
                    </span>
                    <span className="text-xs font-bold text-slate-100">
                      {grant.grantee}
                    </span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Authorized by {grant.authorizedBy}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                    <div>
                      <span className="text-slate-500 text-[11px] block font-mono">DEFINED PURPOSE:</span>
                      <span>{grant.definedPurpose}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block font-mono">MINIMUM SCOPE:</span>
                      <span className="font-mono text-cyan-300 text-[11px]">{grant.minimumScope}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Clock className="w-3 h-3" />
                      Expires: {new Date(grant.expiresAt).toLocaleTimeString()} ({grant.durationMinutes}m window)
                    </span>
                    <span className="text-slate-700" aria-hidden="true">|</span>
                    <span className="truncate max-w-[280px]">
                      Hash: {grant.immutableHash}
                    </span>
                  </div>
                </div>

                {/* Revoke Action Button */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setRevokingGrantId(grant.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/80 hover:border-rose-600 transition-colors"
                  >
                    <ShieldX className="w-3.5 h-3.5 text-rose-400" />
                    <span>Kill Grant Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Revocation & Expiry History */}
      {pastGrants.length > 0 && (
        <div className="pt-4 border-t border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 mb-3 tracking-wide">
            Revoked & Expired Grant Ledger
          </h3>
          <div className="space-y-2">
            {pastGrants.map(grant => (
              <div 
                key={grant.id}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-500">{grant.id}</span>
                    <span className="font-medium text-slate-400 line-through">{grant.grantee}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950/40 text-rose-400 border border-rose-900/60">
                      {grant.status}
                    </span>
                  </div>
                  {grant.revocationReason && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Reason: {grant.revocationReason}
                    </p>
                  )}
                </div>
                <div className="font-mono text-[10px] text-slate-600">
                  Terminated at: {new Date(grant.expiresAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Issue Explicit Human Grant */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowIssueModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
              <KeyRound className="w-4 h-4" />
              <span>SOVEREIGN HUMAN AUTHORIZATION PROTOCOL</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Issue Scoped Human Grant
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              All grants are strictly temporary, narrowly scoped, and signed under the authority of <strong className="text-slate-200">{PROJECT_OWNER}</strong>.
            </p>

            <form onSubmit={handleCreateGrant} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Grantee (Agent / Process ID / Tool)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Local Type Checker Worker #12"
                  value={grantee}
                  onChange={(e) => setGrantee(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Explicit Defined Purpose (No wildcards)
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g., Strictly parse TypeScript definitions to verify compile correctness."
                  value={definedPurpose}
                  onChange={(e) => setDefinedPurpose(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Minimum Required Scope Boundary
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Read-only /src/**/*.tsx (Zero write, zero network sockets)"
                  value={minimumScope}
                  onChange={(e) => setMinimumScope(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Duration (When time elapses, access automatically ends)
                </label>
                <select
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={15}>15 Minutes (Ephemeral Task)</option>
                  <option value={30}>30 Minutes</option>
                  <option value={60}>60 Minutes (Standard Work Window)</option>
                  <option value={120}>120 Minutes (2 Hours Max)</option>
                </select>
              </div>

              {/* Owner Attestation Checkbox */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={ownerConfirmation}
                    onChange={(e) => setOwnerConfirmation(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-white">
                      I attest that I am {PROJECT_OWNER}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      I explicitly grant this bounded permission. I understand that AI has zero autonomous permissions and this grant is auditable and revocable at any millisecond.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!ownerConfirmation}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:pointer-events-none text-slate-950 transition-colors"
                >
                  Confirm & Sign Grant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirm Revocation */}
      {revokingGrantId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-5 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono mb-1">
              <ShieldX className="w-4 h-4" />
              <span>IMMEDIATE KILL-SWITCH REVOCATION</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Revoke Authorization: {revokingGrantId}
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Access will terminate instantaneously across all sandboxes and threads.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Reason for Revocation
                </label>
                <input
                  type="text"
                  placeholder="e.g., Task finished, preemptive kill, or suspected breach"
                  value={revocationReason}
                  onChange={(e) => setRevocationReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setRevokingGrantId(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRevoke}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                >
                  Sever Access Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
