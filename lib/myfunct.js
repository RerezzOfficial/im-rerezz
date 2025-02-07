const fs = require('fs')
const qs = require('qs');
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fetch = require('node-fetch');
const FormData = require('form-data');
const cheerio = require('cheerio');
const { run } = require('shannz-playwright');
const { chromium, devices } = require('playwright');

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

const apiUrls = [
  'https://random-hadith-generator.vercel.app/bukhari',
  'https://random-hadith-generator.vercel.app/tirmidhi',
  'https://random-hadith-generator.vercel.app/ibnmajah',
  'https://random-hadith-generator.vercel.app/abudawud',
  'https://random-hadith-generator.vercel.app/muslim'
];

async function fetchRandomHadith() {
  try {
    const randomUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];
    const response = await axios.get(randomUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching hadith:', error);
    throw error;
  }
}

async function ytdlmp3(url, format = 'mp3') {
    return new Promise(async (resolve, reject) => {
        const isYouTubeUrl = /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/;
        if (!isYouTubeUrl.test(url)) {
            return resolve({ status: false, message: "Link is not valid" });
        }
        
        const id = url.match(isYouTubeUrl)?.[2];
        const hr = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Referer': 'https://id.ytmp3.mobi/',
        };
        const init = await axios.get(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers: hr });
        if (init.data.convertURL) {
            let convert = await axios.get(`${init.data.convertURL}&v=${id}&f=${format}&_=${Math.random()}`, { headers: hr }).then(x => x.data);
            async function progress(url, dl) {
                let currentProgress = 0;
                let title = '';
                while (currentProgress < 3) {
                    try {
                        const response = await axios.get(url, { headers: hr });
                        const data = response.data;

                        if (data.error > 0) {
                            return resolve({ status: false, message: `Error: ${data.error}` });
                        }
                        currentProgress = data.progress;
                        title = data.title;
                        if (currentProgress < 3) {
                            await new Promise(resolve => setTimeout(resolve, 200));
                        }
                    } catch (error) {
                        return resolve({ status: false, message: 'Error checking progress: ' + error.message });
                    }
                }
                return { dl, title };
            }
            const result = await progress(convert.progressURL, convert.downloadURL);
            return resolve({ status: true, title: result.title, download_url: result.dl });
        } else {
            return resolve({ status: false, message: "convertURL is missing" });
        }
    });
}

const ytdlMp4 = {
    getToken: async (url) => {
        const extractVideoId = (url) => {
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            return match ? match[1] : null;
        };
        const id = extractVideoId(url);
        if (!id) throw new Error('ID video tidak ditemukan! Pastikan link valid.');
        const response = await axios.get(`https://dd-n01.yt2api.com/api/v4/info/${id}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
                'Accept': 'application/json',
                'accept-language': 'id-ID',
                'referer': 'https://bigconv.com/',
                'origin': 'https://bigconv.com',
            }
        });
        return {
            data: response.data,
            cookie: response.headers['set-cookie'] ? response.headers['set-cookie'][0].split(';')[0] : '',
            authorization: response.headers['authorization'] || ''
        };
    },
    convert: async (url, quality) => {
        const data = await ytdlMp4.getToken(url);
        const videoOptions = data.data.formats.video.mp4;
        if (!videoOptions || videoOptions.length === 0) throw new Error('Video tidak tersedia!');
        const selectedVideo = videoOptions.find(v => v.quality === quality) || videoOptions[Math.floor(Math.random() * videoOptions.length)];
        const token = selectedVideo.token;
        const response = await axios.post('https://dd-n01.yt2api.com/api/v4/convert', 
            { "token": token }, 
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'accept-language': 'id-ID',
                    'referer': 'https://bigconv.com/',
                    'origin': 'https://bigconv.com',
                    'Cookie': data.cookie,
                    'authorization': data.authorization
                }
            }
        );
        return {
            jobId: response.data.id,
            cookie: data.cookie,
            authorization: data.authorization
        };
    },
    download: async (url, quality) => {
        const { jobId, cookie, authorization } = await ytdlMp4.convert(url, quality);
        return new Promise((resolve, reject) => {
            const checkStatus = async () => {
                const response = await axios.get(`https://dd-n01.yt2api.com/api/v4/status/${jobId}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
                        'Accept': 'application/json',
                        'accept-language': 'id-ID',
                        'referer': 'https://bigconv.com/',
                        'origin': 'https://bigconv.com',
                        'Cookie': cookie,
                        'authorization': authorization
                    }
                });
                if (response.data.status === 'completed') {
                    clearInterval(interval);
                    resolve(response.data);
                } else if (response.data.status === 'failed') {
                    clearInterval(interval);
                    reject(new Error('Gagal mengunduh video!'));
                }
            };
            const interval = setInterval(checkStatus, 5000);
        });
    }
};




