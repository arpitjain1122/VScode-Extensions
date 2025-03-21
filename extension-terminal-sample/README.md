# 🖥️ VS Code JavaScript REPL Terminal Extension

This extension creates a **custom interactive JavaScript REPL terminal** inside VS Code, allowing you to type JavaScript directly into the terminal and see instant results.

It also supports **built-in commands**, execution time measurement, colorful string output, and a fancy ASCII banner on startup.

---

## 🚀 Features
✅ Interactive JavaScript evaluation inside the terminal  
✅ Fancy colored ASCII banner on startup  
✅ Colorful output for results and errors  
✅ Built-in commands like `.help`, `.clear`, `.exit`, `.time`  
✅ Execution time measurement for each JS input  
✅ Backspace handling like a real terminal

---

## 📜 Available Built-in Commands
| Command   | Description                          |
|---------- |--------------------------------------|
| `.help`   | Show available REPL commands         |
| `.clear`  | Clear the REPL terminal screen       |
| `.exit`   | Exit the REPL terminal               |
| `.time`   | Show the current system time         |

---

## 💻 How to Use
1. Run the extension (`F5`) to start the **Extension Development Host**
2. Press `Ctrl+Shift+P` ➔ Select `REPL Terminal : Create`
3. Start typing JavaScript code and hit **Enter**
4. Use built-in commands (like `.help`) any time

✅ Example:
```js
> 2 + 2
Result: 4
Execution Time: 1 ms
