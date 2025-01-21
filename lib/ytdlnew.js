/**[ ! ] SCRAPER YT DOWNLOADER*
CH: https://whatsapp.com/channel/0029Vai9MMj5vKABWrYzIJ2Z
*/
const axios = require('axios');

/**
 * Download video atau audio dari URL menggunakan API CDN
 * @author Fizzxy Developer
 * @param {string} url - URL video
 * @param {object} options - Opsi untuk pengunduhan
 * @returns {Promise<object>} - Hasil unduhan
 */

// Konstanta API
const API_CONFIG = {
    download: 'https://api-cdn.saveservall.xyz/ajax-v2.php',
    search: 'https://api.flvto.top/@api/search/YouTube/',
};

// Higher-order function untuk validasi URL YouTube
const withYouTubeValidation = fn => async (url, ...args) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/|v\/|.+\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (!match) throw new Error('URL tidak valid. Masukkan URL YouTube yang benar.');
    return fn(match[1], ...args);
};

// Higher-order function untuk memanggil API
const withAPIRequest = (fn, apiType) => async (...args) => {
    try {
        const result = await fn(API_CONFIG[apiType], ...args);
        return result;
    } catch (error) {
        throw new Error(`Gagal memproses ${apiType} API: ${error.message}`);
    }
};

// Fungsi unduhan
const fetchDownload = withAPIRequest(async (api, videoId, type, quality) => {
    const data = new URLSearchParams({ videoid: videoId, downtype: type, vquality: quality });
    const response = await axios.post(api, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    });
    return response.data;
}, 'download');

// Fungsi pencarian
const fetchSearch = withAPIRequest(async (api, query) => {
    const response = await axios.get(`${api}${encodeURIComponent(query)}`, {
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        },
    });
    return response.data.items.map(item => ({
        title: item.title,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        description: item.description,
    }));
}, 'search');

// Fungsi utama untuk mengunduh MP4 dan MP3
const fetchBothDownloads = async (url, options = { mp4: '360', mp3: '128' }) => {
    const { mp4, mp3 } = options;
    const fetchMP4 = withYouTubeValidation(fetchDownload);
    const fetchMP3 = withYouTubeValidation(fetchDownload);
    const [mp4Link, mp3Link] = await Promise.all([
        fetchMP4(url, 'mp4', mp4),
        fetchMP3(url, 'mp3', mp3),
    ]);
    return { 
    status: true
    mp4: mp4Link,
    mp3: mp3Link
     };
};

// Higher-order function untuk logging
const withLogging = fn => async (...args) => {
    try {
        console.log(`Memulai fungsi ${fn.name} dengan argumen:`, args);
        const result = await fn(...args);
        console.log(`Hasil dari ${fn.name}:`, result);
        return result;
    } catch (error) {
        console.error(`Error dalam fungsi ${fn.name}:`, error.message);
        throw error;
    }
};

// Membungkus semua fungsi utama dengan logging
const mp33 = withLogging(fetchBothDownloads);
const search = withLogging(fetchSearch);

module.exports = { 
mp33
}