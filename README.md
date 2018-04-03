This application was a part of an online course at [udemy](https://www.udemy.com/the-complete-web-developer-in-2018/).

Given a URL of image, it shows faces on the image. This is done by a call to [Clarifai API](https://www.clarifai.com/). The app handles registering and signing in (passwords are saved as hashes), it keeps track of entry count for each user.

This repository contains front-end, back-end is located at [smart-brain-api](https://github.com/petermacko90/smart-brain-api).

The changes/additions I've made:
- app shows all the faces on a picture instead of just the first one
- after signing out, the Sign in form is shown instead of Register
- new component Notification which displays textual messages/warnings
- this Notification displays when user submits empty image URL or the image URL is incorrect
- display Notification warning on empty inputs on Register and Sign in
- display Notification after unsuccessful Register or Sign in
- submits forms on pressing Enter on Register and Sign in inputs
- autofocus on first inputs of Register and Sign in
- increase the entry count only on successful image submissions