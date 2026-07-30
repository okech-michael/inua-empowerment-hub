import server from "../src/server.js";
import serverless from "serverless-http";

export default serverless(server);
