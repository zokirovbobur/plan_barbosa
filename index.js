// DEPENDENCIES
require('dotenv').config()
require('./config/connection')
const config = require("./config/index")

// TELEGRAF
const Telegraf = require('telegraf')
const bot = new Telegraf(config.telegramToken)
const { Stage, session } = Telegraf

// Scenes
const HomeScene = require('./telegraf/scenes/home')
const LanguageScene = require('./telegraf/scenes/languages')
const PhoneScene= require('./telegraf/scenes/phone')
const RequestScene = require('./telegraf/scenes/request')


// Actions
// const taskAction = require('./telegraf/actions/task')
// const oldTaskAction = require('./telegraf/actions/old_task')
// const statusAction = require('./telegraf/actions/status')



// Commands
const startCommand = require('./telegraf/commands/start')
const restartCommand = require('./telegraf/commands/start')


const homeScene = new HomeScene()
const langScene = new LanguageScene()
const phoneScene = new PhoneScene()
const requestScene = new RequestScene()

const stages = new Stage([
    homeScene.Home(),
    langScene.Language(),
    phoneScene.Phone(),
    requestScene.RequestApplication(),
])

// bot.telegram.setMyCommands()
bot.use(session())
bot.use(stages.middleware())
bot.command('start', startCommand)
bot.command('restart', restartCommand)
// bot.command('quit', quitCommand)
// bot.action(/^task:/, taskAction)
// bot.action(/^old_task:/, oldTaskAction)
// bot.action(/^status:/, statusAction)
bot.launch()
    .then(() => console.log("Telegram bot working globally...🌐"))
    .catch((err) => console.log(err.message))
