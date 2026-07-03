import { useState, useEffect } from "react";
import {
  Zap,
  Shield,
  Layers,
  CheckCircle2,
  Clock,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Twitter,
  Github,
  Menu,
  X,
} from "lucide-react";

const CONTRACT_ADDRESS = "0x722873dae2221b54f191b9b65007b25f93d5b60a";
const NAV_LINKS = ["Home", "Token", "Roadmap", "Community"];

const FEATURES = [
  {
    icon: <Layers className="w-6 h-6" />,
    label: "Total Supply",
    value: "1,000,000 ONX",
    sub: "Fixed & immutable supply",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    label: "Blockchain",
    value: "EthereumSP",
    sub: "Battle-tested L1 network",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    label: "Standard",
    value: "ERC-20",
    sub: "Fully compliant token",
  },
];

const ROADMAP = [
  { label: "Smart Contract", done: true },
  { label: "Website", done: true },
  { label: "Wallet Integration", done: true },
  { label: "Token Dashboard", done: true },
  { label: "Community Growth", inProgress: true },
  { label: "Mainnet Launch", pending: true },
];

const COMMUNITY = [
  {
    name: "Discord",
    handle: "Proximamente",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
    color: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-500/20",
  },
  {
    name: "X (Twitter)",
    handle: "Proximamente",
    icon: <Twitter className="w-5 h-5" />,
    color: "from-sky-500/20 to-sky-600/10",
    border: "border-sky-500/20",
  },
  {
    name: "GitHub",
    handle: "Proximamente",
    icon: <Github className="w-5 h-5" />,
    color: "from-neutral-500/20 to-neutral-600/10",
    border: "border-neutral-500/20",
  },
  {
    name: "Telegram",
    handle: "Proximamente",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    color: "from-blue-400/20 to-blue-500/10",
    border: "border-blue-400/20",
  },
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [wallet, setWallet] = useState("");

  async function connectWallet() {
  if (!(window as any).ethereum) {
    alert("MetaMask no está instalada.");
    return;
  }

  try {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);
    alert("Wallet conectada: " + accounts[0]);
  } catch (error) {
    console.error(error);
    alert("No se pudo conectar la wallet.");
  }
}

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function copyAddress() {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="min-h-screen bg-[#090909] text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Global glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background:
              "radial-gradient(ellipse at center, #3B82F6 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-[60vh] -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse at center, #3B82F6 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-[120vh] right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(ellipse at center, #60a5fa 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* NAV */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#090909]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.6)]">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" />
              </svg>
            </div>
            <span className="font-bold text-[15px] tracking-widest uppercase">
              ONYX
            </span>
          </div>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
             <a
  key={l}
  href={`#${l.toLowerCase()}`}
  className="text-sm text-white/55 hover:text-white transition-colors duration-200 font-medium"
>
  {l}
</a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
           <button
  onClick={connectWallet}
  className="h-9 px-5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)]"
>
  {wallet ? "Conectado" : "Launch App"}
</button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors font-medium"
              >
                {l}
              </a>
            ))}
            http://localhost:5173/
          </div>
        )}
      </nav>

      {/* HERO */}
     <section
  id="home"
  className="relative pt-40 pb-32 flex flex-col items-center text-center px-6"
