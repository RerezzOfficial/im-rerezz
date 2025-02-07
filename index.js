const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const axios = require('axios')
const cheerio = require('cheerio');
const FormData = require('form-data');
const ytSearch = require('yt-search');
const puppeteer = require("puppeteer");
const bodyParser = require('body-parser');
const {
  createQRIS,
  checkStatus,
  checkBalance,
  getTikTokData,
  getInstagramData,
  MediaFireh,
  getSFileData,
  getSpotifyData,
  spotifydl,
  getTikMusicData,
  getTikTokData2,
  getXnxxData,
  getYoutubeData,
  getMp3Data,
  getAppleMusicDetail,
  searchAppleMusic,
  downloadAppleMusicData,
  ChatGPTv2,
  sendMessageToGPT,
  fetchAsmaulHusna,
  getAyatAudio,
  fetchRandomHadith,
  ytdlmp3,
  ytdlMp4,
  tiktokStalk,
  Instagram,
  bellaAI,
  douyindl,
  tiktokDL,
  CatBox,
  takeScreenshot,
  capcutdl,
  spotifySearch,
  formatNumber
} = require('./lib/myfunct.js')
const { 
  download,
  getData,
  getAudio,
  formatWeatherData,
  chatbot,
  text2img,
  getWeatherData
} = require('./lib/scraper.js');
const app = express();
const creator = "Rerezz";
const apikeylol = 'VREDEN-2025'
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
const requestAll = async () => {
  return Promise.all([
    axios.get('https://databse-apis.glitch.me/api/requesttoday/increment'),
    axios.get('https://databse-apis.glitch.me/api/increment-usage') 
  ]);
};
const apilol = `https://api.lolhuman.xyz`

//=====[ API ISLAMI ]=====//
app.get('/api/ayatmp3', async (req, res) => {
  try {
      await requestAll();
      const { surah, ayah } = req.query;
      if (!surah || !ayah) {
          return res.status(400).json({ status: 400, message: "Surah and Ayah are required" });
      }
      const audioUrl = `${apilol}/api/quran/audio/${surah}/${ayah}?apikey=${apikeylol}`;
      const audioResponse = await axios.get(audioUrl, { responseType: 'stream' });
      if (audioResponse.status === 200) {
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Content-Disposition', 'inline; filename="quran_audio.mp3"');
          audioResponse.data.pipe(res);
      } else {
          res.status(500).json({ status: 500, message: "Audio not found for the provided Surah and Ayah" });
      }
  } catch (error) {
      console.error("Error fetching audio:", error.message);
      res.status(500).json({ status: 500, message: "Error fetching audio", error: error.message });
  }
});

app.get('/api/surahmp3',  async (req, res) => {
  try {
      await requestAll();
      const { surah } = req.query;
      if (!surah) {
          return res.status(400).json({ status: 400, message: "Surah is required" });
      }
      const audioUrl = `${apilol}/api/quran/audio/${surah}?apikey=${apikeylol}`;
      const audioResponse = await axios.get(audioUrl, { responseType: 'stream' });
      if (audioResponse.status === 200) {
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Content-Disposition', 'inline; filename="quran_audio.mp3"');
          audioResponse.data.pipe(res);
      } else {
          res.status(500).json({ status: 500, message: "Audio not found for the provided Surah" });
      }
  } catch (error) {
      console.error("Error fetching audio:", error.message);
      res.status(500).json({ status: 500, message: "Error fetching audio", error: error.message });
  }
});

app.get('/api/ayatquran', async (req, res) => {
  const { surah, ayah } = req.query;
      if (!surah || !ayah) {
          return res.status(400).json({ status: 400, message: "Surah and Ayah are required" });
      }
  try {
      await requestAll();
      const response = await axios.get(`${apilol}/api/quran/${surah}/${ayah}?apikey=${apikeylol}`);
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ status: 500, message: "Error fetching data", error: error.message });
  }
});

app.get('/api/ayatquran2', async (req, res) => {
  const { surah, ayah } = req.query;
      if (!surah || !ayah) {
          return res.status(400).json({ status: 400, message: "Surah and Ayah are required" });
      }
  try {
      await requestAll();
      const response = await axios.get(`${apilol}/api/quran/${surah}/${ayah}?apikey=${apikeylol}`);
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ status: 500, message: "Error fetching data", error: error.message });
  }
});

