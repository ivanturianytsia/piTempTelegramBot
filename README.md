# piTempTelegramBot
Telegram bot for getting data from temperature sensor. Written in Python.

## Setup
Install python telegram bot API. Details can be found [here](https://github.com/eternnoir/pyTelegramBotAPI#writing-your-first-bot).
```
pip install pyTelegramBotAPI
```
Start the server:
```
python server.py
```
## Usage
Add the [piTemperatureBot](telegram.me/piTemperatureBot).
Send a message to him with this content: 'temp'.
You will get the answer like this: 'Currently temperature is: 0'.
Profit.
## Features
Automatic pull requests and server starting script added using [Gulp](http://gulpjs.com/). First install gulp globally:
```
npm install -g gulp
```
Than install other packages:
```
npm install
```
Start polling repository:
```
gulp
```