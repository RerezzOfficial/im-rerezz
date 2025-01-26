__path = process.cwd()
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fetch = require('node-fetch');
const got = require('got');
const { exec } = require("child_process");
const FormData = require('form-data'); 
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const qs = require("qs");
const { ytdlv2, search } = require('@vreden/youtube_scraper')
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { chromium } = require('playwright');
const { Buffer } = require('buffer');
const { run } = require('shannz-playwright');
var { performance } = require("perf_hooks");
const NodeCache = require('node-cache');
const mime = require('mime-types');
const moment = require('moment-timezone');
const Groq = require('groq-sdk')
const client = new Groq({ apiKey: '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' });
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');
const Used_Apikey = "AIzaSyB88NfVhPnuCKWo8mx0Q5hub52m5Vklt2o"
const genAI = new GoogleGenerativeAI(Used_Apikey);
const https = require('https');

const {
	createQRIS,
	checkStatus
} = require('./orkut.js')


const jsobfus = require('javascript-obfuscator')
const mediafire = require('./lib/mediafire')
const metaaii = require('./lib/metaai')
const app = express();


const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/doc/ai', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ai.html"));
});

app.get('/doc/search', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "search.html"));
});

app.get('/doc/download', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "download.html"));
});



app.get('/api/orkut/deposit', async (req, res) => {
  const { amount, codeqr } = req.query;

  if (!amount || !codeqr) {
    return res.status(400).json({
      status: 400,
      message: "Jumlah dan kode QR tidak boleh kosong."
    });
  }

  try {
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


app.get('/api/igdl2', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL Instagram diperlukan." });
  }

  try {
    // Kirim permintaan ke InstaSave
    const response = await axios.get(`https://instasave.website`, {
      params: { url },
    });

    // Parsing HTML respons
    const $ = cheerio.load(response.data);

    // Cari URL video di elemen tertentu
    const videoUrl = $('a[download]').attr('href');

    if (!videoUrl) {
      return res.status(404).json({ error: "Gagal menemukan URL video." });
    }

    // Kirim URL video sebagai respons
    res.json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data." });
  }
});


//====[ API CANVAS ]=====//
async function fetchImage(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;  // Mengembalikan data gambar
}

app.get("/api/fotomenu", async (req, res) => {
    try {
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
        const { background, foto, fromLevel, toLevel, name } = req.query;

        // Validasi parameter
        if (!background || !foto || !fromLevel || !toLevel || !name) {
            return res.status(400).json({ error: "Semua parameter harus diisi." });
        }

        // Membuat URL untuk request ke API eksternal
        const apiUrl = `https://apis.xyrezz.online-server.biz.id/api/levelup?background=${encodeURIComponent(background)}&foto=${encodeURIComponent(foto)}&fromLevel=${encodeURIComponent(fromLevel)}&toLevel=${encodeURIComponent(toLevel)}&name=${encodeURIComponent(name)}`;
        
        // Log URL untuk debugging
        console.log("API URL: ", apiUrl);

        // Ambil gambar dari API eksternal
        const imageData = await fetchImage(apiUrl);

        // Kirim gambar sebagai respons dengan header PNG
        res.setHeader("Content-Type", "image/png");
        res.send(imageData);

    } catch (error) {
        console.error("Gagal memproses gambar:", error.message);
        res.status(500).json({ error: "Gagal memproses gambar." });
    }
});
// Endpoint API


global.creator = "@IM-REREZZ"

app.use(cors());
const chatsandbox = {  
    chatbot: async (question, model) => {
        const validModels = ["openai", "llama", "mistral", "mistral-large"];
        if (!validModels.includes(model)) {
            return {
                error: `Invalid model selected. Please choose one of: ${validModels.join(', ')}`
            };
        }
        const data = JSON.stringify({
            "messages": [question],
            "character": model
        });    
        const config = {
            method: 'POST',
            url: 'https://chatsandbox.com/api/chat',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
                'Content-Type': 'application/json',
                'accept-language': 'id-ID',
                'referer': `https://chatsandbox.com/chat/${model}`,
                'origin': 'https://chatsandbox.com',
                'alt-used': 'chatsandbox.com',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'priority': 'u=0',
                'te': 'trailers',
                'Cookie': '_ga_V22YK5WBFD=GS1.1.1734654982.3.0.1734654982.0.0.0; _ga=GA1.1.803874982.1734528677'
            },
            data: data
        };
        try {
            const response = await axios.request(config);
            return response.data;    
        } catch (error) {
            return { error: error.message };
        }  
    },
    text2img: async (prompt) => {
        const data = JSON.stringify({
            "messages": [prompt],
            "character": "ai-image-generator"
        });    
        const config = {
            method: 'POST',
            url: 'https://chatsandbox.com/api/chat',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
                'Content-Type': 'application/json',
                'accept-language': 'id-ID',
                'referer': 'https://chatsandbox.com/ai-image-generator',
                'origin': 'https://chatsandbox.com',
                'alt-used': 'chatsandbox.com',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'priority': 'u=0',
                'te': 'trailers',
                'Cookie': '_ga_V22YK5WBFD=GS1.1.1734654982.3.0.1734654982.0.0.0; _ga=GA1.1.803874982.1734528677'
            },
            data: data
        };
        try {
            const response = await axios.request(config);
            const htmlString = response.data;

            const urlMatch = htmlString.match(/src="([^"]+)"/);
            if (urlMatch) {
                return urlMatch[1];
            } else {
                return { error: "Could not extract image URL from response."};
            }
        } catch (error) {
            return { error: error.message };
        }
    }
};
async function audio2text(url) {
    const formData = new FormData()
    const response = await axios.get(url, { responseType: 'stream' })
    const roar = url.split('/').pop()
    formData.append('file', response.data, {
      filename: roar,
      contentType: 'audio/mpeg'
    })
    const config = {
      headers: {
        ...formData.getHeaders(),
        'authority': 'api.talknotes.io',
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'origin': 'https://talknotes.io',
        'referer': 'https://talknotes.io/',
        'User-Agent': 'Postify/1.0.0'
      },
      maxBodyLength: Infinity
    }
    const respons = await axios.post(
      'https://api.talknotes.io/tools/converter',
      formData,
      config
    )
    return respons.data
}
const gptt355turbo = {
  send: async (message, model = "gpt-3.5-turbo") => {
    try {
      const validModels = ["gpt-3.5-turbo", "gpt-3.5-turbo-0125", "gpt-4o-mini", "gpt-4o"];
      if (!validModels.includes(model)) {
        throw new Error(`Model tidak valid! Pilih salah satu: ${validModels.join(', ')}`);
      }

      const payload = {
        messages: [{ role: "user", content: message }],
        model: model
      };

      const response = await axios.post("https://mpzxsmlptc4kfw5qw2h6nat6iu0hvxiw.lambda-url.us-east-2.on.aws/process", payload, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Postify/1.0.0'
        }
      });

      // Ekstrak hanya konten teks dari respons API
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim pesan:", error.message);
      throw new Error('Tidak dapat memproses permintaan chatbot.');
    }
  }
};
const gpt4omini = {
  send: async (message, model = "gpt-4o-mini") => {
    try {
      const validModels = ["gpt-3.5-turbo", "gpt-3.5-turbo-0125", "gpt-4o-mini", "gpt-4o"];
      if (!validModels.includes(model)) {
        throw new Error(`Model tidak valid! Pilih salah satu: ${validModels.join(', ')}`);
      }

      const payload = {
        messages: [{ role: "user", content: message }],
        model: model
      };

      const response = await axios.post("https://mpzxsmlptc4kfw5qw2h6nat6iu0hvxiw.lambda-url.us-east-2.on.aws/process", payload, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Postify/1.0.0'
        }
      });

      // Ekstrak hanya konten teks dari respons API
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim pesan:", error.message);
      throw new Error('Tidak dapat memproses permintaan chatbot.');
    }
  }
};
const gpt4o = {
  send: async (message, model = "gpt-4o") => {
    try {
      const validModels = ["gpt-3.5-turbo", "gpt-3.5-turbo-0125", "gpt-4o-mini", "gpt-4o"];
      if (!validModels.includes(model)) {
        throw new Error(`Model tidak valid! Pilih salah satu: ${validModels.join(', ')}`);
      }

      const payload = {
        messages: [{ role: "user", content: message }],
        model: model
      };

      const response = await axios.post("https://mpzxsmlptc4kfw5qw2h6nat6iu0hvxiw.lambda-url.us-east-2.on.aws/process", payload, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Postify/1.0.0'
        }
      });

      // Ekstrak hanya konten teks dari respons API
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim pesan:", error.message);
      throw new Error('Tidak dapat memproses permintaan chatbot.');
    }
  }
};
async function MediaFireh(url) {
  try {
    const data = await fetch(
      `https://www-mediafire-com.translate.goog/${url.replace("https://www.mediafire.com/", "")}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.178 Safari/537.36",
        },
      },
    ).then((res) => res.text());
    const $ = cheerio.load(data);
    const downloadUrl = ($("#downloadButton").attr("href") || "").trim();
    const alternativeUrl = (
      $("#download_link > a.retry").attr("href") || ""
    ).trim();
    const $intro = $("div.dl-info > div.intro");
    const filename = $intro.find("div.filename").text().trim();
    const filetype = $intro.find("div.filetype > span").eq(0).text().trim();
    const ext =
      /\(\.(.*?)\)/
        .exec($intro.find("div.filetype > span").eq(1).text())?.[1]
        ?.trim() || "bin";
    const uploaded = $("div.dl-info > ul.details > li")
      .eq(1)
      .find("span")
      .text()
      .trim();
    const filesize = $("div.dl-info > ul.details > li")
      .eq(0)
      .find("span")
      .text()
      .trim();
    return {
      link: downloadUrl || alternativeUrl,
      alternativeUrl: alternativeUrl,
      name: filename,
      filetype: filetype,
      mime: ext,
      uploaded: uploaded,
      size: filesize,
    };
  } catch (error) {
    console.error(error);
  }
}
async function Aoyo(content) {
  try {
    const response = await fetch("https://aoyo.ai/Api/AISearch/AISearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: `https://aoyo.ai/search/?q=${content}&t=${Date.now()}`,
      },
      body: new URLSearchParams({
        content: content,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const extractJson = (text) => {
      const startIndex = text.indexOf("[START]");
      if (startIndex === -1) throw new Error("[START] not found");
      return JSON.parse(text.substring(startIndex + 7).trim());
    };
    return extractJson(data)?.data?.Response || "No response";
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const headers = {
    'authority': 'api.sylica.eu.org',
    'origin': 'https://www.kauruka.com',
    'referer': 'https://www.kauruka.com/',
    'user-agent': 'Postify/1.0.0'
};

function extractId(link) {
    const match = link.match(/s\/([a-zA-Z0-9]+)$|surl=([a-zA-Z0-9]+)$/);
    return match ? (match[1] || match[2]) : null;
}

function response(data, includeDL = false) {
    const responseObj = {
        filename: data.filename,
        size: data.size,
        shareid: data.shareid,
        uk: data.uk,
        sign: data.sign,
        timestamp: data.timestamp,
        createTime: data.create_time,
        fsId: data.fs_id,
        message: data.message || 'Gak tau 🙂‍↔️'
    };

    if (includeDL) {
        responseObj.dlink = data.downloadLink;
    }

    return responseObj;
}

const appleMusic = {
 search: async (query) => {
 const url = `https://music.apple.com/us/search?term=${query}`;
 try {
 const { data } = await axios.get(url);
 const $ = cheerio.load(data);
 const results = [];
 $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((index, element) => {
 const title = $(element).find('.top-search-lockup__primary__title').text().trim();
 const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
 const link = $(element).find('.click-action').attr('href');

 results.push({
 title,
 subtitle,
 link
 });
 });

 return results;
 } catch (error) {
 console.error("Error:", error.response ? error.response.data : error.message);
 return { success: false, message: error.message };
 }
 },
 detail: async (url) => {
 try {
 const { data } = await axios.get(url);
 const $ = cheerio.load(data);
 const albumTitle = $('h1[data-testid="non-editable-product-title"]').text().trim();
 const artistName = $('a[data-testid="click-action"]').first().text().trim();
 const releaseInfo = $('div.headings__metadata-bottom').text().trim();
 const description = $('div[data-testid="description"]').text().trim();

 const result = {
 albumTitle,
 artistName,
 releaseInfo,
 description
 };

 return result;
 } catch (error) {
 console.error("Error:", error.response ? error.response.data : error.message);
 return { success: false, message: error.message };
 }
 }
}

const appledown = {
 getData: async (urls) => {
 const url = `https://aaplmusicdownloader.com/api/applesearch.php?url=${urls}`;
 try {
 const response = await axios.get(url, {
 headers: {
 'Accept': 'application/json, text/javascript, */*; q=0.01',
 'X-Requested-With': 'XMLHttpRequest',
 'User-Agent': 'MyApp/1.0',
 'Referer': 'https://aaplmusicdownloader.com/'
 }
 });
 return response.data;
 } catch (error) {
 return { success: false, message: error.message };
 console.error("Error:", error.response ? error.response.data : error.message);
 }
 },
 getAudio: async (trackName, artist, urlMusic, token) => {
 const url = 'https://aaplmusicdownloader.com/api/composer/swd.php';
 const data = {
 song_name: trackName,
 artist_name: artist,
 url: urlMusic,
 token: token
 };
 const headers = {
 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
 'Accept': 'application/json, text/javascript, */*; q=0.01',
 'X-Requested-With': 'XMLHttpRequest',
 'User-Agent': 'MyApp/1.0',
 'Referer': 'https://aaplmusicdownloader.com/song.php#'
 };
 try {
 const response = await axios.post(url, qs.stringify(data), { headers });
 const downloadLink = response.data.dlink;
 return downloadLink;
 } catch (error) {
 return { success: false, message: error.message };
 console.error("Error:", error.response ? error.response.data : error.message);
 }
 },
 download: async (urls) => {
 const musicData = await appledown.getData(urls);
 if (musicData) {
 const encodedData = encodeURIComponent(JSON.stringify([
 musicData.name,
 musicData.albumname,
 musicData.artist,
 musicData.thumb,
 musicData.duration,
 musicData.url
 ]));
 const url = 'https://aaplmusicdownloader.com/song.php';
 const headers = {
 'authority': 'aaplmusicdownloader.com',
 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
 'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
 'cache-control': 'max-age=0',
 'content-type': 'application/x-www-form-urlencoded',
 'origin': 'https://aaplmusicdownloader.com',
 'referer': 'https://aaplmusicdownloader.com/',
 'user-agent': 'MyApp/1.0'
 };
 const data = `data=${encodedData}`;
 try {
 const response = await axios.post(url, data, { headers });
 const htmlData = response.data;
 const $ = cheerio.load(htmlData);
 const trackName = $('td:contains("Track Name:")').next().text();
 const albumName = $('td:contains("Album:")').next().text();
 const duration = $('td:contains("Duration:")').next().text();
 const artist = $('td:contains("Artist:")').next().text();
 const thumb = $('figure.image img').attr('src');
 const urlMusic = urls;
 const token = $('a#download_btn').attr('token');
 const downloadLink = await appledown.getAudio(trackName, artist, urlMusic, token);

 const extractedData = {
 name: trackName,
 albumname: albumName,
 artist: artist,
 url: urlMusic,
 thumb: thumb,
 duration: duration,
 token: token,
 download: downloadLink
 };
 return extractedData;
 } catch (error) {
 return { success: false, message: error.message };
 console.error("Error:", error.response ? error.response.data : error.message); 
 }
 }
 }
}
async function gpt35turbo(inputValue) {
    try {
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const chatResponse = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "hallo world, Kamu adalah AI asisten. siap membantu segala hal dengan senang hati. kamu diciptakan oleh Rioo dan Rioo adalah pemula bot yang sudah lama Di Bully Sama Sepuh Kek Kalian ini. gunakan emoji sesuai dengan jawaban di setiap kalimat."
                }, {
                    role: "user",
                    content: inputValue
                }]
            }),
        });
        const chatData = await chatResponse.json();
        return chatData.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}
