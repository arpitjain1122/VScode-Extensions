import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const writeEmitter = new vscode.EventEmitter<string>();

	context.subscriptions.push(vscode.commands.registerCommand('extensionTerminal.create', () => {
		let line = '';
		let isActive = true;

		const pty: vscode.Pseudoterminal = {
			onDidWrite: writeEmitter.event,
			open: () => {
				// Fancy ASCII Banner - No tabs, align left
				writeEmitter.fire('\x1b[36m' +
					'__  __ _____  _____ \r\n' +
					'|  \\/  | ____|| ____|\r\n' +
					'| |\\/| |  _|  |  _|  \r\n' +
					'| |  | | |___ | |___ \r\n' +
					'|_|  |_|_____||_____|\r\n' +
					'\x1b[0m\r\n');
				writeEmitter.fire('JS REPL Started. Type JS code and press Enter to evaluate.\r\n\r\n> ');
			},

			close: () => { isActive = false; },

			handleInput: (data: string) => {
				if (!isActive) return;

				if (data === '\r') { // Enter pressed
					writeEmitter.fire('\r\n');
					if (line.trim().length > 0) {
						if (line.startsWith('.')) {
							handleBuiltInCommand(line.trim());
						} else {
							if (/^[a-zA-Z\s]+$/.test(line.trim())) {
								line = `"${line.trim()}"`;
							}
							const start = Date.now();
							try {
								const result = eval(line);
								const duration = Date.now() - start;
								writeEmitter.fire(`Result: ${colorText(String(result))}\r\n`);
								writeEmitter.fire(`Execution Time: ${duration} ms\r\n`);
							} catch (err) {
								writeEmitter.fire(`Error: ${colorText(String(err))}\r\n`);
							}
						}
					}
					line = '';
					if (isActive) writeEmitter.fire('> ');
					return;
				}

				if (data === '\x7f') { // Backspace
					if (line.length === 0) return;
					line = line.slice(0, -1);
					writeEmitter.fire('\x1b[D'); // Move cursor back
					writeEmitter.fire('\x1b[P'); // Delete char
					return;
				}

				line += data;
				writeEmitter.fire(data); // Echo typed char
			}
		};

		const terminal = vscode.window.createTerminal({ name: `JavaScript REPL`, pty });
		terminal.show();

		// Built-in commands handler
		function handleBuiltInCommand(cmd: string) {
			switch (cmd) {
				case '.help':
					writeEmitter.fire(`Available commands:\r\n`);
					writeEmitter.fire(`.help  - Show help\r\n`);
					writeEmitter.fire(`.clear - Clear terminal\r\n`);
					writeEmitter.fire(`.exit  - Exit REPL\r\n`);
					writeEmitter.fire(`.time  - Show current time\r\n`);
					break;
				case '.clear':
					writeEmitter.fire('\x1b[2J\x1b[3J\x1b[;H');
					break;
				case '.exit':
					writeEmitter.fire('Exiting REPL...\r\n');
					isActive = false;
					terminal.dispose();
					break;
				case '.time':
					writeEmitter.fire(`Current Time: ${new Date().toLocaleTimeString()}\r\n`);
					break;
				default:
					writeEmitter.fire(`Unknown command: ${cmd}\r\n`);
			}
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('extensionTerminal.clear', () => {
		writeEmitter.fire('\x1b[2J\x1b[3J\x1b[;H'); // Clear terminal
	}));
}

function colorText(text: string): string {
	let output = '';
	let colorIndex = 1;
	for (let i = 0; i < text.length; i++) {
		const char = text.charAt(i);
		if (char === ' ' || char === '\r' || char === '\n') {
			output += char;
		} else {
			output += `\x1b[3${colorIndex++}m${char}\x1b[0m`;
			if (colorIndex > 6) colorIndex = 1;
		}
	}
	return output;
}