>
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.07] text-blue-400 text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Now Live on Ethereum Mainnet
        </div>

        {/* Logotype */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.2)]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
              <polygon
                points="12,2 22,7 22,17 12,22 2,17 2,7"
                stroke="#3B82F6"
                strokeWidth="1.5"
                fill="rgba(59,130,246,0.15)"
              />
              <polygon
                points="12,6 18,9.5 18,16.5 12,20 6,16.5 6,9.5"
                stroke="#60a5fa"
                strokeWidth="0.75"
                fill="rgba(59,130,246,0.08)"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 max-w-5xl">
          <span className="text-white">The Future of </span>
          <span
            style={{
              background:
                "linear-gradient(135deg, #60a5fa 0%, #3B82F6 40%, #93c5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digital Value
          </span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12">
          A next-generation decentralized cryptocurrency built on Ethereum for
          speed, security and innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
  onClick={connectWallet}
  className="h-9 px-5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)]"
>
  {wallet ? "Conectado" : "Launch App"}
</button>
          <button 
          onClick={() => window.open("/Onyx_whitepaper.pdf", "_blank")}
          className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-[15px] transition-all duration-200">
            Read Whitepaper
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-24 flex flex-col items-center gap-2 text-white/20">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* FEATURES / TOKEN STATS */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-xs tracking-widest uppercase font-semibold mb-3">
              Token Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Core Fundamentals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.05]"
                style={{ backdropFilter: "blur(20px)" }}
              >
                {/* Card glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.08) 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                    {f.icon}
                  </div>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-medium mb-2">
                    {f.label}
                  </p>
                  <p className="text-white text-2xl font-bold mb-1">{f.value}</p>
                  <p className="text-white/30 text-sm">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="relative py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-xs tracking-widest uppercase font-semibold mb-3">
              Development
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Roadmap</h2>
            <p className="mt-4 text-white/40 text-base">
              Milestones on the path to mainnet and beyond.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/40 via-white/10 to-transparent" />

            <div className="flex flex-col gap-0">
              {ROADMAP.map((item, i) => {
                const isDone = item.done;
                const isProgress = item.inProgress;
                const isPending = item.pending;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-6 group relative pb-10 last:pb-0"
                  >
                    {/* Node */}
                    <div
                      className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300
                        ${isDone ? "bg-blue-500/15 border-blue-500/40 text-blue-400" : ""}
                        ${isProgress ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : ""}
                        ${isPending ? "bg-white/[0.03] border-white/10 text-white/20" : ""}
                      `}
                    >
                      {isDone && <CheckCircle2 className="w-5 h-5" />}
                      {isProgress && <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />}
                      {isPending && <Clock className="w-5 h-5" />}

                      {isDone && (
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_16px_rgba(59,130,246,0.4)]" />
                      )}
                    </div>

                    <div className="pt-2.5">
                      <p
                        className={`font-semibold text-base transition-colors ${
                          isDone
                            ? "text-white"
                            : isProgress
                            ? "text-amber-300"
                            : "text-white/30"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5 font-medium uppercase tracking-wider">
                        {isDone ? "Completed" : isProgress ? "In Progress" : "Upcoming"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TOKEN INFORMATION */}
      <section
  id="token"
  className="..."
>
      
          <div className="text-center mb-16">
            <p className="text-blue-400 text-xs tracking-widest uppercase font-semibold mb-3">
              On-Chain
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Token Information
            </h2>
          </div>

          <div
            className="rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header row */}
            <div className="px-8 py-5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="text-white/50 text-sm font-medium">
                Ethereum Mainnet
              </span>
            </div>

            <div className="divide-y divide-white/[0.05]">
              {/* Contract Address */}
              <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <span className="text-white/40 text-sm w-44 flex-shrink-0 font-medium">
                  Contract Address
                </span>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className="text-white/80 text-sm font-mono truncate"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {CONTRACT_ADDRESS}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white transition-all"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Network */}
              <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-white/40 text-sm w-44 flex-shrink-0 font-medium">
                  Network
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">Ξ</span>
                  </div>
                  <span className="text-white/80 text-sm">Ethereum</span>
                </div>
              </div>

              {/* Decimals */}
              <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-white/40 text-sm w-44 flex-shrink-0 font-medium">
                  Decimals
                </span>
                <span
                  className="text-white/80 text-sm font-mono"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  18
                </span>
              </div>

              {/* Token Standard */}
              <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-white/40 text-sm w-44 flex-shrink-0 font-medium">
                  Token Standard
                </span>
                <span className="text-white/80 text-sm">ERC-20</span>
              </div>

              {/* Symbol */}
              <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-white/40 text-sm w-44 flex-shrink-0 font-medium">
                  Symbol
                </span>
                <span className="text-white/80 text-sm font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ONX
                </span>
              </div>
            </div>

            {/* Explorer button */}
           <div className="px-8 py-5 border-t border-white/[0.06]"> 
           <button 
           onClick={() => window.open("https://sepolia.etherscan.io/token/0x722873Dae2221B54f191b9b65007B25F93D5b60A", "_blank")}
           className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-sm font-semibold transition-all duration-200"> View on Etherscan 
           <ExternalLink className="w-3.5 h-3.5" /> 
       </button> 
           </div> 
           </div> 
           </section>
            
       
      {/* COMMUNITY */}
      <section id="community" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-xs tracking-widest uppercase font-semibold mb-3">
              Join Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Community</h2>
            <p className="mt-4 text-white/40 text-base max-w-md mx-auto">
              Connect with thousands of ONX holders and builders shaping the
              future of ONYX.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMMUNITY.map((c) => (
              <a
                key={c.name}
                href="#"
                className={`group relative flex items-center gap-5 rounded-2xl border ${c.border} p-6 bg-gradient-to-br ${c.color} transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
                style={{ backdropFilter: "blur(16px)" }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                  {c.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-[15px]">{c.name}</p>
                  <p className="text-white/40 text-sm mt-0.5">{c.handle}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors ml-auto" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="relative rounded-3xl border border-blue-500/15 overflow-hidden py-16 px-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.25) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
                Ready to join the{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #60a5fa, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ONYX
                </span>{" "}
                ecosystem?
              </h2>
              <p className="text-white/40 text-lg mb-10">
                Acquire ONX and become part of the next generation of digital
                value.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
  onClick={connectWallet}
  className="h-9 px-5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)]"
>
  {wallet ? "Conectado" : "Launch App"}
</button>
                <button className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold transition-all">
                  Read Whitepaper
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-500/80 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white/70">
              ONYX
            </span>
          </div>

          <p className="text-white/25 text-sm text-center">
            © 2024 ONYX Protocol. All rights reserved. Not financial advice.
          </p>

          <div className="flex items-center gap-4">
            {[
              <Twitter className="w-4 h-4" />,
              <Github className="w-4 h-4" />,
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>,
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
