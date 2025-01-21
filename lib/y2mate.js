const yts = require("yt-search");
const axios = require("axios");
const chalk = require('chalk')

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
async function youtube(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                data = data.trim();
                !data &&
                    (() => {
                        return reject("Enter either a youtube link for downloading, or query for searching");
                    })();
                const yt = /youtu(\.)?be/gi.test(data);
                if (!yt) {
                    const d = yield yts(data).then((v) => v.videos);
                    return resolve({
                        type: "search",
                        query: data,
                        total: d.length || 0,
                        videos: d.map(({ videoId, views, url, title, description, image, thumbnail, seconds, timestamp, ago, author, }) => {
                            return {
                                title,
                                id: videoId,
                                url,
                                media: {
                                    thumbnail: thumbnail || "",
                                    image: image,
                                },
                                description,
                                duration: {
                                    seconds,
                                    timestamp,
                                },
                                published: ago,
                                views,
                                author,
                            };
                        }),
                    });
                }
                else {
                    const id = ((_a = /(?:youtu\.be\/|youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|embed\/|v\/|m\/|watch\?(?:[^=]+=[^&]+&)*?v=))([^"&?\/\s]{11})/gm.exec(data)) === null || _a === void 0 ? void 0 : _a[1]) || "";
                    if (!id)
                        return reject("Enter valid youtube video link!");
                    const { title, description, url, videoId, seconds, timestamp, views, genre, uploadDate, ago, image, thumbnail, author, } = yield yts({
                        videoId: id,
                    });
                    const headers = {
                        Accept: "*/*",
                        Origin: "https://id.y2mate.gg",
                        Referer: "https://id.y2mate.gg/",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
                        "Sec-Ch-Ua-Platform-Version": '"15.0.0"',
                        "Sec-Ch-Ua-Bitness": "64",
                        "Sec-Ch-Ua-Model": "",
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Arch": "x86",
                        "X-Requested-With": "XMLHttpRequest",
                        "Sec-Ch-Ua-Full-Version": "129.0.6668.90",
                        "Sec-Ch-Ua-Full-Version-List": '"Google Chrome";v="129.0.6668.90", "Not=A?Brand";v="8.0.0.0", "Chromium";v="129.0.6668.90"',
                    };
                    const r = yield axios
                        .post("https://id.y2mate.gg/mates/analyzeV2/ajax", new URLSearchParams({
                        k_query: `https://youtube.com/watch?v=${id}`,
                        k_page: "home",
                        hl: "",
                        q_auto: "0",
                    }), {
                        headers,
                    })
                        .then((v) => v.data);
                    if (!r)
                        return reject(new Error("Fail to get video & audio"));
                    const d = {
                        mp3: {},
                        mp4: {},
                    };
                    yield new Promise((res) => {
                        for (let i of Object.values(r.links.mp4)) {
                            Object.assign(d.mp4, {
                                [i.q]: () => __awaiter(this, void 0, void 0, function* () {
                                    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                                        try {
                                            const r = yield axios
                                                .post("https://id.y2mate.gg/mates/convertV2/index", new URLSearchParams({
                                                vid: id,
                                                k: i.k,
                                            }), {
                                                headers: Object.assign(Object.assign({}, headers), { Referer: headers.Referer + id }),
                                            })
                                                .then((v) => v.data);
                                            if (!r || r.status !== "ok")
                                                return rej(new Error("Fail to convert video"));
                                            return res({
                                                size: i.size,
                                                format: i.f,
                                                url: r.dlink,
                                            });
                                        }
                                        catch (e) {
                                            return rej(e);
                                        }
                                    }));
                                }),
                            });
                        }
                        for (let i of Object.values(r.links.mp3)) {
                            Object.assign(d.mp3, {
                                [i.f]: () => __awaiter(this, void 0, void 0, function* () {
                                    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                                        try {
                                            const r = yield axios
                                                .post("https://id.y2mate.gg/mates/convertV2/index", new URLSearchParams({
                                                vid: id,
                                                k: i.k,
                                            }), {
                                                headers: Object.assign(Object.assign({}, headers), { Referer: headers.Referer + id }),
                                            })
                                                .then((v) => v.data);
                                            if (!r || r.status !== "ok")
                                                return rej(new Error("Fail to convert video"));
                                            return res({
                                                size: i.size,
                                                format: i.f,
                                                url: r.dlink,
                                            });
                                        }
                                        catch (e) {
                                            return rej(e);
                                        }
                                    }));
                                }),
                            });
                        }
                        res();
                    });
                    return resolve({
                        type: "download",
                        download: {
                            title,
                            description,
                            url,
                            id: videoId,
                            duration: {
                                seconds,
                                timestamp,
                            },
                            views,
                            genre,
                            releaseDate: uploadDate,
                            published: ago,
                            media: {
                                thumbnail,
                                image,
                            },
                            author,
                            dl: yield d,
                        },
                    });
                }
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}

/*
💥 *Y2MATE (YT DOWNLOADER)*

📝 *Base Code by Kaviaaan*

🧑‍💻 Script Code by Daffa (Recode) 
*/

const extractVid = (data) => {
    const match = /(?:youtu\.be\/|youtube\.com(?:.*[?&]v=|.*\/))([^?&]+)/.exec(data);
    return match ? match[1] : null;
};

const info = async (id) => {
    const { title, description, url, videoId, seconds, timestamp, views, genre, uploadDate, ago, image, thumbnail, author } = await yts({ videoId: id });
    return { title, description, url, videoId, seconds, timestamp, views, genre, uploadDate, ago, image, thumbnail, author };
};

