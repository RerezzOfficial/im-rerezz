const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const axios = require('axios')
const cheerio = require('cheerio');
const FormData = require('form-data');
const ytSearch = require('yt-search');
const { 
  getTikTokData,
  getCapCutData,
  getInstagramData,
  MediaFireh,
  getSFileData,
  getSpotifyData,
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
  tiktokDL
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
const {
	createQRIS,
	checkStatus
} = require('./orkut.js')
const mediafire = require('./lib/mediafire');
const app = express();
const creator = "Rerezz";
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
const validKeys = ['IM-REREZZ.2007', 'REREZZ-OFFICIAL.0208'];
const requestToday = `https://databse-apis.glitch.me/api/requesttoday/today`
const glitchApiUrl = 'https://databse-apis.glitch.me/api/increment-usage';
const requestAll = async () => {
  return Promise.all([
    axios.get('https://databse-apis.glitch.me/api/requesttoday/increment'),
    axios.get('https://databse-apis.glitch.me/api/increment-usage') 
  ]);
};
const apilol = 'VREDEN-2025'

//=====[ API ISLAMI ]=====//
app.get('/api/hadits', async (req, res) => {
  try {
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${apilol}&text=${text}`;
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/aovwall?apikey=${apilol}&text=${text}`;
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${apilol}&text=${text}`;
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${apilol}&text=${text}`;
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/beautifulflower?apikey=${apilol}&text=${text}`;
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/birthdaycake?apikey=${apilol}&text=${text}`;
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/birthdayday?apikey=${apilol}&text=${text}`;
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
  const url = `https://api.lolhuman.xyz/api/ephoto1/cartoongravity?apikey=${apilol}&text=${text}`;
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
app.get('/api/enc', (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, message: "Parameter 'text' diperlukan!" });
    await requestAll();
    const encoded = Buffer.from(text).toString('base64');
    res.json({ status: true, creator: "Decode Rezz Dev", encoded });
});

app.get('/api/denc', (req, res) => {
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
    await axios.get(glitchApiUrl); 
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
app.get('/api/chat/openai', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.json({ error: "Parameter 'question' diperlukan." });
    }
    await requestAll();
    const result = await chatbot(question, "openai");
    res.json({ creator, response: result });
});

app.get('/api/chat/llama', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.json({ error: "Parameter 'question' diperlukan." });
    }
    await requestAll();
    const result = await chatbot(question, "llama");
    res.json({ creator, response: result });
});

app.get('/api/chat/mistral', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.json({ error: "Parameter 'question' diperlukan." });
    }
    await requestAll();
    const result = await chatbot(question, "mistral");
    res.json({ creator, response: result });
});

