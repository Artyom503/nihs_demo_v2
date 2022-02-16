"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const webSocketServer = require("websocket").server;
const https = require("https");
const http = require("http");
const fs = require("fs");
const uuid_1 = require("uuid");
dotenv.config();
class WebSocketService {
    constructor() {
        this.webSocketsServerPort = process.env.WS_PORT;
        this.verifyUser = (id, identityData) => {
            if (this.clients.get(id)) {
                this.clients.get(id).sendUTF(JSON.stringify(identityData));
                this.clients.get(id).close();
            }
        };
        let server;
        try {
            const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, "utf8");
            const certificate = fs.readFileSync(process.env.CERTIFICATE, "utf8");
            const credentials = { key: privateKey, cert: certificate };
            server = https.createServer(credentials);
        }
        catch (e) {
            server = http.createServer();
        }
        // Spinning the http server and the websocket server.
        server.listen(this.webSocketsServerPort);
        this.wsServer = new webSocketServer({
            httpServer: server,
        });
        this.clients = new Map();
        this.wsServer.on("request", (request) => {
            const userID = (0, uuid_1.v4)();
            const connection = request.accept(null, request.origin);
            this.clients.set(userID, connection);
            connection.sendUTF(JSON.stringify({ id: userID }));
            console.log(this.clients.keys());
            connection.on("message", function (msg) {
                console.log(msg);
            });
        });
        this.wsServer.on("close", (request) => {
            const client = Array.from(this.clients.entries()).find((client) => client[1] === request);
            if (client) {
                this.clients.delete(client[0]);
            }
        });
    }
}
exports.default = WebSocketService;