async function tiktokStalk(username) {
    const code = `const { chromium, devices } = require('playwright');
    async function stalk() { 
    const iPhone = devices['iPhone 13'];
 
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        ...iPhone,
    });
    const page = await context.newPage();
 
    try {
        await page.goto(\`https://countik.com/tiktok-analytics/user/@${username}\`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        const userData = await page.evaluate(() => {
            const username = document.querySelector('.username h2')?.innerText;
            const nickname = document.querySelector('.nickname')?.innerText;
            const country = document.querySelector('.acc-country')?.innerText;
            const profilePicture = document.querySelector('.pic img')?.src;
            const profileUrl = document.querySelector('.visit-btn a')?.href;
            const totalFollowers = document.querySelector('.user-stats .block:nth-child(1) p')?.innerText;
            const totalLikes = document.querySelector('.user-stats .block:nth-child(2) p')?.innerText;
            const totalVideos = document.querySelector('.user-stats .block:nth-child(3) p')?.innerText;
            const following = document.querySelector('.user-stats .block:nth-child(4) p')?.innerText;
            const overallEngagement = document.querySelector('.total-engagement-rates .block:nth-child(1) p')?.innerText;
            const likesRate = document.querySelector('.total-engagement-rates .block:nth-child(2) p')?.innerText;
            const commentsRate = document.querySelector('.total-engagement-rates .block:nth-child(4) p')?.innerText;
            const sharesRate = document.querySelector('.total-engagement-rates .block:nth-child(3) p')?.innerText;
            const avgViews = document.querySelector('.average-video-performance .block:nth-child(1) p')?.innerText;
            const avgLikes = document.querySelector('.average-video-performance .block:nth-child(2) p')?.innerText;
            const avgComments = document.querySelector('.average-video-performance .block:nth-child(3) p')?.innerText;
            const avgShares = document.querySelector('.average-video-performance .block:nth-child(4) p')?.innerText;
            const hashtags = Array.from(document.querySelectorAll('.hashtags .item:nth-child(1) .mem')).map(tag => tag.innerText);
            const mostUsedHashtags = Array.from(document.querySelectorAll('.hashtags .item:nth-child(2) .span-tag')).map(tag => ({
                hashtag: tag.querySelector('.chosen')?.innerText,
                count: tag.querySelector('.count')?.innerText
            }));
            const recentPosts = Array.from(document.querySelectorAll('.recent-posts .item')).map(post => ({
                image: post.querySelector('.post-img img')?.src,
                views: post.querySelector('.post-data .data:nth-child(1) .value')?.innerText,
                likes: post.querySelector('.post-data .data:nth-child(2) .value')?.innerText,
                comments: post.querySelector('.post-data .data:nth-child(3) .value')?.innerText,
                shares: post.querySelector('.post-data .data:nth-child(4) .value')?.innerText,
                hashtagsCount: post.querySelector('.post-data .data:nth-child(5) .value')?.innerText,
                mentions: post.querySelector('.post-data .data:nth-child(6) .value')?.innerText,
                saves: post.querySelector('.post-data .data:nth-child(7) .value')?.innerText,
                engagementRate: post.querySelector('.post-data .medium-engagement .value')?.innerText,
                description: post.querySelector('.post-data .desc')?.innerText,
                music: {
                    title: post.querySelector('.music-details a')?.innerText,
                    audioUrl: post.querySelector('.music-info audio source')?.src
                },
                createdTime: post.querySelector('.extra-data .create-time p')?.innerText
            }));
 
            return {
                username,
                nickname,
                country,
                profilePicture,
                profileUrl,
                stats: {
                    totalFollowers,
                    totalLikes,
                    totalVideos,
                    following
                },
                engagementRates: {
                    overallEngagement,
                    likesRate,
                    commentsRate,
                    sharesRate
                },
                averageVideoPerformance: {
                    avgViews,
                    avgLikes,
                    avgComments,
                    avgShares
                },
                hashtags,
                mostUsedHashtags,
                recentPosts
            };
        });
 
        console.log(JSON.stringify(userData, null, 2));
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error);
    } finally {
        await browser.close();
    }
    }
    stalk();`;
const start = await run('javascript', code);
    const result = start.result.output;
    return JSON.parse(result);
}

