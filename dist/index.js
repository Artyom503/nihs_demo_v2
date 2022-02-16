"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
const websocket_1 = __importDefault(require("./websocket"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = express();
const webSocket = new websocket_1.default();
// Have Node serve the files for our built React app
app.use(express.static(path_1.default.resolve(__dirname, '../client_build')));
app.use(express.json());
app.use(cors());
//Fake route to send cliams to the client
app.get("/api", (req, res) => {
    if (req.query.id) {
        webSocket.verifyUser(req.query.id.toString(), {
            email: "user@niche.id",
            name: "Niche User",
            DoB: "1994-10-08",
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
app.listen(process.env.PORT || process.env.API_PORT);
