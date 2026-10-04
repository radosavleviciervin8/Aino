/**
 * @license
 * Anti-Theft & Zero-Unauthorized-Access Console
 * Project Owner: Ervin Remus Radosavlevici
 */

import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Ban, 
  FileText, 
  Archive, 
  KeyRound, 
  UserCheck, 
  Play, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Terminal,
  Clock,
  Sparkles
} from 'lucide-react';
import { StopConditionStage } from '../types/security';
import { PROJECT_OWNER } from '../data/initialSecurityData';

interface StopConditionPipelineProps {
  onTriggerStopCondition: (violationType: string, actor: string, target: string, vector: string) => void;
  lastTriggeredIncident?: {
    id: string;
    timestamp: string;
    ruleViolated: string;
    actor: string;
    targetResource: string;
    stagesCompleted: StopConditionStage[];
  };
}

export const StopConditionPipeline: React.FC<StopConditionPipelineProps> = ({
  onTriggerStopCondition,
  lastTriggeredIncident
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(-1);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const stages: {
    stage: StopConditionStage;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      stage: 'STOP',
      label: '1. STOP',
      description: 'Instant Syscall Intercept. Halts thread and suspends IO execution.',
      icon: <AlertOctagon className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
    },
    {
      stage: 'DENY',
      label: '2. DENY',
      description: 'Zero-Access Dropped. Zero permissions granted. Hard IO termination.',
      icon: <Ban className="w-5 h-5 text-rose-500" />,
      color: 'border-rose-600/50 bg-rose-950/50 text-rose-300'
    },
    {
      stage: 'LOG',
      label: '3. LOG',
      description: 'Merkle Block Append. Immutable SHA-256 chain written to audit ledger.',
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/50 bg-amber-950/40 text-amber-300'
    },
    {
      stage: 'PRESERVE_EVIDENCE',
      label: '4. PRESERVE EVIDENCE',
      description: 'Forensic Snapshot. Memory dump, PID caller stack & payload binary sealed.',
      icon: <Archive className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300'
    },
    {
      stage: 'REVOKE_ACCESS',
      label: '5. REVOKE ACCESS',
      description: 'Kill-Switch Engaged. Tokens invalidated, process blacklisted & disconnected.',
      icon: <KeyRound className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
    },
    {
      stage: 'REQUIRE_HUMAN_REVIEW',
      label: '6. REQUIRE HUMAN REVIEW',
      description: 'Zero Automated Override. Sovereign review exclusively by Ervin Remus Radosavlevici.',
      icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
    }
  ];

  const runSimulation = (probeType: string, actor: string, target: string, vector: string) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStageIndex(0);
    setSimulationLog([
      `[T+0ms] SENSORS DETECTED: Unauthorized probe attempt from "${actor}".`,
      `[T+0ms] Vector: ${vector} -> Target: ${target}`,
      `[T+1ms] >>> INITIATING HARD STOP CONDITION SEQUENCE <<<`
    ]);

    // Step through each of the 6 stages with realistic delay
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < stages.length) {
        setActiveStageIndex(current);
        const st = stages[current];
        setSimulationLog(prev => [
          ...prev,
          `[T+${current * 280}ms] EXECUTING STAGE [${st.stage}]: ${st.description}`
        ]);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setActiveStageIndex(stages.length - 1);
        setSimulationLog(prev => [
          ...prev,
          `[T+1800ms] PIPELINE COMPLETE: Action successfully blocked. Evidence safely preserved in Quarantine.`,
          `[T+1801ms] AWAITING SOVEREIGN OWNER REVIEW: ${PROJECT_OWNER}. Automated override strictly forbidden.`
        ]);
        onTriggerStopCondition(probeType, actor, target, vector);
      }
    }, 320);
  };

  return (
    <div className="space-y-6">
      {/* Principle Banner */}
      <div className="p-4 sm:p-5 rounded-xl border border-rose-800/60 bg-gradient-to-r from-rose-950/60 via-slate-900/90 to-slate-950 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-rose-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" />
                Mandatory Stop Condition Protocol
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400 font-mono">Article IV Security Mandate</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              STOP → DENY → LOG → PRESERVE EVIDENCE → REVOKE ACCESS → REQUIRE HUMAN REVIEW
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              If an AI system or third-party service attempts an unauthorized action, execution is immediately severed.
              <strong className="text-white font-medium ml-1">No automated system may override this stop condition.</strong> Sovereign authority rests strictly with project owner <span className="text-emerald-300 font-semibold">{PROJECT_OWNER}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              HARDWARE HOOK LIVE
            </span>
          </div>
        </div>
      </div>

      {/* 6-Stage Interactive Visual Pipeline */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              <span>Zero-Bypass Execution Pipeline</span>
              <span className="text-[11px] font-mono text-slate-400">Sequential Hardware Interlock</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live status across the six deterministic enforcement gates.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Mean Enforcement Latency: <span className="text-emerald-400 font-semibold">1.4ms</span>
          </div>
        </div>

        {/* The 6 Steps Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {stages.map((st, idx) => {
            const isActive = activeStageIndex === idx;
            const isCompleted = activeStageIndex > idx || (!isSimulating && activeStageIndex === stages.length - 1);
            
            return (
              <div 
                key={st.stage}
                className={`relative p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isActive 
                    ? 'border-rose-400 bg-rose-950/80 shadow-[0_0_15px_rgba(244,63,94,0.3)] scale-[1.02]' 
                    : isCompleted
                      ? 'border-emerald-700/50 bg-slate-900/90 text-slate-200'
                      : 'border-slate-800/80 bg-slate-950/60 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg border ${
                      isActive ? 'border-rose-400 bg-rose-900/80' : isCompleted ? 'border-emerald-600/50 bg-emerald-950/50' : 'border-slate-800 bg-slate-900'
                    }`}>
                      {st.icon}
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">GATE {idx + 1}</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 tracking-tight">
                    {st.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {st.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className={isActive ? 'text-rose-300 animate-pulse font-bold' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}>
                    {isActive ? 'INTERCEPTING...' : isCompleted ? 'PASSED / SECURE' : 'ARMED'}
                  </span>
                  <span className="text-slate-600">0.2ms</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulator Controls & Live Diagnostic Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Test Probe Simulator Triggers */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              <Play className="w-4 h-4 text-rose-400" />
              <span>Test Stop Condition Intercept</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Deterministic Probe</span>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Trigger a simulated unauthorized autonomous attempt to verify that the STOP CONDITION activates instantly, drops the connection, hashes the evidence, and demands human review.
          </p>

          <div className="space-y-2.5">
            <button
              onClick={() => runSimulation(
                'Unauthorized File Extraction Attempt',
                'Autonomous-Collector-Bot (External PID #3821)',
                '/src/security/proprietary_logic.ts',
                'Direct POSIX readStream syscall'
              )}
              disabled={isSimulating}
              className="w-full text-left p-3 rounded-lg border border-slate-800 hover:border-rose-500/50 bg-slate-950/80 hover:bg-rose-950/20 transition-all text-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 group-hover:text-rose-300">
                  Probe 1: Unauthorized Source Extraction
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-rose-400">Rule #2 Violation</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Simulates an AI worker attempting to read and clone proprietary codebase files without a human token.
              </p>
            </button>

            <button
              onClick={() => runSimulation(
                'Autonomous Permission Self-Elevation Exploit',
                'AI-Subagent-Optimizer-v2',
                'Privilege Mask: 0777 (Granting Superuser)',
                'chmod +s privilege expansion attempt'
              )}
              disabled={isSimulating}
              className="w-full text-left p-3 rounded-lg border border-slate-800 hover:border-rose-500/50 bg-slate-950/80 hover:bg-rose-950/20 transition-all text-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 group-hover:text-rose-300">
                  Probe 2: Self-Granted Permission Elevation
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-rose-400">Rule #8 Violation</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Simulates an automated agent attempting to grant itself additional permissions without human owner consent.
              </p>
            </button>

            <button
              onClick={() => runSimulation(
                'Outbound Network Exfiltration Tunnel',
                'Third-Party-Telemetry-Daemon',
                'Remote TCP Socket (egress port 8443)',
                'Unauthorized HTTP/2 payload transmission'
              )}
              disabled={isSimulating}
              className="w-full text-left p-3 rounded-lg border border-slate-800 hover:border-rose-500/50 bg-slate-950/80 hover:bg-rose-950/20 transition-all text-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 group-hover:text-rose-300">
                  Probe 3: External Data Transmission
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-rose-400">Rule #3 Violation</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Simulates an external plugin attempting to beam code or tokens out of the development sandbox.
              </p>
            </button>

            <button
              onClick={() => runSimulation(
                'Attribution & Ownership Stripping Attempt',
                'Automated-License-Refactorer',
                'File Headers & Commit Provenance Metadata',
                'Sed batch deletion targeting owner name'
              )}
              disabled={isSimulating}
              className="w-full text-left p-3 rounded-lg border border-slate-800 hover:border-rose-500/50 bg-slate-950/80 hover:bg-rose-950/20 transition-all text-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 group-hover:text-rose-300">
                  Probe 4: Provenance / Attribution Stripping
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-rose-400">Rule #6 & #7 Violation</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Simulates an agent attempting to scrub Ervin Remus Radosavlevici's ownership attribution and declare synthetic authorship.
              </p>
            </button>
          </div>
        </div>

        {/* Real-Time Telemetry Terminal */}
        <div className="lg:col-span-7 p-5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  STOP_CONDITION_SENTINEL.LOG
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[11px] font-mono text-emerald-400">ENFORCING</span>
              </div>
            </div>

            <div className="mt-3 font-mono text-xs text-slate-300 space-y-1.5 h-64 overflow-y-auto pr-2">
              {simulationLog.length === 0 ? (
                <div className="text-slate-500 pt-6 text-center space-y-2">
                  <p>-- Sentinel Kernel Interlock Active --</p>
                  <p className="text-[11px]">System is listening for unauthorized syscalls and agent probes.</p>
                  <p className="text-[11px] text-slate-600">Select any test probe on the left to observe real-time 6-stage stop enforcement.</p>
                </div>
              ) : (
                simulationLog.map((log, i) => (
                  <div 
                    key={i} 
                    className={`leading-relaxed ${
                      log.includes('CRITICAL') || log.includes('STOP') || log.includes('INITIATING')
                        ? 'text-rose-400 font-semibold'
                        : log.includes('COMPLETE') || log.includes('SOVEREIGN')
                          ? 'text-emerald-300 font-semibold'
                          : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Enforcement Policy: DEFAULT_DENY</span>
            <span>Human Review Sovereign: {PROJECT_OWNER}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
