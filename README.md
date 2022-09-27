# Api Bookmark Extension

Is a Chromium based extension for syncronizing bookmarks by using a remote json api as the source. Example could be a gist with the following contents

```json
[
  {
    "title": "YouTube",
    "url": "https://youtube.com"
  },
  {
    "title": "Facebook",
    "url": "https://facebook.com"
  }
]
```

hosted at `https://gist.githubusercontent.com/<USER>/<HASH>/raw/<FILENAME>.json` that the extension can sync with.

### Install

As this extension is not yet available on the Chrome Web Store it must be installed with Chromium/Chrome in development mode and by loading the extension as an unpacked extension

1. Clone this repository
2. Go to [chrome://extensions/](chrome://extensions/)
3. Enable "Developer Mode"
4. Click "Load unpacked" and choose the location of the repository
5. Enjoy

### Todo

- [ ] Syncing of bookmark folders
- [ ] Syncing automatically by polling the source at interval (optional in the gui)
- [ ] Allow/increase the number of allowed hosts
- [ ] Parse sites to adhere to allowed hosts
- [ ] Publish extension on the Chrome Web Store
