# 📚 LearnJS - JavaScript Articles Fetcher Extension

This VS Code extension fetches the latest articles from the **Web Dev Simplified Blog RSS feed** and presents them inside VS Code.  
Quickly learn JavaScript tips, tricks, and tutorials without leaving your editor!

---

## 🚀 Features

✅ Fetches latest JavaScript articles from the blog's RSS feed  
✅ Displays articles in a **VS Code Quick Pick dropdown**  
✅ Opens the selected article directly in your browser  
✅ Uses **Axios** and **fast-xml-parser** for fetching and parsing the RSS feed  
✅ Sorts articles by latest `pubDate`

---

## 🧠 How It Works

- The extension is activated by the command: `LearnJS.jslearn`
- It fetches RSS XML from: `https://blog.webdevsimplified.com/rss.xml`
- Parses the XML and displays article titles in a dropdown
- On selection, it opens the article link in your default browser

---

## 💻 Example Usage

1. Run the extension in VS Code (`F5`)
2. Press `Ctrl+Shift+P`
3. Type `LearnJS: jslearn` and select it
4. A list of the latest blog articles appears
5. Select one ➔ It opens in your browser!

---

## 📦 Dependencies

- **axios** — For fetching the RSS XML
- **fast-xml-parser** — For parsing the XML content
- **https** — To handle HTTPS certificate issues (if any)

✅ Install via:

```bash
npm install axios fast-xml-parser
```
