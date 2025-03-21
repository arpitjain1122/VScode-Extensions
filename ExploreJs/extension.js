// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");
const { xmlParser, XMLParser } = require("fast-xml-parser");
const https = require("https");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  https.globalAgent.options.rejectUnauthorized = false;
  const res = await axios.get("https://blog.webdevsimplified.com/rss.xml");
  const xmlParser = new XMLParser();
  const articles = xmlParser
    .parse(res.data)
    .rss.channel.item.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    .map((article) => {
      return {
        label: article.title,
        detail: article.description,
        link: article.link,
      };
    });

  let disposable = vscode.commands.registerCommand(  
    "LearnJS.jslearn",
    async function () {
      const article = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      });

      if (article == null) return;

      vscode.env.openExternal(article.link);
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