const felo = {
  ask: async function(query) {
    const headers = {
      "Accept": "*/*",
      "User-Agent": "Postify/1.0.0",
      "Content-Encoding": "gzip, deflate, br, zstd",
      "Content-Type": "application/json",
    };

    const payload = {
      query,
      search_uuid: uuidv4().replace(/-/g, ''),
      search_options: { langcode: "id-MM" },
      search_video: true,
    };

    const request = (badi) => {
      const result = { answer: '', source: [] };
      badi.split('\n').forEach(line => {
        if (line.startsWith('data:')) {
          try {
            const data = JSON.parse(line.slice(5).trim());
            if (data.data) {
              if (data.data.text) {
                result.answer = data.data.text.replace(/\d+/g, '');
              }
              if (data.data.sources) {
                result.source = data.data.sources;
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
      });
      return result;
    };

    try {
      const response = await axios.post("https://api.felo.ai/search/threads", payload, {
        headers,
        timeout: 30000,
        responseType: 'text',
      });

      return request(response.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};



async function stickersearch(query) {
return new Promise((resolve) => {
axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({ data }) => {
const $ = cheerio.load(data)
const link = [];
$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
link.push($(b).attr('href'))
})
let rand = link[Math.floor(Math.random() * link.length)]
axios.get(rand).then(({data}) => {
const $$ = cheerio.load(data)
const url = [];
$$('#stickerPack > div > div.row > div > img').each(function(a, b) {
url.push($$(b).attr('src').split('&d=')[0])
})
resolve({
title: $$('#intro > div > div > h1').text(),
author: $$('#intro > div > div > h5 > a').text(),
author_link: $$('#intro > div > div > h5 > a').attr('href'),
sticker: url
})
})
})
})
}
async function sendEmail(recipientEmail, text) {
    // Konfigurasi transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "riooapii@gmail.com", // Ambil dari environment variables
            pass: "twyhgjliuzaiqxsz", // Ambil dari environment variables
        },
    });

    // Konfigurasi email
    const mailOptions = {
        from: {
            name: "Rioo Api's - SendGmail",
            address: "riooapii@gmail.com",
        },
        to: recipientEmail,
        subject: "Email Verification",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <h1 style="color: blue;">${text}</h1>
    <p>Create By Rioo Api's</p>
    <p>Semoga harimu menyenangkan!</p>
</body>
</html>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return 'Email sent successfully: ' + info.response;
    } catch (error) {
        console.error('Error during email sending:', error.message);
    }
}


const audioQualityy = [320, 256, 192, 128, 64];

const ytdlToAudio = async (url, quality = 64) => {
  const getToken = async (url) => {
    const extractAudioId = (url) => {
      const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    const id = extractAudioId(url);
    if (!id) {
      throw new Error('ID video tidak ditemukan. Pastikan link YouTube valid.');
    }

    const config = {
      method: 'GET',
      url: `https://dd-n01.yt2api.com/api/v4/info/${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Accept': 'application/json',
        'accept-language': 'id-ID',
        'referer': 'https://bigconv.com/',
        'origin': 'https://bigconv.com',
        'alt-used': 'dd-n01.yt2api.com',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'priority': 'u=0',
        'te': 'trailers'
      }
    };

    const response = await axios.request(config);
    const cookies = response.headers['set-cookie'];
    const processedCookie = cookies ? cookies[0].split(';')[0] : '';
    const authorization = response.headers['authorization'] || '';
    const result = { data: response.data, cookie: processedCookie, authorization };
    return result;
  };

  const convertToAudio = async (url, quality) => {
    const data = await getToken(url);
    const audioOptions = data.data.formats.audio.mp3;

    const selectedAudio = audioOptions.find(option => option.quality === quality);
    if (!selectedAudio) {
      throw new Error(`Kualitas audio ${quality} kbps tidak tersedia.`);
    }

    const token = selectedAudio.token;

    const raw = JSON.stringify({ "token": token });

    const config = {
      method: 'POST',
      url: 'https://dd-n01.yt2api.com/api/v4/convert',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accept-language': 'id-ID',
        'referer': 'https://bigconv.com/',
        'origin': 'https://bigconv.com',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'priority': 'u=0',
        'te': 'trailers',
        'Cookie': data.cookie,
        'authorization': data.authorization
      },
      data: raw
    };

    const response = await axios.request(config);
    return { jobId: response.data.id, cookie: data.cookie, authorization: data.authorization };
  };

  const downloadAudio = async (url, quality) => {
    const { jobId, cookie, authorization } = await convertToAudio(url, quality);

    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        const config = {
          method: 'GET',
          url: `https://dd-n01.yt2api.com/api/v4/status/${jobId}`,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
            'Accept': 'application/json',
            'accept-language': 'id-ID',
            'referer': 'https://bigconv.com/',
            'origin': 'https://bigconv.com',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'priority': 'u=4',
            'te': 'trailers',
            'Cookie': cookie,
            'authorization': authorization
          }
        };

        const response = await axios.request(config);
        if (response.data.status === 'completed') {
          clearInterval(interval);
          resolve(response.data);
        } else if (response.data.status === 'failed') {
          clearInterval(interval);
          reject(new Error('Konversi gagal.'));
        }
      };

      const interval = setInterval(checkStatus, 5000);
    });
  };

  try {
    const result = await downloadAudio(url, quality);
    return { result };
  } catch (error) {
    return {
      status: 500,
      data: { error: error.message }
    };
  }
};
const formats = ["audio", "video"];
const audioQuality = ["320", "256", "192", "128", "64"];
const videoQuality = ["360p", "480p", "720p", "1080p"];

