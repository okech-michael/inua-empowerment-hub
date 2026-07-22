import server from "../backend/src/server";
import serverless from "serverless-http";

export default serverless(server);
