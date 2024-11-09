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
const Mastodon = require("mastodon-api");
const {
  sendImageToMastodon,
  sendReplyImageToMastodon
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
  console.log = function (str) {
    myConsole.log(str);
    log_stdout.write(util.format(str) + "\n");
  };
  console.error = console.log;
  console.warn = console.log;
  console.info = console.log;
  })();


const masto = new Mastodon({
  client_key: process.env.TEST_CLIENT_KEY,
  access_token: process.env.MASTODON_TEST_TOKEN,
  api_url: process.env.BOTSINSPACE_API_URL
});

const botScript = async () => {
  const palette = require("./srcpg.js");
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

  console.log(`\n🖍 let's draw a palette and then label it!`);

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

  const canvasBuffer = canvas.toBuffer();
  fs.writeFileSync(drawPaletteFilePath, canvasBuffer, (err) => {
    if (err) {console.log(err);}
  });
  console.log(`🌟 everything went well in creating the image! 💪\n`);
     
  const ajective = randomFromArray(ajectivesPos);
  const statusText = `${indefinite(ajective)} new palette for you to enjoy: \n\n${palette.nameCola.name} (${palette.hexCola}),\n${palette.nameColb.name} (${palette.hexColb}), \n${palette.nameColc.name} (${palette.hexColc}), \n${palette.nameCold.name} (${palette.hexCold}), and \n${palette.nameCole.name} (${palette.hexCole}) \n\n#color #ColorPalette`;
  const imageDescription = `${palette.altText}.`;
  

  return sendImageToMastodon(
    drawPaletteFilePath,
    imageDescription,
    statusText
  )

  .then(() => 
    {console.log(`\n${statusText}\n`);
    delete require.cache[require.resolve("./bits/ajectives-pos.js")];
    delete require.cache[require.resolve("./bits/random-from-array.js")];
    delete require.cache[require.resolve("./srcpg.js")];
    })
  .catch((err) => {console.error(`error: ${err}`)});
};
   
const replyBotScript = async (acct, id) => {
  const palette = require("./srcpg.js");
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

  console.log(`\n🖍 let's draw a palette and then label it!`);

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

  const canvasBuffer = canvas.toBuffer();
  fs.writeFileSync(drawReplyPaletteFilePath, canvasBuffer, (err) => {
    if (err) {console.log(err);}
  });
  console.log(`🌟 everything went well in creating the image! 💪\n`);
  
  const ajective = randomFromArray(ajectivesPos);
  const statusText = `hey, @${acct}, here's ${indefinite(ajective)} new palette, just for you:  \n\n${palette.nameCola.name} (${palette.hexCola}),\n${palette.nameColb.name} (${palette.hexColb}), \n${palette.nameColc.name} (${palette.hexColc}), \n${palette.nameCold.name} (${palette.hexCold}), and \n${palette.nameCole.name} (${palette.hexCole}) \n\n#color #ColorPalette`;
  const imageDescription = `${palette.altText}.`;
  const replyId = id;

  return sendReplyImageToMastodon(
    drawReplyPaletteFilePath,
    imageDescription,
    statusText,
    replyId
  )

  .then(() => 
    {console.log(`${statusText} \n`)
    delete require.cache[require.resolve("./bits/ajectives-pos.js")]
    delete require.cache[require.resolve("./bits/random-from-array.js")]
    delete require.cache[require.resolve("./srcpg.js")]
    })
  .catch((err) => {console.error(`error: ${err}`)});
};

const listener = app.listen(8080, () => {
  console.log("📻 listening in on port " + listener.address().port);
  console.log(`⏰ server time: ${new Date().toLocaleString()}`);
  console.log(`💖🧡💛💚💙💜\n`);
});
//the listening bits confounds me, this works so I'm leaving it as is, most of this bit below I got from the CodingTrain's Mastodon bot tutorial videos/github (https://github.com/CodingTrain/Mastodon-Bot)
const stream = masto.stream("streaming/user");
console.log("📡 listening for super cool comments!");
stream.on('error', err => console.log(err));
stream.on("message", (response) => {
  if (response.event === "notification" && response.data.type === "mention") {
    const id = response.data.status.id;
    const acct = response.data.account.acct;
    const content = response.data.status.content;
    fs.writeFileSync(
      `logs/messageData${new Date().getTime()}.json`,
      JSON.stringify(response.data.status, null, 2)
    )
    const cOptions = { wordwrap: false }
    console.log(`\n🎉 someone tagged us! 🎊\n`)
    console.log(`${convert(content, cOptions)}\n`)
    
    return replyBotScript(acct, id)
    
    .then(() => (
      console.log(`✨ ✨ ✨`)
    ))
    .catch((err) =>
    console.error(`oopsies! ${err}`));
  };
});

app.use(express.static("paletts"));
app.get('/', (req, res) => {
  botScript();
  const botLink = `<a href="https://botsin.space/@Color_Palette_Bot">@Color_Palette_Bot@botsin.space</a><img src="draw-palette.png" alt="" />`;
  res.status(200).send(botLink);
});

//schedule bits down here,
cron.schedule("*/30 * * * *", () => {
  console.log(`"🕰 at the tone the time will be: ${new Date().toLocaleTimeString()}...BEEEEEEEEP! 🔔"`);
});//this is purely to let me know that things are still running properly at a glance

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

//cron.schedule("30 2 * * *", () => {
//  console.log("🌕 time to make the late night donuts!");
//  botScript(); //2:30am});

