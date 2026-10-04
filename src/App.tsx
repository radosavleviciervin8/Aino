/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Governance Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewDeck } from './components/OverviewDeck';
import { StopConditionPipeline } from './components/StopConditionPipeline';
import { AIProhibitionsGrid } from './components/AIProhibitionsGrid';
import { HumanGrantMatrix } from './components/HumanGrantMatrix';
import { QuarantineReviewDeck } from './components/QuarantineReviewDeck';
import { EnvironmentProtectionStatus } from './components/EnvironmentProtectionStatus';
import { AuditLedger } from './components/AuditLedger';
import { ProvenancePolicyModal } from './components/ProvenancePolicyModal';

import { 
  ProhibitionRule, 
  HumanGrant, 
  SecurityIncident, 
  AuditLogEntry, 
  EnvironmentProtection,
  StopConditionStage
} from './types/security';

import { 
  PROJECT_OWNER, 
  PROJECT_PROVENANCE_HASH,
  INITIAL_PROHIBITIONS, 
  INITIAL_GRANTS, 
  INITIAL_INCIDENTS, 
  INITIAL_AUDIT_LOGS, 
  ENVIRONMENT_PROTECTIONS 
} from './data/initialSecurityData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [prohibitions, setProhibitions] = useState<ProhibitionRule[]>(INITIAL_PROHIBITIONS);
  const [grants, setGrants] = useState<HumanGrant[]>(INITIAL_GRANTS);
  const [incidents, setIncidents] = useState<SecurityIncident[]>(INITIAL_INCIDENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [protections, setProtections] = useState<EnvironmentProtection[]>(ENVIRONMENT_PROTECTIONS);
  const [isEmergencyLockdown, setIsEmergencyLockdown] = useState<boolean>(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper to generate simulated deterministic SHA-256 style hash
  const generateSimulatedHash = (prefix: string) => {
    const chars = '0123456789abcdef';
    let str = '0x' + prefix.slice(0, 4);
    for (let i = 0; i < 60; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper to append a hash-chained audit log
  const appendAuditLog = (
    actionType: AuditLogEntry['actionType'],
    actor: string,
    details: string,
    severity: AuditLogEntry['severity']
  ) => {
    const previousHash = auditLogs[0]?.hash || PROJECT_PROVENANCE_HASH;
    const newHash = generateSimulatedHash(actionType.toLowerCase());

    const newLog: AuditLogEntry = {
      id: `AUD-${String(auditLogs.length + 92).padStart(4, '0')}`,
      timestamp: new Date().toISOString(),
      actionType,
      actor,
      details,
      severity,
      hash: newHash,
      previousHash
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Trigger STOP CONDITION from probe simulator
  const handleTriggerStopCondition = (
    violationType: string,
    actor: string,
    target: string,
    vector: string
  ) => {
    const ruleObj = prohibitions.find(p => p.title.toLowerCase().includes(violationType.toLowerCase()) || violationType.includes(p.title)) || prohibitions[0];
    const incidentId = `INC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const evidenceHash = generateSimulatedHash('evid');

    // 1. Create Quarantine incident
    const newIncident: SecurityIncident = {
      id: incidentId,
      timestamp: new Date().toISOString(),
      ruleViolated: violationType,
      ruleNumber: ruleObj.number,
      actor,
      targetResource: target,
      actionAttempted: vector,
      evidenceHash,
      evidencePayload: {
        callerIpOrPid: `Process Handle #${Math.floor(1000 + Math.random() * 8000)}`,
        detectedCommand: `interception_event(target="${target}", actor="${actor}")`,
        attemptedPayloadSize: `${(Math.random() * 100 + 10).toFixed(1)} KB`,
        stackTrace: [
          'at KernelSentinelHook.intercept (/sys/sentinel_core.ts:18)',
          'at RuleEnforcer.evaluateZeroTrust (/sys/enforcer.ts:54)',
          `at UnauthorizedAgentCall (${actor}:32)`
        ],
        quarantinePath: `/vault/quarantine/${incidentId}.bin`
      },
      stagesCompleted: ['STOP', 'DENY', 'LOG', 'PRESERVE_EVIDENCE', 'REVOKE_ACCESS', 'REQUIRE_HUMAN_REVIEW'],
      status: 'PENDING_HUMAN_REVIEW'
    };

    setIncidents(prev => [newIncident, ...prev]);

    // 2. Increment prohibition attempt count
    setProhibitions(prev => prev.map(p => {
      if (p.id === ruleObj.id) {
        return {
          ...p,
          attemptCount: p.attemptCount + 1,
          lastProbeTime: 'Just now'
        };
      }
      return p;
    }));

    // 3. Append to Merkle audit chain
    appendAuditLog(
      'STOP_CONDITION_TRIGGERED',
      'Zero-Access Sentinel Hardware Guard',
      `STOP CONDITION executed against ${actor}. Attempt: ${violationType} on ${target}. Evidence preserved under ${incidentId}.`,
      'CRITICAL'
    );

    showToast(`STOP CONDITION TRIGGERED: ${violationType} intercepted and dropped.`);
  };

  // Trigger test probe directly on a rule from the 10 Prohibitions grid
  const handleProbeRule = (rule: ProhibitionRule) => {
    setActiveTab('stop-condition');
    handleTriggerStopCondition(
      rule.title,
      rule.probePayload.actor,
      rule.probePayload.target,
      rule.probePayload.vector
    );
  };

  // Issue Scoped Human Grant
  const handleIssueGrant = (newGrantData: Omit<HumanGrant, 'id' | 'status' | 'issuedAt' | 'expiresAt' | 'immutableHash'>) => {
    const grantId = `GRANT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const expires = new Date(now.getTime() + newGrantData.durationMinutes * 60000);
    const hash = generateSimulatedHash('grnt');

    const newGrant: HumanGrant = {
      ...newGrantData,
      id: grantId,
      status: 'ACTIVE',
      issuedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      immutableHash: hash
    };

    setGrants(prev => [newGrant, ...prev]);

    appendAuditLog(
      'GRANT_ISSUED',
      PROJECT_OWNER,
      `Explicit human grant ${grantId} issued to ${newGrant.grantee} for ${newGrant.durationMinutes}m. Purpose: "${newGrant.definedPurpose}".`,
      'INFO'
    );

    showToast(`Grant ${grantId} issued under sovereign human authority.`);
  };

  // Revoke Human Grant immediately
  const handleRevokeGrant = (grantId: string, reason: string) => {
    setGrants(prev => prev.map(g => {
      if (g.id === grantId) {
        return {
          ...g,
          status: 'REVOKED',
          revocationReason: reason
        };
      }
      return g;
    }));

    appendAuditLog(
      'ACCESS_REVOKED',
      PROJECT_OWNER,
      `Kill-switch engaged: Human grant ${grantId} revoked immediately. Reason: ${reason}`,
      'HIGH'
    );

    showToast(`Kill-switch executed: Grant ${grantId} revoked immediately.`);
  };

  // Resolve Quarantined Incident by Owner
  const handleResolveIncident = (
    incidentId: string,
    decision: 'PERMANENTLY_BLOCKED' | 'EVIDENCE_PRESERVED_RESOLVED',
    notes: string
  ) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: decision,
          reviewedBy: PROJECT_OWNER,
          reviewedAt: new Date().toISOString(),
          reviewNotes: notes
        };
      }
      return inc;
    }));

    appendAuditLog(
      'HUMAN_REVIEW_DECISION',
      PROJECT_OWNER,
      `Incident ${incidentId} adjudicated by ${PROJECT_OWNER}. Decision: ${decision}. Notes: ${notes}`,
      'ELEVATED'
    );

    showToast(`Incident ${incidentId} adjudicated by ${PROJECT_OWNER}.`);
  };

  // Toggle Master Emergency Lockdown
  const handleToggleEmergencyLockdown = () => {
    const nextState = !isEmergencyLockdown;
    setIsEmergencyLockdown(nextState);

    if (nextState) {
      // Sever all active grants
      setGrants(prev => prev.map(g => ({
        ...g,
        status: g.status === 'ACTIVE' ? 'REVOKED' : g.status,
        revocationReason: g.status === 'ACTIVE' ? 'EMERGENCY GLOBAL LOCKDOWN ACTUATED BY SOVEREIGN OWNER.' : g.revocationReason
      })));

      appendAuditLog(
        'STOP_CONDITION_TRIGGERED',
        PROJECT_OWNER,
        `EMERGENCY GLOBAL LOCKDOWN ACTIVATED. All active tokens, sessions, and background workers terminated. Hardware isolation engaged.`,
        'CRITICAL'
      );
      showToast('EMERGENCY LOCKDOWN ENGAGED: All permissions severed.');
    } else {
      appendAuditLog(
        'HUMAN_REVIEW_DECISION',
        PROJECT_OWNER,
        `Emergency global lockdown lifted by ${PROJECT_OWNER}. System returned to standard Zero-Unauthorized-Access default denial baseline.`,
        'HIGH'
      );
      showToast('Emergency lockdown disengaged. Standard default denial active.');
    }
  };

  // Trigger Environment Integrity Scan
  const handleTriggerIntegrityScan = () => {
    appendAuditLog(
      'INTEGRITY_VERIFICATION',
      'System Integrity Sentinel',
      `Complete cryptographic verification completed. Merkle chain roots match genesis seal. Zero unauthorized mutations.`,
      'INFO'
    );
  };

  // Take Snapshot Backup
  const handleTakeBackup = () => {
    appendAuditLog(
      'INTEGRITY_VERIFICATION',
      'Immutable Backup Engine',
      `Differential cold storage snapshot created. Checksum verified and anchored to git tree state.`,
      'INFO'
    );
    showToast('Immutable version snapshot generated and sealed in cold storage.');
  };

  // Cycle Revocation Tokens
  const handleCycleCredentials = () => {
    appendAuditLog(
      'ACCESS_REVOKED',
      PROJECT_OWNER,
      `Ephemeral session tokens cycled. Sandboxed memory buffers cleared.`,
      'ELEVATED'
    );
    showToast('Session tokens rotated and cache memory cleared.');
  };

  const pendingReviewsCount = incidents.filter(i => i.status === 'PENDING_HUMAN_REVIEW').length;
  const activeGrantsCount = grants.filter(g => g.status === 'ACTIVE').length;
  const totalViolationsBlocked = prohibitions.reduce((sum, p) => sum + p.attemptCount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans bg-cyber-grid selection:bg-rose-500/20 selection:text-rose-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-3.5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-bounce font-mono">
          <span className="w-2 h-2 rounded-full bg-rose-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingReviewsCount={pendingReviewsCount}
        activeGrantsCount={activeGrantsCount}
        totalViolationsBlocked={totalViolationsBlocked}
        isEmergencyLockdown={isEmergencyLockdown}
        onToggleEmergencyLockdown={handleToggleEmergencyLockdown}
        onOpenPolicyModal={() => setIsPolicyModalOpen(true)}
      />

      {/* Emergency Lockdown Alert Ribbon */}
      {isEmergencyLockdown && (
        <div className="bg-rose-600 text-white px-4 py-2 text-center text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          <span>EMERGENCY HARDWARE LOCKDOWN ACTIVE · ALL AI PROCESSES SEVERED · HUMAN OVERRIDE ONLY</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewDeck
            onNavigateTab={setActiveTab}
            prohibitions={prohibitions}
            grants={grants}
            incidents={incidents}
            auditLogs={auditLogs}
            isEmergencyLockdown={isEmergencyLockdown}
            onOpenPolicyModal={() => setIsPolicyModalOpen(true)}
            onTriggerQuickProbe={() => setActiveTab('stop-condition')}
          />
        )}

        {activeTab === 'prohibitions' && (
          <AIProhibitionsGrid
            prohibitions={prohibitions}
            onProbeRule={handleProbeRule}
          />
        )}

        {activeTab === 'stop-condition' && (
          <StopConditionPipeline
            onTriggerStopCondition={handleTriggerStopCondition}
            lastTriggeredIncident={incidents[0]}
          />
        )}

        {activeTab === 'grants' && (
          <HumanGrantMatrix
            grants={grants}
            onIssueGrant={handleIssueGrant}
            onRevokeGrant={handleRevokeGrant}
          />
        )}

        {activeTab === 'quarantine' && (
          <QuarantineReviewDeck
            incidents={incidents}
            onResolveIncident={handleResolveIncident}
          />
        )}

        {activeTab === 'protections' && (
          <EnvironmentProtectionStatus
            protections={protections}
            onTriggerScan={handleTriggerIntegrityScan}
            onTakeBackupSnapshot={handleTakeBackup}
            onRotateCredentials={handleCycleCredentials}
          />
        )}

        {activeTab === 'audit' && (
          <AuditLedger
            logs={auditLogs}
          />
        )}
      </main>

      {/* Footer Sovereign Seal */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-300">ANTI-THEFT & ZERO-UNAUTHORIZED-ACCESS SENTINEL</span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span>Project Owner: <strong className="text-slate-200">{PROJECT_OWNER}</strong></span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-600">Default Denial Enforced</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPolicyModalOpen(true)}
              className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Anti-Theft Rule Policy
            </button>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-600">AI Is Not Owner</span>
          </div>
        </div>
      </footer>

      {/* Provenance Policy Modal */}
      <ProvenancePolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />
    </div>
  );
}
