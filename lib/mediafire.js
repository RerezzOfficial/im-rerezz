const cheerio = require("cheerio");
const { fetch } = require("undici");
const { lookup } = require("mime-types");

async function mediafire(url) {
    try {
        // Ambil HTML dari halaman MediaFire
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Cari nama file
        let filename = $(".filename").text().trim() || null;
        if (!filename) throw new Error("Gagal mengambil nama file");

        // Cari tipe file
        let type = $(".filetype span").first().text().trim() || "Unknown";

        // Ambil ukuran file
        let size = $(".details li")
            .filter((i, el) => $(el).text().includes("File size:"))
            .find("span")
            .text()
            .trim() || "Unknown";

        // Ambil tanggal upload
        let uploaded = $(".details li")
            .filter((i, el) => $(el).text().includes("Uploaded:"))
            .find("span")
            .text()
            .trim() || "Unknown";

        // Ambil ekstensi file dari nama file
        let ext = filename.split('.').pop().toLowerCase() || "bin";
        let mimetype = lookup(ext) || "application/octet-stream";

        // Ambil link download
        let download = $("a[href*='download']").attr("href") || null;
        if (!download) throw new Error("Gagal mengambil link download");

        return {
            filename,
            type,
            size,
            uploaded,
            ext,
            mimetype,
            download
        };

    } catch (error) {
        return {
            msg: "Gagal mengambil data dari link tersebut",
            error: error.message
        };
    }
}

module.exports = mediafire;
