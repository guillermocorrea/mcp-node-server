# 🤖 MCP Node Server

A Node.js MCP Server.

## 📓 Description

This project provides a server implementation for the Model Context Protocol with example tools.

## ⬇️ Installation

```bash
# Clone the repository
git clone https://github.com/guillermocorrea/mcp-node-server.git

# Navigate to the project directory
cd mcp-node-server

# Install dependencies
npm install
```

## 👨‍💻 Configuration

Update the absolute path to the `main.ts` file in `.vscode\mcp.json`.

## 🚀 Test

### VSCODE

Open copilot chat in agent mode, it will discover the tools.

Example prompt:

```prompt
What is the weather in Bogota?
```

### @modelcontextprotocol/inspector

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx main.ts
```
