import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { SafariBrowserTools } from './tools/browser.js'
import { SafariTabTools } from './tools/tabs.js'
import { SafariPageTools } from './tools/page.js'

const server = new Server({ name: 'safari-mcp', version: '1.0.0' }, { capabilities: { tools: {} } })
const allTools = [new SafariBrowserTools(), new SafariTabTools(), new SafariPageTools()]
const toolMap: Record<string, Function> = {}
for (const instance of allTools) {
  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
    if (key !== 'constructor') toolMap[key] = (instance as any)[key].bind(instance)
  }
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: Object.keys(toolMap).map(name => ({ name, description: `Safari MCP: ${name}`, inputSchema: { type: 'object', properties: {} } }))
}))

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const fn = toolMap[req.params.name]
  if (!fn) throw new Error(`Unknown tool: ${req.params.name}`)
  const result = await fn(req.params.arguments || {})
  return { content: [{ type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) }] }
})

const transport = new StdioServerTransport()
server.connect(transport).then(() => process.stderr.write('[safari-mcp] started\n'))
