---
title: "Know more about the browser extension"
date: 2019-01-30T15:32:40+01:00
draft: false
---

Our tool works for Firefox and Chrome, it is necessary to collect data and it should be spread as much as possible. It exists since two years and [these are our success](https://facebook.tracking.exposed/initiatives).

# Installation Guide
How to install facebook.tracking.exposed web browser extension.



## **Simple Setup**
Our facebook.tracking.exposed extension has been tested on both Mozilla and Google browsers. Once you know which browser you are using, you can follow the steps below.

##### Mozilla Firefox

To install the extension on Firefox, [open this link](https://addons.mozilla.org/en-US/firefox/addon/facebook-tracking-exposed/).

First, click on "Add to Firefox", then confirm by clicking "Add".

![a](https://user-images.githubusercontent.com/40333748/52488392-0343c900-2bc0-11e9-89d0-8aba8d67bae9.png)![a](https://user-images.githubusercontent.com/40333748/52488451-1f476a80-2bc0-11e9-9342-8393ccd67c9c.png)


##### Chromium / Google Chrome
To install on Chromium or Google Chrome, [open this link](https://chrome.google.com/webstore/detail/trackingexposed-investiga/fnknflppefckhjhecbfigfhlcbmcnmmi) and click **"Add"**, then **"Add extension"**.

![screenshot](https://user-images.githubusercontent.com/40333748/52487712-8106d500-2bbe-11e9-8970-3687f18b469c.png)![screenshot](https://user-images.githubusercontent.com/40333748/52488066-5a956980-2bbf-11e9-8eef-1022824adf79.png)


Congratulations, *facebook.tracking.exposed* is now installed and will start working as soon as you open your Facebook feed!

If, for whatever reason (for example in the unlikely case the extension is taken down), the steps above do not work, keep reading below.



## **Advanced Setup**

This sections describes how to install the extension from our build as zip file.
As a first step you should download the [last build here](https://github.com/tracking-exposed/binaries/tree/master/fbTREX/last).


##### Set up your browser (for Chromium / Google Chrome)

If you use Chrome or Chromium, you should unzip the folder first.
To install the extension insert [chrome://extensions](chrome://extensions) in your URL bar as below. Then, enable **Developer mode**. Click on **Load unpacked extension** and select the unzipped directory contained in this repo.

![screenshot](https://user-images.githubusercontent.com/40333748/52487754-9c71e000-2bbe-11e9-813e-7ad649388b6a.png)![screenshot](https://user-images.githubusercontent.com/40333748/52487756-9d0a7680-2bbe-11e9-8041-0603390b96e3.png)![screenshot](https://user-images.githubusercontent.com/40333748/52487757-9da30d00-2bbe-11e9-90dd-68bbbb5ac9b6.png)


##### Set up your browser (for Firefox)
As standard practice, Firefox doesn't allow unpacked extension to be loaded. However, it does allow developers to test unpacked extensions **temporarily**.
To accomplish this just enter  [about:debugging](about:debugging) in your URL bar. Then click on **Load Temporary Add-on** and select the zip file in your Downloads folder.


![screenshot](https://user-images.githubusercontent.com/40333748/52487759-9e3ba380-2bbe-11e9-8c96-c87dc35871ba.png)![screenshot](https://user-images.githubusercontent.com/40333748/52487760-9e3ba380-2bbe-11e9-85dc-5ad7a1303574.png)



## **Forking the Project** (for developers)

The third part of the guide describes how to fork and build this extension using git.

This project requires Node 5+.
We suggest installing nvm for easy version maintaining. Alternatively, you can install Nodejs from a package, but make sure it's the right version and install npm as well for package management.
Please note that this was tested only for ubuntu systems.

### Install nvm
 On a clean GNU/Linux system, start by installing nvm. It could be useful to update and upgrade your packages too first.

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
or follow the instructions [here](https://github.com/creationix/nvm).

### Install node and npm
Check the last version of node and then install it through
```
nvm install x.xx.x
nvm install-latest-npm
```

### Clone with git and move to the directory
```
git clone https://github.com/tracking-exposed/web-extension.git
cd web-extension/
```

### Build the files and build the extension

The build system uses a simple `package.json` file to describe the tasks, you can check it out to find out the packages that we rely on to make this extension available or for troubleshooting.

To get started run:

```
npm install
npm test
npm start
```

The second line (`npm test`) is optional, but testing is cool and you should do
it anyway. It's also a nice way to check if the installation succeeded.
If npm test fails, don't worry and try npm start nonetheless, it might be due to facebook frequent html structure changes or nodejs extensions incompatibility, please report it back to us if this is the case.  


`npm start` will build the application using `webpack` and watch for changes.

Keep `npm start` running in the background to take advantage of the autoreload.

### It works!
Now you can use the extensions as described in the Advanced section above.


### TL;DR
How to replicate the build?

`$ npm i ; npm run build:dist ; ls -l dist/extension.zip`
