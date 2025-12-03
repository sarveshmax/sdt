"use client";

import { useEffect, useState } from "react";

const files = [
  { name: "freeze-script.js", path: "/code/freeze-script.txt" },
  { name: "config.json", path: "/code/config.txt" },
  { name: "package.json", path: "/code/package.txt" },
  { name: "generate-wallet.js", path: "/code/generate-wallet.txt" }
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

    setTimeout(() => {
      setCopiedFile(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="sticky top-0 z-50 bg-[#181818] border-b border-gray-700 text-white px-6 py-4 text-xl font-bold shadow-md">
        Solana Tools
      </header>

      <main className="mx-auto max-w-4xl py-10 px-4">
        <h2 className="text-3xl font-semibold mb-8">Steps to Create Project</h2>

        <ol className="list-decimal ml-6 mb-12 text-lg space-y-4 leading-relaxed">
          <li>
            Ensure you have these installed:
            <div className="flex gap-4 mt-3">
              <a
                href="https://nodejs.org"
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
              >
                Install Node/npm
              </a>
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
              >
                Install VS Code
              </a>
            </div>
          </li>

          <li>
            Create these 4 files inside VS Code:
            <div className="bg-gray-800 border border-gray-700 text-gray-300 mt-3 px-4 py-3 rounded">
              freeze-script.js <br />
              config.json <br />
              package.json <br />
              generate-wallet.js
            </div>
          </li>
        </ol>

        {files.map((file) => (
          <div key={file.name} className="mb-10 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center bg-[#1d1d1d] px-4 py-3">
              <span className="font-semibold text-gray-200">{file.name}</span>
              <button
                className="bg-gray-600 hover:bg-gray-500 transition text-white px-3 py-1.5 rounded"
                onClick={() => copyToClipboard(file.name, fileContents[file.name] || "")}
              >
                {copiedFile === file.name ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              readOnly
              spellCheck={false}
              value={fileContents[file.name] || "Loading..."}
              className="w-full h-64 p-5 bg-[#0d0d0d] text-gray-300 font-mono text-sm resize-none focus:outline-none"
            />
          </div>
        ))}
      </main>
    </div>
  );
}