app.get('/api/chat/mistral-large', async (req, res) => {
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
//=====[ API SEARCH ]=====//
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
//=====[ API DOWNLOADER ]=====//
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

app.get('/api/douyin', async (req, res) => {
  const url = req.query.url; // Ambil URL dari query parameter
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

app.get('/api/capcutdl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll()
    const videoData = await getCapCutData(url);
    return res.status(200).json(videoData);
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


const domain = 'https://dalang.x.decode.im-rerezz.xyz';
const apikey = 'ptla_c64EvoRQ2F15yVIv99I1tk53uDAAershnparTwhO77k';

app.post('/create-server', async (req, res) => {
    const { username, ramOption, key } = req.body; 
    console.log(`Received key: ${key}`);

    if (!validKeys.includes(key)) {
        return res.status(403).json({ message: '❌ Kunci key tidak valid!' });
    }
    if (!username || !ramOption) {
        return res.status(400).json({ message: '❌ Semua input harus diisi!' });
    }
    await requestAll();
    let ram, disk, cpu;

    switch (ramOption) {
      case "panel1gb":
        ram = 1000;
        disk = 1000;
        cpu = 50;
        break;
    case "panel2gb":
        ram = 2000;
        disk = 2000;
        cpu = 100;
        break;
    case "panel3gb":
        ram = 3000;
        disk = 3000;
        cpu = 150;
        break;
    case "panel4gb":
        ram = 4000;
        disk = 4000;
        cpu = 200;
        break;
    case "panel5gb":
        ram = 5000;
        disk = 5000;
        cpu = 250;
        break;
    case "panel6gb":
        ram = 6000;
        disk = 6000;
        cpu = 300;
        break;
    case "panel7gb":
        ram = 7000;
        disk = 7000;
        cpu = 350;
        break;
    case "panel8gb":
        ram = 8000;
        disk = 8000;
        cpu = 400;
        break;
    case "panel9gb":
        ram = 9000;
        disk = 9000;
        cpu = 450;
        break;
    case "panel10gb":
        ram = 10000;
        disk = 10000;
        cpu = 500;
        break;
    case "panel11gb":
        ram = 11000;
        disk = 11000;
        cpu = 550;
        break;
    case "panel12gb":
        ram = 12000;
        disk = 12000;
        cpu = 600;
        break;
    case "panel13gb":
        ram = 13000;
        disk = 13000;
        cpu = 650;
        break;
    case "panel14gb":
        ram = 14000;
        disk = 14000;
        cpu = 700;
        break;
    case "panel15gb":
        ram = 15000;
        disk = 15000;
        cpu = 750;
        break;
    case "panel16gb":
        ram = 16000;
        disk = 16000;
        cpu = 800;
        break;
    case "panel17gb":
        ram = 17000;
        disk = 17000;
        cpu = 850;
        break;
    case "panel18gb":
        ram = 18000;
        disk = 18000;
        cpu = 900;
        break;
    case "panel19gb":
        ram = 19000;
        disk = 19000;
        cpu = 950;
        break;
    case "panel20gb":
        ram = 20000;
        disk = 20000;
        cpu = 1000;
        break;
      case "unlimited":
          ram = 0;
          disk = 0;
          cpu = 0;
          break;
      default:
          return res.status(400).json({ message: "❌ Pilihan RAM tidak valid!" });
  }
    try {
        const response = await fetch(`https://apis.xyrezz.online-server.biz.id/api/cpanel?domain=${domain}&apikey=${apikey}&username=${username}&ram=${ram}&disk=${disk}&cpu=${cpu}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.error) {
            return res.status(500).json({ message: `Error: ${data.error}` });
        }
        res.status(200).json({ message: '✅ Server berhasil dibuat!', serverInfo: data });
    } catch (error) {
        res.status(500).json({ message: '❌ Terjadi kesalahan saat membuat server. Harap coba lagi.' });
    }
});

app.get('/api/list-users', async (req, res) => {
  try {
    await requestAll();
    let response = await fetch(`${domain}/api/application/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apikey}`,
      },
    });
    let data = await response.json();
    if (data.errors) {
      return res.status(500).json({ error: `❌ *Error:* ${data.errors[0].detail}` });
    }
    let users = data.data;
    if (users.length === 0) {
      return res.status(404).json({ message: '❌ *Tidak ada pengguna yang ditemukan.*' });
    }
    let userList = users.map(user => {
      let userInfo = user.attributes;
      return {
        id: userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
        language: userInfo.language
      };
    });
    res.status(200).json({ data: userList });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '❌ *Terjadi kesalahan saat mengambil daftar pengguna. Periksa konfigurasi atau coba lagi.*' });
  }
});

app.delete('/api/delete-user/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'ID pengguna tidak diberikan.' });
  try {
    await requestAll();
      let response = await fetch(`${domain}/api/application/users/${id}`, {
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apikey}`,
          },
      });
      let result = response.ok ? { message: 'Successfully deleted the user.' } : await response.json();
      if (result.errors) {
          return res.status(404).json({ error: 'User not found or deletion failed.' });
      }
      res.status(200).json(result);
  } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus pengguna.' });
  }
});

app.get('/api/list-servers', async (req, res) => {
  try {
    await requestAll();
      const page = req.query.page || '1'; 
      const response = await fetch(`${domain}/api/application/servers?page=${page}`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apikey}`
          }
      });
      const data = await response.json();
      const servers = data.data;
      if (!servers || servers.length === 0) {
          return res.json({ error: '❌ Tidak ada server yang ditemukan.' });
      }
      const serverList = servers.map(server => ({
          id: server.attributes.id,
          identifier: server.attributes.identifier,
          name: server.attributes.name,
          description: server.attributes.description,
          suspended: server.attributes.suspended,
          memory: server.attributes.limits.memory == 0 ? "unlimited" : `${server.attributes.limits.memory / 1000} GB`,
          disk: server.attributes.limits.disk == 0 ? "unlimited" : `${server.attributes.limits.disk / 1000} GB`,
          cpu: server.attributes.limits.cpu == 0 ? "unlimited" : `${server.attributes.limits.cpu}%`
      }));

      res.json({ data: serverList, page: data.meta.pagination.current_page, total_pages: data.meta.pagination.total_pages });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: '❌ Terjadi kesalahan saat mengambil daftar server.' });
  }
});
app.delete('/api/delete-server/:id', async (req, res) => {
  const srvId = req.params.id;
  if (!srvId) {
      return res.json({ error: 'ID server tidak ditemukan.' });
  }
  try {
    await requestAll();
      const response = await fetch(`${domain}/api/application/servers/${srvId}`, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apikey}`
          }
      });
      if (response.ok) {
          return res.json({ message: 'Server berhasil dihapus.' });
      }
      const result = await response.json();
      return res.json({ error: result.errors || 'Server tidak ditemukan.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: '❌ Terjadi kesalahan saat menghapus server.' });
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
	  
