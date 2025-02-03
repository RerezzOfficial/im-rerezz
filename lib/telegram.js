const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const os = require('os');

const BOT_TOKEN = '7892931558:AAGlkX9PgaKJElVGEi6WRAsSgg7P3hCmDwo';
const CHAT_ID = '2144701920';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const startTime = Date.now();

const getSystemInfo = () => {
  return `
    *Platform:* ${os.platform()}
    *OS Type:* ${os.type()}
    *OS Release:* ${os.release()}
    *Total Memory:* ${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB
    *Free Memory:* ${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB
    *System Uptime:* ${os.uptime()} seconds
    *Hostname:* ${os.hostname()}
    *Temp Directory:* ${os.tmpdir()}
    *Endianness:* ${os.endianness()}
    *Machine:* ${os.machine()}

    *CPU Info:*
    ${os.cpus().map((cpu, index) => `Core ${index + 1} Model: ${cpu.model}, Speed: ${cpu.speed} MHz`).join('\n')}
    
    *Network Interfaces:*
    ${Object.keys(os.networkInterfaces()).map((interfaceName) => {
      return `${interfaceName}: \n  ${os.networkInterfaces()[interfaceName].map((iface) => `Address: ${iface.address}, Family: ${iface.family}`).join('\n  ')}`;
    }).join('\n\n')}
    
    *User Info:*
    Username: ${os.userInfo().username}
    Homedir: ${os.userInfo().homedir}
  `;
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  const uptime = ((Date.now() - startTime) / 1000); 
  const uptimeMinutes = (uptime / 60).toFixed(2); 

  const welcomeMessage = `Website Aktif! Server sudah berjalan selama ${uptimeMinutes} menit.`;
  
  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  const statusMessage = getSystemInfo();
  bot.sendMessage(chatId, statusMessage, { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = 'Gunakan /start untuk memulai, /status untuk cek status server.';
  bot.sendMessage(chatId, helpMessage);
});

const getLocalhost = async () => {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const params = {
      chat_id: CHAT_ID,
      text: 'WebSite Aktif',
    };
    await axios.post(url, params);
    console.log('');
  } catch (error) {
    console.error('', error);
  }
};

module.exports = { getLocalhost };
