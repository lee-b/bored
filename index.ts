import { TunnelServer } from "./src/server";
import { version } from "./package.json";

console.log(`~~ BoreD v${version} ~~`);

const serverPort = parseInt(process.env.PORT || "8080");
const agentToken = process.env.AGENT_TOKEN;

if (!agentToken) {
  console.error("missing AGENT_TOKEN env, cannot continue");
  process.exit(1);
}

const server = new TunnelServer();

process.once("SIGTERM", () => {
  server.stop();
  process.exit(0);
});

process.once("SIGINT", () => {
  server.stop();
  process.exit(0);
});

server.start(serverPort, agentToken);
