import server from "../src/server";
import serverless from "serverless-http";

export default serverless(server);