async function bellaAI(content) {
      try {
          const response = await axios.post('https://luminai.my.id/', {
              content,
              cName: "bella",
              cID: "bellaY8xaysy"
      });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
      }
}

async function douyindl(url) {
  const api = "https://lovetik.app/api/ajaxSearch";
  const payload = { q: url, lang: "en" };
  const instance = axios.create({
    headers: {
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "origin": "https://lovetik.app",
      "referer": "https://lovetik.app/en",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "x-requested-with": "XMLHttpRequest"
    },
    withCredentials: true,
    transformRequest: [data => new URLSearchParams(data).toString()]
  });
  try {
    await instance.get("https://lovetik.app/en");
    const { data } = await instance.post(api, payload);

    if (!data.success && data.msg) {
      return { error: data.msg };
    }
    const htmlContent = data.data || data.html || '';
    const downloadUrls = htmlContent.match(/https:\/\/[^"']*\/get\?token=[^"']+/gi) || [];
    const cleanedUrls = downloadUrls.map(url => url.replace(/\\\//g, '/').replace(/&amp;/g, '&'));

    const thumbnailMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/i);
    const thumbnail = thumbnailMatch ? thumbnailMatch[1] : null;

    const titleMatch = htmlContent.match(/<h3[^>]*>(.*?)<\/h3>/is);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : 'No Title';

    if (cleanedUrls.length === 0) {
      return { error: "Link Download Tidak Ditemukan." };
    }
    return {
      title: title.trim(),
      thumbnail,
      downloadUrls: cleanedUrls,
      warning: "Link cepat expired, segera download."
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      error: error.response?.data?.msg ||
             "Tidak dapat memproses permintaan, cek URL dengan benar."
    };
  }
}

async function igstalk(user) {
	try {
		const response = await axios.post(
			'https://privatephotoviewer.com/wp-json/instagram-viewer/v1/fetch-profile',
			{ find: user },
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					"X-Requested-With": "XMLHttpRequest"
				}
			}
		);
		const $ = cheerio.load(response.data.html);
		let profilePicture = $("#profile-insta img").attr("src");
		const nickname = $(".col-md-8 h4").text().trim();
		const username = $(".col-md-8 h5").text().trim();
		const posts = $(".col-md-8 .text-center").eq(0).find("strong").text().trim();
		const followers = $(".col-md-8 .text-center").eq(1).find("strong").text().trim();
		const following = $(".col-md-8 .text-center").eq(2).find("strong").text().trim();
		const bio = $(".col-md-8 p").html()?.replace(/<br\s*\/?>/g, "\n").trim() || "";

		return {
			nickname,
			username,
			bio,
			posts,
			followers,
			following,
			profile: `https://www.instagram.com/${username.replace("@", "")}`,
			profileUrl: profilePicture
		};
	} catch (e) {
		console.error('Error fetching Instagram profile:', e.message);
		throw new Error("Gagal mengambil data profil. Periksa username atau coba lagi nanti.");
	}
}
module.exports = {
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
    igstalk,
    bellaAI,
    douyindl
};
