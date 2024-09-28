# SRCPB
(semi) Random Color Palette Bot

Hello!

creating semi random, pricedurally generated color palettes!

a Mastodon bot that lives at https://botsin.space/@Color_Palette_Bot
and a generator web site that lives at https://alien-sunset.neocities.org/colorbot



***

I'm not really a coder, but when I was asking if the kind of bot that I wanted was possible and how I would go about learning how to do it, I was told that it would be too complicated and difficult for me and was offered no other advice.

So I went into a two week spite fueled hyper focus and was able to cobble together this lovely thing.  The code is probably terrible, but it does what I want.

How it works:

(srcpg.js)

harkening back to my TTRPG roots, it's all dice rolls, random tables, and math.

1) Randomly select a seed hue (a number between 0-360)

2) Randomly select from a table of 10 palette types/hue ranges. (triadic, analogous, complimentary, mono, and rainbow) – these were the best ones that I could sorta fit into a palette of five colors. Some day I may go in and add an “expansion” for bigger palettes with more colors. I dunno.

3) Do the math to the seed hue to come up with the base colors for the palette.

4) Randomly select from a table of over 20 saturation ranges/sets. 
This is basically just a bunch saturation values that I kinda thought would go well together – either all five being the same, or cycling, or alternating, etc.  I may go in at some point and add more, but the number I have right now seems to give some good variety,

5) Randomly select from a table of over 25 Lightness ranges/sets.
Pretty much the same idea as the saturation lists.

6) Combine everything together to a HSL value. Then convert that into a Hex value, because I prefer using Hex codes for most applications.

At this point I pretty much could have finished but I needed more fanciness.

7) Take the hex codes, translate THOSE into RGB, then check against black or white for contrast values in order to make the identifying overlay text easily visible on the palette image. - this is kinda convoluted considering I already had the HSL and probably could have done it from there, but I was feeling really lazy at this point and pretty much just stole the code outright from another color palette generator on the Perchance website where I was originally building this bot. (https://perchance.org/pixel-art-palettes – it's pretty cool too, check it out)

8) Now it's just presentation, on the generator web site I made two <div> tables to display the colors in both horizontal and vertical orientations with the hex code displayed over each color. A button to refresh the page to make a new palette, and two more buttons to convert the tables into images via Dom-to-Image so people can download the palettes if they want to save them. Spiffy.

you can see the completed generator website here: https://alien-sunset.neocities.org/colorbot
it's quite a lot of fun to play with.

But this was supposed to be a Mastodon bot, right?!

Yeah.

Via the Perchance web site the only way to export the outputs is via RSS, which doesn't really pick up images. Or tables really either.  I could come up with a janky method on the Make website of grabbing the RSS, taking the raw table code, which was all the RSS could give me. Sending that code to a third party app to turn it into an image. Use another module to grab that image and then finally send it to Mastodon. But the alt text gets lost along the way, and the third party image converting apps all have low limits on their free tiers, and have a tendency to just....fail on a regular basis.

So back to the coding grindstone I went:

(server.js + mastodon.js + etc)

these bits were mostly put together with massive amounts of help from @boodoo@mastodon.social / (https://github.com/BooDoo & https://cheapbotstootsweet.com/
)  and @stefan@stefanbohacek.online (https://github.com/stefanbohacek & https://botwiki.org/author/stefan/) who when I approached them for advice, both went out of their way to put together proof of concept projects on Glitch and sent me to several coding and example resources to look into. 

A lot of this is probably REALLY messy, and I'm not really even 50% sure how it all works. But it does. There is more I which I could do with a few bits, and may go back later to see if I can tweak and perfect it. But at the moment I'm really happy with how its all working.  Now I just need to figure out how to host it somewhere ...