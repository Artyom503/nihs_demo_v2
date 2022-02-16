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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dotenv = __importStar(require("dotenv"));
const websocket_1 = __importDefault(require("./websocket"));
dotenv.config();
const app = express();
const webSocket = new websocket_1.default();
app.use(express.json());
app.use(cors());
//Fake route to send cliams to the client
app.get("/", (req, res) => {
    if (req.query.id) {
        webSocket.verifyUser(req.query.id.toString(), {
            email: "user@idem.com.au",
            name: "Mr Idem User",
            DoB: "1984-12-25",
        });
    }
    res.send("Successfully verified account");
});
//app.post("/login", (req, res, next) => {
//const identity = req.body as server.IdentityRequestData;
//const dob: string | undefined = identity.claims.find((c) => c.credentialSubject.name === "DoB")?.credentialSubject?.value;
//const email: string | undefined = identity.claims.find((c) => c.credentialSubject.name === "Email")?.credentialSubject?.value;
//const name: string | undefined = identity.claims.find((c) => c.credentialSubject.name === "Name")?.credentialSubject?.value;
//webSocket.verifyUser(identity.connectionID, {
//name: name,
//email: email,
//DoB: dob,
//});
//res.json({ message: "Successfully verified account" });
//});
app.listen(process.env.API_PORT);
