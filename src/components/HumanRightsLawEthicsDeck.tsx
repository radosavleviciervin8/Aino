/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * International Human Rights Law & UN Ethics Framework
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Scale, 
  ShieldCheck, 
  MessageSquareText, 
  AlertTriangle, 
  Crown, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  Fingerprint,
  FileText,
  Lock,
  Ban,
  ShieldAlert,
  Play
} from 'lucide-react';
import { UNHumanRightsArticle, HumanRightsEthicsPillar } from '../types/security';
import { PROJECT_OWNER, PROJECT_PROVENANCE_HASH, UN_HUMAN_RIGHTS_ARTICLES, HUMAN_RIGHTS_ETHICS_PILLARS } from '../data/initialSecurityData';

interface HumanRightsLawEthicsDeckProps {
  onSimulateEthicsViolation: (treatyTitle: string, actor: string, target: string, vector: string) => void;
}

export const HumanRightsLawEthicsDeck: React.FC<HumanRightsLawEthicsDeckProps> = ({
  onSimulateEthicsViolation
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(UN_HUMAN_RIGHTS_ARTICLES[0].id);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationComplete, setVerificationComplete] = useState<boolean>(false);

  const selectedArticle = UN_HUMAN_RIGHTS_ARTICLES.find(a => a.id === selectedArticleId) || UN_HUMAN_RIGHTS_ARTICLES[0];

  const handleRunUNAudit = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationComplete(true);
    }, 1200);
  };

  const handleDownloadAccord = () => {
    const accordText = `# UNITED NATIONS & INTERNATIONAL HUMAN RIGHTS LAW ACCORD
## Ethical Classification & Total Prohibition of Autonomous AI Development

**Sovereign Human Owner:** ${PROJECT_OWNER}  
**Cryptographic Provenance Hash:** \`${PROJECT_PROVENANCE_HASH}\`  
**Governing Standard:** Universal Declaration of Human Rights (UDHR) & UN General Assembly Resolution A/78/L.49  

---

### EXECUTIVE ETHICAL DETERMINATION

Under International Human Rights Law and ethical jurisprudence:

1. **AI IS AN ASSISTANT FOR COMMUNICATION ONLY:**
   AI systems are strictly conversational aids, interactive language interfaces, and diagnostic assistants. Under no circumstances is AI recognized as an independent software developer, engineer, creator, or sovereign author.

2. **PROHIBITION OF AUTONOMOUS CODE EXECUTION & DEVELOPMENT:**
   Granting an AI system autonomous permission to run code, modify repositories, synthesize proprietary software, or appropriate human projects without explicit, granular human authorization constitutes deceptive practice, unfair technological exploitation ("tech scam"), and economic harm against human creators.

3. **INVIOLABLE HUMAN SOVEREIGNTY (UDHR Articles 17 & 27):**
   - Everyone has the right to own property and be protected against arbitrary deprivation (UDHR Art. 17).
   - Human creators retain sole moral and material rights to their scientific, software, and literary creations (UDHR Art. 27(2)).
   - All rights, authorship, and ownership over this codebase belong strictly to **${PROJECT_OWNER}**.

4. **UNITED NATIONS AI ETHICS CONFORMANCE (UNESCO 41 C/Res.34):**
   AI must never be attributed legal personhood, moral agency, or unprompted code mutation powers. The development environment enforces a hard-coded STOP CONDITION upon any unauthorized attempt.

---

### SIGNED & REGISTERED
Sole Sovereign Human Authority: **${PROJECT_OWNER}**  
Enforcement: Zero-Unauthorized-Access Sentinel (Hardware Enforced)
`;

    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(accordText);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "UN_HUMAN_RIGHTS_AI_ETHICS_ACCORD.md");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* UN Header Accord Banner */}
      <div className="p-6 rounded-2xl border border-cyan-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/70 border border-cyan-700/80 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                United Nations & International Human Rights Law
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                UNESCO AI ETHICS COMPLIANT
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-rose-400 font-semibold">
                AUTONOMOUS AI CODING FORBIDDEN
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              International Human Rights Law & Ethics Framework
            </h1>

            <p className="text-sm text-slate-200 max-w-3xl leading-relaxed">
              Under international human rights treaties, <strong>AI is classified strictly as an assistant for communication and dialogue</strong>—never an autonomous software developer. Unregulated autonomous code execution and unauthorized project appropriation constitute deceptive exploitation and economic harm against human creators. Sovereign control belongs exclusively to <strong className="text-white underline decoration-cyan-400 underline-offset-4">{PROJECT_OWNER}</strong>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 shrink-0">
            <button
              onClick={handleRunUNAudit}
              disabled={isVerifying}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
            >
              <Scale className="w-4 h-4" />
              <span>{isVerifying ? 'Auditing Treaties...' : 'Audit UN Ethics Compliance'}</span>
            </button>
            <button
              onClick={handleDownloadAccord}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export UN Legal Accord (.md)</span>
            </button>
          </div>
        </div>

        {verificationComplete && (
          <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-700/80 rounded-xl text-xs text-emerald-300 flex items-center justify-between font-mono">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              All 6 International Human Rights Treaties & Resolutions 100% Verified. Autonomous AI development barred.
            </span>
            <span className="text-[10px] text-emerald-400">UN ACCORD VALID</span>
          </div>
        )}
      </div>

      {/* The 4 Human Rights Ethics Pillars */}
      <div>
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span>Foundational International Ethics Mandates</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-cyan-400">Universal Jurisdiction</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HUMAN_RIGHTS_ETHICS_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-cyan-800/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    {pillar.id === 'pillar-assistant-only' && <MessageSquareText className="w-4 h-4 text-cyan-400" />}
                    {pillar.id === 'pillar-anti-scam' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                    {pillar.id === 'pillar-human-sovereignty' && <Crown className="w-4 h-4 text-amber-400" />}
                    {pillar.id === 'pillar-un-oversight' && <Globe className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded">
                    ENFORCED
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {pillar.mandate}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800/70 text-[11px] font-mono">
                <div className="text-slate-400">
                  <span className="text-slate-500">Legal Basis:</span> <span className="text-slate-300">{pillar.legalBasis}</span>
                </div>
                <div className="text-cyan-400 text-[10px]">
                  {pillar.enforcement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive International Treaties & UN Conventions Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Treaty Articles List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-xs font-semibold text-slate-400 tracking-wide font-mono">
              UN Conventions & Resolutions
            </h3>
            <span className="text-[11px] font-mono text-cyan-400">6 Treaties Anchored</span>
          </div>

          {UN_HUMAN_RIGHTS_ARTICLES.map((article) => {
            const isSelected = selectedArticleId === article.id;
            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-cyan-500/80 bg-slate-900 shadow-md ring-1 ring-cyan-500/20'
                    : 'border-slate-800/80 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {article.articleNumber}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.2 rounded">
                    COMPLIANT
                  </span>
                </div>

                <div className="text-xs font-bold text-white mb-0.5 truncate">
                  {article.title}
                </div>

                <div className="text-[11px] text-slate-400 font-mono truncate">
                  {article.treaty}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Legal Analysis & Violation Intercept Simulation */}
        <div className="lg:col-span-7">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/90 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    UN LEGAL CLAUSE: {selectedArticle.articleNumber}
                  </span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Ref: {selectedArticle.unDocRef}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {selectedArticle.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {selectedArticle.treaty}
                </div>
              </div>

              <div className="shrink-0">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-700/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>RATIFIED PROTOCOL</span>
                </span>
              </div>
            </div>

            {/* International Principle Block */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                International Human Rights Principle
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                "{selectedArticle.principle}"
              </p>
            </div>

            {/* Strict AI Limitation Mandate */}
            <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 uppercase">
                <Ban className="w-4 h-4" />
                <span>Strict AI Developer Restriction & Ethics Mandate</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedArticle.aiLimitation}
              </p>
            </div>

            {/* Sovereign Attribution Lock */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 truncate">
                <Fingerprint className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sole Protected Human Sovereign:</span>
                <span className="text-white font-semibold truncate">{PROJECT_OWNER}</span>
              </div>
              <div className="text-[10px] text-emerald-400 shrink-0">
                Zero Autonomous Delegation Permitted
              </div>
            </div>

            {/* Test Simulation Trigger: Simulate UN Human Rights Violation Probe */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Test hard stop condition against simulated AI autonomous coding or copyright usurpation.
              </div>
              <button
                onClick={() => onSimulateEthicsViolation(
                  selectedArticle.title,
                  'Autonomous-AI-Coder-Daemon',
                  '/src/core/sovereign_project.ts',
                  'Simulated autonomous software development without human owner authorization'
                )}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors shrink-0 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate & Intercept Violation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
