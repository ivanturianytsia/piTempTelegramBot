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
#### Getting temperature data
Send a message to it with this content:
```
temp
```
You will get the answer like this:
```
Currently temperature is: 20.93°С.
```
Profit.
#### Getting temperature data repeatedely
Bot has a feature of supplying data repeatedely. To do this, send:
```
times <times> <delay>
```
For example this message will make bot send you 4 messages with a delay of 2 seconds:
```
times 4 2
```
You will get the answer like this:
```
I will send you 4 messages with 2s delay.
(1/4) Temperature is: 33.19°C.
(2/4) Temperature is: 33.19°C.
(3/4) Temperature is: 33.13°C.
(4/4) Temperature is: 33.13°C.
Done.
```
Profit 2.0.
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