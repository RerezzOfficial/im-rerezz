const cheerio = require("cheerio");
const { fetch } = require("undici");
const { lookup } = require("mime-types");

async function mediafire(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Ambil nama file
        const filename = $(".dl-info .intro .filename").text().trim();
        if (!filename) throw new Error("Gagal mengambil nama file");

        // Ambil ukuran file
        const size = $(".details li:contains('File size:') span").text().trim();
        if (!size) throw new Error("Gagal mengambil ukuran file");

        // Ambil tanggal upload
        const uploaded = $(".details li:contains('Uploaded:') span").text().trim() || "Unknown";

        // Ambil ekstensi file dari nama file
        const ext = filename.split('.').pop() || "bin";

        // Tentukan mimetype berdasarkan ekstensi
        const mimetype = lookup(ext.toLowerCase()) || "application/octet-stream";

        // Ambil link download
        const download = $("#downloadButton").attr("href");
        if (!download) throw new Error("Gagal mengambil link download");

        return {
            filename,
            size,
            uploaded,
            ext,
            mimetype,
            download
        };

    } catch (error) {
        return { msg: "Gagal mengambil data dari link tersebut", error: error.message };
    }
}

module.exports = mediafire;