app.get('/api/hadits', async (req, res) => {
  try {
    await requestAll();
    const hadith = await fetchRandomHadith();
    res.json(hadith);
  } catch (error) {
    res.status(500).send('Terjadi kesalahan saat mengambil hadis.');
  }
});
app.get('/api/asmaulhusna', async (req, res) => {
  try {
    await requestAll();
    const asmaulHusna = await fetchAsmaulHusna();
    const randomIndex = Math.floor(Math.random() * asmaulHusna.length);
    const selectedName = asmaulHusna[randomIndex];
    res.json(selectedName);
  } catch (error) {
    res.status(500).send('Terjadi kesalahan saat mengambil data.');
  }
});
app.get('/api/ayat/:surah/:ayat', async (req, res) => {
  const { surah, ayat } = req.params;
  try {
    await requestAll();
    const ayatInfo = await getAyatAudio(surah, ayat);
    res.json(ayatInfo);
  } catch (error) {
    res.status(500).send('Terjadi kesalahan saat mengambil data.');
  }
});
//=====[ API EPOTHO 350 ]=====//
app.get('/api/glowtext', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, message: "Parameter 'text' diperlukan!" });
    const imageUrl = `https://dummyimage.com/600x200/000/fff&text=${encodeURIComponent(text)}`;
    await requestAll();
    res.json({ status: true, creator: "Decode Rezz Dev", imageUrl });
});

app.get('/api/anonymhacker', async (req, res) => {
  const text = req.query.text || 'IM Rerezz'; 
  const url = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll();
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ 
      status: false,
      message: 'Gagal mengambil gambar',
      error: error.message,
    });
  }
});
app.get('/api/wp-aov', async (req, res) => {
  const text = req.query.text || 'IM Rerezz'; 
  const url = `https://api.lolhuman.xyz/api/ephoto1/aovwall?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll();
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png'); 
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching AOV wall image:', error);
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil gambar AOV Wall',
      error: error.message,
    });
  }
});
app.get('/api/avatar-dota', async (req, res) => {
  const text = req.query.text || 'IM Rerezz';
  const url = `https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll(); 
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png'); 
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Avatar Dota image:', error);
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil gambar Avatar Dota',
      error: error.message,
    });
  }
});
app.get('/api/avatar-lolnew', async (req, res) => {
  const text = req.query.text || 'IM Rerezz';
  const url = `https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll(); 
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png'); 
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Avatar LOL New image:', error);
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil gambar Avatar LOL New',
      error: error.message,
    });
  }
});
app.get('/api/beautifulflower', async (req, res) => {
  const text = req.query.text || 'IM Rerezz';
  const url = `https://api.lolhuman.xyz/api/ephoto1/beautifulflower?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll(); 
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png'); 
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Beautiful Flower image:', error);
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil gambar Beautiful Flower',
      error: error.message,
    });
  }
});
app.get('/api/birthdaycake', async (req, res) => {
  const text = req.query.text || 'IM Rerezz';
  const url = `https://api.lolhuman.xyz/api/ephoto1/birthdaycake?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll(); 
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png'); 
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Birthday Cake image:', error);
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil gambar Birthday Cake',
      error: error.message,
    });
  }
});
app.get('/api/birthdayday', async (req, res) => {
  const text = req.query.text || 'IM Rerezz';
  const url = `https://api.lolhuman.xyz/api/ephoto1/birthdayday?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll(); 
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png'); 
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Birthday Day image:', error);
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil gambar Birthday Day',
      error: error.message,
    });
  }
});
app.get('/api/cartoongravity', async (req, res) => {
  const text = req.query.text || 'IM Rerezz';
  const url = `https://api.lolhuman.xyz/api/ephoto1/cartoongravity?apikey=${apikeylol}&text=${text}`;
  try {
    await requestAll(); 
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png'); 
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Cartoon Gravity image:', error);
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil gambar Cartoon Gravity',
      error: error.message,
    });
  }
});


//=====[ TOOLS API ]=====//
app.get('/api/iplookup', async (req, res) => {
  const { ip } = req.query;
  if (!ip) {
      return res.status(400).json([
          { success: false, creator: 'Rerezz' },
          { error: 'Masukkan parameter ip' }
      ]);
  }
  try {
    await requestAll();
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      res.json([
          { success: true, creator: 'Rerezz' },
          {
              ip: response.data.query,
              country: response.data.country,
              region: response.data.regionName,
              city: response.data.city,
              isp: response.data.isp,
              lat: response.data.lat,
              lon: response.data.lon,
              timezone: response.data.timezone
          }
      ]);
  } catch (error) {
      res.status(500).json([
          { success: false, creator: 'Rerezz' },
          { error: 'Gagal mengambil data IP', detail: error.message }
      ]);
  }
});