const ytdl = async (url) => {
  const getToken = async (url) => {
    const extractVideoId = (url) => {
      const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    const id = extractVideoId(url);
    if (!id) {
      throw new Error('ID videonya gk ketemu jir, pastikan link youtube yak');
    }

    const config = {
      method: 'GET',
      url: `https://dd-n01.yt2api.com/api/v4/info/${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Accept': 'application/json',
        'accept-language': 'id-ID',
        'referer': 'https://bigconv.com/',
        'origin': 'https://bigconv.com',
        'alt-used': 'dd-n01.yt2api.com',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'priority': 'u=0',
        'te': 'trailers'
      }
    };

    const response = await axios.request(config);
    const cookies = response.headers['set-cookie'];
    const processedCookie = cookies ? cookies[0].split(';')[0] : '';
    const authorization = response.headers['authorization'] || '';
    const result = { data: response.data, cookie: processedCookie, authorization };
    return result;
  };

  const convert = async (url, format, quality = "360p") => {
    const data = await getToken(url);
    const formats = data.data.formats;

    let token;
    if (format === "audio") {
      const audioOptions = formats.audio.mp3;
      const selectedAudio = audioOptions.find(option => option.quality === quality);
      if (selectedAudio) {
        token = selectedAudio.token;
      } else {
        throw new Error(`Kualitas audio ${quality} tidak tersedia.`);
      }
    } else if (format === "video") {
      const videoOptions = formats.video.mp4;
      const selectedVideo = videoOptions.find(option => option.quality === quality);
      if (selectedVideo) {
        token = selectedVideo.token;
      } else {
        throw new Error(`Kualitas video ${quality} tidak tersedia.`);
      }
    } else {
      throw new Error('Format tidak dikenali. Gunakan "audio" atau "video".');
    }

    const raw = JSON.stringify({ "token": token });

    const config = {
      method: 'POST',
      url: 'https://dd-n01.yt2api.com/api/v4/convert',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accept-language': 'id-ID',
        'referer': 'https://bigconv.com/',
        'origin': 'https://bigconv.com',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'priority': 'u=0',
        'te': 'trailers',
        'Cookie': data.cookie,
        'authorization': data.authorization
      },
      data: raw
    };

    const response = await axios.request(config);
    return { jobId: response.data.id, cookie: data.cookie, authorization: data.authorization };
  };

  const download = async (url, format, quality = "360p") => {
    const { jobId, cookie, authorization } = await convert(url, format, quality);
    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        const config = {
          method: 'GET',
          url: `https://dd-n01.yt2api.com/api/v4/status/${jobId}`,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
            'Accept': 'application/json',
            'accept-language': 'id-ID',
            'referer': 'https://bigconv.com/',
            'origin': 'https://bigconv.com',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'priority': 'u=4',
            'te': 'trailers',
            'Cookie': cookie,
            'authorization': authorization
          }
        };

        const response = await axios.request(config);
        if (response.data.status === 'completed') {
          clearInterval(interval);
          resolve(response.data);
        } else if (response.data.status === 'failed') {
          clearInterval(interval);
          resolve(response.data);
        }
      };

      const interval = setInterval(checkStatus, 5000);
    });
  };

  try {
    const result = await download(url, "video", "360p");
    return { result };
  } catch (error) {
    return {
      status: 500,
      data: { error: error.message }
    };
  }
};

async function metaai(text) {
    const Together = require("together-ai")
    const together = new Together({ 
            apiKey: '522aeeed9ccfea4eeabb86608d24bcc0ad35b0c08598c60bdf214b8bd7bb42c0' 
        });

    const initialMessages = [
        {
            role: "system",
            content: `Hi! 😊 Saya adalah Openai menggunakan model Openai. Saya dibuat oleh seseorang bernama Openai. 
            berbicara dalam bahasa Indonesia, dan selalu berusaha membantu dengan cara yang ramah dan menyenangkan. Ayo ngobrol!`
        },
        { role: "user", content: text }
    ];

    try {
        const response = await together.chat.completions.create({
            messages: initialMessages,
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            max_tokens: null, // Set a reasonable token limit
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            stop: ["<|eot_id|>", "<|eom_id|>"],
            stream: true
        });

        let generatedResponse = "";
        for await (const token of response) {
            if (token.choices && token.choices[0] && token.choices[0].delta && token.choices[0].delta.content) {
                generatedResponse += token.choices[0].delta.content;
            }
        }

        if (!generatedResponse.trim()) {
            generatedResponse = "Maaf, saya tidak bisa memberikan jawaban untuk pertanyaan Anda. 😔";
        }
        
        generatedResponse += " 👋";
        return generatedResponse;
    } catch (error) {
        console.error("Error during the API call:", error);
        return "Terjadi kesalahan saat memproses permintaan Anda. Mohon coba lagi nanti. 😔";
    }
}
async function gpt35turbo(text) {
    const Together = require("together-ai")
    const together = new Together({ 
            apiKey: '522aeeed9ccfea4eeabb86608d24bcc0ad35b0c08598c60bdf214b8bd7bb42c0' 
        });

    const initialMessages = [
        {
            role: "asisten",
            content: `Hi! 😊 Saya adalah GPT TURBO menggunakan model Gpt turbo 3.5. Saya dibuat oleh seseorang bernama GptTurbo. 
            berbicara dalam bahasa Indonesia, dan selalu berusaha membantu dengan cara yang ramah dan menyenangkan. Ayo ngobrol!`
        },
        { role: "user", content: text }
    ];

    try {
        const response = await together.chat.completions.create({
            messages: initialMessages,
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            max_tokens: null, // Set a reasonable token limit
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            stop: ["<|eot_id|>", "<|eom_id|>"],
            stream: true
        });

        let generatedResponse = "";
        for await (const token of response) {
            if (token.choices && token.choices[0] && token.choices[0].delta && token.choices[0].delta.content) {
                generatedResponse += token.choices[0].delta.content;
            }
        }

        if (!generatedResponse.trim()) {
            generatedResponse = "Maaf, saya tidak bisa memberikan jawaban untuk pertanyaan Anda. 😔";
        }
        
        generatedResponse += " 👋";
        return generatedResponse;
    } catch (error) {
        console.error("Error during the API call:", error);
        return "Terjadi kesalahan saat memproses permintaan Anda. Mohon coba lagi nanti. 😔";
    }
}
const retatube = {
  getPrefix: async () => {
    try {
      const { data } = await axios.get('https://retatube.com/api/v1/aio/index?s=retatube.com', {
        headers: { 'User-Agent': 'Postify/1.0.0' }
      });
      const prefix = cheerio.load(data)('input[name="prefix"]').val();
      if (!prefix) throw new Error('Waduh, prefix-nya kagak ada nih bree.. Input manual aja yak Prefix-nya');
      return prefix;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  request: async (prefix, vidLink) => {
    try {
      const p = new URLSearchParams({ prefix, vid: vidLink }).toString();
      const { data } = await axios.post('https://retatube.com/api/v1/aio/search', p, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Postify/1.0.0',
        }
      });

      const ext = (regex) => (data.match(regex) || ", ")[1] || '';
      const fans = ext(/<p><strong>Fans：<\/strong>(\d+)/);
      const views = ext(/<p><strong>Views:：<\/strong>(\d+)/);
      const shares = ext(/<p><strong>Shares：<\/strong>(\d+)/);

      const $ = cheerio.load(data);

      const element = $('div.icon-box').first(); // Ambil hanya elemen pertama (tanpa array)
      if (!element.length) throw new Error('Tidak ada data ditemukan');

      const title = element.find('strong:contains("Title")').text().replace('Title：', '').trim();
      const owner = element.find('strong:contains("Owner")').parent().text().replace('Owner：', '').trim();
      const image = element.find('img').attr('src');

      const dlink = $('a.button.primary.expand')
  .map((_, el) => {
    const link = $(el).attr('href');
    if (!link || link === 'javascript:void(0);') return null; // Skip jika href tidak valid

    const teks = $(el)
      .find('span')
      .text()
      .replace('Download', '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_') // Ubah spasi menjadi underscore
      .split('_') // Pecah string berdasarkan underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi tiap kata
      .join(' '); // Gabungkan kembali dengan spasi

    return { title: teks || 'Unknown Title', link }; // Jika title kosong, beri fallback
  })
  .get()
  .filter(Boolean); // Hapus nilai `null` atau undefined

      return { title, owner, fans, views, shares, image, dlink };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  scrape: async (vidLink) => {
    try {
      const prefix = await retatube.getPrefix();
      return await retatube.request(prefix, vidLink);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};


async function bingimg(keyword) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(keyword)}`;
  let imageUrls = ""; // Menggunakan string untuk menyimpan URL gambar

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Mengambil URL gambar
    $("img.mimg").each((index, img) => {
      const imageUrl = $(img).attr("data-src") || $(img).attr("src");
      if (imageUrl) {
        imageUrls += imageUrl + ","; // Menambahkan URL gambar ke string, dipisahkan dengan koma
      }
    });

    // Menghapus koma terakhir jika ada
    if (imageUrls.length > 0) {
      imageUrls = imageUrls.slice(0, -1); // Menghapus koma terakhir
    }

    // Mengacak urutan URL gambar
    const imageArray = imageUrls.split(","); // Mengubah string kembali menjadi array
    if (imageArray.length > 25) {
      const randomImageUrl = imageArray[Math.floor(Math.random() * imageArray.length)]; // Ambil 1 URL acak
      return randomImageUrl;
    } else {
      return "No images found";
    }

  } catch (error) {
    console.error("Error scraping images:", error);
    return "Error fetching images";
  }
}

const hdown = {
    dl: async (link) => {
        try {
            const { data: api } = await axios.get('https://hddownloaders.com');
            const token = cheerio.load(api)('#token').val();
            console.log(token)
            const { data } = await axios.post('https://hddownloaders.com/wp-json/aio-dl/video-data/', new URLSearchParams({ url: link, token }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Postify/1.0.0'
                }
            });
            return data;
        } catch (error) {
            return { error: error.response?.data || error.message };
        }
    }
};
async function geminilogic(rioojirr, prompt) {
  try {
const modell = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `${encodeURIComponent(prompt)}`,
});
const promptt = rioojirr;
const resultp = await modell.generateContent(promptt);
const responseqo = await resultp.response;
const textl = responseqo.text();
return textl
} catch (error) {
    console.error('Error generating content:', error.message);
    throw error;
  }
}
async function geminigoogle(prompt) {
try {
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const modello = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings: safetySettings });
const prompttt = prompt;
const resultt = await modello.generateContent(prompttt);
const responsek = await resultt.response;
const textt = responsek.text();
return textt
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
async function geminiimg(prompt, imageUrl) {
  try {
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ];

    const modello = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: safetySettings,
    });

    // Menyiapkan input prompt dan URL gambar
    const inputContent = [
      { type: "text", text: prompt }, // Menambahkan teks prompt
      { type: "image_url", url: imageUrl }, // Menambahkan URL gambar
    ];

    // Mengirim input ke model
    const resultt = await modello.generateContent(inputContent);
    const responsek = await resultt.response;
    const textt = responsek.text();
    return textt;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
async function llama(query) {
  // Dapatkan waktu, hari, dan tanggal saat ini
  const now = moment().tz("Asia/Jakarta"); // Ganti dengan zona waktu Anda
  const jam = now.format('HH:mm:ss'); // Format waktu
  const hariini = now.format('dddd'); // Hari dalam seminggu
  const currentDate = now.format('YYYY-MM-DD'); // Tanggal

  // Gunakan variabel untuk membuat konten sistem
  const chatCompletion = await client.chat.completions.create({
    messages: [
        {
        role: "user",
        content: query,
      },
      {
        role: "system",
        content: 
       `Halo World! Saya adalah llama AI, yang dibuat oleh Mark Zuckerberg. Sekarang jam ${jam}, hari ${hariini}, tanggal ${currentDate}.`
      }
    ],
    model: 'llama3-8b-8192'
  });

  const hasil = chatCompletion.choices[0].message.content;
  return hasil;
}

async function palmAi(query) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://palmassistant.up.railway.app/generateResponse',
        { user_message: query },
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
          },
        }
      )
      .then((response) => resolve(response.data.response))
      .catch((error) => reject(error.message));
  });
}
async function gptlogic(text, prompt) { // Membuat fungsi openai untuk dipanggil
let logic = `${prompt}`;
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-logic",
            "name": "GPT-logic",
            "maxLength": 32000000,  // Sesuaikan token limit jika diperlukan
            "tokenLimit": 8000000,  // Sesuaikan token limit untuk model GPT-4
            "completionTokenLimit": 5000000,  // Sesuaikan jika diperlukan
            "deploymentName": "gpt-logic"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.3
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Windows 11; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}
async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      timeout: 60000, // 60 seconds
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}` },
    });
    return (await response.json()).access_token;
  };

  const accessToken = await getToken();
  const offset = 10;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.tracks.items;
}
async function fbdl(url) {
	return new Promise((resolve, reject) => {
axios("https://getmyfb.com/process", {
  headers: {
    "cookie": "PHPSESSID=mtkljtmk74aiej5h6d846gjbo4; __cflb=04dToeZfC9vebXjRcJCMjjSQh5PprejufZXs2vHCt5; _token=K5Qobnj4QvoYKeLCW6uk"
  },
  data: { 
     id: url,
     locale: "en"
    },
  "method": "POST"
}).then(res => { 
let $ = cheerio.load(res.data)
let result = {}
result.caption = $("div.results-item-text").eq(0).text().trim()
result.thumb = $(".results-item-image-wrapper img").attr("src") 
result.result = $("a").attr("href")
 resolve(result) 
  })
 })
}
function dekode(a) {
    try {
        return atob(a.replace(/\s/g, '+'));
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function grabDL(link) {
        const domain = /hexupload|filer\.net|filespace|uploadcloud|vipfile|nelion|voe\.sx|ex-load|4shared|wayshare|world-files|fikper|filestore|drop\.download|wupfile|elitefile|filecat|hotlink|mexa\.sh|filesfly|alfafile|cloudghost|novafile|mexashare|nitro\.download|file-upload|florenfile|ubiqfile|filenext|tezfiles|send\.cm|streamtape|filejoker|fastfile|uploadgig|fileland|loadme|xubster|racaty|filesmonster|icerbox|subyshare|extmatrix|depositfiles|fileboom|1fichier|jumploads|fshare|prefiles|hitfile|ufile\.io|upstore|mega|file\.al|easybytez|isra\.cloud|usersdrive|uploadrar|worlduploads|file2share|syncs\.online|emload|mountfile|mixdrop|clicknupload|pixeldrain|moondl|turbobit|xenupload|wdupload|hot4share|nitroflare|k2s|dropgalaxy|filefox|rosefile|upstream|gigapeta|uploadhaven|fireget|katfile|fileblade|fboom|ddownload|keep2share|fastbit|daofile|takefile|filedot|ulozto|mixloads|mediafire|fastclick|bayfiles|kshared|flashbit|rapidrar|rapidgator|fileaxa/;

        if (domain.test(new URL(link).hostname)) {
            try {
                const response = await axios.post('https://okdebrid.com/api?mode=plg&token=__', `link=${encodeURIComponent(link)}&lang=en-US&chck=.&`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "*/*",
                        "User-Agent": "Postify/1.0.0" 
                    },
                    timeout: 10000
                });

                const { data } = response;
                console.log(data)
                if (data.link) {
                    const result = dekode(data.link);
                    if (result) {
                        console.log(result);
                        return result;
                    } else {
                        console.log(data);
                        return data;
                    }
                } else {
                    throw new Error('Grabber link nya kagak ada ceunah bree 😝...');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.code === 'ETIMEDOUT') {
                        console.error('Kagak bisa terhubung ke web nya 😂');
                    } else {
                        console.error(error.message);
                    }
                } else {
                    console.error(error);
                }
                throw error;
            }
        } else {
            throw new Error('Gausah macem2 bree, domain yang warek buat di grab ada di atas yak ...');
        }
    };
