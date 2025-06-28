# Hanzi Viewer

This project displays Chinese characters and their stroke order.

## Setup

The repository contains a compressed archive of stroke data under `hanzi-data/hanzi-data.zip`.
Before using the viewer for characters beyond the few sample files, extract this archive:

```bash
node extract-hanzi-data.js
```

This script unzips the JSON stroke files and renames them using the hexadecimal
code point (e.g. `4f60.json`) that `hanzi.js` expects. The extraction only needs
to be done once.