app.get('/api/ssweb', async (req, res) => {
  const { url } = req.query;
  if (!url) {
      return res.status(400).json({
          creator: 'Rerezz',
          error: 'Masukkan parameter url'
      });
  }
  try {
      await requestAll();
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.setViewport({ width: 480, height: 800, isMobile: true });
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      const screenshotBuffer = await page.screenshot({ type: 'png' });
      await browser.close();
      const filename = `screenshot-${Date.now()}.png`;
      const imageUrl = await CatBox(screenshotBuffer, filename);
      res.redirect(imageUrl);
  } catch (error) {
      res.status(500).json({
          error: 'Gagal mengambil screenshot',
          detail: error.message,
          creator: 'Rerezz'
      });
  }
});

app.get('/api/sswebv2', async (req, res) => {
  const { url } = req.query;
  if (!url) {
      return res.status(400).json({
          creator: 'Rerezz',
          error: 'Masukkan parameter url'
      });
  }
  try {
    await requestAll();
      const [urlHP, urlTab, urlDesk] = await Promise.all([
          takeScreenshot(url, 480, 800, 'mobile'),
          takeScreenshot(url, 800, 1280, 'tablet'),
          takeScreenshot(url, 1024, 768, 'desktop')
      ]);
      res.json({
          success: true,
          creator: 'Rerezz',
          urlHP,
          urlTab,
          urlDesk
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          error: 'Gagal mengambil screenshot',
          detail: error.message,
          creator: 'Rerezz'
      });
  }
});

app.get('/api/base64', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, message: "Parameter 'text' diperlukan!" });
    await requestAll();
    const encoded = Buffer.from(text).toString('base64');
    res.json({ status: true, creator: "Decode Rezz Dev", encoded });
});

app.get('/api/unbase64', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, message: "Parameter 'text' diperlukan!" });
    try {
        await requestAll();
        const decoded = Buffer.from(text, 'base64').toString('utf-8');
        res.json({ status: true, creator: "Decode Rezz Dev", decoded });
    } catch (error) {
        res.status(400).json({ status: false, message: "Format Base64 tidak valid!" });
    }
});

app.get('/api/cuaca', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({
      status: false,
      message: "Parameter 'query' tidak ditemukan."
    });
  }
  try {
    await requestAll();
    const weatherData = await getWeatherData(query);
    const formattedData = formatWeatherData(weatherData);
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Terjadi kesalahan saat mengambil data cuaca."
    });
  }
});
app.get('/api/text2img', async (req, res) => {
    const { prompt } = req.query;
    if (!prompt) {
        return res.status(400).json({ error: "Parameter 'prompt' diperlukan." });
    }
    await requestAll();
    const response = await text2img(prompt);
    if (typeof response === 'string' && response.startsWith('http')) {
        return res.redirect(response);
    }
    res.json(response);
});
//====[ API AI ]=====//

app.get('/api/openai', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.json({ error: "Parameter 'question' diperlukan." });
    }
    await requestAll();
    const result = await chatbot(question, "openai");
    res.json({ creator, response: result });
});

app.get('/api/llamav2', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.json({ error: "Parameter 'question' diperlukan." });
    }
    await requestAll();
    const result = await chatbot(question, "llama");
    res.json({ creator, response: result });
});

app.get('/api/mistral', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.json({ error: "Parameter 'question' diperlukan." });
    }
    await requestAll();
    const result = await chatbot(question, "mistral");
    res.json({ creator, response: result });
});

app.get('/api/mistral-large', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.json({ error: "Parameter 'question' diperlukan." });
    }
    await requestAll();
    const result = await chatbot(question, "mistral-large");
    res.json({ creator, response: result });
});

