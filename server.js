// botScript and replyBotScript are a mashup of some code bits sent to me by @boodoo@mastodon.social (see the mastodon.js file for more notes on him) and @stefan@stefanbohacek.online, Stefan maintains a ton or really great Botmaking resources and information over at https://botwiki.org/author/stefan/ as well as a huge repo of all his bots and generators over on Glitch (https://glitch.com/~stefans-creative-bots) being able to chat with him and poke around though all his amazing bots was SUPER helpful.

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("palettes"));
const util = require("util");
const cron = require("node-cron");
const fs = require("graceful-fs");
const Canvas = require("canvas");
const { convert } = require("html-to-text");
const { AtpAgent, AtpSessionEvent, AtpSessionData, RichText } = require("@atproto/api");
const {
  postToBsky,
  postReplyToBsky,
  getNotifications,
  getRootCdiAndUri,
} = require("./Bsky.js");
const Mastodon = require("mastodon-api");
const {
  sendImageToMastodon,
  sendReplyImageToMastodon,
} = require("./mastodon.js");
const randomFromArray = require("./bits/random-from-array.js");
const indefinite = require("indefinite");
const ajectivesPos = require("./bits/ajectives-pos.js");


(function () {
  let myConsole = new console.Console(
    fs.createWriteStream(`./logs/output${new Date().getTime()}.txt`)
  );
  let log_stdout = process.stdout;
  console.log = function (str) {
    myConsole.log(str);
    log_stdout.write(util.format(str) + "\n");
  };
  console.error = console.log;
  console.warn = console.log;
  console.info = console.log;
})();  //sending longs to console AND recordning them in a txt file, because sometimes the computer crashes, or you have to close things down before being able to check through and make sure everythign is running smoothly.


const agent = new AtpAgent({
  service: "https://bsky.social",
  persistSession: AtpSessionEvent, AtpSessionData,
  // store the session-data for reuse
});

agent.login({
  identifier: process.env.BLUESKY_USERNAME,
  password: process.env.BLUESKY_PASSWORD,
});


const masto = new Mastodon({
  client_key: process.env.COLORBOT_DOTART__CLIENT_KEY,
  access_token: process.env.COLORBOT_DOTART_TOKEN,
  api_url: process.env.DOT_ART_API_URL,
});

const botScript = async () => {
  const palette = require("./srcpg.js");
  const drawPaletteFileName = "draw-palette.png";
  const drawPaletteFilePath = __dirname + "/palettes/" + drawPaletteFileName;

  const canvasHeight = 500;
  const canvasWidth = 666,
    rowHeight = canvasHeight / 5,
    labelcenter = canvasWidth / 2,
    toTextCenter = rowHeight / 2;
    toTopTextCenter = (rowHeight / 7) * 2 ;
    toBottomTextCenter = (rowHeight / 3) * 2;

  console.log(`\n🖍 let's draw a palette and then label it!`);

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.textDrawingMode = "glyph";
  ctx.textBaseline = "middle";

  ctx.fillStyle = palette.hexCola;
  ctx.fillRect(0, rowHeight * 0, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColaContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameCola.name}`, labelcenter, rowHeight * 0 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexCola}`, labelcenter, rowHeight * 0 + toBottomTextCenter);

  ctx.fillStyle = palette.hexColb;
  ctx.fillRect(0, rowHeight * 1, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColbContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameColb.name}`, labelcenter, rowHeight * 1 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexColb}`, labelcenter, rowHeight * 1 + toBottomTextCenter);

  ctx.fillStyle = palette.hexColc;
  ctx.fillRect(0, rowHeight * 2, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColcContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameColc.name}`, labelcenter, rowHeight * 2 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexColc}`, labelcenter, rowHeight * 2 + toBottomTextCenter);

  ctx.fillStyle = palette.hexCold;
  ctx.fillRect(0, rowHeight * 3, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColdContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameCold.name}`, labelcenter, rowHeight * 3 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexCold}`, labelcenter, rowHeight * 3 + toBottomTextCenter);

  ctx.fillStyle = palette.hexCole;
  ctx.fillRect(0, rowHeight * 4, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColeContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameCole.name}`, labelcenter, rowHeight * 4 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexCole}`, labelcenter, rowHeight * 4 + toBottomTextCenter);

  const canvasBuffer = canvas.toBuffer("image/png");
  fs.writeFileSync(drawPaletteFilePath, canvasBuffer, (err) => {
    if (err) { console.log(err) };
  });
  console.log(`🌟 everything went well in creating the image! 💪\n`);

  const ajective = randomFromArray(ajectivesPos);
  const statusText = `${indefinite(ajective)} new palette for you to enjoy: \n\n${palette.nameCola.name} (${palette.hexCola}),\n${palette.nameColb.name} (${palette.hexColb}), \n${palette.nameColc.name} (${palette.hexColc}), \n${palette.nameCold.name} (${palette.hexCold}), and \n${palette.nameCole.name} (${palette.hexCole}) \n\n#color #ColorPalette`;
  const imageDescription = `${palette.altText}.`;

  return (
    sendImageToMastodon(drawPaletteFilePath, imageDescription, statusText),
    postToBsky(canvasBuffer, imageDescription, statusText)
  )
    .then(() => {
     console.log(`\n${statusText}\n`);
     delete require.cache[require.resolve("./bits/ajectives-pos.js")];
     delete require.cache[require.resolve("./bits/random-from-array.js")];
     delete require.cache[require.resolve("./srcpg.js")];
    })
    .catch((err) => { console.error(`error: ${err}`) });
};

