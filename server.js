// botScript and replyBotScript are a mashup of some code bits sent to me by @boodoo@mastodon.social (see the mastodon.js file for more notes on him) and @stefan@stefanbohacek.online, Stefan maintains a ton or really great Botmaking resources and information over at https://botwiki.org/author/stefan/ as well as a huge repo of all his bots and generators over on Glitch (https://glitch.com/~stefans-creative-bots) being able to chat with him and poke around though all his amazing bots was SUPER helpful.

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("palettes"));
const util = require("util");
const cron = require("node-cron");
const fs = require("graceful-fs");
const Canvas = require("canvas");
const Mastodon = require("mastodon-api");
const {
  sendImageToMastodon,
  sendReplyImageToMastodon,
} = require("./mastodon.js");
const randomFromArray = require("./bits/random-from-array.js");
const indefinite = require("indefinite");
const ajectivesPos = require("./bits/ajectives-pos.js");

//sending longs to console AND recordning them in a txt file, because sometimes the computer crashes, or you have to close things down before being able to check through and make sure everythign is running smoothly.
(function () {
  let myConsole = new console.Console(
    fs.createWriteStream(`./logs/output${new Date().getTime()}.txt`)
  );
  let log_stdout = process.stdout;
  let log_err = process.stderr;
  console.log = function (str) {
    myConsole.log(str);
    log_stdout.write(util.format(str) + "\n");
  
  };
  console.error = console.log;
  console.warn = console.log;
  console.info = console.log;
  })();

//relatedly, a little mini async doohickey to make log comment bits wait until the bits they are talking about are done before popping up, purely aesthetic, as any major issues will just throw an error anyways. grabbed from stack overflow, but can't find the exact page now.
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const masto = new Mastodon({
  client_key: process.env.COLORBOT_CLIENT_KEY,
  access_token: process.env.COLORBOT_TOKEN,
  api_url: process.env.BOTSINSPACE_API_URL,
});

const botScript = async () => {
  let palette = require("./srcpg.js");
  const drawPaletteFileName = "draw-palette.png";
  const drawPaletteFilePath = __dirname + "/palettes/" + drawPaletteFileName;

  const canvasHeight = 500;
  const canvasWidth = 666,
    colHeight = canvasHeight / 5,
    ystart = canvasHeight / 5,
    labelIndent = canvasWidth / 2.9,
    textTop = ystart / 5.5;
  const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  const backgroundColor = "#FFFFFF";

  console.log("🖍 let's draw a palette and then label it!");

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.textDrawingMode = "glyph";
  ctx.textBaseline = "top";

  ctx.fillStyle = palette.hexCola;
  ctx.fillRect(0, ystart * 0, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColaContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexCola, labelIndent, ystart * 0 + textTop);

  ctx.fillStyle = palette.hexColb;
  ctx.fillRect(0, ystart * 1, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColbContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexColb, labelIndent, ystart * 1 + textTop);

  ctx.fillStyle = palette.hexColc;
  ctx.fillRect(0, ystart * 2, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColcContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexColc, labelIndent, ystart * 2 + textTop);

  ctx.fillStyle = palette.hexCold;
  ctx.fillRect(0, ystart * 3, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColdContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexCold, labelIndent, ystart * 3 + textTop);

  ctx.fillStyle = palette.hexCole;
  ctx.fillRect(0, ystart * 4, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColeContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexCole, labelIndent, ystart * 4 + textTop);

  let canvasBuffer = canvas.toBuffer();
  fs.writeFile(drawPaletteFilePath, canvasBuffer, (err) => {
    if (err) {
      return reject(err);
    }

    console.log("🌟 everything went well in creating the image! 💪");
  });
  let ajective = randomFromArray(ajectivesPos);
  const statusText = `${indefinite(ajective)} new palette for you to enjoy: #color #ColorPalette`;
  const imageDescription = `a block of five color swatches with Hex values of ${palette.hexCola}, ${palette.hexColb}, ${palette.hexColc}, ${palette.hexCold}, and ${palette.hexCole}.`;

  return sendImageToMastodon(drawPaletteFilePath, imageDescription, statusText)
    .then(() => {
      console.log(
        `🤞 Hopefully, we've sent a canvas with the following colors: ${palette.hexCola}, ${palette.hexColb}, ${palette.hexColc}, ${palette.hexCold}, and ${palette.hexCole} at ${new Date().toTimeString()}`
      );
      delete require.cache[require.resolve("./bits/ajectives-pos.js")];
      delete require.cache[require.resolve("./bits/random-from-array.js")];
      delete require.cache[require.resolve("./srcpg.js")];
    })
    .catch((error) => {
      console.error("error:", error);
    });
};