const downloadLinks = async (id) => {
    const headers = {
        Accept: "*/*",
        Origin: "https://id.y2mate.gg",
        Referer: `https://id.y2mate.gg/${id}`,
        'User-Agent': 'Postify/1.0.0',
        'X-Requested-With': 'XMLHttpRequest',
    };

    const response = await axios.post('https://id.y2mate.gg/mates/analyzeV2/ajax', new URLSearchParams({
        k_query: `https://youtube.com/watch?v=${id}`,
        k_page: 'home',
        q_auto: 0,
    }), { headers });

    if (!response.data || !response.data.links) throw new Error('Gak ada response dari api nya 😮‍💨 ');

    return Object.entries(response.data.links).reduce((acc, [format, links]) => {
        acc[format] = Object.fromEntries(Object.values(links).map(option => [
            option.q || option.f, 
            async () => {
                const res = await axios.post('https://id.y2mate.gg/mates/convertV2/index', new URLSearchParams({ vid: id, k: option.k }), { headers });
                if (res.data.status !== 'ok') throw new Error('Cukup tau aja yak.. error bree');
                return { size: option.size, format: option.f, url: res.data.dlink };
            }
        ]));
        return acc;
    }, { mp3: {}, mp4: {} });
};

const search = async (query) => {
    const videos = await yts(query).then(v => v.videos);
    return videos.map(({ videoId, views, url, title, description, image, thumbnail, seconds, timestamp, ago, author }) => ({
        title, id: videoId, url,
        media: { thumbnail: thumbnail || "", image },
        description, duration: { seconds, timestamp }, published: ago, views, author
    }));
};

const YTMate = async (data) => {
    if (!data.trim()) throw new Error('Gausah bertele tele, tinggal masukin aja link youtube atau query yg mau dicari...');
    const isLink = /youtu(\.)?be/.test(data);
    if (isLink) {
        const id = extractVid(data);
        if (!id) throw new Error('Error ceunah bree, ID nya gak adaa');
        const videoInfo = await info(id);
        const downloadLinks = await downloadLinks(id);
        return { type: 'download', download: { ...videoInfo, dl: downloadLinks } };
    } else {
        const videos = await search(data);
        return { type: 'search', query: data, total: videos.length, videos };
    }
};

class ytdl {
    constructor() {
        this.baseUrl = 'https://id.y2mate.gg';
    }

    async search(url) {
        const requestData = new URLSearchParams({
            k_query: url,
            k_page: 'home',
            hl: '',
            q_auto: '0'
        });

        const requestHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Postify/1.0.0',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Origin': this.baseUrl,
            'Referer': this.baseUrl+"/youtube",
        };
    

        try {
            const response = await axios.post(`${this.baseUrl}/mates/analyzeV2/ajax`, requestData, {
                headers: requestHeaders
            });

            const responseData = response.data;
            //console.log(responseData);
            return responseData;
        } catch (error) {
            if (error.response) {
                console.error(`HTTP error! status: ${error.response.status}`);
            } else {
                console.error('Axios error: ', error.message);
            }
        }
    }

    async convert(videoId, key) {
        const requestData = new URLSearchParams({
            vid: videoId,
            k: key
        });

        const requestHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Postify/1.0.0',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Origin': this.baseUrl,
            'Referer': `${this.baseUrl}/youtube/${videoId}`
        };

        try {
            const response = await axios.post(`${this.baseUrl}/mates/convertV2/index`, requestData, {
                headers: requestHeaders
            });

            const responseData = response.data;
            //console.log(responseData);
            return responseData;
        } catch (error) {
            if (error.response) {
                console.error(`HTTP error! status: ${error.response.status}`);
            } else {
                console.error('Axios error: ', error.message);
            }
        }
    }

    async play(url) {
        let { links, vid, title, a: atr } = await this.search(url);
        let video = {}, audio = {};

        for (let i in links.mp4) {
            let input = links.mp4[i];
            let { fquality, dlink } = await this.convert(vid, input.k);
            video[fquality] = {
                resolution: input.q,
                url: dlink,
                size: input.size
            };
        }

        for (let i in links.mp3) {
            let input = links.mp3[i];
            let { fquality, dlink } = await this.convert(vid, input.k);
            audio[fquality] = {
                resolution: input.q,
                url: dlink,
                size: input.size
            };
        }

        return { title, thumbnail: `https://i.ytimg.com/vi/${vid}/0.jpg`, author: atr, video, audio, };
    }
}


async function dlmp4(url) {
  const g = new ytdl()
  let { links, vid, title, a: attr } = await g.search(url);
  let cf = {}, v = {}, atr = attr ? attr : "Unknown"
  try {
    // 360p
    v = links.mp4['134']
    cf = await g.convert(vid, v.k)
  } catch (e) {
    try {
      // 240p
      v = links.mp4['133']
      cf = await g.convert(vid, v.k)
    } catch (e) {
      // 144p
      v = links.mp4['160']
      cf = await g.convert(vid, v.k)
    }
  }
  return { title, thumb: `https://i.ytimg.com/vi/${vid}/0.jpg`, author: atr, id: cf.vid, type: cf.ftype, q: cf.fquality, q_t: v.q_text, size: v.size, dl: cf.dlink };
}


async function dlmp3(url) {
  const g = new ytdl()
  let { links, vid, title, a: attr } = await g.search(url);
  let v = links.mp3['mp3128']
  let atr = attr ? attr : "Unknown"
  let cf = await g.convert(vid, v.k)
  
  return { title, thumbnail: `https://i.ytimg.com/vi/${vid}/0.jpg`, author: attr, id: cf.vid, type: cf.ftype, quality: cf.fquality, quality_t: v.q_text, size: v.size, dl: cf.dlink };
}



async function dlall(url) {
  const g = new ytdl()
  const f = await g.play(url)
  return f
}

module.exports = { youtube, YTMate, ytdl, dlall, dlmp3, dlmp4 }