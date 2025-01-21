const axios = require('axios');

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
        return Math.floor(Math.random() * 11) + 51; // CDN 51-61
    },

    validateQuality(type, qualityIndex) {
        if (!this.qualities[type][qualityIndex]) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.values(this.qualities[type]).join(', ')}`);
        }
    },

    async fetchData(url, body = {}) {
        const cdnNumber = this.cdn();
        const headers = {
            ...this.headers,
            authority: `cdn${cdnNumber}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error('❌ Error saat mengakses data:', error);
            throw error;
        }
    },

    async getVideoInfo(dl) {
        const cdnNumber = this.cdn();
        const url = `https://cdn${cdnNumber}.savetube.su/info`;
        return this.fetchData(url, { url: dl });
    },

    downloadLink(cdnNumber, type, quality, key) {
        return `https://cdn${cdnNumber}.savetube.su/download?type=${type}&quality=${quality}&key=${key}`;
    },

    async dl(dl, qualityIndex, typeIndex) {
        const type = typeIndex === 1 ? 'audio' : 'video';
        this.validateQuality(type, qualityIndex);

        const quality = this.qualities[type][qualityIndex];
        const videoInfo = await this.getVideoInfo(dl);
        
        if (!videoInfo.data || !videoInfo.data.key) {
            throw new Error('❌ Gagal mendapatkan informasi video.');
        }

        const cdnNumber = this.cdn();
        const downloadUrl = this.downloadLink(cdnNumber, type, quality, videoInfo.data.key);

        return {
            dl,
            title: videoInfo.data.title,
            thumbnail: videoInfo.data.thumbnail,
            duration: videoInfo.data.duration,
            quality,
            type
        };
    }
};

module.exports = { SaveTube };
