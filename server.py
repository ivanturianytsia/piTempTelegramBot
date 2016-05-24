# -*- coding: utf-8 -*-
# This bot was made specifically for the pyTelegramAPI Telegram chat,
# and goes by the name 'TeleBot (@pyTeleBot)'. Join our group to talk to him!
# WARNING: Tested with Python 2.7
import telebot
from random import randint
import os
import glob
import time

class Termometer(object):
	def __init__(self):
		os.system('modprobe w1-gpio')
		os.system('modprobe w1-therm')
		self.base_dir = '/sys/bus/w1/devices/'
		print glob.glob(self.base_dir + '28*')
		self.device_folder = glob.glob(self.base_dir + '28*')[0]
		self.device_file = self.device_folder + '/w1_slave'
		self.temperature = 0
	def measure_raw(self):
		f = open(self.device_file, 'r')
		lines = f.readlines()
		f.close()
		return lines
	def measure(self):
		lines = self.measure_raw()
		while lines[0].strip()[-3:] != 'YES':
			time.sleep(0.2)
			lines = self.measure_raw()
		equals_pos = lines[1].find('t=')
		if equals_pos != -1:
			temp_string = lines[1][equals_pos+2:]
			self.temperature = float(temp_string) / 1000.0
			# temp_f = temp_c * 9.0 / 5.0 + 32.0
			# return temp_c, temp_f
	def get(self):
		self.measure()
		return str(round(self.temperature, 2))

t = Termometer()


bot = telebot.AsyncTeleBot("230403950:AAHHFSPqeR4c9EdH0BuvJCFXVin7P0B-8Ck")

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.send_message(message.from_user.id, "Welcome to our piTemperature service. Made by Ivan Turianytsia and Jarosław Bajer. Send 'temp' to get current temperature.")

@bot.message_handler(func=lambda m: True)
def echo_all(message):
	chatid = message.from_user.id
	if message.text.lower() == "temp":
		bot.send_message(chatid, "Currently temperature is: " + t.get() + u'\N{DEGREE SIGN}' + "C.")
	elif message.text.lower() == "5":
		for x in range(1,5):
			bot.send_message(chatid, "Currently temperature is: " + t.get() + u'\N{DEGREE SIGN}' + "C.")
			time.sleep(5)
	else:
	    bot.send_message(chatid, "Send 'temp' to get current temperature.")

bot.polling()