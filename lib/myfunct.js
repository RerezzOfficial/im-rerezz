const fs = require('fs')
const qs = require('qs');
const axios = require('axios')
const cheerio = require('cheerio');

async function getTikTokData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tiktok?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    console.error('Error retrieving TikTok data:', error);
    throw new Error('Failed to retrieve TikTok video data.');
  }
}

async function getCapCutData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/capcutdl?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    console.error('Error retrieving CapCut data:', error);
    throw new Error('Failed to retrieve CapCut video data.');
  }
}

async function getInstagramData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/igdownload?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev"; 
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve Instagram data.');
  }
}

async function getMediaFireData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/mediafiredl?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve MediaFire data.');
  }
}

async function getSFileData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/sfile?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve SFile data.');
  }
}

async function getSpotifyData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve Spotify data.');
  }
}

async function getTikMusicData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tikmusic?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev"; 
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve TikTok music data.');
  }
}

async function getTikTokData2(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tiktok?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve TikTok data.');
  }
}

async function getXnxxData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/xnxxdl?query=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve XNXX data.');
  }
}

async function getYoutubeData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/ytmp4?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve YouTube video data.');
  }
}

async function getMp3Data(query) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/ytplaymp3?query=${encodeURIComponent(query)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve MP3 data.');
  }
}

async function getAppleMusicData(urls) {
  const apiUrl = `https://aaplmusicdownloader.com/api/applesearch.php?url=${urls}`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'MyApp/1.0',
        'Referer': 'https://aaplmusicdownloader.com/'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mendapatkan audio dari Apple Music Downloader
async function getAppleMusicAudio(trackName, artist, urlMusic, token) {
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
    return response.data.dlink;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mendownload data dari Apple Music Downloader
async function downloadAppleMusicData(urls) {
  const musicData = await getAppleMusicData(urls);
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
      const downloadLink = await getAppleMusicAudio(trackName, artist, urlMusic, token);

      return {
        name: trackName,
        albumname: albumName,
        artist: artist,
        url: urlMusic,
        thumb: thumb,
        duration: duration,
        token: token,
        download: downloadLink
      };
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      return { success: false, message: error.message };
    }
  }
}

async function searchAppleMusic(query) {
  const url = `https://music.apple.com/us/search?term=${query}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results = [];
    
    $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((index, element) => {
      const title = $(element).find('.top-search-lockup__primary__title').text().trim();
      const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
      const link = $(element).find('.click-action').attr('href');

      results.push({ title, subtitle, link });
    });

    return results;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return { success: false, message: error.message };
  }
}

async function getAppleMusicDetail(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const albumTitle = $('h1[data-testid="non-editable-product-title"]').text().trim();
    const artistName = $('a[data-testid="click-action"]').first().text().trim();
    const releaseInfo = $('div.headings__metadata-bottom').text().trim();
    const description = $('div[data-testid="description"]').text().trim();

    return {
      albumTitle,
      artistName,
      releaseInfo,
      description
    };
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return { success: false, message: error.message };
  }
}
// FUNCTION AI 
async function ChatGPTv2(question, model = "openai") {
  const validModels = ["openai", "llama", "mistral", "mistral-large"];
  if (!validModels.includes(model)) {
      return { status: false, error: "Invalid model specified." };
  }
  const data = JSON.stringify({
      messages: [question],
      character: model
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
      return { status: false, error: error.message };
  }
}

async function sendMessageToGPT(message, model = "gpt-3.5-turbo") {
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
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim pesan:", error.message);
    throw new Error('Tidak dapat memproses permintaan chatbot.');
  }
}

async function fetchAsmaulHusna() {
  try {
    const response = await axios.get("https://raw.githubusercontent.com/RerezzOfficial/media/main/media/asmaulhusna.json");
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function getAyatAudio(surahNumber, ayatNumber) {
  try {
    const response = await axios.get(`https://quran-api-id.vercel.app/surahs/${surahNumber}/ayahs/${ayatNumber}`);
    const ayatData = response.data;
    return {
      arab: ayatData.arab,
      latin: ayatData.latin,
      translation: ayatData.translation,
      audio: ayatData.audio.url
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchRandomHadith() {
  try {
    const response = await axios.get('https://random-hadith-generator.vercel.app/api/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching hadith:', error);
    throw error;
  }
}

module.exports = {
    getTikTokData,
    getCapCutData,
    getInstagramData,
    getMediaFireData,
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
    fetchRandomHadith
};
