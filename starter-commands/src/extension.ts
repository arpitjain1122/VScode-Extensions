import * as vscode from 'vscode';
import { getWebviewContent } from './webviewContent';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('starter-commands.showWebView', () => {
        const panel = vscode.window.createWebviewPanel(
            'commandRunner',
            'Command Runner',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );
        
        panel.webview.html = getWebviewContent();
        
        panel.webview.onDidReceiveMessage(async message => {
            switch (message.command) {
                case 'runCommand':
                    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Command Runner');
                    terminal.show();
                    terminal.sendText(message.text);
                    break;
            }
        }, undefined, context.subscriptions);
    });
    
    context.subscriptions.push(disposable);
}

export function deactivate() {}