const replyBotScript = async (acct, id) => {
  let palette = require("./srcpg.js");
  const drawReplyPaletteFileName = "draw-reply-palette.png";
  const drawReplyPaletteFilePath = __dirname + "/palettes/" + drawReplyPaletteFileName;

  const canvasHeight = 500;
  const canvasWidth = 666,
    colHeight = canvasHeight / 5,
    ystart = canvasHeight / 5,
    labelIndent = canvasWidth / 2.9,
    textTop = ystart / 5.5;
  const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  const backgroundColor = "#FFFFFF";

  console.log("🖍 let's draw a palette and then label it!");

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.textDrawingMode = "glyph";
  ctx.textBaseline = "top";

  ctx.fillStyle = palette.hexCola;
  ctx.fillRect(0, ystart * 0, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColaContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexCola, labelIndent, ystart * 0 + textTop);

  ctx.fillStyle = palette.hexColb;
  ctx.fillRect(0, ystart * 1, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColbContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexColb, labelIndent, ystart * 1 + textTop);

  ctx.fillStyle = palette.hexColc;
  ctx.fillRect(0, ystart * 2, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColcContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexColc, labelIndent, ystart * 2 + textTop);

  ctx.fillStyle = palette.hexCold;
  ctx.fillRect(0, ystart * 3, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColdContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexCold, labelIndent, ystart * 3 + textTop);

  ctx.fillStyle = palette.hexCole;
  ctx.fillRect(0, ystart * 4, canvasWidth, colHeight);

  ctx.fillStyle = palette.hexColeContrast;
  ctx.font = "57px Trebuchet MS";
  ctx.fillText(palette.hexCole, labelIndent, ystart * 4 + textTop);

  let canvasBuffer = canvas.toBuffer();
  fs.writeFile(drawReplyPaletteFilePath, canvasBuffer, (err) => {
    if (err) {
      return reject(err);
    }

    console.log("🌟 everything went well in creating the image! 💪");
  });
  let ajective = randomFromArray(ajectivesPos);
  const statusText = `hey, @${acct}, here's ${indefinite(ajective)} new palette, just for you: #color #ColorPalette`;
  const imageDescription = `a block of five color swatches with Hex values of ${palette.hexCola}, ${palette.hexColb}, ${palette.hexColc}, ${palette.hexCold}, and ${palette.hexCole}.`;
  const replyId = id;

  return sendReplyImageToMastodon(
    drawReplyPaletteFilePath,
    imageDescription,
    statusText,
    replyId
  )
    .then(() => {
      console.log(
        `🤞 Hopefully, we've sent a canvas with the following colors: ${
          palette.hexCola
        }, ${palette.hexColb} ${palette.hexColc}, ${palette.hexCold}, and ${
          palette.hexCole
        } at ${new Date().toTimeString()}`
      );
      delete require.cache[require.resolve("./bits/ajectives-pos.js")];
      delete require.cache[require.resolve("./bits/random-from-array.js")];
      delete require.cache[require.resolve("./srcpg.js")];
    })
    .catch((error) => {
      console.error("error:", error);
    });
};

const listener = app.listen(process.env.PORT, () => {
  console.log("📻 listening in on port " + listener.address().port);
  console.log(`⏰ server time: ${new Date().toString()}`);
  console.log("💖🧡💛💚💙💜");
});
//the listening bits confounds me, this works so I'm leaving it as is, most of this bit below I got from the CodingTrain's Mastodon bot tutorial videos/github (https://github.com/CodingTrain/Mastodon-Bot)
const stream = masto.stream("streaming/user");
console.log("📡 listening for super cool comments!");
stream.on("message", (response) => {
  if (response.event === "notification" && response.data.type === "mention") {
    const id = response.data.status.id;
    const acct = response.data.account.acct;
    const content = response.data.status.content;
    fs.writeFileSync(
      `logs/messageData${new Date().getTime()}.json`,
      JSON.stringify(response.data.status, null, 2)
    );
    sleep(1000).then(() => {
      console.log(`"🎉 someone tagged us! 🎊"`);
    });
    sleep(1000).then(() => {
      replyBotScript(acct, id);
    });
    sleep(5000).then(() => {
      console.log("✨ ✨ ✨");
    });
  }
});

//schedule bits down here,
cron.schedule("*/30 * * * *", () => {
  console.log(`"🕰 at the tone the time will be: ${new Date().toTimeString()}...BEEEEEEEEP! 🔔"`);
});//this is purely to let me know that things are still running properly at a glance

cron.schedule("29 8 * * *", () => {
  console.log("🌄 time to make the morning donuts!");
  botScript(); //8:29am
});

cron.schedule("30 14 * * *", () => {
  console.log("🌞 time to make the afternoon donuts!");
  botScript(); //2:30pm
});

cron.schedule("31 20 * * *", () => {
  console.log("🌇 time to make the evening donuts!");
  botScript(); //8:31pm
});

//cron.schedule("30 2 * * *", () => {
//  console.log("🌕 time to make the late night donuts!");
//  botScript(); //2:30am});

//don't really know if I need these here, i've kinda spammed them everywhere, but better safe than sorry, i need to clear out the cache of variables otherwise the code just keeps reusing what it already made instead of generating new stuff each time it posts
delete require.cache[require.resolve("./bits/ajectives-pos.js")];
delete require.cache[require.resolve("./bits/random-from-array.js")];
