import * as request from "request";
import * as dotenv from "dotenv";

dotenv.config();

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";

const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
};

const reply = (bodyResponse: any) => {
  const textResponse = bodyResponse.events[0].message.text;

  if (textResponse[0] !== "!") return;

  const commands = textResponse.split(" ");

  let replyMessage = "text !help to get see what I can do!";

  if (commands.length === 1 && commands[0] === "!help") {
    replyMessage =
      "Here are the list of my commands! \n 1) !help\t-\tto see all commands";
  }

  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: replyMessage,
        },
      ],
    }),
  });
};

export default reply;