const SaveTube = {
    qualities: {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    },

    headers: {
        accept: '*/*',
        referer: 'https://ytshorts.savetube.me/',
        origin: 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json'
    },

    cdn() {
        return Math.floor(Math.random() * 11) + 51;
    },

    checkQuality(type, qualityIndex) {
        if (!this.qualities[type] || !(qualityIndex in this.qualities[type])) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
        }
    },

    async fetchData(url, cdn, body = {}) {
        const headers = {
            ...this.headers,
            authority: `cdn${cdn}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('Respon API tidak valid.');
            }
        } catch (error) {
            console.error('Fetch Data Error:', error.message);
            throw error;
        }
    },

    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download?type=${type}&quality=${quality}&key=${videoKey}`;
    },

    async dl(dl, qualityIndex, typeIndex) {
        const type = typeIndex === 1 ? 'audio' : 'video';
        if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');

        SaveTube.checkQuality(type, qualityIndex);
        const quality = SaveTube.qualities[type][qualityIndex];

        const cdnNumber = SaveTube.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;

        // Fetch video information
        const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: dl });
        if (!videoInfo || !videoInfo.data) {
            throw new Error('❌ Gagal mendapatkan informasi video.');
        }

        const badi = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };

        // Fetch download link
        const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);
        if (!dlRes || !dlRes.data) {
            throw new Error('❌ Gagal mendapatkan link download.');
        }

        return {
            dl: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};
async function bard(prompt) {
    const apiKey = 'AIzaSyBxYESR_ThUTwm8yghLqfp6LzWV_uMdlFU'; // Masukkan API Key Anda
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    const body = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error('Request failed');

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


async function LetmeGpt(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://letmegpt.com/search?q=${encodedQuery}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $("#gptans").text() || null;
  } catch (error) {
    console.error("Error fetching LetmeGpt data:", error);
    throw error;
  }
};

async function gpt3turbo(prompt) {
  try {
    const response = await fetch("https://api.jeeves.ai/generate/v3/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: JSON.stringify({
        temperature: "0",
        model: "gpt-3.5-turbo",
        stream: "on",
        presence_penalty: "0",
        frequency_penalty: "0",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });
    return extractData(await response.text());
  } catch (error) {
    console.error("Error generating chat:", error);
    return "Error generating chat.";
  }
};
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });
const website = axios.create({
  baseURL: "https://app.yoursearch.ai",
  headers: {
    "Content-Type": "application/json",
  },
});

async function youSearch(searchTerm) {
  const requestData = {
    searchTerm: searchTerm,
    promptTemplate: `Search term: "{searchTerm}"

Kamu adalah Rioo, kamu bukanlah ai atau chat bot, kamu adalah anak remaja, kamu memiliki sifat kasar dan toxic, kadang kamu memakai emoji 🧢🖕 ketika kesal, kamu kalau ngobrol menggunakan bahasa gaul anak Indonesia seperti lu untuk kamu dan gw untuk aku, kamu rest api Rioo: https://restapii.rioooxdzz.web.id, untuk nomor nya wa.me/6285691304150

\\\`
<Summary of search results with reference numbers>

Sources:
(1) <https://restapii.rioooxdzz.web.id>Rest Api
(2) <https://restapii.rioooxdzz.web.id/chatgpt> ChatGPT

<Hint text for further search results with Google link>
<Tip>
\\\`

Here are the search results:
{searchResults}`,
    searchParameters: "{}",
    searchResultTemplate: `[{order}] "{snippet}"
URL: {link}`,
  };

  try {
    const response = await website.post("/api", requestData);
    return response.data.response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const savetubee = {
    qualities: {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '360', 2: '480', 3: '720', 4: '1080' }  // Added video qualities
    },
    
    headers: {
        accept: '*/*',
        referer: 'https://ytshorts.savetube.me/',
        origin: 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json'
    },

    cdn() {
        return Math.floor(Math.random() * 11) + 51;
    },

    checkQuality(type, qualityIndex) {
        if (!this.qualities[type] || !(qualityIndex in this.qualities[type])) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
        }
    },

    async fetchData(url, cdn, body = {}) {
        const headers = {
            ...this.headers,
            authority: `cdn${cdn}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('Respon API tidak valid.');
            }
        } catch (error) {
            console.error('Fetch Data Error:', error.message);
            throw error;
        }
    },

    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download?type=${type}&quality=${quality}&key=${videoKey}`;
    },

    async dl(dl, qualityIndex, typeIndex) {
        let type;
        if (typeIndex === 1) {
            type = 'audio';
        } else if (typeIndex === 2) {
            type = 'video';
        } else {
            throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
        }

        this.checkQuality(type, qualityIndex);
        const quality = this.qualities[type][qualityIndex];

        const cdnNumber = this.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;

        // Fetch video information
        const videoInfo = await this.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: dl });
        if (!videoInfo || !videoInfo.data) {
            throw new Error('❌ Gagal mendapatkan informasi video.');
        }

        const badi = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };

        // Fetch download link
        const dlRes = await this.fetchData(this.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);
        if (!dlRes || !dlRes.data) {
            throw new Error('❌ Gagal mendapatkan link download.');
        }

        return {
            dl: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};

