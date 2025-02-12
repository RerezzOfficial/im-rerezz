/**[ ! ] SCRAPER YT DOWNLOADER*
CH: https://whatsapp.com/channel/0029Vai9MMj5vKABWrYzIJ2Z
*/
const chalk = require('chalk')
const fs = require('fs')
const axios = require('axios')
const path = require('path')

module.exports.urls = {
    info: 'https://m8.fly.dev/api/info',
    download: 'https://m8.fly.dev/api/download'
}

module.exports.getHeaders = (extraHeaders = {}) => ({
    'Content-Type': 'application/json',
    'User-Agent': 'Downloader/1.0.0',
    'Referer': 'https://ytiz.xyz/',
    ...extraHeaders
})

module.exports.sendRequest = async (urlKey, data) => {
    const response = await axios.post(urls[urlKey], data, { headers: getHeaders() })
    return response.data
}

module.exports.validateInput = (format, quality) => {
    const validFormats = ['m4a', 'mp3', 'flac']
    const validQualities = ['32', '64', '128', '192', '256', '320']

    if (!validFormats.includes(format)) {
        throw new Error(`Invalid format! Choose one of the following: ${validFormats.path.join(', ')}`)
    }

    if (!validQualities.includes(quality)) {
        throw new Error(`Invalid quality! Choose one of the following: ${validQualities.path.join(', ')}`)
    }
}

module.exports.ensureDirectoryExists = (filePath) => {
    const directoryPath = path.dirname(filePath)
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true })
    }
}

module.exports.fetchVideoDetails = async (url, format) => sendRequest('info', { url, format, startTime: 0, endTime: 0 })

module.exports.fetchAudio = async (url, quality, filename, randomID, format) => sendRequest('download', {
    url,
    quality,
    metadata: true,
    filename,
    randID: randomID,
    trim: false,
    startTime: 0,
    endTime: 0,
    format
})

module.exports.executeDownload = (url, format = 'mp3', quality = '128') => {
    validateInput(format, quality)

    const videoDetails = await fetchVideoDetails(url, format)
    const audioDetails = await fetchAudio(url, quality, videoDetails.filename, videoDetails.randID, format)
    console.log(audioDetails)

    const outputDirectory = path.join(process.cwd(), 'downloads')
    const outputPath = path.join(outputDirectory, audioDetails.filename)
    ensureDirectoryExists(outputPath)

    const fileResponse = await axios.post('https://m8.fly.dev/api/file_send', {
        filepath: audioDetails.filepath,
        randID: audioDetails.randID
    }, { responseType: 'arraybuffer' })

    fs.writeFileSync(outputPath, fileResponse.data)
    console.log(`${outputPath}`)
}

module.exports.YTDownloader = {
    download: async (url, format = 'mp3', quality = '32') => {
        await executeDownload(url, format, quality)
    }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})