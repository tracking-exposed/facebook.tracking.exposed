---
title: "API Documentation"
subtitle: "protect individuals ― expose phenomenon ― enable researchers"
date: 2019-12-02T15:01:21+03:00
draft: false
description: "API documentation for a post-API world where researchers have to become independent third-party and do not fucking compromise themselves with corporate agreements"
---

The API here documented are implemented in our [AGPL3 code](https://github.com/tracking.exposed/facebook).

### Shared concepts

The base URL to access our API is: `https://facebook.tracking.exposed/api/v2/`.

#### Paging

There are some variables you need to have to perform a successful HTTP GET.
The `$paging` variable defines the number of entries that are retrieved by the API, as well
as the number of entries to skip. Some examples of `$paging` are:

- `/3-0/` - Get 3 items (minimum result) and skip 0 items
- `/3-2/` - Get 3 items and skip the most recent 2
- `/5-3/` - Get 5 items and skipping the most recent 3

If you call `/2000-0` you will just get the 2000 most recent entries.
For example, if you call `/200-50` at the end of a "Summary" query

- `/200-50` - Get 200 items and skip the most recent 50

(_It is capped, you can't download all the data with just one query_).

---

# Personal API

`userToken` is an unique identifier for you Facebook user. It's a 40-characters long hexadecimal string. You can retrieve it by clicking on "Your Data" when you open Facebook on the browser where you installed the fbtrex extension. In the URL bar you will find the string. Just copy-paste it.

#### Special token for tests

To help develpment, when you are lacking of a personal token, you can test the API using `thisisaworkingtokenusablewhenperformtest` in your API requests. The data returned are consistent and they belong to some of our non-personal profile.

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>URL</th>
  </tr>
  <tr>
    <td>Personal Summary</td>
    <td><a href=#summary>link</a></td>
    <td>personal/$userToken/summary/$paging</td>
  </tr>
  <tr>
    <td>Personal Stats</td>
    <td><a href=#personalstats>link</a></td>
    <td>personal/$userToken/stats/$paging</td>
  </tr>
  <tr>
    <td>Personal CSV</td>
    <td><a href=#csv>link</a></td>
    <td>personal/$userToken/csv/$paging</td>
  </tr>
  <tr>
    <td>Data Exporter</td>
    <td><a href=#exporter>link</a></td>
    <td>personal/$userToken/exporter/$paging</td>
  </tr>
  <tr>
    <td>Delete your Data</td>
    <td><a href=#delete>link</a></td>
    <td>personal/$userToken/remove/$paging</td>
  </tr>
</table>

****

## <a name="summary"></a>Personal Summary

#### URL
`https://facebook.tracking.exposed/api/v2/personal/$YOUR_TOKEN/summary/$AMOUNT-$SKIP`
<br>
#### Description
Returns a summary of personal data of an user. `$YOUR_TOKEN` is your userToken, paging is defined by two integers, `$AMOUNT` is the number of entries you want to get, `$SKIP` is how many entries you want to skip.

#### Data Specifics

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Format</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>impressionTime</td>
    <td>Time in which the impression was collected/observed.</td>
    <td>string</td>
    <td>"2019-04-19T18:06:49.000Z"</td>
  </tr>
  <tr>
    <td>impressionOrder</td>
    <td>Order at which the impression appeared when scrolling the timeline.</td>
    <td>integer</td>
    <td>41</td>
  </tr>
  <tr>
    <td>semanticId</td>
    <td>Unique Id about the semantic content. Posts that share the same semanticId have the same text (and therefore the same semantic analysis, which is the list of topics), you can use the semanticId in the <a href="#semantic">semantic query API</a>.</td>
    <td>string</td>
    <td>"7cd2480750f1cdb23215da6da4186b30cbe2f424"</td>
  </tr>
  <tr>
    <td>opengraph</td>
    <td>Provides any available opengraph data for a single impression. Contains the type of link, the link itself, the name of the site, the title of the page and a text description.</td>
    <td>nested</td>
    <td>{ "fblinktype": "external", "link": "https://elpais.com/internacional/2019/04/18/estados_unidos/1555592324_696739.html", "isValid": true, "siteName": "elpais.com", "title": "El informe sobre la trama rusa revela los intentos de Trump por torpedear la investigación", "description": "Estoy jodido, este es el final de mi presidencia , dijo el mandatario tras el nombramiento de un fiscal especial, según el documento de Robert S. Mueller, hecho público este jueves" }</td>
  </tr>
  <tr>
    <td>user</td>
    <td>Pseudonym for the user that is seeing/collecting the impression.</td>
    <td>string</td>
    <td>"gelato-salmon-strawberry"</td>
  </tr>
  <tr>
    <td>timeline</td>
    <td>Pseudonym for the timeline in which the impression appeared.</td>
    <td>string</td>
    <td>"pasta-nutella-cabbage"</td>
  </tr>
  <tr>
    <td>publicationTime</td>
    <td>Time at which the post was first published.</td>
    <td>string</td>
    <td>"2019-04-18T19:21:01.000Z"</td>
  </tr>
  <tr>
    <td>postId</td>
    <td>Unique ID for the post (not the impression!)</td>
    <td>string</td>
    <td>"10125221421413523523"</td>
  </tr>
  <tr>
    <td>permaLink</td>
    <td>Permanent link to the public post.</td>
    <td>string</td>
    <td>"/elpais/posts/10156260262981570"</td>
  </tr>
  <tr>
    <td>fblinktype</td>
    <td>Type of media. Can be posts, photos or videos.</td>
    <td>string</td>
    <td>"posts"</td>
  </tr>
  <tr>
    <td>nature</td>
    <td>Specifies whether it is a "sponsored" or an "organic" post.</td>
    <td>string</td>
    <td>"organic"</td>
  </tr>
  <tr>
    <td>images</td>
    <td>Provides two values: `count` and `captions`. Count returns an integer with the total number of images contained in the impression. Captions contains a list of texts that describe the image (the 'alt' text that appears when you mouseover an image on Facebook.)</td>
    <td>nested</td>
    <td>{"count":1,"captions":["Image may contain: one or more people and text"]}</td>
  </tr>
  <tr>
    <td>displaySource</td>
    <td>The full string displayed above the post.</td>
    <td>string</td>
    <td>"El País added a new photo."</td>
  </tr>
  <tr>
    <td>source</td>
    <td>The name of the post publisher.</td>
    <td>string</td>
    <td>"El País"</td>
  </tr>
  <tr>
    <td>sourceLink</td>
    <td>Link to the profile of the impression publisher.</td>
    <td>string</td>
    <td>"https://www.facebook.com/elpais/"</td>
  </tr>
  <tr>
    <td>texts</td>
    <td>List of texts for the impression. Contains translations but not comments.</td>
    <td>nested</td>
    <td>[
      "\"Estoy jodido, este es el final de mi presidencia\". Es la frase que dijo Trump cuando Robert Mueller se puso a investigar su presunta conexión con Rusia. En sus conclusiones, el fiscal especial recoge esta cita y sus intentos por torpedear la investigación, pero no ve delito",
      "El informe sobre la trama rusa revela los intentos de Trump por torpedear la investigación",
      "Estoy jodido, este es el final de mi presidencia, dijo el mandatario tras el nombramiento de un fiscal especial, según el documento de Robert S. Mueller, hecho público este jueves"
      ]</td>
  </tr>
  <tr>
    <td>textsize</td>
    <td>Length of the text.</td>
    <td>integer</td>
    <td>547</td>
  </tr>
  <tr>
    <td>LIKE</td>
    <td>Number of like reactions.</td>
    <td>integer</td>
    <td>29</td>
  </tr>
  <tr>
    <td>HAHA</td>
    <td>Number of haha reactions.</td>
    <td>integer</td>
    <td>8</td>
  </tr>
  <tr>
    <td>ANGRY</td>
    <td>Number of angry reactions.</td>
    <td>integer</td>
    <td>18</td>
  </tr>
  <tr>
    <td>SAD</td>
    <td>Number of sad reactions.</td>
    <td>integer</td>
    <td>0</td>
  </tr>
  <tr>
    <td>LOVE</td>
    <td>Number of love reactions.</td>
    <td>integer</td>
    <td>0</td>
  </tr>
  <tr>
    <td>WOW</td>
    <td>Number of surprised reactions.</td>
    <td>integer</td>
  <td>0</td>
  </tr>
</table>

#### Request

`https://facebook.tracking.exposed/api/v2/personal/thisisaworkingtokenusablewhenperformtest/summary/1-0`

#### Response

```
[{
"impressionTime": "2019-04-19T18:06:49.000Z",
"impressionOrder": 41,
"semanticId": "7cd2480750f1cdb23215da6da4186b30cbe2f424",
"opengraph": {
  "fblinktype": "external",
  "link": "https://elpais.com/internacional/2019/04/18/estados_unidos/1555592324_696739.html",
  "isValid": true,
  "siteName": "elpais.com",
  "title": "El informe sobre la trama rusa revela los intentos de Trump por torpedear la investigación",
  "description": "Estoy jodido, este es el final de mi presidencia, dijo el mandatario tras el nombramiento de un fiscal especial, según el documento de Robert S. Mueller, hecho público este jueves"
},
"user": "taco-tuna-tomato",
"timeline": "pepper-flour-shitake",
"publicationTime": "2019-04-18T19:21:01.000Z",
"postId": "10125221421413523523",
"permaLink": "/elpais/posts/10156260262981570",
"fblinktype": "posts",
"nature": "organic",
"images": {
  "count": 1,
  "captions": []
},
"displaySource": "El País",
"source": "El País",
"sourceLink": "https://www.facebook.com/elpais/",
"texts": [
  "\"Estoy jodido, este es el final de mi presidencia\". Es la frase que dijo Trump cuando Robert Mueller se puso a investigar su presunta conexión con Rusia. En sus conclusiones, el fiscal especial recoge esta cita y sus intentos por torpedear la investigación, pero no ve delito",
  "El informe sobre la trama rusa revela los intentos de Trump por torpedear la investigación",
  "Estoy jodido, este es el final de mi presidencia , dijo el mandatario tras el nombramiento de un fiscal especial, según el documento de Robert S. Mueller, hecho público este jueves"
],
"textsize": 547,
"LIKE": 29,
"ANGRY": 18,
"HAHA": 8
},
{}]
```

****

## <a name="personalstats"></a>Personal Stats

#### URL
`https://facebook.tracking.exposed/api/v2/personal/$YOUR_TOKEN/stats/$AMOUNT-$SKIP`

#### Description
Returns a list of timelines for the user, including a count for the number of impression and all the data contained in summary.
`$YOUR_TOKEN` is your userToken, paging is defined by two integers, `$AMOUNT` is the number of entries you want to get, `$SKIP` is how many entries you want to skip.

#### Data Specifics

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Format</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>storedTimelines</td>
    <td>Number of total timelines for the user.</td>
    <td>integer</td>
    <td>1045</td>
  </tr>
  <tr>
    <td>served</td>
    <td>Specifies the values for paging with which the API was called.</td>
    <td>integer</td>
    <td>{ "amount": 1, "skip": 1 }</td>
  </tr>
  <tr>
    <td>content</td>
    <td>Contains a list of posts, with the startTime of the timeline, the country of the user, the impressionOrder, impressionTime, htmlId and timelineId, as well as a summary with the same information as the "summary" API.</td>
    <td></td>
    <td>        {
            "startTime": "2019-05-02T08:33:40.000Z",
            "geoip": "ES",
            "impressionOrder": 1,
            "impressionTime": "2019-05-02T08:33:40.000Z",
            "htmlId": "xxx",
            "timelineId": "yyy",
            "summary": []
        }, {...}
    </td>
    <tr>
      <td>timelines</td>
      <td>List of timeline IDs with the number of impressions collected per ID.</td>
      <td></td>
      <td>{ "timelinexxxxyyyy": 12, "timelineyyyyyyyzzzzzz" 65</td>
    </tr>
  </tr>
</table>

#### Request

`https://facebook.tracking.exposed/api/v2/personal/userToken/stats/1-0`

#### Response

```
{
  "storedTimelines": 31,
  "served": {
    "amount": 1,
    "skip": 1
  },
  "content": [
    {
      "startTime": "2019-05-02T08:33:40.000Z",
      "geoip": "UK",
      "impressionOrder": 1,
      "impressionTime": "2019-05-02T08:33:40.000Z",
      "htmlId": "83489349sdfsfas907395923502352332",
      "timelineId": "ac11229201721912aa129128192aa",
      "summary": []
    },
    {
      "startTime": "2019-05-02T08:33:40.000Z",
      "geoip": "UK",
      "impressionOrder": 2,
      "impressionTime": "2019-05-02T08:33:40.000Z",
      "htmlId": "83489349sdfsfas907395923502352332",
      "timelineId": "ac11229201721912aa129128192aa",
      "summary": []
    }
  ],
  "timelines": {
    "ac11229201721912aa129128192aa": 12
  }
}
```

****
## <a name="csv"></a>Personal CSV

#### URL
`https://facebook.tracking.exposed/api/v2/personal/$YOUR_TOKEN/csv/$AMOUNT-$SKIP`
<br>
#### Description
Returns a comma-separated-values file containing personal data of an user. `$YOUR_TOKEN` is your userToken. Paging is defined by two integers, `$AMOUNT` is the number of entries you want to get, `$SKIP` is how many entries you want to skip.

#### Data Specifics

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Format</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>nature</td>
    <td>Specifies whether it is a "sponsored" or an "organic" post.</td>
    <td>string</td>
    <td>"organic"</td>
  </tr>
  <tr>
    <td>publicationTime</td>
    <td>Time at which the post was first published.</td>
    <td>string</td>
    <td>"2019-04-18T17:21:30.000Z"</td>
  </tr>
  <tr>
    <td>postId</td>
    <td>Unique ID for the post (not the impression!)</td>
    <td>string</td>
    <td>"1247146142126177"</td>
  </tr>
  <tr>
    <td>permaLink</td>
    <td>Permanent link to the public post.</td>
    <td>string</td>
    <td>"/CatalunyaDiari/posts/1247146142126177"</td>
  </tr>
  <tr>
    <td>fblinktype</td>
    <td>Type of media. Can be posts, photos or videos.</td>
    <td>string</td>
    <td>"posts"</td>
  </tr>
  <tr>
    <td>source</td>
    <td>The name of the post publisher.</td>
    <td>string</td>
    <td>"Catalunya Diari"</td>
  </tr>
  <tr>
    <td>sourceLink</td>
    <td>Link to the profile of the impression publisher.</td>
    <td>string</td>
    <td>"https://www.facebook.com/CatalunyaDiari/"</td>
  </tr>
  <tr>
    <td>displaySource</td>
    <td>The full string displayed above the post.</td>
    <td>string</td>
    <td>"Catalunya Diari"</td>
  </tr>
  <tr>
    <td>textsize</td>
    <td>Length of the text.</td>
    <td>integer</td>
    <td>171</td>
  </tr>
  <tr>
    <td>texts</td>
    <td>List of texts for the impression. Contains translations but not comments.</td>
    <td>nested</td>
    <td>[
      "Hello world.", "Also this."
    ]</td>
  </tr>
  <tr>
    <td>impressionTime</td>
    <td>Time in which the impression was collected/observed.</td>
    <td>string</td>
    <td>"2019-04-21T15:05:15.000Z"</td>
  </tr>
  <tr>
    <td>impressionOrder</td>
    <td>Order at which the impression appeared when scrolling the timeline.</td>
    <td>integer</td>
    <td>14</td>
  </tr>
  <tr>
    <td>user</td>
    <td>Pseudonym for the user that is seeing/collecting the impression.</td>
    <td>string</td>
    <td>"goulash-nocilla-cucumber"</td>
  </tr>
  <tr>
    <td>timeline</td>
    <td>Pseudonym for the timeline in which the impression appeared.</td>
    <td>string</td>
    <td>"onion-couscous-strawberry"</td>
  </tr>
  <tr>
    <td>semanticId</td>
    <td>Unique Id for the impression collected, it's the same in other API feeds such as "semantic".</td>
    <td>string</td>
    <td>"82a416a63569d1b65ddfae1ff5b5812b13a247cf"</td>
  </tr>
</table>

#### Request

`https://facebook.tracking.exposed/api/v2/personal/thisisaworkingtokenusablewhenperformtest/csv/1-0`

#### Response, in CSV format:

```
"nature","publicationTime","postId","permaLink","fblinktype","source","sourceLink","displaySource","textsize","texts","impressionTime","impressionOrder","user","timeline","semanticId"
"organic","2019-04-18T17:21:30.000Z","1247146142126177","/CatalunyaDiari/posts/1247146142126177","posts","Catalunya Diari","https://www.facebook.com/CatalunyaDiari/","Catalunya Diari","171"," ‖▩‖ ","2019-04-21T15:05:15.000Z","14","goulash-nocilla-cucumber","onion-couscous-strawberry","82a416a63569d1b65ddfae1ff5b5812b13a247cf"
```

****

## <a name="enrich"></a>Your Enriched data

#### URL
`https://facebook.tracking.exposed/api/v2/personal/$YOUR_TOKEN/enrich/$PAGING`
<br>

Returns the metadata, stripped of few fields, enriched by semantic analysis, if available.

#### Data Specifics

TBD

#### Request

`https://facebook.tracking.exposed/api/v2/personal/thisisaworkingtokenusablewhenperformtest/enrich/`

#### Response

It is the content fetched why reality-check when load a timeline.

****

## <a name="exporter"></a>Export your Data

#### URL
`https://facebook.tracking.exposed/api/v2/personal/$YOUR_TOKEN/exporter/$PAGING`
<br>
#### Description
Returns all the data you own on our platform. `$YOUR_TOKEN` is your userToken.

#### Data Specifics

TBD

#### Request
    `https://facebook.tracking.exposed/api/v2/personal/thisisaworkingtokenusablewhenperformtest/exporter/`

#### Response

TBD

****

## <a name="delete"></a>Delete your Data

#### URL
`https://facebook.tracking.exposed/api/v2/personal/$YOUR_TOKEN/remove/$PAGING`
<br>
#### Description
Removes the data you own on our platform. `$YOUR_TOKEN` is your userToken. The output will confirm that your data has been deleted.

#### Data Specifics

TBD

#### Request

`https://facebook.tracking.exposed/api/v2/personal/thisisaworkingtokenusablewhenperformtest/remove/5`

#### Response

`{"timelines":5,"impressions":63,"htmls":35,"summaries":35}`

****
## <a name="daily"></a>Daily aggregated Statistics

#### URL
`https://facebook.tracking.exposed/api/v2/personal/$YOUR_TOKEN/daily/$PAGING`
<br>
#### Description
Aggregated daily statistics on individual usage. It is used by [Reality Check](/reality-check/) at the first visualization.

#### Data Specifics

#### Request

`https://facebook.tracking.exposed/api/v2/personal/thisisaworkingtokenusablewhenperformtest/daily/0-3`

#### Response

    {
      'dayamount': 'by default 3, is the amount of day looked at',
      'skipped': 'by default 0, number of day skipped before pick the amount requested',
      'stats': 'actual json data with the few info used to paint pie charts',
      'pseudo': 'supporter pseudonym',

    }

# Node API

These APIs are not personal, they do not require $userToken and they can be queried by anyone.
These API should not contain any information which might help an observer to spot who is the supporter using fbtrex.

_TODO: complete this list_, give a look to [the implementation](https://github.com/tracking-exposed/facebook/blob/master/lib/contentAPI.js).

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>URL</th>
  </tr>
  <tr>
    <td>General Statistics</td>
    <td><a href=#counter>link</a></td>
    <td>statistics/counter</td>
  </tr>
</table>

This API is meant for public statistics. They are aggregated and/or anonymized.

## <a name="counter"></a>General Statistics

#### URL

`https://facebook.tracking.exposed/api/v2/statistics/counter`

#### Description
General statistics on facebook.tracking.exposed. Contains global and last week's information. Please note that the fields that terminate in *_lw* are for *last week*.

#### Data Specifics

This API take as input all the _database collections_, and simply count the amount of objects contained.

for example: _impressions_ produced two fields:

  * impressions: it is the count of objects in the whole collection. all the impressions collected in the system
  * impressions _lw_: stands for Last Week, it is the it is the count of the impression recorded in the last 7 days.

#### Request

`https://facebook.tracking.exposed/api/v2/statistics/counter`

#### Response

```
{
  "content":
    {
      "impressions":15614360,
      "impressions_lw":162084,
      "aggregated":2673,
      "aggregated_lw":140,
      "labels":87946,
      "labels_lw":87946,
      "semantics":625307,
      "semantics_lw":625307,
      "anomalies":0,
      "anomalies_lw":0,
      "summary":1741653,
      "summary_lw":89911,
      "errors":52708,
      "errors_lw":52708,
      "metadata":1747629,
      "metadata_lw":89938,
      "htmls":9767659,
      "htmls_lw":110072,
      "accesses":215408,
      "accesses_lw":974,
      "timelines":1207216,
      "timelines_lw":12826,
      "supporters":3486,
      "supporters_lw":13
    },
  "computedt":"2019-04-23T13:53:34.254Z",
  "next":"2019-04-23T13:55:34.254Z",
  "cacheTimeSeconds":120
}
```
## <a name="semantic"></a>Semantic Query APIs

Initially specified here: https://github.com/tracking-exposed/facebook/issues/128 then extended with this: https://github.com/tracking-exposed/facebook/commit/05502bb7817860495c08f5876c184d55da8c9785