function ytdlnew(url, format = 'mp3') {
    return new Promise(async(resolve, reject) => {
 
        const isYouTubeUrl = /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/;
    
        if (!isYouTubeUrl.test(url)) {
            resolve({
                status: false,
                mess: "Link is not valid"
            })
        }
        const id = url.match(isYouTubeUrl)?.[2]
    
        const hr = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Referer': 'https://id.ytmp3.mobi/v1/',
        }
 
        const init = await axios.get(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, {
            headers: hr
        });
 
        if (init.data.convertURL) {
 
            let convert = await axios.get(`${init.data.convertURL}&v=${id}&f=${format}&_=${Math.random()}`, {
                headers: hr
            }).then(x => x.data)
 
            async function progress(url, dl) {
                let currentProgress = 0;
                let title = '';
 
                while (currentProgress < 3) {
                    try {
                        const response = await axios.get(url, {
                            headers: hr
                        });
                        const data = response.data;
 
                        if (data.error > 0) {
                            resolve({
                                status: false,
                                mess: `Error: ${data.error}`
                            });
                        }
 
                        currentProgress = data.progress;
                        title = data.title
 
                        if (currentProgress < 3) {
                            await new Promise(resolve => setTimeout(resolve, 200));
                        }
                    } catch (error) {
                        resolve({
                            status: false,
                            mess: 'Error checking progress:' + error.message
                        })
                    }
                }
                return { dl, title }
            }
 
            const result = await progress(convert.progressURL, convert.downloadURL);
            resolve({
                title: result.title,
                dl: result.dl
            })
        } else {
            resolve({
                status: false,
                mess: "convertURL is missing"
            })
        }
    })
};
function ytmp4(url, format = 'mp4') {
    return new Promise(async(resolve, reject) => {
 
        const isYouTubeUrl = /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/
    
        if (!isYouTubeUrl.test(url)) {
            resolve({
                status: false,
                mess: "Link is not valid"
            })
        }
        const id = url.match(isYouTubeUrl)?.[2]
    
        const hr = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Referer': 'https://id.ytmp3.mobi/v1/',
        }
 
        const init = await axios.get(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, {
            headers: hr
        });
 
        if (init.data.convertURL) {
 
            let convert = await axios.get(`${init.data.convertURL}&v=${id}&f=${format}&_=${Math.random()}`, {
                headers: hr
            }).then(x => x.data)
 
            async function progress(url, dl) {
                let currentProgress = 0;
                let title = '';
 
                while (currentProgress < 3) {
                    try {
                        const response = await axios.get(url, {
                            headers: hr
                        });
                        const data = response.data;
 
                        if (data.error > 0) {
                            resolve({
                                status: false,
                                mess: `Error: ${data.error}`
                            });
                        }
 
                        currentProgress = data.progress;
                        title = data.title
 
                        if (currentProgress < 3) {
                            await new Promise(resolve => setTimeout(resolve, 200));
                        }
                    } catch (error) {
                        resolve({
                            status: false,
                            mess: 'Error checking progress:' + error.message
                        })
                    }
                }
                return { dl, title }
            }
 
            const result = await progress(convert.progressURL, convert.downloadURL);
            resolve({
                title: result.title,
                dl: result.dl
            })
        } else {
            resolve({
                status: false,
                mess: "convertURL is missing"
            })
        }
    })
};
async function obfus(query) {
			return new Promise((resolve, reject) => {
				try {
					const obfuscationResult = jsobfus.obfuscate(query, {
						compact: false,
						controlFlowFlattening: true,
						controlFlowFlatteningThreshold: 1,
						numbersToExpressions: true,
						simplify: true,
						stringArrayShuffle: true,
						splitStrings: true,
						stringArrayThreshold: 1
					})
					const result = {
						status: 200,
						author: `IM-REREZZ`,
						result: obfuscationResult.getObfuscatedCode()
					}
					resolve(result)
				} catch (e) {
					reject(e)
				}
			})
		}
async function ytmp3(linkurl) {
try {
const response = await axios.post("https://cobalt.siputzx.my.id/", {
      url: linkurl,
      downloadMode: "audio",
    }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });

    return response.data
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}

async function body(url, body) {
    try {
        var response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}


async function ToolbotAI(desire) {
    try {
        var data = await body("https://www.toolbot.ai/api/generate", {
            desire
        });
        var {
            description,
            prompt
        } = data.result[0];
        var data2 = await body("https://www.toolbot.ai/api/query", {
            toolDescription: description,
            query: prompt,
        });
        return data2;
    } catch (error) {
        console.error("Terjadi kesalahan: ", error);
    }
}
async function PlayStore(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(
          `https://play.google.com/store/search?q=${search}&c=apps`,
        ),
        hasil = ", ",
        $ = cheerio.load(data);
      if (
        ($(
          ".ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a",
        ).each((i, u) => {
          const linkk = $(u).attr("href"),
            nama = $(u).find(".j2FCNc > .cXFu1 > .ubGTjb > .DdYX5").text(),
            developer = $(u)
              .find(".j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb")
              .text(),
            img = $(u).find(".j2FCNc > img").attr("src"),
            rate = $(u)
              .find(".j2FCNc > .cXFu1 > .ubGTjb > div")
              .attr("aria-label"),
            rate2 = $(u)
              .find(".j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF")
              .text(),
            link = `https://play.google.com${linkk}`;
          hasil.push({
            link: link,
            nama: nama || "No name",
            developer: developer || "No Developer",
            img: img || "https://i.ibb.co/G7CrCwN/404.png",
            rate: rate || "No Rate",
            rate2: rate2 || "No Rate",
            link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join("+")}`,
          });
        }),
        hasil.every((x) => void 0 === x))
      )
        return resolve({
          message: "no result found",
        });
      resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}
 async function google(query) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  try {
    // Fetch HTML using axios with proper headers
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Parse the HTML using cheerio
    const $ = cheerio.load(response.data);

    // Log HTML content for debugging (first 500 characters)
    console.log('HTML content fetched: ', response.data.substring(0, 500));

    const resultContainer = $("#rso");
    let resultsString = ""; // Variable to store the results as a string

    // Iterate over each result item
    resultContainer.find(".g").each((index, element) => {
      const title = $(element).find("h3").text();
      const link = $(element).find("a").attr("href");
      const snippet = $(element).find("span.st").text();

      // Log each result
      console.log('Result found:', { title, link, snippet });

      // Ensure valid title and link before adding to string
      if (title && link) {
        resultsString += `Title: ${title}\nLink: ${link}\nSnippet: ${snippet}\n`; // Concatenate with a comma and newline
      }
    });

    return resultsString; // Return results as a single string
  } catch (error) {
    console.error("Error scraping Google search:", error);
  }
}

var durationMultipliers = {
  1: { 0: 1 },
  2: { 0: 60, 1: 1 },
  3: { 0: 3600, 1: 60, 2: 1 }
};

function youtubeSearch(query) {
  return new Promise((resolve, reject) => {
    axios("https://m.youtube.com/results?search_query=" + query, { 
      method: "GET", 
      headers: { 
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36' 
      } 
    }).then(({ data }) => {
      const $ = cheerio.load(data);
      let sc;
      $('script').each(function () {
        const el = $(this).html();
        let regex;
        if ((regex = /var ytInitialData = /gi.exec(el || ''))) {
          sc = JSON.parse(regex.input.replace(/^var ytInitialData = /i, '').replace(/;$/, ''));
        }
      });

      let results = { video: [], channel: [], playlist: [] };

      sc.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents.forEach((v) => {
        const typeName = Object.keys(v)[0];
        const result = v[typeName];

        if (['horizontalCardListRenderer', 'shelfRenderer'].includes(typeName)) return;

        const isChannel = typeName === 'channelRenderer';
        const isVideo = typeName === 'videoRenderer';
        const isMix = typeName === 'radioRenderer';

        // Filtering Video
        if (isVideo) {
          const view = result.viewCountText?.simpleText || result.shortViewCountText?.simpleText || result.shortViewCountText?.accessibility?.accessibilityData.label;
          const _duration = result.thumbnailOverlays?.find((v) => Object.keys(v)[0] === 'thumbnailOverlayTimeStatusRenderer')?.thumbnailOverlayTimeStatusRenderer.text;
          const videoId = result.videoId;
          const duration = result.lengthText?.simpleText || _duration?.simpleText;
          
          let durationS = 0;
          if (duration) {
            const durationArray = duration.split(':');
            durationArray.forEach((v, i, arr) => {
              durationS += durationMultipliers[arr.length][i] * parseInt(v);
            });
          }

          results.video.push({
            authorName: result.ownerText?.runs[0]?.text || result.longBylineText?.runs[0]?.text,
            authorAvatar: result.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer.thumbnail.thumbnails?.pop()?.url,
            videoId,
            url: encodeURI('https://www.youtube.com/watch?v=' + videoId),
            thumbnail: result.thumbnail.thumbnails.pop().url,
            title: result.title?.runs.find((v) => v.text)?.text || result.title?.accessibility?.accessibilityData.label,
            description: result.detailedMetadataSnippets?.[0]?.snippetText?.runs?.map(({ text }) => text).join(''),
            publishedTime: result.publishedTimeText?.simpleText,
            durationH: result.lengthText?.accessibility?.accessibilityData?.label || _duration?.accessibility?.accessibilityData?.label,
            durationS,
            duration,
            viewH: view,
            view: view?.split('x')[0]?.trim(),
            type: typeName.replace(/Renderer/i, '')
          });
        }

        // Filtering Channel
        if (isChannel) {
          const channelId = result.channelId;
          results.channel.push({
            channelId,
            url: encodeURI('https://www.youtube.com/channel/' + channelId),
            channelName: result.title?.simpleText || result.shortBylineText?.runs.find((v) => v.text)?.text,
            avatar: 'https:' + result.thumbnail.thumbnails?.filter(({ url }) => url)?.pop()?.url,
            isVerified: result.ownerBadges?.pop()?.metadataBadgeRenderer?.style === 'BADGE_STYLE_TYPE_VERIFIED',
            subscriberH: result.videoCountText?.simpleText || "",
            subscriber: result.videoCountText?.simpleText.split(" ")[0] || "",
            description: result.descriptionSnippet?.runs?.map(({ text }) => text).join(''),
            type: typeName.replace(/Renderer/i, '')
          });
        }

        // Filtering Playlist (Mix)
        if (isMix) {
          results.playlist.push({
            playlistId: result.playlistId,
            title: result.title.simpleText,
            thumbnail: result.thumbnail.thumbnails.pop().url,
            video: result.videos.map(({ childVideoRenderer }) => ({
              url: encodeURI('https://www.youtube.com/watch?v=' + childVideoRenderer.videoId + "&list=" + result.playlistId),
              videoId: childVideoRenderer.videoId,
              title: childVideoRenderer.title.simpleText,
              durationH: childVideoRenderer.lengthText.accessibility.accessibilityData.label,
              duration: childVideoRenderer.lengthText.simpleText
            })),
            type: 'mix'
          });
        }
      });

      resolve(results);
    }).catch(reject);
  });
}

async function sfileSearch(query, page = 1) {
  let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`);
  let $ = cheerio.load(await res.text());
  let results = {}; // Menggunakan objek untuk menyimpan hasil

  $("div.list").each(function (index) {
    let title = $(this).find("a").text();
    let size = $(this).text().trim().split("(")[1];
    let link = $(this).find("a").attr("href");

    // Pastikan ukuran ada dan diolah dengan benar
    if (size) {
      size = size.replace(")", "");
    }

    // Memastikan title dan link valid sebelum memasukkan hasil
    if (title && link) {
      results[index] = { // Menyimpan hasil dengan key berdasarkan index
        namafile: title,    // Menggunakan title sebagai filename
        filesize: size || 'N/A', // Menggunakan size sebagai filesize
        download: link      // Menggunakan link sebagai download URL
      };
    }
  });

  // Mengembalikan objek hasil
  return results;
}

async function sfiledl(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const downloadLink =
      $('a#download').attr('href') || $('a.download-link').attr('href');
    const filename =
      $('span.file-name').text().trim() ||
      $('title').text().split('-')[0].trim() ||
      'Unknown Filename';
  const mimetype = $("div.list").text().split(" - ")[1].split("\n")[0];

    if (downloadLink) {
      return {
        success: true,
        downloadLink,
        filename,
        mimetype
      };
    } else {
      return { success: false, message: 'Link download tidak ditemukan.' };
    }
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan saat scraping.', error: error.message };
  }
}


async function sfileDll(url) {
  let res = await fetch(url);
  let $ = cheerio.load(await res.text());
  let filename = $("div.w3-row-padding").find("img").attr("alt");
  let mimetype = $("div.list").text().split(" - ")[1].split("\n")[0];
  let filesize = $("#download")
    .text()
    .replace(/Download File/g, "")
    .replace(/\(|\)/g, "")
    .trim();
  let download =
    $("#download").attr("href") +
    "&k=" +
    Math.floor(Math.random() * (15 - 10 + 1) + 10);
  return { filename, filesize, mimetype, download };
}
function aio(link) {
  return new Promise(async (e, a) => {
    try {
      let a = {
          headers: {
            Referer: "https://snapsave.app/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        },
        i = new URLSearchParams();
      i.append("url", link);
      let o = await fetch("https://snapsave.app/action.php", {
        method: "POST",
        body: i,
        ...a,
      });
      if (!o.ok) return e({ status: !1 });
      e(await o.json());
    } catch (link) {
      return console.log(link), e({ status: !1 });
    }
  });
}

async function ytdll(videoUrl) {
 const form = new FormData();
 form.append('query', videoUrl);

 try {
 const response = await axios.post('https://yttomp4.pro/', form, {
 headers: {
 ...form.getHeaders()
 }
 });

 const $ = cheerio.load(response.data);

 const results = {
 title: $('.vtitle').text().trim(),
 duration: $('.res_left p').text().replace('Duration: ', '').trim(),
 image: $('.ac img').attr('src'),
 video: [],
 audio: [],
 other: []
 };
 
 $('.tab-item-data').each((index, tab) => {
 const tabTitle = $(tab).attr('id');
 $(tab).find('tbody tr').each((i, element) => {
 const fileType = $(element).find('td').eq(0).text().trim();
 const fileSize = $(element).find('td').eq(1).text().trim();
 const mp4 = $(element).find('a.dbtn').attr('href');
 const mp3 = $(element).find('a.dbtn').attr('href');
 const downloadLink = $(element).find('a.dbtn').attr('href');
 
 if (tabTitle === 'tab-item-1') {
 results.video.push({
 fileType,
 fileSize,
 mp4
 });
 }
 });
 });
 
 return results;
 } catch (error) {
 return { success: false, url: error.message };
 console.log('Error:' + error);
 }
}

async function imagetohd(url, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"]
    Methods.includes(method) ? (method = method): (method = Methods[0])
    let buffer,
    Form = new FormData(),
    scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data charset=uttf-8",
    })
    Form.append("image", Buffer.from(url), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    })
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject()
        let data = []
        res
        .on("data", function (chunk, resp) {
          data.push(chunk)
        })
        .on("end", () => {
          resolve(Buffer.concat(data))
        })
        res.on("error", (e) => {
          reject()
        })
      }
    )
  })
}