const mastoReplyBotScript = async (acct, id) => {
  const palette = require("./srcpg.js");
  const drawReplyPaletteFileName = "draw-reply-palette.png";
  const drawReplyPaletteFilePath = __dirname + "/palettes/" + drawReplyPaletteFileName;

  const canvasHeight = 500;
  const canvasWidth = 666,
    rowHeight = canvasHeight / 5,
    labelcenter = canvasWidth / 2,
    toTextCenter = rowHeight / 2;
    toTopTextCenter = (rowHeight / 7) * 2 ;
    toBottomTextCenter = (rowHeight / 3) * 2;

  console.log(`\n🖍 let's draw a palette and then label it!`);

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.textDrawingMode = "glyph";
  ctx.textBaseline = "middle";

  ctx.fillStyle = palette.hexCola;
  ctx.fillRect(0, rowHeight * 0, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColaContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameCola.name}`, labelcenter, rowHeight * 0 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexCola}`, labelcenter, rowHeight * 0 + toBottomTextCenter);

  ctx.fillStyle = palette.hexColb;
  ctx.fillRect(0, rowHeight * 1, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColbContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameColb.name}`, labelcenter, rowHeight * 1 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexColb}`, labelcenter, rowHeight * 1 + toBottomTextCenter);

  ctx.fillStyle = palette.hexColc;
  ctx.fillRect(0, rowHeight * 2, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColcContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameColc.name}`, labelcenter, rowHeight * 2 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexColc}`, labelcenter, rowHeight * 2 + toBottomTextCenter);

  ctx.fillStyle = palette.hexCold;
  ctx.fillRect(0, rowHeight * 3, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColdContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameCold.name}`, labelcenter, rowHeight * 3 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexCold}`, labelcenter, rowHeight * 3 + toBottomTextCenter);

  ctx.fillStyle = palette.hexCole;
  ctx.fillRect(0, rowHeight * 4, canvasWidth, rowHeight);

  ctx.fillStyle = palette.hexColeContrast;
  ctx.font = "35px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${palette.nameCole.name}`, labelcenter, rowHeight * 4 + toTopTextCenter);
  ctx.font = "45px Trebuchet MS";
  ctx.fillText(`${palette.hexCole}`, labelcenter, rowHeight * 4 + toBottomTextCenter);

  const canvasBuffer = canvas.toBuffer();
  fs.writeFileSync(drawReplyPaletteFilePath, canvasBuffer, (err) => {
    if (err) { console.log(err) };
  });
  console.log(`🌟 everything went well in creating the image! 💪\n`);

  const ajective = randomFromArray(ajectivesPos);
  const statusText = `hey, @${acct}, here's ${indefinite(ajective)} new palette, just for you:  \n\n${palette.nameCola.name} (${palette.hexCola}),\n${palette.nameColb.name} (${palette.hexColb}), \n${palette.nameColc.name} (${palette.hexColc}), \n${palette.nameCold.name} (${palette.hexCold}), and \n${palette.nameCole.name} (${palette.hexCole}) \n\n#color #ColorPalette`;
  const imageDescription = `${palette.altText}.`;
  const replyId = id;

  return sendReplyImageToMastodon(drawReplyPaletteFilePath, imageDescription, statusText, replyId)
    .then(() => {
      console.log(`${statusText} \n`);
      delete require.cache[require.resolve("./bits/ajectives-pos.js")];
      delete require.cache[require.resolve("./bits/random-from-array.js")];
      delete require.cache[require.resolve("./srcpg.js")];
    })
    .catch((err) => { console.error(`error: ${err}`) });
};

