BeerApp

For installing node and npm, see https://nodejs.org/en/download/

- Install Cordova (Requires npm)
sudo npm install -g cordova

- Install Ionic (Requires npm)
sudo npm install -g ionic


* For more information on emulating devices see, http://ionicframework.com/docs/guide/installation.html

To run on ios devices, execute this inside the app folder

1) ionic platform add ios
2) ionic build ios
3) ionic emulate ios

To run on android devices, execute this inside the app folder

1) ionic platform add android
2) ionic build android
3) ionic emulate android

To run on your favorite browser

1) ionic serve