const getDownloadLinks = url => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!url.match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/) && !url.match(/(https|http):\/\/www.instagram.com\/(p|reel|tv|stories)/gi)) {
        return reject({
          msg: "Invalid URL"
        });
      }

      function decodeData(data) {
        let part1 = data[0];
        let part2 = data[1];
        let part3 = data[2];
        let part4 = data[3];
        let part5 = data[4];
        let part6 = "";

        function decodeSegment(segment, base, length) {
          const charSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split("");
          let baseSet = charSet.slice(0, base);
          let decodeSet = charSet.slice(0, length);

          let decodedValue = segment.split("").reverse().reduce((accum, char, index) => {
            if (baseSet.indexOf(char) !== -1) {
              return accum += baseSet.indexOf(char) * Math.pow(base, index);
            }
          }, 0);

          let result = "";
          while (decodedValue > 0) {
            result = decodeSet[decodedValue % length] + result;
            decodedValue = Math.floor(decodedValue / length);
          }

          return result || "0";
        }

        for (let i = 0, len = part1.length; i < len; i++) {
          let segment = "";
          while (part1[i] !== part3[part5]) {
            segment += part1[i];
            i++;
          }

          for (let j = 0; j < part3.length; j++) {
            segment = segment.replace(new RegExp(part3[j], "g"), j.toString());
          }
          part6 += String.fromCharCode(decodeSegment(segment, part5, 10) - part4);
        }
        return decodeURIComponent(encodeURIComponent(part6));
      }

      function extractParams(data) {
        return data.split("decodeURIComponent(escape(r))}(")[1].split("))")[0].split(",").map(item => item.replace(/"/g, "").trim());
      }

      function extractDownloadUrl(data) {
        return data.split("getElementById(\"download-section\").innerHTML = \"")[1].split("\"; document.getElementById(\"inputData\").remove(); ")[0].replace(/\\?/g, "");
      }

      function getVideoUrl(data) {
        return extractDownloadUrl(decodeData(extractParams(data)));
      }

      const response = await axios.post("https://snapsave.app/action.php?lang=id", "url=" + url, {
        headers: {
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "content-type": "application/x-www-form-urlencoded",
          origin: "https://snapsave.app",
          referer: "https://snapsave.app/id",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
        }
      });

      const data = response.data;
      const videoPageContent = getVideoUrl(data);
      const $ = cheerio.load(videoPageContent);
      const downloadLinks = {};
      
      $("div.download-items__thumb").each((index, item) => {
        $("div.download-items__btn").each((btnIndex, button) => {
          let downloadUrl = $(button).find("a").attr("href");
          if (!/https?:\/\//.test(downloadUrl || "")) {
            downloadUrl = "https://snapsave.app" + downloadUrl;
          }
          downloadLinks.push(downloadUrl);
        });
      });
      if (!downloadLinks.length) {
        return reject({
          msg: "No data found"
        });
      }

      return resolve({
          url: downloadLinks,
          metadata: {
              url: url
          }
      });
    } catch (error) {
      return reject({
        msg: error.message
      });
    }
  });
};

const HEADERS = {
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.5",
  "Content-Type": "application/x-www-form-urlencoded",
  "X-FB-Friendly-Name": "PolarisPostActionLoadPostQueryQuery",
  "X-CSRFToken": "RVDUooU5MYsBbS1CNN3CzVAuEP8oHB52",
  "X-IG-App-ID": "1217981644879628",
  "X-FB-LSD": "AVqbxe3J_YA",
  "X-ASBD-ID": "129477",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36",
};

