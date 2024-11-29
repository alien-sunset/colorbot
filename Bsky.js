require("dotenv").config();
const { AtpAgent, AtpSessionEvent, AtpSessionData, RichText } = require("@atproto/api");

const agent = new AtpAgent({
  service: "https://bsky.social",
  persistSession: AtpSessionEvent, AtpSessionData,
  // store the session-data for reuse
});

agent.login({
  identifier: process.env.BLUESKY_USERNAME,
  password: process.env.BLUESKY_PASSWORD,
});


async function postToBsky(canvasBuffer, imageDescription, text) {
  const img = await agent.uploadBlob(canvasBuffer, { encoding: 'image/png' });
  const rt = new RichText({ text: text });
  await rt.detectFacets(agent);
  console.log(`posting to Bsky!\n`);
  const skeet = {
    $type: 'app.bsky.feed.post',
    text: rt.text,
    facets: rt.facets,
    embed: {
      $type: 'app.bsky.embed.images',
      images: [
        { image: (img.data.blob),
          alt: (imageDescription),
          "aspectRatio": {
          "height": 500,
          "width": 666
          }
        }
      ]
    },
    createdAt: new Date().toISOString()
  };
  const response = await agent.post(skeet);
  console.log(response);
};

async function postReplyToBsky(canvasBuffer, imageDescription, text, postReplyRef) {
  const img = await agent.uploadBlob(canvasBuffer, { encoding: 'image/png' });
  const rt = new RichText({ text: text });
  await rt.detectFacets(agent);
  console.log(`posting to Bsky!\n`);
  const skeet = {
    $type: 'app.bsky.feed.post',
    text: rt.text,
    facets: rt.facets,
    embed: {
      $type: 'app.bsky.embed.images',
      images: [
        { image: (img.data.blob),
          alt: (imageDescription),
          "aspectRatio": {
          "height": 500,
          "width": 666
          }
        }
      ]
    },
    reply: postReplyRef,
    createdAt: new Date().toISOString()
  };
  const response = await agent.post(skeet);
  console.log(response);
};


async function getNotifications() {
  if (!agent) { throw new Error('agent not set up') };
  const notifs = await agent.app.bsky.notification.listNotifications({ limit: 50 });
  if (!notifs.success) {
    console.log("aw, poop")
    throw new Error('failed to get notifications');
  };
  const out = []
  for (const notif of notifs.data.notifications) {
    if (notif.isRead) { continue; }
    if (notif.reason == 'like') { continue; }
    if (notif.reason == 'follow') { continue; }
    if (notif.reason == 'repost') { continue; }
    if (notif.reason == 'quote') { continue; }
    if (notif.reason == 'starterpack-joined') { continue; }
    
    out.push(notif);
  }
  return out;
};

function getRootCdiAndUri(notif) {
  return {
    cid: notif?.record?.reply?.root?.cid || notif.cid,
    uri: notif?.record?.reply?.root?.uri || notif.uri,
  };
};


async function pollApi() {
  try { // Request data from the API endpoint
    const notifs = await getNotifications();
    if (notifs.length > 0) {
      await agent.app.bsky.notification.updateSeen({ seenAt: new Date().toISOString() });
    }
    for await (const notif of notifs) {
      const replyRef = {
        parent: {
          cid: notif.cid,
          uri: notif.uri
        },
        root: await getRootCdiAndUri(notif),
      };
      return bskyReplyBotScript(replyRef);
    }
  }
  catch (error) { console.log(`Error: ${error}`) };
};

module.exports = {
  postToBsky,
  postReplyToBsky,
  getNotifications,
  getRootCdiAndUri
}

