import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { WeatherUnit, type IWeatherService } from "./contracts/IWeatherService";
import { WeatherService } from "./implementations/WeatherService";
import { DefaultLogger } from "./implementations/DefaultLogger";

// Create the server
const mcpServer = new McpServer(
  {
    name: "MyServer",
    description: "My server description",
    version: "1.0.0",
  },
  {
    capabilities: {
      logging: {},
      resources: {
        types: ["weather"],
      },
      tools: {
        types: ["weather"],
      },
    },
  }
);

const weatherService: IWeatherService = new WeatherService(
  new DefaultLogger(mcpServer.server)
);

// Define the tools
mcpServer.tool(
  "Weather",
  "Get the weather for a given city",
  {
    city: z.string().describe("The city to get the weather for"),
    unit: z
      .enum([WeatherUnit.C, WeatherUnit.F])
      .default(WeatherUnit.C)
      .describe("The unit to use for the temperature"),
  },
  async ({ city, unit }) => {
    const weather = await weatherService.getWeather({
      city,
      unit,
    });
    if (!weather) {
      throw new Error("Weather data not found");
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(weather, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await mcpServer.connect(transport);

mcpServer.server.sendLoggingMessage({
  level: "info",
  data: "Server started successfully",
});
