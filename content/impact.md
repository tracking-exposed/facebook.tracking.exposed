---
title: Statistics & Bar charts
subtitle: adoption trends, system performances, and few lines on open data
type: c3app
date: 2019-08-01T00:00:00
description: Statistics build on what we are collecting; Aggregated information to keep in check our system and our relevance
draft: false
---

Statistics and OpenData enable network effects, data reuse, and collaborative revision of our project. But they are tricky and can't be released carelessly: 

* [Data can't be anonymized](https://www.theguardian.com/technology/2019/jul/23/anonymised-data-never-be-anonymous-enough-study-finds) easily, we aggregate them and we use only non-personal metadata to develop the aggregation.
* We don't want to help in any way [social media intelligence](https://responsibledata.io/social-media-intelligence-the-wayward-child-of-open-source-intelligence/).
* Is in our DNA [enable researchers](/data-activism), we develop an ethical assessment on data reuse (TODO link)
* The public stats below display how the system is performing how the people use it (no content-related analysis are here).

_impressions is what our browser extension might collect. Public are the only one we consider, it is a decision take in the browser, based on the visibility configured by the content author. Posts only for friends or with Custom audience are considered private_
<div id="impression-graph" class="c3graph"></div>
<!-- the graphs are appended in the 'div'. the ID #impression-graph is referenced in hugo-theme-trex/layouts/c3app/single.html -->

_timelines are the number of newsfeed observed by the browser extension. skipped are all the pages except the newsfeed, which are excluded from being collected._
<div id="timelines-graph" class="c3graph"></div>

_below a graph on how our parsers are performing: how many HTMLs have been parsed successfully or not_
<div id="processing-graph" class="c3graph"></div>
