import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the server
const server = new McpServer({
  name: "MyServer",
  description: "My server description",
  version: "1.0.0",
});

// Define the tools
server.tool(
  "Weather",
  "Get the weather for a given city",
  {
    city: z.string().describe("The city to get the weather for"),
    unit: z
      .enum(["C", "F"])
      .default("C")
      .describe("The unit to use for the temperature"),
  },
  async ({ city, unit }) => {
    // Simulate a weather API call
    const weather = {
      city,
      temperature: unit === "C" ? 20 : 68,
      unit,
    };

    return {
      content: [
        {
          type: "text",
          text: `The weather in ${city} is ${weather.temperature}°${unit}`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