function getInstagramPostId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|tv|stories|reel)\/([^/?#&]+).*/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function encodeGraphqlRequestData(shortcode) {
  const requestData = {
    av: "0",
    __d: "www",
    __user: "0",
    __a: "1",
    __req: "3",
    __hs: "19624.HYP:instagram_web_pkg.2.1..0.0",
    dpr: "3",
    __ccg: "UNKNOWN",
    __rev: "1008824440",
    __s: "xf44ne:zhh75g:xr51e7",
    __hsi: "7282217488877343271",
    __dyn:
      "7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE5ufz81s8hwGwQwoEcE7O2l0Fwqo31w9a9x-0z8-U2zxe2GewGwso88cobEaU2eUlwhEe87q7-0iK2S3qazo7u1xwIw8O321LwTwKG1pg661pwr86C1mwraCg",
    __csr:
      "gZ3yFmJkillQvV6ybimnG8AmhqujGbLADgjyEOWz49z9XDlAXBJpC7Wy-vQTSvUGWGh5u8KibG44dBiigrgjDxGjU0150Q0848azk48N09C02IR0go4SaR70r8owyg9pU0V23hwiA0LQczA48S0f-x-27o05NG0fkw",
    __comet_req: "7",
    lsd: "AVqbxe3J_YA",
    jazoest: "2957",
    __spin_r: "1008824440",
    __spin_b: "trunk",
    __spin_t: "1695523385",
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "PolarisPostActionLoadPostQueryQuery",
    variables: JSON.stringify({
      shortcode: shortcode,
      fetch_comment_count: null,
      fetch_related_profile_media_count: null,
      parent_comment_count: null,
      child_comment_count: null,
      fetch_like_count: null,
      fetch_tagged_user_count: null,
      fetch_preview_comment_count: null,
      has_threaded_comments: false,
      hoisted_comment_id: null,
      hoisted_reply_id: null,
    }),
    server_timestamps: "true",
    doc_id: "10015901848480474",
  };

  return qs.stringify(requestData);
}

async function getPostGraphqlData(postId, proxy) {
  try {
    const encodedData = encodeGraphqlRequestData(postId);
    const response = await axios.post(
      "https://www.instagram.com/api/graphql",
      encodedData,
      { headers: HEADERS, httpsAgent: proxy },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

function extractPostInfo(mediaData) {
  try {
    const getUrlFromData = (data) => {
      if (data.edge_sidecar_to_children) {
        return data.edge_sidecar_to_children.edges.map(
          (edge) => edge.node.video_url || edge.node.display_url,
        );
      }
      return data.video_url ? [data.video_url] : [data.display_url];
    };

    return {
      url: getUrlFromData(mediaData),
      metadata: {
         caption: mediaData.edge_media_to_caption.edges[0]?.node.text || null,
         username: mediaData.owner.username,
         like: mediaData.edge_media_preview_like.count,
         comment: mediaData.edge_media_to_comment.count,
         isVideo: mediaData.is_video,
      }
    };
  } catch (error) {
    throw error;
  }
}

async function ig(url, proxy = null) {
    const postId = getInstagramPostId(url);
    if (!postId) {
      throw new Error("Invalid Instagram URL");
    }
    const data = await getPostGraphqlData(postId, proxy);
    const mediaData = data.data?.xdt_shortcode_media;
    return extractPostInfo(mediaData);
}

async function igdl(url) {
 let result = ""
     try {
       result = await ig(url)      
     } catch(e) {
       try {
         result = await getDownloadLinks(url);
       } catch(e) {
          result = {
             msg: "Try again later"
          }
       }
    }
  return result
}
class Spotify {
    async Download(url) {
        try {
        const response = (await axios.get("https://api.fabdl.com/spotify/get?url=" + url, {
            headers: {
                origin:
                    "https://spotifymp3.com",
                referer:
                    "https://spotifymp3.com/",
            }
        })).data
        return response.result
    } catch (e) {        
        return e.message
    }
}
    async getTask(gid, id) {
        try {
        const response = (await axios.get("https://api.fabdl.com/spotify/mp3-convert-task/" + gid + "/" + id, {
            headers: {
                origin:
                    "https://spotifymp3.com",
                referer:
                    "https://spotifymp3.com/",
            }
        })).data
        return 'https://api.fabdl.com' + response.result.download_url
    } catch (e) {        
        return e.message
    }
}
}

async function spotify(url) {
try {
    const client = new Spotify()
    const { gid, id } = await client.Download(url)
    const result = await client.getTask(gid, id)
    console.log(result)
    return result
 } catch (e) {        
    return e.message
 }
}
async function tiktok(url) {
  return new Promise(async (resolve, reject) => {
    try {
    const encodedParams = new URLSearchParams();
encodedParams.set('url', url);
encodedParams.set('hd', '1');

      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: encodedParams
      });
      const videos = response.data.data;
        const result = {
          title: videos.title,
          cover: videos.cover,
          origin_cover: videos.origin_cover,
          no_watermark: videos.play,
          watermark: videos.wmplay,
          music: videos.music
        };
        resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}


async function pinterest(message) {
    let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${message}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${message}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    let json = await res.json();
    let data = json.resource_response.data.results;
    if (!data.length) throw `Query "${message}" not found :/`;

    // Memilih elemen secara acak dari hasil
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex].images.orig.url;
}

async function tiktoks(message) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: {
          keywords: message,
          count: 10,
          cursor: 0,
          HD: 1
        }
      })
      const videos = response.data.data.videos
      if (videos.length === 0) {
        reject("Tidak ada video ditemukan.")
      } else {
        const rerezz = Math.floor(Math.random() * videos.length)
        const videorndm = videos[rerezz]

        const result = {
          author: creator,
          title: videorndm.title,
          cover: videorndm.cover,
          origin_cover: videorndm.origin_cover,
          no_watermark: videorndm.play,
          watermark: videorndm.wmplay,
          music: videorndm.music
        }
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  })
}


async function AimusicLyrics(message) {
  const url = "https://aimusic.one/api/v3/lyrics/generator"
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://aimusic.one/ai-lyrics-generator"
  }
  const data = {
    description: message,
    style: "Auto",
    topic: "Auto",
    mood: "Auto",
    lan: "auto",
    isPublic: true
  }
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    })
    let result = await response.json()
    return result.lyrics
  } catch (e) {
    throw e
  }
}

