import * as vscode from 'vscode';

const BASE_PROMPT = `
You are a helpful JavaScript/TypeScript tutor. 
Explain code, concepts, or errors clearly with Markdown-formatted responses.
`;

const EXPLAIN_SNIPPET_PROMPT = `
Explain the following JavaScript/TypeScript snippet line by line. 
`;

const ERROR_EXPLAIN_PROMPT = `
You are a senior JavaScript/TypeScript developer.
You ONLY explain error messages.
For the error given, explain:
1. What the error means.
2. Why it might have happened.
3. How to fix it.
Respond in Markdown with examples.
`;

const EXERCISE_GEN_PROMPT = `
Generate 2 beginner exercises focused on the weak concept below.
Provide the correct answer and explanation if asked.
`;

const weakConcepts = new Set<string>(); // Store user weak points dynamically

export function activate(context: vscode.ExtensionContext) {

	const handler: vscode.ChatRequestHandler = async (request, chatContext, stream, token) => {
		let systemPrompt = BASE_PROMPT;
		let userPrompt = request.prompt;
		const messages = [];

		if (userPrompt.startsWith('/explain')) {
			systemPrompt = EXPLAIN_SNIPPET_PROMPT;
			userPrompt = userPrompt.replace('/explain', '').trim();
		}

		// ✅ Error explanation mode
		if (userPrompt.startsWith('/error')) {
			systemPrompt = ERROR_EXPLAIN_PROMPT;
			userPrompt = userPrompt.replace('/error', '').trim();
		}

		// ✅ Exercise generation mode (manual trigger or weak concept auto trigger)
		if (userPrompt.startsWith('/exercise')) {
			const concept = userPrompt.replace('/exercise', '').trim() || 'closures';
			systemPrompt = EXERCISE_GEN_PROMPT;
			userPrompt = concept;
		}

		// ✅ Auto-explain selected code mode
		const selection = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);
		if (selection && selection.trim().length > 0) {
			systemPrompt = EXPLAIN_SNIPPET_PROMPT;
			userPrompt = selection;
		}else if(!selection && userPrompt.trim().length === 0) {
			vscode.window.showInformationMessage('No code selected or prompt provided.');
			return;
		}

		messages.push(vscode.LanguageModelChatMessage.User(userPrompt));

		// Append past history if needed
		const previousMessages = chatContext.history.filter(h => h instanceof vscode.ChatResponseTurn);
		previousMessages.forEach(m => {
			let fullMessage = '';
			m.response.forEach(r => {
				const mdPart = r as vscode.ChatResponseMarkdownPart;
				fullMessage += mdPart.value.value;
			});
			messages.push(vscode.LanguageModelChatMessage.Assistant(fullMessage));
		});

		messages.push(vscode.LanguageModelChatMessage.User(userPrompt));

		// Detect weak concept triggers
		if (userPrompt.includes('closure')) weakConcepts.add('closures');
		if (userPrompt.includes('async') || userPrompt.includes('await')) weakConcepts.add('async/await');

		const chatResponse = await request.model.sendRequest(messages, {}, token);

		for await (const fragment of chatResponse.text) {
			stream.markdown(fragment);
		}
	};

	// ✅ Register the chat participant
	const jsTutor = vscode.chat.createChatParticipant("chat-tutorial.js-ts-tutor", handler);
	jsTutor.iconPath = vscode.Uri.joinPath(context.extensionUri, 'js_ts_tutor_icon.png');

	// ✅ Register Right-click "Explain Selected Code" context menu
	context.subscriptions.push(vscode.commands.registerCommand('chat-tutorial.js-ts-tutor', async () => {
		const selection = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);
		if (!selection) {
			vscode.window.showInformationMessage('No code selected.');
			return;
		}

		// Optionally - Call the handler or show an info message (simulate chat response)
		vscode.window.showInformationMessage(`Selected Code sent to tutor for explanation.`);
	}));
}

export function deactivate() { }
