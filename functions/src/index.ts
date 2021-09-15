import * as functions from "firebase-functions";
import reply from "./reply";

exports.Linebot = functions
  .region("asia-northeast1")
  .https.onRequest((req, res) => {
    if (req.body.events[0].message.type !== "text") {
      return;
    }
    reply(req.body);
  });
