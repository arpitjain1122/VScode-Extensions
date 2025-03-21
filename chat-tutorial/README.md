# 🤖 JavaScript / TypeScript Tutor - VS Code Chat Extension

This extension adds an **AI-powered interactive JavaScript/TypeScript tutor** to VS Code's Chat feature.  
It helps developers **understand code, debug errors, and practice weak concepts** — all directly inside the editor by using @tutor prefix.

---

## 🚀 Features
✅ **Explain Code Snippets** line by line  
✅ **Error Explanation Mode** with cause and solution suggestions  
✅ **Explain Selected Code** via /explain in the @tutor field in chat  
✅ **Beginner Exercise Generation** on weak concepts (like `closures`, `async/await`)  
✅ **Remembers weak concepts** to generate targeted exercises  
✅ Markdown-formatted AI responses with examples

---

## 💻 Supported Chat Commands
| Command                  | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `/explain <code>`        | Explains the provided JavaScript/TypeScript snippet               |
| `/error <error message>` | Explains the error meaning, cause, and fix with examples          |
| `/exercise <concept>`    | Generates beginner exercises for the concept (default: closures)  |


## 📚 Example Usage
### 🟢 Explain Code:
```bash
/explain const x = [1, 2, 3].map(n => n * 2);
