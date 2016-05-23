# -*- coding: utf-8 -*-
# This bot was made specifically for the pyTelegramAPI Telegram chat,
# and goes by the name 'TeleBot (@pyTeleBot)'. Join our group to talk to him!
# WARNING: Tested with Python 2.7
import telebot
from random import randint
import os

class Termometer(object):
	def __init__(self):
		self.temperature = 0
	def measure(self):
		# Get data from sensor here
		self.temperature = randint(-20, 45)

	def get(self):
		self.measure()
		return str(self.temperature)

t = Termometer()


bot = telebot.AsyncTeleBot("230403950:AAHHFSPqeR4c9EdH0BuvJCFXVin7P0B-8Ck")

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.send_message(message.from_user.id, "Welcome to our piTemperature service. Made by Ivan Turianytsia and Jarosław Bajer. Send 'temp' to get current temperature.")

@bot.message_handler(func=lambda m: True)
def echo_all(message):
	if message.text.lower() == "temp":
		bot.send_message(message.from_user.id, "Currently temperature is: " + t.get() + u'\N{DEGREE SIGN}' + "C.")
	else:
	    bot.send_message(message.from_user.id, "Send 'temp' to get current temperature. Change")

bot.polling()