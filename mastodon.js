//almost all of this code is taken directly from a glitch repo that @boodoo@mastodon.social aka Joel McCoy  (https://github.com/BooDoo) the maintainer of Cheap Bots Toot Sweet (https://cheapbotstootsweet.com/) sent me when I asked for advice in turning my little generator from Perchance into a proper bot. Cheap Bots Toot Sweet uses Tracery for it's main language, but I couldn't figure out what I wanted to do within the Tracery framework, but knew that CBTS could somehow convert SVG images into proper images for reposting (like Soft Landscapes @softlandscapes@botsin.space  / https://cheapbotstootsweet.com/source/?url=https://botsin.space/@softlandscapes) and I knew I could make my palettes output as SVG. I ended up abandoning the SVG idea, but the stuff he sent was SUPER helpful nonetheless.

require("dotenv").config();
const fs = require("fs");
const Mastodon = require("mastodon-api");

const token = process.env.COLORBOT_DOTART_TOKEN,
  api = process.env.DOT_ART_API_URL,
  key = process.env.COLORBOT_DOTART__CLIENT_KEY;

if (!token || !api) {
  console.error("Missing environment variables from Mastodon.");
  process.exit(1);
}

const mastodonClient = new Mastodon({
  access_token: token,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  api_url: api,
});

function sendCanvasToMastodon(canvasBuffer, imageDescription, text) {
  return uploadCanvas(canvasBuffer, imageDescription).then((imageId) => {
    createStatus(imageId, text);
  });
}

function sendImageToMastodon(imageFilePath, imageDescription, text) {
  return uploadImage(imageFilePath, imageDescription).then((imageId) => {
    createStatus(imageId, text);
  });
}

function sendReplyImageToMastodon(imageFilePath, imageDescription, text, replyId) {
  return uploadImage(imageFilePath, imageDescription).then((imageId) => {
    createReplyStatus(imageId, text, replyId);
  });
}

function createStatus(mediaIdStr, status) {
  return new Promise((resolve, reject) => {
    const params = { status, media_ids: [mediaIdStr] };
    return mastodonClient.post("statuses", params, (err, data, response) => {
      if (err) {
        console.log("oops");
        console.log(err);
      }
      console.log(`posted! to ${data.url} at ${new Date().toLocaleTimeString()} \n`);
      return resolve();
    });
  });
}

function createReplyStatus(mediaIdStr, status, replyToId) {
  return new Promise((resolve, reject) => {
    const params = { status, media_ids: [mediaIdStr], in_reply_to_id: replyToId };
    return mastodonClient.post("statuses", params, (err, data, response) => {
      if (err) {
        console.log(`oops: ${err}`);
      }
      console.log(`posted! to ${data.url} at ${new Date().toLocaleTimeString()} \n`);
      return resolve();
    });
  });
}

function uploadImage(filePath, description) {
  return new Promise((resolve, reject) => {
    const params = { file: fs.createReadStream(filePath), description };
    return mastodonClient.post("media", params, (err, data, response) => {
      if (err) {
        console.log("aw, crap!");
        console.log(err);
      }

      if (!data.id) {
        console.log("No media ID to use for toot");
      }

      console.log(`Image data ID: ${data.id}\n`);

      return resolve(data.id);
    });
  });
}

function uploadCanvas(canvasBuffer, description) {
  return new Promise((resolve, reject) => {
    // const canvasStream = Readable.from(canvasBuffer);
    console.dir(`received a canvasBuffer of ${canvasBuffer.length}`);
    const params = { file: canvasBuffer, description };
    return mastodonClient.post("media", params, (err, data, response) => {
      if (err) {
        return reject(err);
      }

      if (!data.id) {
        return reject("No media ID to use for toot");
      }

      console.log(data.id);

      return resolve(data.id);
    });
  });
}

module.exports = {
  sendImageToMastodon,
  sendReplyImageToMastodon,
};
