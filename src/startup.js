require('dotenv').config();

const bot = require('./bot');

// Startup Configuration
bot.config = require('./config');

// Startup Logger
const logger = require('./logger');
logger.init();
bot.log = logger.log;
bot.error = logger.error;
bot.debug = logger.debug;

bot.db = require('./database');
bot.commands = require('./modular-commands');
bot.commands.modules.loadAll();
