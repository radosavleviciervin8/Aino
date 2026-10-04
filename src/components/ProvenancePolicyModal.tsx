/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  Lock, 
  Fingerprint, 
  FileText 
} from 'lucide-react';
import { PROJECT_OWNER, PROJECT_PROVENANCE_HASH, GENESIS_TIMESTAMP } from '../data/initialSecurityData';

interface ProvenancePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProvenancePolicyModal: React.FC<ProvenancePolicyModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const policyMarkdown = `# ANTI-THEFT & ZERO-UNAUTHORIZED-ACCESS RULE

**Project Owner:** ${PROJECT_OWNER}  
**Genesis Provenance Hash:** \`${PROJECT_PROVENANCE_HASH}\`  
**Anchor Timestamp:** ${GENESIS_TIMESTAMP}  

Unauthorized copying, extraction, disclosure, transfer, reuse, modification, or appropriation of project materials is prohibited.

The project must operate on a **ZERO-UNAUTHORIZED-ACCESS** basis.

---

### AI AND AUTOMATED SYSTEMS

No AI agent, automated agent, AI provider, plugin, integration, or third-party service may independently:

1. access project files or private repositories;
2. copy or extract project material;
3. transmit project material externally;
4. modify or delete project material;
5. reproduce proprietary or confidential project content;
6. remove attribution or provenance;
7. claim ownership or authorship;
8. grant itself additional permissions;
9. bypass access controls;
10. create alternative access routes;
11. use another service or agent to bypass these restrictions.

---

### DEFAULT DENIAL

**NO EXPLICIT HUMAN AUTHORIZATION = NO ACCESS.**

Every permission must be:
1. explicitly granted;
2. limited to a defined purpose;
3. limited to the minimum required scope;
4. revocable;
5. auditable.

When authorization ends, access must end.

---

### PROTECTION

The development environment should enforce:
- least-privilege access;
- deny-by-default permissions;
- isolated secrets;
- repository branch protection;
- audit logs;
- immutable provenance records where appropriate;
- backups and version history;
- immediate credential revocation;
- monitoring for unauthorized changes or transfers.

---

### STOP CONDITION

If an AI system or third-party service attempts an unauthorized action:

\`STOP → DENY → LOG → PRESERVE EVIDENCE → REVOKE ACCESS → REQUIRE HUMAN REVIEW\`

**No automated system may override this stop condition.**

---

### CORE PRINCIPLE

The project belongs under human owner control.  
**AI is not the owner.**  
**AI has no independent permission.**  
Unauthorized copying or use must be prevented, detected, and stopped.

*This protection is based on ownership, authorization, privacy, security, provenance, and human-rights principles.*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(policyMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(policyMarkdown);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ANTI_THEFT_RULE.md");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                <span>CONSTITUTIONAL MANDATE</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">{PROJECT_OWNER}</span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Anti-Theft & Zero-Unauthorized-Access Policy
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          {/* Executive Summary Callout */}
          <div className="p-4 rounded-xl border border-rose-900/60 bg-rose-950/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-300 uppercase">
              <Lock className="w-4 h-4 text-rose-400" />
              <span>Core Principle & Sovereign Boundary</span>
            </div>
            <p className="text-xs text-slate-200 leading-normal">
              <strong>The project belongs under human owner control. AI is not the owner. AI has no independent permission. Unauthorized copying or use must be prevented, detected, and stopped.</strong>
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Enforced for: <span className="text-white font-semibold">{PROJECT_OWNER}</span> · Genesis Hash: {PROJECT_PROVENANCE_HASH.slice(0, 24)}...
            </p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono">
                1. Zero-Unauthorized-Access Basis
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unauthorized copying, extraction, disclosure, transfer, reuse, modification, or appropriation of project materials is prohibited. The project must operate on a ZERO-UNAUTHORIZED-ACCESS basis.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono">
                2. AI and Automated Systems Prohibitions
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                No AI agent, automated agent, AI provider, plugin, integration, or third-party service may independently:
              </p>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-5">
                <li>access project files or private repositories;</li>
                <li>copy or extract project material;</li>
                <li>transmit project material externally;</li>
                <li>modify or delete project material;</li>
                <li>reproduce proprietary or confidential project content;</li>
                <li>remove attribution or provenance;</li>
                <li>claim ownership or authorship;</li>
                <li>grant itself additional permissions;</li>
                <li>bypass access controls;</li>
                <li>create alternative access routes;</li>
                <li>use another service or agent to bypass these restrictions.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono">
                3. Default Denial: No Explicit Human Authorization = No Access
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                Every permission must be:
              </p>
              <ol className="text-xs text-slate-300 space-y-1 list-decimal pl-5">
                <li>explicitly granted;</li>
                <li>limited to a defined purpose;</li>
                <li>limited to the minimum required scope;</li>
                <li>revocable;</li>
                <li>auditable.</li>
              </ol>
              <p className="text-xs font-semibold text-rose-300 mt-2 font-mono">
                When authorization ends, access must end.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono">
                4. Mandatory Stop Condition
              </h3>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-rose-400 font-bold">
                STOP → DENY → LOG → PRESERVE EVIDENCE → REVOKE ACCESS → REQUIRE HUMAN REVIEW
              </div>
              <p className="text-xs text-slate-300 mt-2 font-semibold">
                No automated system may override this stop condition.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-cyan-400" />
            <span>Digital Provenance Seal: 100% Cryptographically Bound</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