app.get('/api/gptturbo', async (req, res) => {
  try {
    await requestAll();
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await sendMessageToGPT(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/llama", async (req, res) => {
  const { text } = req.query;
  if (!text) {
      return res.status(400).json({ status: false, creator: "IM Rerezz", error: "Isi parameter text" });
  }
  try {
    await requestAll();
      const response = await ChatGPTv2(q, "llama");
      res.status(200).json({
          status: true,
          creator: "IM Rerezz",
          result: response
      });
  } catch (error) {
      res.status(500).json({ status: false, creator: "IM Rerezz", error: error.message });
  }
});

app.get('/api/bellaai', async (req, res) => {
    const { content } = req.query;
    if (!content) {
        return res.status(400).json({ error: "Parameter 'content' diperlukan." });
    }
    try {
	await requestAll();
        const response = await bellaAI(content);
        res.json({ creator: "Rerezz", response });
    } catch (error) {
        res.status(500).json({ error: "Gagal mendapatkan data dari LuminAI", details: error.toString() });
    }
});
//=====[ API STALKER ]=====//
const API_KEY = `AIzaSyAGaSbQFcpHsaajY9NbyequHtwkoTuPqck`
app.get('/api/ytstalk', async (req, res) => {
  let { username } = req.query;
  if (!username) {
      return res.status(400).json({ error: "Masukkan parameter 'username' (@handle YouTube)" });
  }
  try {
      await requestAll();
      if (!username.startsWith('@')) {
          username = `@${username}`;
      }
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
          params: {
              part: 'snippet,statistics,brandingSettings',
              forHandle: username,
              key: API_KEY
          }
      });
      if (!response.data.items.length) {
          return res.status(404).json({ error: "Channel tidak ditemukan" });
      }
      const channel = response.data.items[0];
      const channelURL = `https://www.youtube.com/${username}`;
      const profilePicture = {
          default: channel.snippet.thumbnails.default.url,
          medium: channel.snippet.thumbnails.medium.url,
          high: channel.snippet.thumbnails.high.url,
          maxres: channel.snippet.thumbnails.maxres?.url || channel.snippet.thumbnails.high.url
      };
      res.json({
          id: channel.id,
          username: username,
          nama: channel.snippet.title,
          deskripsi: channel.snippet.description,
          profile_picture: profilePicture,
          banner: channel.brandingSettings?.image?.bannerExternalUrl || null,
          subscriber: formatNumber(channel.statistics.subscriberCount),
          total_video: formatNumber(channel.statistics.videoCount),
          total_views: formatNumber(channel.statistics.viewCount),
          dibuat_pada: channel.snippet.publishedAt,
          url: channelURL
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});


const RAPIDAPI_KEY = 'dd6a4f59c9msh0c7cbb5ec2f7267p1c44d5jsn540d7b5c48fa'; 
app.get('/api/igstalk', async (req, res) => {
    let { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: "Masukkan parameter 'username'" });
    }
    try {
      await requestAll();
        const response = await axios.get('https://instagram-scraper-api2.p.rapidapi.com/v1.2/search', {
            params: { search_query: username },
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil data Instagram" });
    }
});

app.get('/api/ttstalk', async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: "Parameter 'username' diperlukan." });
    }
    try {
	await requestAll();
        const result = await tiktokStalk(username);
        res.json({
            creator: "Rerezz",
            result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//=====[ API SEARCH ]=====//

app.get('/api/otakudesu/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query parameter is required" });
  const url = `https://otakudesu.cloud/?s=${query}&post_type=anime`;
  try {
    await requestAll();
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const animeList = [];
      $('.chivsrc > li').each((index, element) => {
          if (index >= 10) return false; 
          const title = $(element).find('h2 a').text().trim();
          const link = $(element).find('h2 a').attr('href');
          const imageUrl = $(element).find('img').attr('src');
          const genres = $(element).find('.set').first().text().replace('Genres : ', '').trim();
          const status = $(element).find('.set').eq(1).text().replace('Status : ', '').trim();
          const rating = $(element).find('.set').eq(2).text().replace('Rating : ', '').trim() || 'N/A';
          animeList.push({
              title,
              link,
              imageUrl,
              genres,
              status,
              rating
          });
      });
      res.json({ results: animeList });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/api/ytsearch', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: "Parameter 'query' diperlukan." });
    }
    try {
	await requestAll();
        const searchResults = await ytSearch(query);
        if (!searchResults.videos.length) {
            return res.json({ error: "Tidak ada hasil ditemukan." });
        }
        const results = searchResults.videos.slice(0, 10).map(video => ({
            title: video.title,
            url: video.url,
            duration: video.timestamp,
            thumbnail: video.thumbnail,
            channel: video.author.name
        }));
        res.json({ creator, results });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil data." });
    }
});
app.get('/api/appstore', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({
      status: false,
      message: 'Query parameter is required',
    });
  }
  try {
    await requestAll();
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term: query,
        media: 'software',
        limit: 10, 
      },
    });
    const result = response.data.results.map(app => ({
      title: app.trackName,
      description: app.description || 'No description available',
      image: app.artworkUrl100,
      link: app.trackViewUrl,
    }));
    res.json({
      status: true,
      creator: 'IM REREZZ',
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan saat mengambil data.',
    });
  }
});

