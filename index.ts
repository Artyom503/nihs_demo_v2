import express = require("express");
import cors = require("cors");
import dotenv from "dotenv";
import WebSocketService from "./websocket";
import path from "path";

dotenv.config();
const app = express();
const webSocket = new WebSocketService();

// Have Node serve the files for our built React app


app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
    app.use('/static', express.static(path.join(__dirname, 'client_build')));
    app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, '../client_build', 'index.html'));
 });
    }

 //Fake route to send cliams to the client
app.get("/api", (req: express.Request, res: express.Response) => {
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
