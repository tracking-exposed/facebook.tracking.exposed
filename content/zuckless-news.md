---
title: "Zuckless News"
date: 2019-01-30T15:09:22+01:00
draft: false
type: "app"
layout: "app"
---

<div class="container">
    <ol>
        <li>
            Select a language among the various available. They comes from the public post scraped from Facebook, processed via 
            <a href="https://dandelion.eu">dandelion.eu</a>
        </li>
        <li> Select one of the wikipedia 
            <a href="/fbtrexRSS">voices matched in the last 7 days</a>
        </li>
        <li>
            Copy-Paste the RSS feed and subscribe using one of the many RSS readers
        </li>
    </ol>
</div>

<div class="container">
    <div class="col-md-12" id="available">
    </div>
</div>

<div class="container center hidden">
    <span class="labelt">Language:</span>
    <span class="labelv" id="language"></span>
    <span class="labelt">Wikipedia voices:</span>
    <span class="labelv" id="counter"></span>
</div>

<div class="container center hidden">
    <div class="labelt" id="status">
        <input type="text" class="form-control" id="inputbar">
    </div>
</div>

### [fbTREX RSS feed](https://facebook.tracking.exposed/rss/) has rolled out ahead of the 2019 European elections to empower citizens to educate themselves and each other based on a collective feed of information on various subjects.

Facebook does not enable us to understand or control how our news feed content is selected, and has even been found to provide different users seeking the same information completely different lenses through which to perceive of the subject, as Eli Pariser [discovered](https://www.rollingstone.com/politics/politics-news/book-excerpt-the-filter-bubble-by-eli-pariser-71053/). The influence that Facebook’s algorithm exercises over our worldviews reinforces political polarisation and restricts users’ common access to a complete spectrum of knowledge.

To understand the complex, contemporary political debate, we need tools to help us pop our filter bubbles. fbTREX RSS feed allows us to analyse, experiment with, and educate ourselves about the information in each of our news feeds, in order to make more informed decisions based on a broader, collective perspective of facts and events.

fbTREX RSS feed is a disintermediated, machine-readable data feed. Queries retrieve posts from all contributors’ feeds collectively and present them transparently and chronologically, providing a logical, horizontal view of all of the information collected.

We hope that you will consider assisting in the development of this tool by [donating](individual-text.md) your own public news feed content to this collaborative portal of information.

fbTREX RSS feed is designed to foster the spirit of the GDPR, empowering us to have more control over the sources that inform us and enabling us to escape the filter bubbles Facebook has designated for us.

fbTREX is not a SOCMINT tool. RSS queries are restricted to concepts represented by Wikipedia entries. This makes it useful for research and exploration into a broad range of subjects, while preventing potential abuse of personal data, you can know more on how does it work via [fbTREX RSS details](https://facebook.tracking.exposed/fbtrexRSS).

#### What is RSS?

RSS is a format which delivers a disintermediated, chronologically-ordered feed for web content. It is often used by news sites and blogs because it enables readers to subscribe to receive updates about new content through RSS reader webapps or software.

For more information on the history and use of RSS versus social media, check out [this article](https://motherboard.vice.com/en_us/article/a3mm4z/the-rise-and-demise-of-rss).

There are various RSS readers for various platforms, but here are some of the options to get you started:

#### RSS Readers
##### Cross-platform
* [Feedly](https://feedly.com/): Webapp, iOS, Android. Proprietary. Requires registration, but not a valid email.\
* [Winds](https://getstream.io/winds/): Pre-compiled binaries for Windows, OSX and GNU/Linux. Open source. Requires registration, but not a valid email.

##### OSX
* [ViennaRSS](https://github.com/ViennaRSS/vienna-rss/releases/tag/v/3.5.3): Pre-compiled binaries, compatible with Mojave. Open source.

##### Android
* [Flym](https://play.google.com/store/apps/details?id=net.frju.flym&hl=en_US): FOSS alternative.

#### Other resources
* [Wikipedia's comparison of feed readers](https://en.wikipedia.org/wiki/Comparison_of_feed_aggregators)\
* [Readers available on github](https://github.com/topics/rss-reader)