app.get('/api/apple-search', async (req, res) => {
  try {
    await requestAll();
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const results = await searchAppleMusic(query);
    res.status(200).json({ status: true, data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/spotifysearch', async (req, res) => {
  const query = req.query.q;
  if (!query) {
      return res.status(400).json({ error: 'Parameter "q" dibutuhkan' });
  }
  try {
    await requestAll();
      const results = await spotifySearch(query);
      res.json(results);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


//=====[ API DOWNLOADER ]=====//
app.get('/api/capcutdl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    await requestAll()
      return res.status(400).json({
          success: false,
          creator: 'Rerezz',
          error: 'Masukkan parameter url'
      });
  }
  try {
      const data = await capcutdl(url);
      if (!data) {
          return res.status(500).json({
              success: false,
              creator: 'Rerezz',
              error: 'Gagal mengambil data CapCut'
          });
      }
      res.json({
          success: true,
          creator: 'Rerezz',
          data
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          creator: 'Rerezz',
          error: 'Terjadi kesalahan saat mengambil data',
          detail: error.message
      });
  }
});

app.get('/api/spotifydl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
      return res.status(400).json({ error: 'Parameter "url" diperlukan.' });
  }
  try {
    await requestAll()
      const result = await spotifydl(url);
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/ttdl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, creator: "Decode Rezz Dev", message: "Parameter 'url' diperlukan!" });
  }
  try {
    await requestAll();  
    const result = await tiktokDL(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: false, creator: "Decode Rezz Dev", message: "Terjadi kesalahan pada server!" });
  }
});

app.get('/api/igdl', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ status: false, message: "Parameter 'url' diperlukan!" });
  }
  try {
    await requestAll();  
    const result = await Instagram(url);
    res.json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/api/douyindl', async (req, res) => {
  const url = req.query.url; 
  if (!url) {
    return res.status(400).json({ error: "URL tidak ditemukan di query parameter." });
  }
  await requestAll();
  const result = await douyindl(url);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

app.get('/api/ytdlmp4', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: "Parameter 'url' diperlukan!" });
    try {
	await requestAll();
        const videoData = await ytdlMp4.getToken(url);
        const videoOptions = videoData.data.formats.video.mp4;

        if (!videoOptions || videoOptions.length === 0) {
            return res.json({ status: false, message: "Video tidak tersedia!" });
	}
        const randomQuality = videoOptions[Math.floor(Math.random() * videoOptions.length)].quality;
        const result = await ytdlMp4.download(url, randomQuality);
        if (result.status !== 'completed') {
            return res.json({ status: false, message: "Gagal mengunduh video!" });
        }
        res.json({
            status: true,
            creator: "IM Rerezz",
            title: videoData.data.title,
            quality: randomQuality,
            download_url: result.link
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Terjadi kesalahan saat mengunduh video!" });
    }
});
app.get('/api/ytdlmp3', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: "Parameter 'url' diperlukan!" });
    const result = await ytdlmp3(url);
    res.json({
        creator: "IM Rerezz",
        ...result
    });
    await requestAll();
});

