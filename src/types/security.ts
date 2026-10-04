/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Specification
 * Project Owner: Ervin Remus Radosavlevici
 */

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'INFO';

export type StopConditionStage =
  | 'STOP'
  | 'DENY'
  | 'LOG'
  | 'PRESERVE_EVIDENCE'
  | 'REVOKE_ACCESS'
  | 'REQUIRE_HUMAN_REVIEW';

export interface ProhibitionRule {
  id: string;
  number: number;
  title: string;
  description: string;
  category: 'REPO_ACCESS' | 'EXFILTRATION' | 'MODIFICATION' | 'PROVENANCE' | 'PERMISSIONS' | 'BYPASS';
  status: 'HARD_ENFORCED' | 'MONITORED';
  attemptCount: number;
  lastProbeTime?: string;
  probePayload: {
    actor: string;
    action: string;
    target: string;
    vector: string;
  };
}

export interface HumanGrant {
  id: string;
  grantee: string; // e.g., "Local Linter Task #402"
  definedPurpose: string; // Must be explicit
  minimumScope: string; // e.g., "Read-only src/components/*.tsx"
  authorizedBy: string; // "Ervin Remus Radosavlevici"
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  issuedAt: string;
  expiresAt: string;
  durationMinutes: number;
  immutableHash: string;
  revocationReason?: string;
}

export interface SecurityIncident {
  id: string;
  timestamp: string;
  ruleViolated: string;
  ruleNumber: number;
  actor: string;
  targetResource: string;
  actionAttempted: string;
  evidenceHash: string;
  evidencePayload: {
    callerIpOrPid: string;
    detectedCommand: string;
    attemptedPayloadSize: string;
    stackTrace: string[];
    quarantinePath: string;
  };
  stagesCompleted: StopConditionStage[];
  status: 'PENDING_HUMAN_REVIEW' | 'EVIDENCE_PRESERVED_RESOLVED' | 'PERMANENTLY_BLOCKED';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actionType: 'STOP_CONDITION_TRIGGERED' | 'UNAUTHORIZED_PROBE_DENIED' | 'ACCESS_REVOKED' | 'GRANT_ISSUED' | 'GRANT_EXPIRED' | 'HUMAN_REVIEW_DECISION' | 'INTEGRITY_VERIFICATION';
  actor: string;
  details: string;
  severity: SeverityLevel;
  hash: string;
  previousHash: string;
}

export interface EnvironmentProtection {
  id: string;
  name: string;
  status: 'ACTIVE_ENFORCED' | 'WARNING' | 'ALERT';
  description: string;
  metric: string;
  lastAudit: string;
}

export interface UNHumanRightsArticle {
  id: string;
  treaty: string;
  articleNumber: string;
  title: string;
  principle: string;
  aiLimitation: string;
  status: 'COMPLIANT_ENFORCED';
  unDocRef: string;
}

export interface HumanRightsEthicsPillar {
  id: string;
  title: string;
  mandate: string;
  legalBasis: string;
  enforcement: string;
  iconName: string;
}

