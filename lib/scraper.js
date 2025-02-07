const axios = require('axios');
const qs = require('querystring');
const cheerio = require('cheerio');

// Fungsi untuk mendapatkan data musik dari URL
const getData = async (urls) => {
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
  }
};

const getAudio = async (trackName, artist, urlMusic, token) => {
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
    return response.data.dlink;  // Link download
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Fungsi utama untuk mengunduh musik dan mengembalikan informasi lengkap
const download = async (urls) => {
  const musicData = await getData(urls);
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
      'accept': 'application/x-www-form-urlencoded',
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
      const downloadLink = await getAudio(trackName, artist, urlMusic, token);

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
      console.error("Error:", error);
      return { success: false, message: error.message };
    }
  }
};

const getWeatherData = async (query) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=beb7409f172c609796681fbf427ba55e&units=metric`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch weather data");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Unknown error while fetching weather data");
  }
};

const formatWeatherData = (data) => {
  return {
    status: true,
    creator: "IM REREZZ",
    result: {
      coord: { lon: data.coord.lon, lat: data.coord.lat },
      weather: [{
        id: data.weather[0].id,
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      }],
      base: data.base,
      main: {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        sea_level: data.main.sea_level,
        grnd_level: data.main.grnd_level
      },
      visibility: data.visibility,
      wind: {
        speed: data.wind.speed,
        deg: data.wind.deg,
        gust: data.wind.gust
      },
      rain: data.rain || {},
      clouds: { all: data.clouds.all },
      dt: data.dt,
      sys: {
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      },
      timezone: data.timezone,
      id: data.id,
      name: data.name,
      cod: data.cod
    }
  };
};


const creator = "Rerezz"; 
const chatbot = async (question, model) => {
    const validModels = ["openai", "llama", "mistral", "mistral-large"];
    if (!validModels.includes(model)) {
        return { error: `Invalid model selected. Please choose one of: ${validModels.join(', ')}` };
    }

    const data = JSON.stringify({
        "messages": [question],
        "character": model
    });

    const config = {
        method: 'POST',
        url: 'https://chatsandbox.com/api/chat',
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/json',
            'accept-language': 'id-ID',
            'referer': `https://chatsandbox.com/chat/${model}`,
            'origin': 'https://chatsandbox.com',
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

const text2img = async (prompt) => {
    const data = JSON.stringify({
        "messages": [prompt],
        "character": "ai-image-generator"
    });
    const config = {
        method: 'POST',
        url: 'https://chatsandbox.com/api/chat',
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/json',
            'accept-language': 'id-ID',
            'referer': 'https://chatsandbox.com/ai-image-generator',
            'origin': 'https://chatsandbox.com',
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
            return { error: "Could not extract image URL from response." };
        }
    } catch (error) {
        return { error: error.message };
    }
};

const getWeatherData = async (query) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=beb7409f172c609796681fbf427ba55e&units=metric`, {
      timeout: 10000 
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch weather data");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Unknown error while fetching weather data");
  }
};

module.exports = { 
  getData, 
  getAudio, 
  download,
  formatWeatherData,
  chatbot,
  text2img,
  getWeatherData
 };