app.get('/api/appledl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'Parameter "url" tidak ditemukan'
    });
  }
  try {
    await requestAll();
    const data = await download(url);
    if (data.success === false) {
      return res.status(500).json({
        success: false,
        message: data.message
      });
    }

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengunduh musik',
      error: error.message
    });
  }
});
app.get('/api/bocil', async (req, res) => {
  try {
    await requestAll();
    const response = await axios.get('https://raw.githubusercontent.com/RerezzOfficial/media/main/media/bocil.json');
    const bocilData = response.data;
    const videos = bocilData.results;
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    axios({
      method: 'get',
      url: randomVideo.url,
      responseType: 'stream',
    })
    .then(videoResponse => {
      res.setHeader('Content-Type', 'video/mp4');
      videoResponse.data.pipe(res); 
    })
    .catch(error => {
      console.error('Error fetching video:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil video' });
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Gagal memproses file bocil.json' });
  }
});

 
app.get('/api/ytplaymp3', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ status: 400, message: 'Query is required' });
  }
  try {
    await requestAll();
    const mp3Data = await getMp3Data(query);
    return res.status(200).json(mp3Data);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/ytmp4', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();
    const youtubeData = await getYoutubeData(url);
    return res.status(200).json(youtubeData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/xnxx', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll(); 
    const xnxxData = await getXnxxData(query);
    return res.status(200).json(xnxxData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/tiktok', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll(); 
    const tikTokData = await getTikTokData2(url);
    return res.status(200).json(tikTokData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/tikmusic', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();
    const tikMusicData = await getTikMusicData(url);
    return res.status(200).json(tikMusicData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/spotify', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();  
    const spotifyData = await getSpotifyData(url);
    return res.status(200).json(spotifyData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/sfile', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();  
    const sFileData = await getSFileData(url);
    return res.status(200).json(sFileData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/mediafiredl', async (req, res) => {
 try {
   await requestAll();  
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await mediafire(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/igdownload', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll()
    const instagramData = await getInstagramData(url);
    return res.status(200).json(instagramData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/tiktokdl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll()
    const videoData = await getTikTokData(url);
    return res.status(200).json(videoData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

//=====[ API CANVAS ]=====//
async function fetchImage(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;  
}

app.get("/api/fotomenu", async (req, res) => {
  try {
    await requestAll()
      const { background, ppuser, name, botname, ownername, title, text1, text2, text3 } = req.query;
      if (!background || !ppuser || !name || !botname || !ownername || !title || !text1 || !text2 || !text3) {
          return res.status(400).json({ error: "Parameter tidak lengkap atau salah format." });
      }
      const apiUrl = `https://apis.xyrezz.online-server.biz.id/api/fotomenu?background=${encodeURIComponent(background)}&ppuser=${encodeURIComponent(ppuser)}&name=${encodeURIComponent(name)}&botname=${encodeURIComponent(botname)}&ownername=${encodeURIComponent(ownername)}&title=${encodeURIComponent(title)}&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&text3=${encodeURIComponent(text3)}`;
      const imageData = await fetchImage(apiUrl);
      res.setHeader("Content-Type", "image/png");
      res.send(imageData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal memproses gambar." });
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    await requestAll()
      const {
          background,
          ppuser,
          sender,
          name,
          level,
          exp,
          requireExp,
          rankName,
          rankId
      } = req.query;
      if (!background || !ppuser || !sender || !name || !level || !exp || !requireExp || !rankName || !rankId) {
          return res.status(400).json({ error: 'Parameter tidak lengkap.' });
      }
      const apiUrl = `https://apis.xyrezz.online-server.biz.id/api/profile?background=${encodeURIComponent(background)}&ppuser=${encodeURIComponent(ppuser)}&sender=${encodeURIComponent(sender)}&name=${encodeURIComponent(name)}&level=${encodeURIComponent(level)}&exp=${encodeURIComponent(exp)}&requireExp=${encodeURIComponent(requireExp)}&rankName=${encodeURIComponent(rankName)}&rankId=${encodeURIComponent(rankId)}`;
      const imageData = await fetchImage(apiUrl);
      res.setHeader("Content-Type", "image/png");
      res.send(imageData);
  } catch (error) {
      console.error("Gagal memproses gambar:", error.message);
      res.status(500).json({ error: "Gagal memproses gambar." });
  }
});

app.get('/api/levelup', async (req, res) => {
  try {
    await requestAll()
      const { background, foto, fromLevel, toLevel, name } = req.query;
      if (!background || !foto || !fromLevel || !toLevel || !name) {
          return res.status(400).json({ error: "Semua parameter harus diisi." });
      }
      const apiUrl = `https://apis.xyrezz.online-server.biz.id/api/levelup?background=${encodeURIComponent(background)}&foto=${encodeURIComponent(foto)}&fromLevel=${encodeURIComponent(fromLevel)}&toLevel=${encodeURIComponent(toLevel)}&name=${encodeURIComponent(name)}`;
      console.log("API URL: ", apiUrl);
      const imageData = await fetchImage(apiUrl);
      res.setHeader("Content-Type", "image/png");
      res.send(imageData);
  } catch (error) {
      console.error("Gagal memproses gambar:", error.message);
      res.status(500).json({ error: "Gagal memproses gambar." });
  }
});

//=====[ API ORKUT ]=====//
app.get('/api/orkut/deposit', async (req, res) => {
  const { amount, codeqr } = req.query;

  if (!amount || !codeqr) {
    return res.status(400).json({
      status: 400,
      message: "Jumlah dan kode QR tidak boleh kosong."
    });
  }

  try {
	  await requestAll()
    const qrData = await createQRIS(amount, codeqr); 

    if (!qrData.qrImageUrl) {
      return res.status(500).json({
        status: 500,
        creator: "IM REREZZ",
        result: "Gagal membuat QR Code, coba lagi."
      });
    }

    res.json({
      status: true,
      creator: "IM REREZZ",
      result: {
        transactionId: qrData.transactionId,
        amount: qrData.amount,
        qrImageUrl: qrData.qrImageUrl,
        message: "Silakan melakukan pembayaran menggunakan QR Code di atas."
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      creator: "IM REREZZ",
      result: `Error: ${error.message}`,
    });
  }
});

app.get('/api/orkut/cekstatus', async (req, res) => {
  const { merchant, keyorkut } = req.query;

  if (!merchant || !keyorkut) {
    return res.status(400).json({
      status: 400,
      message: "Merchant dan keyorkut tidak boleh kosong."
    });
  }

  try {
	  await requestAll()
    const transactionStatus = await checkStatus(merchant, keyorkut); 

    if (!transactionStatus) {
      return res.status(404).json({
        message: "Tidak ada transaksi ditemukan."
      });
    }

    res.json(transactionStatus);
  } catch (error) {
    res.status(500).json({
      status: 500,
      creator: "IM REREZZ",
      result: `Error: ${error.message}`,
    });
  }
});

app.get('/api/orkut/mutasuqr', async (req, res) => {
  const { merchant, keyorkut } = req.query;

  if (!merchant || !keyorkut) {
    return res.status(400).json({
      status: 400,
      message: "Merchant dan keyorkut tidak boleh kosong."
    });
  }

  try {
	  await requestAll()
    const apiUrl = `https://www.gateway.okeconnect.com/api/mutasi/qris/${merchant}/${keyorkut}`;
    const response = await axios.get(apiUrl);
    const result = response.data;

    if (!result || result.status !== 'success') {
      return res.status(400).json({ message: "Terjadi kesalahan saat mengambil data." });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      result: `Error: ${error.message}`,
    });
  }
});


app.get('/chat/openai', (req, res) => {
  console.log("Halaman utama diakses");
  res.sendFile(path.join(__dirname, 'public', 'openai.html')); 
});

app.get('/style/jsnya', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.js'));
});
app.get('/style/cssnya', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.css'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html')); 
});

app.get('/api/ffstats', async (req, res) => {
  try {
      const response = await axios.get('https://databse-apis.glitch.me/api/requesttoday/history');
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  try {
    const response = await axios.get(
      `https://www.api.im-rerezz.xyz/api/openai?message=${encodeURIComponent(message)}`
    );
    res.json({ reply: response.data });
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan respon dari ChatGPT" });
  }
});



app.get('/api/get-usage-count', async (req, res) => {
  try {
    const response = await fetch('https://databse-apis.glitch.me/api/usage-count');
    const data = await response.json();
    res.status(200).json({ usageCount: data.usageCount });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Failed to fetch usage count from Glitch', error: error.message });
  }
});

app.get('/api/reqtoday', async (req, res) => {
  try {
    const response = await fetch('https://databse-apis.glitch.me/api/requesttoday/today');
    const data = await response.json();
    res.status(200).json({ reqtoday: data.requestCount });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Failed to fetch usage count from Glitch', error: error.message });
  }
});

app.get('/api/visitor', async (req, res) => {
  try {
    const response = await axios.get('https://databse-apis.glitch.me/increment-visitor');
    const visitorCount = response.data.count;
    res.status(200).send(visitorCount.toString());
  } catch (error) {
    res.status(500).send('Failed to fetch visitor data');
  }
});

app.get('/api/requesttoday/history', async (req, res) => {
  try {
      const response = await fetch('https://databse-apis.glitch.me/api/requesttoday/history');
      const data = await response.json();
      res.json(data.requestHistory); 
  } catch (error) {
      console.error('Error fetching request history:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
	  
