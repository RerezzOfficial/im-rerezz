const axios = require('axios');

const allowedProducts = ['MAST5', 'MAST10', 'MAST15', 'MAST30', 'MAST90', 'MAST180', 'MAST360'];
const getTelkomProducts = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProducts.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk.' });
  }
};

module.exports = { getTelkomProducts };
