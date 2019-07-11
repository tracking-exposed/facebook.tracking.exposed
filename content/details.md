---
title: Details
draft: false
---

# Ethos

This project consists of  free software technology, designed to address many issues in the domain of algorithm accountability and social media impact.
     
**We can not try to confront Facebook in a closed model. We can not be centralized, otherwise we are just a different Facebook.**
     
Because fbTREX's assets are unique, rather than offering a product with finite limitations, fbTREX aims to enable anyone aligned with our mission to reuse the data we have gathered through collective observation. 

We don't want to sell the access to our data, we want to exist in the public interest. fbTREX should be seen as an infrastructure to facilitate the analysis of Facebook data by the target user groups, rather than a specific product based on top of scraped data. 

Diversity ensures validity in testing. Diversity of users means a more varying observation of social media. Algorithms are affecting all kinds of people, from widely different locations, with different languages, cultures, and politics. It's important to understand how algorithms affect these very different groups of people, who make up the global community of social network users. 

We want to develop a reproducible method to measure the diversity of the debate observed and value our growing with such a metric; this is more important for us than the raw number of users.

# Components

The fundamental component is a tool which makes a copy of your timeline and later on compares it with people you know. This process of copying and comparing is the primary method needed to figure out how individual social media experiences show us different realities. 

Browser extension - makes a copy of your data and submits it to the system through a server. We have a feasibility study for mobile in progress.

The browser extension performs a copy of the HTML section and our technology in the backend extracts metadata out.
     
within every HTML post we have (6 million in total) is all the information that has been selected for you by Facebook.. This is the best evidence for us and through this block of HTML text, metadata are extracted by our parsers.

The parsers are small self-contained programs which analyze the data provided by the users and extract metadata from them. The metadata are the assets on top of which we can build our analysis and, the more parsers we have, the more metadata we can derive from the users' contribution.


# Similar Projects

* DataSelfie (article, website) has been discontinued by the author, but is a good example of what  an information diet is. The issues Hang faced were in maintenance and costs for metadata analysis, we don't have the same limitation, but we have a far poorer UX design.
* ProPublica Political Ad Collector: has a similar approach in data collection of fbTREX, but focuses on political advertising.
* WhoTargetsMe developed by political researchers in UX, has been used to raise attention on the grey area of political advertising and electoral campaign money. It is used to produce results for the electoral authority.
* OpenHumans is one of our potential partners, they want to collect data to open up to researchers upon an ethical agreement, fbTREX might be one of their sensor in regards to Facebook.

# Future Developments

Each one of these points requires a separated description, but in summary:

(1) Visualizing the Information Diet: As a first step, fbTREX's browser plugin will provide users with the ability to visualize the selection of what is being presented to them. This function will be improved over the grant period to evolve from simple analysis towards mining for more complex, semantic information. A key feature of this tool is that it allows users to obtain data on their Information Diet and to experiment with the parameters in order to better understand how Facebook's algorithm works.
(1.1) Let users customize their visualisations. A visualization implies values, priorities and perspectives. We should let users experiment and share their way.
(1.2) Let users customize their algorithm. This is the most complex functionality, but it represents one of our end goals.
(2) Comparing the Information Diet: fbTREX will provide users with tools for comparing their timelines to that of others, based on mutual agreement. The goal is to involve and compare a diverse group of users across the globe.
(2.1) Advocate for this UX adoption, observe and verify if it can be used to address misinformation and/or missing other people's viewpoints. 
(3) Enabling third-party researchers: The data mined by fbTREX will be anonymized and provided to selected third-party researchers, either individuals or collectives such as OpenHumans. They will be enabled to contextualize the findings, combine it with other data and complement it with social science research results. In order to protect user data, it is crucial for fbTREX to build trusted relationships and networks with researchers.
(3.1) Develop a framework for ethical data-reuse, use this process to promote literacy on algorithm transparency and accountability. Display the potential of a dataset collected in the public interest, which allows people to understand phenomena but protects individuals.


# Achievements & References
### 2018
   
* The first academic publication of ours has been acknowledged as Best Article in Brasilian Social Network analysis.
* TacticalTech published a report written by Claudio Agosti and Fabio Chiusi, on Italian political election and digital propaganda. fbTREX data, released in this repository, have been used in a portion of the report.
* WebFoundation used fbTREX as a measurement tool to analyze how the algorithm shapes the perception of political events. We ran the test in Argentina, and produced a report: The Invisible Curation Of Content.
* European Research Council funded ALEX (ALgorithm EXposed) with 150.000euros.
* DataTransparencyLab select fbTREX among the three winners of their yearly price

### 2017
* We received a small grant from LUSH digital fund, 11.000euros.
* Anonymization of a social graph is hard, The fbTREX dataset has been used by a researcher, Silvia Puglisi, to produce a research paper on linkability of anonymized profiles. This also provided a privacy assessment on how to define our open data policy.