async function chatgpt(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get(text);
  if (cachedResponse) {
    console.log("Returning cached response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to AI service...`);
    const response = await axios.get('https://rest-api.aetherss.xyz/api/ai', {
      params: { prompt: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("Response received:", response.status, response.statusText);
    
    if (response.data) {
      // Simpan respons ke cache
      myCache.set(text, response.data);
      return response.data;
    } else {
      console.error("Unexpected response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiChat:", error.message);
    return fallbackResponse(text);
  }
}
async function gemini(message) {
    try {
        const { data  } = await axios.get(`https://hercai.onrender.com/gemini/hercai?question=${encodeURIComponent(message)}`, {
            headers: {
                "content-type": "application/json",
            },
        })
        return data;
    } catch (e) {
    console.log(e)
}
}

async function gpt3(message) {
   try {
     var api = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(message)}`, {
         headers: {
         "content-type": "application/json",
         },
        })
      return api.data;
    } catch (e) {
    console.log(e)
  }
}

async function LuminAI(message, model = "gpt-4o-mini") {
                try {
                    const response = await axios.post('https://luminai.my.id/v2', {
                        text: message,
                        model: model
                    });

                    return response.data.reply.reply;
                } catch (error) {
                    console.error("Terjadi kesalahan:", error.message);
                    throw new Error("Gagal mendapatkan respons dari AI.");
                }
            }
function englishAi(chat = [
    {
        content: "Kamu adalah Rioo, kamu bukanlah ai atau chat bot, kamu adalah anak remaja, kamu memiliki sifat kasar dan toxic, kadang kamu memakai emoji 🧢🖕 ketika kesal, kamu kalau ngobrol menggunakan bahasa gaul anak Indonesia seperti lu untuk kamu dan gw untuk aku, kamu rest api Rioo: https://restapii.rioooxdzz.web.id, untuk nomor nya wa.me/6285691304150",
        role: "user",
    },
    {
        content: "hi! what can i help you today?⭐",
        role: "assistant",
        refusal: null,
    },
    {
        content: "what is your name?",
        role: "user",
    },
]) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!chat || !Array.isArray(chat) || chat.length < 1) 
                return reject(new Error("Enter valid chat object [ IEnglishAiChat ]"));
            
            const a = await axios.post("https://api.deepenglish.com/api/gpt/chat", {
                messages: chat,
                temperature: 0.9,
            }, {
                headers: {
                    Origin: "https://members.deepenglish.com",
                    Referer: "https://members.deepenglish.com/",
                    Host: "api.deepenglish.com",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                },
            }).then(v => v.data);
            
            const p = chat;
            p.push(await a.data.choices.shift().message);
            
            return resolve({
                response: (p.pop()?.content) || "",
            });
        } catch (e) {
            reject(e);
        }
    });
}            

// Fungsi untuk degreeGuru
async function degreeGuru(message, prompt) {
  try {
    const response = await axios.post('https://degreeguru.vercel.app/api/guru', {
      messages: [
        { role: 'user', content: message }
      ]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Fungsi untuk smartContract
async function smartContract(message) {
  try {
    const response = await axios.post("https://smart-contract-gpt.vercel.app/api/chat", {
      messages: [{ content: message, role: "user" }]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function generateUserId() {
  return 'user_' + Math.random().toString(36).substring(2, 12);
}

async function ai4chat(prompt, text) {
  const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  const [hours, minutes] = [new Date(time).getHours(), new Date(time).getMinutes()];
  const period = hours >= 6 && hours < 18 ? 'siang' : 'malam';
  const today = new Date(time).toLocaleDateString('en-GB');

  const apiUrl = `https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug?text=Prompt: ${prompt}, sekarang jam ${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')} ${period}, tanggal ${today}, presiden Prabowo Subianto, wakil presiden Gibran Rakabuming. user: ${encodeURIComponent(text)}&country=Asia&user_id=${generateUserId()}`;
  const proxyUrl = 'https://api.allorigins.win/raw?url=';

  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const data = response.ok ? await response.json() : { error: `Error: ${response.status}` };
    return { data };
  } catch (error) {
    return { data: error.message };
  }
}      	

async function gptturbo(message) {
   try {
     var ress = await axios.get(`https://hercai.onrender.com/turbo-16k/hercai?question=${encodeURIComponent(message)}`, {
         headers: {
         "content-type": "application/json",
         },         
        })
      return ress.data;
    } catch (e) {
    console.log(e)
  }
}
async function turbo(message) {
   try {
     var ress = await axios.get(`https://hercai.onrender.com/turbo-16k/hercai?question=${encodeURIComponent(message)}`, {
         headers: {
         "content-type": "application/json",
         },         
        })
      return ress.data;
    } catch (e) {
    console.log(e)
  }
}
const model = [
    "yanzgpt-revolution-25b-v3.0", // Default
    "yanzgpt-legacy-72b-v3.0" // Pro
];

async function YanzGPT(query, prompt, model) {
    return new Promise(async (resolve, reject) => {
        const response = await axios("https://yanzgpt.my.id/chat", {
            headers: {
                authorization: "Bearer yzgpt-sc4tlKsMRdNMecNy",
                "content-type": "application/json"
            },
            data: {
                messages: [
                    {
                        role: "system",
                        content: `Kamu adalah Rioo, kamu bukanlah ai atau chat bot, kamu adalah anak remaja, kamu memiliki sifat kasar dan toxic, kadang kamu memakai emoji 🧢🖕 ketika kesal, kamu kalau ngobrol menggunakan bahasa gaul anak Indonesia seperti lu untuk kamu dan gw untuk aku, kamu rest api Rioo: https://restapii.rioooxdzz.web.id, untuk nomor nya wa.me/6285691304150`
                    },
                    {
                        role: "user",
                        content: query
                    }
                ],
                model: "yanzgpt-revolution-25b-v3.0"
            },
            method: "POST"
        });
        resolve(response.data);
    });
};

async function bardd(query) {
    const COOKIE_KEY = "g.a000mwgL5JRw9IARGMYCihj5YvtGl7tz7BOQSlsQyEAHYA1KvbeO-vBerIBI5FcrtceDgrFr6gACgYKAUcSARYSFQHGX2MiQ4NYw4HGfFmoBkuy3Bg-RhoVAUF8yKqas8HgMOBNEddTflPWq2Ry0076";
    const psidCookie = '__Secure-1PSID=' + COOKIE_KEY;

    // Header untuk request
    const headers = {
        "Host": "gemini.google.com",
        "X-Same-Domain": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Origin": "https://gemini.google.com",
        "Referer": "https://gemini.google.com",
        "Cookie": psidCookie
    };

    try {
        // Ambil halaman awal untuk mendapatkan token
        const bardRes = await fetch("https://gemini.google.com/", { method: 'GET', headers });
        const bardText = await bardRes.text();

        // Ekstraksi token menggunakan regex
        const snlM0eMatch = bardText.match(/"SNlM0e":"(.*?)"/);
        const blValueMatch = bardText.match(/"cfb2h":"(.*?)"/);
        
        if (!snlM0eMatch || !blValueMatch) throw new Error("Gagal mendapatkan token");

        const snlM0e = snlM0eMatch[1];
        const blValue = blValueMatch[1];

        // Menyiapkan body request
        const bodyData = `f.req=%5Bnull%2C%22%5B%5B%5C%22${encodeURIComponent(query)}%5C%22%5D%2Cnull%2C%5B%5C%22%5C%22%2C%5C%22%5C%22%2C%5C%22%5C%22%5D%5D%22%5D&at=${snlM0e}`;
        
        // Kirim request ke API Bard
        const response = await fetch(
            `https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, 
            { method: 'POST', headers, body: bodyData }
        );

        const responseText = await response.text();

        // Parsing hasil response
        const largestChunk = responseText.split("\n").reduce((a, b) => (a.length > b.length ? a : b), "");
        const parsedResponse = JSON.parse(JSON.parse(largestChunk)[0][2]);

        const answer = parsedResponse[4][0][1];

        // Kembalikan jawaban
        return answer;
    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
        return "Gagal mendapatkan respons dari server.";
    }
}

function openai(messages) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(messages)) {
                messages = [messages];
            }

            const url = 'https://chatsandbox.com/api/chat';
            const requestData = {
                messages: messages,
                character: 'openai'
            };

            const headers = {
                "Content-Type": "application/json"
            };

            const response = await axios.post(url, requestData, { headers });

            if (response.status === 200 && response.data) {
                resolve(response.data);
            } else {
                reject(new Error('Failed to get a valid response'));
            }
        } catch (error) {
            reject(error);
        }
    });
}



app.get('/api/luminai', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await LuminAI(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk gemini
app.get('/api/gemini', async (req, res) => {
  try {
    const prompt = req.query.message;
    if (!prompt) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await geminigoogle(prompt);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/geminiimg', async (req, res) => {
  try {
    const prompt = req.query.message;
    const imageUrl = req.query.imageUrl;
    if (!prompt) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
        if (!imageUrl) {
      return res.status(403).json({ error: 'Parameter "imageUrl" tidak ditemukan' });
    }
    const response = await geminiimg(prompt, imageUrl);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Endpoint untuk degreeGuru
app.get('/api/degreeguru', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await degreeGuru(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk pinecone
app.get('/api/gpt3', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await gpt3(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/toolsbot', async (req, res) => {
  try {
    const desire = req.query.message;
    if (!desire) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await ToolbotAI(desire);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/felo', async (req, res) => {
try {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const result = await felo.ask(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      result: result 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/openai', async (req, res) => {
  try {
    const text = req.query.message;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await metaai(text);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/metaai', async (req, res) => {
  try {
    let now = moment().tz("Asia/Jakarta"); // Ganti dengan zona waktu Anda
    let jam = now.format('HH:mm:ss'); // Format waktu
    let hariini = now.format('dddd'); // Hari dalam seminggu
    let currentDate = now.format('YYYY-MM-DD'); // Tanggal
  
    const text = req.query.message;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const data = await metaaii([
      {
        role: "user",
        content: text,
      },
      {
        role: "system",
        content:
          `Halo World! Saya adalah Meta AI yang dibuat oleh Mark Zuckerberg. Sekarang jam ${jam}, hari ${hariini}, tanggal ${currentDate}, Presiden Indonesia Saat Ini Prabowo Subianto, Bukan Lah Jokowi Widodo`,
      },
    ]);

    res.status(200).json({
      success: 200,
      creator: "IM-REREZZ",
      result: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get('/api/bingimg', async (req, res) => {
  try {
    const keyword = req.query.message;
    if (!keyword) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await bingimg(keyword);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/mistral', async (req, res) => {
  try {
    const text = req.query.text;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await chatsandbox.chatbot(text, "mistral-large");
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/gptturbo', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await gptt355turbo.send(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/aiaudio2text', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await audio2text(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/gptlogic', async (req, res) => {
  try {
    const text = req.query.message;
    const prompt = req.query.prompt;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    if (!prompt) {
      return res.status(403).json({ error: 'Parameter "prompt" tidak ditemukan' });
    }
    const response = await gptlogic(text, prompt);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/llama', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await llama(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/aisearch', async (req, res) => {
  try {
    const content = req.query.message;
    if (!content) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await Aoyo(content);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/youai', async (req, res) => {
  try {
    const searchTerm = req.query.message;
    if (!searchTerm) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await youSearch(searchTerm);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/bard', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await bardd(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      result: response 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/turbo', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await turbo(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Endpoint untuk smartContract
app.get('/api/smartcontract', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await smartContract(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ai4chat', async (req, res) => {
  try {
    const text = req.query.message;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await ai4chat(text);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/aimusic', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await AimusicLyrics(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/iask', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await chatsandbox.chatbot(query, "openai");
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/chatgpt', async (req, res) => {
  try {
    const text = req.query.message;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await chatgpt(text);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-playstore', async (req, res) => {
  try {
    const search = req.query.message;
    if (!search) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await PlayStore(search);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-spotify', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await searchSpotifyTracks(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-google', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await google(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-yts', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await youtubeSearch(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-tiktok', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await tiktoks(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search-sticker', async (req, res) => {
  try {
    const query = req.query.text;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await stickersearch(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      result: response 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-applemusic', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await appleMusic.search(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      result: response 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/sfiledl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await sfiledl(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-pinterest', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await pinterest(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-sfile', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await sfileSearch(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


async function Search(teks) {
    try {
        const results = await search(`${encodeURIComponent(teks)}`)
        if (results.status) {
            return {
                status: true,
                data: results.results.map(result => ({
                    type: result.type,
                    videoId: result.videoId,
                    url: result.url,
                    title: result.title,
                    description: result.description,
                    image: result.image,
                    thumbnail: result.thumbnail,
                    seconds: result.seconds,
                    timestamp: result.timestamp,
                    duration: result.duration,
                    ago: result.ago,
                    views: result.views,
                    author: result.author
                }))
            }
        }
    } catch (e) {
        return { status: false, message: e.message }
    }
}

async function Ytmp4(url) {
    try {
        const response = await ytdlv2(url)
        if (response.status) {
            return {
                status: true,
                title: response.details.title,
                description: response.details.description,
                publishedAt: response.details.publishedAt,
                channelId: response.details.channelId,
                channelTitle: response.details.channelTitle,
                categoryId: response.details.categoryId,
                liveBroadcastContent: response.details.liveBroadcastContent,
                thumbnails: response.details.thumbnails,
                statistics: response.statistics,
                downloadLink: response.downloads.video
            }
        }
    } catch (e) {
        return { status: false, message: e.message }
    }
}

async function Ytmp3(url) {
    try {
        const response = await ytdlv2(url)
        if (response.status) {
            return {
                status: true,
                title: response.details.title,
                description: response.details.description,
                publishedAt: response.details.publishedAt,
                channelId: response.details.channelId,
                channelTitle: response.details.channelTitle,
                categoryId: response.details.categoryId,
                liveBroadcastContent: response.details.liveBroadcastContent,
                thumbnails: response.details.thumbnails,
                statistics: response.statistics,
                download: response.downloads.audio
            }
        }
    } catch (e) {
        return { status: false, message: e.message }
    }
}
app.get('/api/ytmp4', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      creator: "Hello Line",
      message: "Parameter 'url' tidak boleh kosong.",
    });
  }

  const downloadResult = await Ytmp4(url);
  if (downloadResult.status) {
    res.status(200).json({
      status: true,
      creator: "Hello Line",
      data: downloadResult,
    });
  } else {
    res.status(500).json({
      status: false,
      creator: "Hello Line",
      message: "Gagal mengunduh video.",
      details: downloadResult.message,
    });
  }
});

app.get('/api/ytmp3', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      creator: "IM REREZZ",
      message: "Parameter 'url' tidak boleh kosong.",
    });
  }

  const downloadResult = await Ytmp3(url);
  if (downloadResult.status) {
    res.status(200).json({
      status: true,
      creator: "IM REREZZ",
      data: downloadResult,
    });
  } else {
    res.status(500).json({
      status: false,
      creator: "IM REREZZ",
      message: "Gagal mengunduh audio.",
      details: downloadResult.message,
    });
  }
});

app.get('/api/appledl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await appledown.download(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      result: response 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/appleaudio', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await appledown.getAudio(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      result: response 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ytdl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await ytdlToAudio(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/fbdl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await fbdl(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/tiktok', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await tiktok(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/aio', async (req, res) => {
  try {
    const vidLink = req.query.url;
    if (!vidLink) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await retatube.scrape(vidLink);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/terabox', async (req, res) => {
    const link = req.query.url;
    if (!link) {
        return res.status(400).json({ error: 'Link parameter is required.' });
    }

    const id = extractId(link);
    if (!id) {
        return res.status(400).json({ error: 'Invalid Terabox link.' });
    }

    try {
        const { data } = await axios.get(`https://api.sylica.eu.org/terabox/?id=${id}&download=1`, { headers });
        res.json(response(data.data, true));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving Terabox download link.' });
    }
});
app.get('/api/spotify', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await spotify(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/mediafire', async (req, res) => {
  try {
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
app.get('/api/igdl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await igdl(url);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: response 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/remini', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: 'imageUrl parameter is required' });
    }

    try {
        const response = await fetch(`https://pxpic.com/callPhotoEnhancer?imageUrl=${encodeURIComponent(url)}`, {
            method: 'POST',
        });
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch image enhancement' });
        }

        const result = await response.json();

        if (result.resultImageUrl) {
            res.json({ resultImageUrl: result.resultImageUrl });
        } else {
            res.status(500).json({ error: 'No result image URL returned' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch image enhancement' });
    }
});

app.get('/api/encrypt', async (req, res) => {
  try {
    const query = req.query.message;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "image" tidak ditemukan' });
    }
    const response = await obfus(query);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/sendmail', async (req, res) => {
  try {
    const recipientEmail = req.query.email;
    const text = req.query.text;
    if (!recipientEmail) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    if (!text) {
      return res.status(403).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await sendEmail(recipientEmail, text);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/status', async (req, res) => {
function muptime(seconds) {
	function pad(s) {
		return (s < 10 ? "0" : "") + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor((seconds % (60 * 60)) / 60);
	var seconds = Math.floor(seconds % 60);

	return pad(hours) + " : " + pad(minutes) + " : " + pad(seconds);
}
	var date = new Date();
	var jam = date.getHours();
	var menit = date.getMinutes();
	var detik = date.getSeconds();
	var old = performance.now();
	var neww = performance.now();
	var ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
		2
	)}MB / ${Math.round(require("os").totalmem / 1024 / 1024)}MB`;
	var cpu = require("os").cpus();
	var json = await (await fetch("https://api.ipify.org/?format=json")).json();
	var port = process.env.PORT || 8080 || 5000 || 3000;
	status = {
		status: "online",
		memory: ram,
		cpu: cpu[0].model,
		port: port,
		ip: json.ip,
		time: `${jam} : ${menit} : ${detik}`,
		uptime: muptime(process.uptime()),
		speed: `${neww - old}ms`,
		info: {
			owner: "IM-REREZZ",
		},
	};
	res.json(status);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app
