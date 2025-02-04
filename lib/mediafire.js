const cheerio = require("cheerio");
const { fetch } = require("undici");
const { lookup } = require("mime-types");

async function mediafire(url) {
  try {
    const res = await fetch(url);
    const $ = cheerio.load(await res.text());
    const link = $('a#downloadButton').attr('href');
    const [nama, mime, size] = [
      link.split('/').pop().trim(),
      link.split('.').pop().trim(),
      $('a#downloadButton').text().replace(/Download|\(|\)|\n|\s+/g, '').trim()
    ];
    return [{
      nama,
      mime,
      size,
      link
    }];
  } catch (error) {
    console.error(error);
    throw new Error("Error Gan");
  }
}
module.exports = mediafire;
