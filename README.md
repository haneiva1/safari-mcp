# safari-mcp

> Control Safari from Claude, Cursor, Windsurf, and any MCP client. No extensions, no extra dependencies — just macOS + Node.js.

[![npm](https://img.shields.io/npm/v/safari-mcp?style=flat-square)](https://npmjs.com/package/safari-mcp)
![macOS](https://img.shields.io/badge/macOS-only-silver?style=flat-square&logo=apple)
[![MCP](https://img.shields.io/badge/MCP-compatible-purple?style=flat-square)](https://modelcontextprotocol.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## What it does

`safari-mcp` is a [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI assistants full control over Safari on macOS — navigate pages, read content, click elements, fill forms, manage tabs, and take screenshots.

It works by communicating with Safari through **JXA (JavaScript for Automation)**, Apple's native macOS scripting layer. No Chrome DevTools Protocol, no Playwright, no extensions required.

```
Claude Desktop / Cursor / Windsurf
         │
         │  MCP (stdio)
         ▼
    safari-mcp server
         │
         │  JXA / osascript
         ▼
    Safari.app (macOS)
```

---

## Quick start

### 1. Install

```bash
npm install -g safari-mcp
```

### 2. Enable automation in Safari

Go to **Safari → Settings → Advanced → Show features for web developers**, then enable **Allow JavaScript from Apple Events**.

### 3. Configure Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "safari": {
      "command": "safari-mcp"
    }
  }
}
```

Restart Claude Desktop. Safari is now available as a tool.

---

## Tools

| Tool | Description |
|------|-------------|
| `safari_status` | Check if Safari is running, current URL and title |
| `safari_open` | Open Safari, optionally with a URL |
| `safari_navigate` | Navigate to a URL, waits for page load |
| `safari_go_back` | Go back in history |
| `safari_go_forward` | Go forward in history |
| `safari_reload` | Reload the current page |
| `safari_list_tabs` | List all open tabs across all windows |
| `safari_new_tab` | Open a new tab, optionally with a URL |
| `safari_switch_tab` | Switch to a specific tab by index |
| `safari_close_tab` | Close the current or a specific tab |
| `safari_get_page` | Get URL, title, and text content of current page |
| `safari_run_javascript` | Execute arbitrary JavaScript in the current tab |
| `safari_get_element` | Inspect a DOM element by CSS selector |
| `safari_click` | Click an element by CSS selector |
| `safari_fill` | Fill an input field by CSSselector |
| `safari_scroll` | Scroll the page (up / down / top / bottom) |
| `safari_get_links` | Get all links from the current page |
| `safari_wait_for_element` | Wait until a CSS selector appears in the DOM |
| `safari_screenshot` | Capture a screenshot of the Safari window |

---

## Requirements

- macOS 12+ (Monterey or later)
- Safari 15+
- Node.js 18+
- **Safari → Settings → Advanced → Allow JavaScript from Apple Events** enabled

---

## Related

- [ts-mcp](https://github.com/haneiva1/ts-mcp) -- the TypeScript framework used to build this server

---

## License

MIT

---

*If this saved you time, consider ⭐ starring the repo.*
