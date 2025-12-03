"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

const files = [
  { name: "freeze-script.js", path: "/code/freeze-script.txt" },
  { name: "config.json", path: "/code/config.txt" },
  { name: "package.json", path: "/code/package.txt" },
  { name: "generate-wallet.js", path: "/code/generate-wallet.txt" },
];

export default function Home() {
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  useEffect(() => {
    files.forEach(async (file) => {
      const res = await fetch(file.path);
      const text = await res.text();
      setFileContents((prev) => ({ ...prev, [file.name]: text }));
    });
  }, []);

  const copyToClipboard = (fileName: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-200 font-sans">
      {/* Sticky Frosted Glass Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#111]/80 border-b border-gray-800 px-8 py-5 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">Solana-Dev-Tools</h1>
      </header>

      <main className="mx-auto max-w-5xl py-14 px-5 animate-fadeIn">
        {/* Steps Section */}
        <section className="mb-14 bg-[#161616] border border-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-8 text-white">
            Setup Guide
          </h2>

          <ol className="list-decimal ml-6 text-lg space-y-6 leading-relaxed">
            <li>
              Make Sure you have Node (& NPM) and VSCode Installed.
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href="https://nodejs.org"
                  target="_blank"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-medium rounded-lg shadow-md"
                >
                  Install Node & npm
                </a>
                <a
                  href="https://code.visualstudio.com"
                  target="_blank"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-medium rounded-lg shadow-md"
                >
                  Install VS Code
                </a>
              </div>
            </li>

            <li>Create a new folder and open it in VSCode</li>

            <li>
              Create these 4 files:
              <div className="bg-[#1c1c1c] border border-gray-700 text-gray-300 mt-4 px-4 py-4 rounded-lg font-mono">
                freeze-script.js <br />
                config.json <br />
                package.json <br />
                generate-wallet.js
              </div>
            </li>
            <li>
              Paste the below code into those files
              <div className="grid md:grid-cols-2 gap-10 pt-5">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="rounded-xl border border-gray-800 bg-[#111]/60 shadow-lg backdrop-blur-lg hover:border-blue-600 transition"
                  >
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
                      <span className="font-semibold text-gray-100">
                        {file.name}
                      </span>

                      <button
                        className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 transition rounded-md px-3 py-1 text-sm"
                        onClick={() =>
                          copyToClipboard(
                            file.name,
                            fileContents[file.name] || "",
                          )
                        }
                      >
                        {copiedFile === file.name ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                        {copiedFile === file.name ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <textarea
                      readOnly
                      spellCheck={false}
                      value={fileContents[file.name] || "Loading..."}
                      className="w-full h-64 p-5 bg-[#0d0d0d] text-gray-200 font-mono text-sm resize-none focus:outline-none rounded-b-xl"
                    />
                  </div>
                ))}
              </div>
            </li>

            <li>
              Open Terminal in VS Code and run the command
              <div className="rounded-xl border border-gray-800 bg-[#111]/60 shadow-lg backdrop-blur-lg hover:border-blue-600 transition mt-5">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
                  <span className="font-semibold text-gray-100">Terminal</span>
                </div>
                <textarea
                  readOnly
                  spellCheck={false}
                  value={"npm install"}
                  className="w-full p-5 bg-[#0d0d0d] text-gray-200 font-mono text-sm resize-none focus:outline-none rounded-b-xl"
                />
              </div>
            </li>

            <li>
              Run this code to generate a private key and wallet address pair
              (or use existing private key from Phantom)
              <div className="rounded-xl border border-gray-800 bg-[#111]/60 shadow-lg backdrop-blur-lg hover:border-blue-600 transition mt-5">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
                  <span className="font-semibold text-gray-100">Terminal</span>
                </div>
                <textarea
                  readOnly
                  spellCheck={false}
                  value={"node generate-wallet.js"}
                  className="w-full p-5 bg-[#0d0d0d] text-gray-200 font-mono text-sm resize-none focus:outline-none rounded-b-xl"
                />
              </div>
            </li>

            <li>Paste the Private Key in 'config.js' file</li>

            <li>Import the Wallet to Phantom and Fund it with SOL</li>

            <li>
              Create a Token with that wallet WITH Freeze Authority Enabled{" "}
              <br />
              You can keep the Mint Authority Disabled.
            </li>
            <li>Paste the Mint Address in 'config.js' file</li>

            <li>
              Get an RPC endpoint from Helius or Alchemy and paste it into
              'config.js'
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href="https://www.helius.dev/"
                  target="_blank"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-medium rounded-lg shadow-md"
                >
                  Helius
                </a>
                <a
                  href="https://www.alchemy.com/"
                  target="_blank"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-medium rounded-lg shadow-md"
                >
                  Alchemy
                </a>
              </div>
            </li>

            <li>
              Go to PumpSwap and Add Liquidity to your token.
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href="https://swap.pump.fun/deposit"
                  target="_blank"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-medium rounded-lg shadow-md"
                >
                  PumpSwap
                </a>
              </div>
            </li>

            <li>
              Copy the Pump Fun Holer Wallet and paste it into 'config.js'{" "}
              <br /> <br />
              'config.js' is now fully configured
            </li>

            <li>
              Now start running the script. Anyone who buys the token will be
              frozen immediately and won't be able to sell.
              <div className="rounded-xl border border-gray-800 bg-[#111]/60 shadow-lg backdrop-blur-lg hover:border-blue-600 transition mt-5">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
                  <span className="font-semibold text-gray-100">Terminal</span>
                </div>
                <textarea
                  readOnly
                  spellCheck={false}
                  value={"node freeze-script.js"}
                  className="w-full p-5 bg-[#0d0d0d] text-gray-200 font-mono text-sm resize-none focus:outline-none rounded-b-xl"
                />
              </div>
            </li>

            <li>Remove the Liquidity on PumpSwap.</li>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://swap.pump.fun/deposit"
                target="_blank"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-medium rounded-lg shadow-md"
              >
                PumpSwap
              </a>
            </div>
          </ol>
        </section>
      </main>
    </div>
  );
}