const bskyReplyBotScript = async (replyRef) => {
  const palette = require("./srcpg.js");
  const drawReplyPaletteFileName = "draw-reply-palette.png";
  const drawReplyPaletteFilePath =
    __dirname + "/palettes/" + drawReplyPaletteFileName;

    const canvasHeight = 500;
    const canvasWidth = 666,
      rowHeight = canvasHeight / 5,
      labelcenter = canvasWidth / 2,
      toTextCenter = rowHeight / 2;
      toTopTextCenter = (rowHeight / 7) * 2 ;
      toBottomTextCenter = (rowHeight / 3) * 2;
  
    console.log(`\n🖍 let's draw a palette and then label it!`);
  
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.textDrawingMode = "glyph";
    ctx.textBaseline = "middle";
  
    ctx.fillStyle = palette.hexCola;
    ctx.fillRect(0, rowHeight * 0, canvasWidth, rowHeight);
  
    ctx.fillStyle = palette.hexColaContrast;
    ctx.font = "35px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${palette.nameCola.name}`, labelcenter, rowHeight * 0 + toTopTextCenter);
    ctx.font = "45px Trebuchet MS";
    ctx.fillText(`${palette.hexCola}`, labelcenter, rowHeight * 0 + toBottomTextCenter);
  
    ctx.fillStyle = palette.hexColb;
    ctx.fillRect(0, rowHeight * 1, canvasWidth, rowHeight);
  
    ctx.fillStyle = palette.hexColbContrast;
    ctx.font = "35px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${palette.nameColb.name}`, labelcenter, rowHeight * 1 + toTopTextCenter);
    ctx.font = "45px Trebuchet MS";
    ctx.fillText(`${palette.hexColb}`, labelcenter, rowHeight * 1 + toBottomTextCenter);
  
    ctx.fillStyle = palette.hexColc;
    ctx.fillRect(0, rowHeight * 2, canvasWidth, rowHeight);
  
    ctx.fillStyle = palette.hexColcContrast;
    ctx.font = "35px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${palette.nameColc.name}`, labelcenter, rowHeight * 2 + toTopTextCenter);
    ctx.font = "45px Trebuchet MS";
    ctx.fillText(`${palette.hexColc}`, labelcenter, rowHeight * 2 + toBottomTextCenter);
  
    ctx.fillStyle = palette.hexCold;
    ctx.fillRect(0, rowHeight * 3, canvasWidth, rowHeight);
  
    ctx.fillStyle = palette.hexColdContrast;
    ctx.font = "35px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${palette.nameCold.name}`, labelcenter, rowHeight * 3 + toTopTextCenter);
    ctx.font = "45px Trebuchet MS";
    ctx.fillText(`${palette.hexCold}`, labelcenter, rowHeight * 3 + toBottomTextCenter);
  
    ctx.fillStyle = palette.hexCole;
    ctx.fillRect(0, rowHeight * 4, canvasWidth, rowHeight);
  
    ctx.fillStyle = palette.hexColeContrast;
    ctx.font = "35px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${palette.nameCole.name}`, labelcenter, rowHeight * 4 + toTopTextCenter);
    ctx.font = "45px Trebuchet MS";
    ctx.fillText(`${palette.hexCole}`, labelcenter, rowHeight * 4 + toBottomTextCenter);

  const canvasBuffer = canvas.toBuffer();
  fs.writeFileSync(drawReplyPaletteFilePath, canvasBuffer, (err) => {
    if (err) { console.log(err) };
  });
  console.log(`🌟 everything went well in creating the image! 💪\n`);

  const ajective = randomFromArray(ajectivesPos);
  const statusText = `heya!  here's ${indefinite(ajective)} new palette, just for you:  \n\n${palette.nameCola.name} (${palette.hexCola}),\n${palette.nameColb.name} (${palette.hexColb}), \n${palette.nameColc.name} (${palette.hexColc}), \n${palette.nameCold.name} (${palette.hexCold}), and \n${palette.nameCole.name} (${palette.hexCole}) \n\n#color #ColorPalette`;
  const imageDescription = `${palette.altText}.`;

  return postReplyToBsky(canvasBuffer, imageDescription, statusText, replyRef)
    .then(() => {
      console.log(`\n${statusText}\n`);
      delete require.cache[require.resolve("./bits/ajectives-pos.js")];
      delete require.cache[require.resolve("./bits/random-from-array.js")];
      delete require.cache[require.resolve("./srcpg.js")];
    })
    .catch((err) => { console.error(`error: ${err}`) });
};


