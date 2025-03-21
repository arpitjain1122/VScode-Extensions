"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = getWebviewContent;
function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Command Runner</title>
        <style>
            body {
                font-family: 'Segoe UI', sans-serif;
                background-color: #f0f2f5;
                padding: 30px;
                color: #333;
            }
  
            h2 {
                text-align: center;
                color: #007acc;
                margin-bottom: 20px;
            }
  
            .button-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 15px;
                max-width: 1000px;
                margin: 0 auto;
            }
  
            button {
                background-color: #007acc;
                color: white;
                border: none;
                padding: 12px 18px;
                font-size: 14px;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                word-break: break-word;
            }
  
            button:hover {
                background-color: #005f99;
                transform: translateY(-2px);
            }
  
            button:active {
                background-color: #004f7a;
                transform: scale(0.98);
            }
  
            .section-title {
                text-align: left;
                margin: 30px 0 10px;
                font-size: 18px;
                color: #555;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <h2>🚀 Command Runner</h2>
  
        <div class="section-title">📦 NPM / Node Commands</div>
        <div class="button-container">
            <button onclick="runCommand('npm install')">npm install</button>
            <button onclick="runCommand('npm run dev')">Run Dev Server</button>
            <button onclick="runCommand('npm run build')">Build Project</button>
            <button onclick="runCommand('npm audit fix')">Fix Vulnerabilities</button>
            <button onclick="runCommand('npm install tailwindcss')">Install Tailwind</button>
            <button onclick="runCommand('npm install express')">Install Express</button>
            <button onclick="runCommand('npm install cors')">Install CORS</button>
            <button onclick="runCommand('npm install dotenv')">Install dotenv</button>
            <button onclick="runCommand('npm install mongoose')">Install Mongoose</button>
            <button onclick="runCommand('npm test')">Run Tests</button>
            <button onclick="runCommand('npm outdated')">Check Outdated Packages</button>
            <button onclick="runCommand('npm install bootstrap')">Install Bootstrap</button>
        </div>
  
        <div class="section-title">🛠 Developer Tools</div>
        <div class="button-container">
            <button onclick="runCommand('code .')">Open Project</button>
            <button onclick="runCommand('npx eslint .')">Run ESLint</button>
            <button onclick="runCommand('npx prettier --write .')">Format Code (Prettier)</button>
            <button onclick="runCommand('npx create-react-app my-app')">Create React App</button>
        </div>
  
        <div class="section-title">🔧 Git Commands</div>
        <div class="button-container">
            <button onclick="runCommand('git init')">Git Init</button>
            <button onclick="runCommand('git status')">Git Status</button>
        </div>
  
        <script>
            const vscode = acquireVsCodeApi();
            function runCommand(command) {
                vscode.postMessage({ command: 'runCommand', text: command });
            }
        </script>
    </body>
    </html>`;
}
//# sourceMappingURL=webviewContent.js.map