console.log(`⏰ server time: ${new Date().toLocaleString()}`);
console.log(`💖🧡💛💚💙💜\n`);

const stream = masto.stream("streaming/user");//the stream bits confounds me, this works so I'm leaving it as is, most of this bit below I got from the CodingTrain's Mastodon bot tutorial videos/github (https://github.com/CodingTrain/Mastodon-Bot)
stream.on("error", (err) => console.log(err));
console.log("📡 listening for super cool comments!");
stream.on("message", (response) => {
  if (response.event === "notification" && response.data.type === "mention") {
    const id = response.data.status.id;
    const acct = response.data.account.acct;
    const content = response.data.status.content;
    fs.writeFileSync(
      `logs/mastomessageData${new Date().getTime()}.json`,
      JSON.stringify(response.data.status, null, 2)
    );
    const cOptions = { wordwrap: false };
    console.log(`\n🎉 someone tagged us! 🎊\n`);
    console.log(`${convert(content, cOptions)}\n`);
    return mastoReplyBotScript(acct, id)
      .then(() => console.log(`✨ ✨ ✨`))
      .catch((err) => console.error(`oopsies! ${err}`));
  }
});

async function pollApi() {
  try {    // Request data from the API endpoint
    const notifs = await getNotifications();
    if (notifs.length > 0) {
      await agent.app.bsky.notification.updateSeen({ seenAt: new Date().toISOString() });
    }
    for await (const notif of notifs) {
      const replyRef = {
        parent: {
          cid: notif.cid,
          uri: notif.uri,
        },
        root: await getRootCdiAndUri(notif),
      };
      const content = notif?.record?.text;
      const sender = notif?.author;
      fs.writeFileSync(
        `logs/bskymessageData${new Date().getTime()}.json`,
        JSON.stringify(notif, null, 2)
      );
      console.log(`\n🎉 someone tagged us! 🎊\n`);
      console.log(`${sender.handle} Said:`);
      console.log(content);
      console.log(`\n✨ ✨ ✨\n`);
      return bskyReplyBotScript(replyRef);
    }
  }
  catch (error) { console.log(`Error: ${error}`) };
};
cron.schedule("*/5 * * * *", () => {
  pollApi();
});


//schedule bits down here,
cron.schedule("*/30 * * * *", () => {
  console.log(
    `"🕰 at the tone the time will be: ${new Date().toLocaleTimeString()}...BEEEEEEEEP! 🔔"`
  );
}); //this is purely to let me know that things are still running properly at a glance

cron.schedule("29 8 * * *", () => {
  console.log(`\n🌄 time to make the morning donuts!\n`);
  botScript(); //8:29am
});

cron.schedule("30 14 * * *", () => {
  console.log(`\n🌞 time to make the afternoon donuts!\n`);
  botScript(); //2:30pm
});

cron.schedule("31 20 * * *", () => {
  console.log(`\n🌇 time to make the evening donuts!\n`);
  botScript(); //8:31pm
});

cron.schedule("30 2 * * *", () => {
  console.log(`\n🌕 time to make the late night donuts!\n`);
  botScript(); //2:30am
});
