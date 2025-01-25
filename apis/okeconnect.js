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

const allowedProductsAxis = ['MASA14', 'MASA30', 'MASA120'];
const getAxisProducts = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsAxis.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Axis products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Axis.' });
  }
};

const allowedProductsIndosat = ['IMSA1', 'IMSA15', 'IMSA3', 'IMSA6', 'IMSA12', 'MSTH4'];
const getIndosatProducts = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsIndosat.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Indosat products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Indosat.' });
  }
};

const allowedProductsXL = ['MAXL1Y', 'MAXL1E', 'MAXLA'];
const getXLProducts = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsXL.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching XL products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk XL.' });
  }
};

const allowedProductsAxis = ['A5', 'A10', 'A15', 'A25', 'A30', 'A40', 'A50', 'A60', 'A70', 'A80', 'A90', 'A100', 'A150', 'A200'];
const getAxisPulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsAxis.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Axis pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa Axis.' });
  }
};

const allowedProductsByu = [
  'BYU5', 'BYU10', 'BYU15', 'BYU20', 'BYU25', 'BYU30', 'BYU35', 'BYU40', 'BYU45', 
  'BYU50', 'BYU55', 'BYU60', 'BYU65', 'BYU70', 'BYU75', 'BYU80', 'BYU85', 'BYU90', 
  'BYU95', 'BYU100', 'BYU150', 'BYU200'
];
const getByuPulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsByu.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching By U pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa By U.' });
  }
};

const allowedProductsIndosat = [
  'IA5', 'I5', 'IA10', 'I10', 'I12', 'I15', 'I20', 'I25', 'I30', 'I40', 'I50', 'I60', 
  'I70', 'I80', 'I90', 'I100', 'I150', 'I200', 'I500'
];
const getIndosatPulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsIndosat.includes(item.kode));

    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Indosat pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa Indosat.' });
  }
};

const allowedProductsSmartfren = [
  'SM5', 'SM10', 'SM12', 'SM15', 'SM20', 'SM25', 'SM30', 'SM35', 'SM40', 'SM45', 
  'SM50', 'SM55', 'SM60', 'SM65', 'SM70', 'SM75', 'SM80', 'SM85', 'SM90', 'SM95', 
  'SM100', 'SM125', 'SM150', 'SM200'
];
const getSmartfrenPulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsSmartfren.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Smartfren pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa Smartfren.' });
  }
};

const allowedProductsTelkomsel = [
  'S2', 'S3', 'S4', 'SP5', 'S5', 'S6', 'SP10', 'S10', 'S15', 'SP20', 'S20', 'S25', 
  'S30', 'S35', 'S40', 'S45', 'S50', 'S55', 'S60', 'S65', 'S70', 'S75', 'S80', 'S85', 
  'S90', 'S95', 'S100', 'S150', 'S200'
];
const getTelkomselPulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomsel.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa Telkomsel.' });
  }
};

const allowedProductsThree = [
  'T5', 'T10', 'T15', 'T20', 'T25', 'T30', 'T40', 'T50', 'T60', 'T70', 'T75', 'T80',
  'T90', 'T100', 'T125', 'T150', 'T200'
];
const getThreePulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsThree.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Three pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa Three.' });
  }
};

const allowedProductsXL = [
  'X5', 'X10', 'X15', 'X25', 'X30', 'X40', 'X50', 'X60', 'X70', 'X80', 'X90', 'X100', 'X150', 'X200'
];
const getXLPulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsXL.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching XL pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa XL.' });
  }
};

const allowedProductsAxis = [
  'XLA5', 'XLA10', 'XLA15', 'XLA25', 'XLA30', 'XLA40', 'XLA50', 'XLA60', 'XLA70', 'XLA80', 'XLA90', 'XLA100', 'XP150', 'XP200'
];
const getAxisPulsa = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=pulsa`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsAxis.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Axis pulsa products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk pulsa Axis.' });
  }
};

//=====[ KUOTA TELKOMSEL ]=====//
const allowedProductsTelkomsel = [
  'CMDT3B', 'CMDT2B', 'CMDT1A', 'CEKHTDM', 'CMDT7A', 'CMDT3A', 'CMDT2A', 'CMDT15B', 
  'LISTTDM', 'CMDT5B', 'CMDT3', 'CMDT1B', 'CMDT15A', 'BMDT1B', 'BMDT15A', 'BMDT3',
  'BMDT2A', 'BMDT1A', 'BMDT3B', 'BMDT5B', 'BMDT7A', 'BMDT15B', 'BMDT3A', 'BMDT2B', 'BYRHTDM'
];
const getTelkomselDigipostMini = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomsel.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel Digipost Mini products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel Digipost Mini.' });
  }
};

const allowedProductsTelkomselMiniHarian = [
  'TDH5001', 'TDH1GBB', 'TDH5003', 'TDH1GB1', 'TDH1GB3', 'TDH2G5NA', 'TDH2GB3', 
  'TDH3GB5', 'TDH4GB1', 'TDH6GB1', 'TDH5GB1', 'TDH3GB3', 'TDH5GB3', 'TDH8GB3', 
  'TDH7GB3', 'TDH17GB3', 'TDH15GB3', 'TDH20GB3', 'TDH10GB3'
];
const getTelkomselMiniHarian = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselMiniHarian.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel Mini Harian products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel Mini Harian.' });
  }
};

const allowedProductsTelkomselMinimalam = [
  'TDD2', 'TDD1', 'TDD5A', 'TDD13', 'TDD14', 'TDD5', 'TDD5B', 'TDD18', 'TDD5C', 'TDD15'
];
const getTelkomselMinimalam = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselMinimalam.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel Kuota Malam products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel Kuota Malam.' });
  }
};

const allowedProductsTelkomselMinimingguan = [
  'TDH50', 'TDH100', 'TDH250', 'TDH500', 'TDM5007H', 'TDM1GB7', 'TMD1GB', 'TDH750', 
  'TDM157GB', 'TDM2GB7', 'TDM3GB7', 'TDM1GB14', 'TDM2GB14', 'TDM7GB7', 'TDM5GB7', 
  'TDM3GB14', 'TDM5GB14', 'TDM17GB7', 'TDM10GB7', 'TDM15GB7', 'TDM30GB7'
];
const getTelkomselMinimingguan = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselMinimingguan.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel Mini Data Mingguan products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel Mini Data Mingguan.' });
  }
};

const allowedProductsTelkomselUmkm = [
  'TMKM3', 'TMKM6', 'TMKM10', 'TMKM17', 'TMKM27', 'TMKM40'
];
const getTelkomselUmkm = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselUmkm.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel UMKM products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel UMKM.' });
  }
};

const allowedProductsTelkomselFacebook = [
  'TDFB1A', 'TDFB2A', 'TDFB4A', 'TDFB3A', 'TDSFBU1N', 'TDFB5A', 'TDFB6A', 'TDSFBU3N', 'TDSFBU7N', 'TDFB7A', 'TDFB8A'
];
const getTelkomselFacebook = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselFacebook.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel Facebook products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel Facebook.' });
  }
};

const allowedProductsTelkomselInstagram = [
  'TDIG1A', 'TDIG2A', 'TDIG4A', 'TDIG3A', 'TDSIGU1N', 'TDIG5A', 'TDIG6A', 'TDSIGU3N', 'TDSIGU7N', 'TDIG7A', 'TDIG8A'
];
const getTelkomselInstagram = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselInstagram.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel Instagram products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel Instagram.' });
  }
};

const allowedProductsTelkomselTiktok = [
  'TDTT1A', 'TDSTTU1N', 'TDTT2A', 'TDTT4A', 'TDTT3A', 'TDSTTU3N', 'TDTT5A', 'TDTT6A', 'TDSTTU7N', 'TDTT7A', 'TDTT8A'
];
const getTelkomselTiktok = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselTiktok.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel TikTok products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel TikTok.' });
  }
};

const allowedProductsTelkomselWA = [
  'TDWA1A', 'TDWA2A', 'TDWA4A', 'TDWA3A', 'TDWA5A', 'TDWA6A', 'TDWA7A', 'TDWA8A'
];
const getTelkomselWA = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselWA.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel WA products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel WA.' });
  }
};

const allowedProductsTelkomselYT = [
  'TDYT1A', 'TDSYTU1N', 'TDYT2A', 'TDYT4A', 'TDSYTU3N', 'TDYT3A', 'TDYT5A', 'TDYT6A', 
  'TDSYTU7N', 'TDYT7A', 'SDYTP', 'TDYT8A'
];
const getTelkomselYT = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=bulk_telkomsel`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsTelkomselYT.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Telkomsel YouTube products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Telkomsel YouTube.' });
  }
};

const allowedProductsOrbitModem = [
  'TOM10GB', 'TOM30GB', 'TOM50GB', 'TOM100GB', 'TOMA10', 'TOMA35', 'TOMA70', 'TOMA100', 
  'TOMA150', 'TOMA250'
];
const getOrbitModem = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=orbit_modem`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsOrbitModem.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching Orbit modem products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk Orbit modem.' });
  }
};

const allowedProductsAllZona = [
  'TOMB7', 'TOMB15', 'TOMB25', 'TOMB25A', 'TOMB35', 'TOMB45', 'TOMB20', 'TOMB50', 'TOMB70', 
  'TOMB65', 'TOMB100', 'TOMB90', 'TOMB100A', 'TOMB125', 'TOMB150', 'TOMB175', 'TOMB280', 'TOMB300'
];
const getAllZona = async (req, res) => {
  try {
    const apiUrl = `https://www.okeconnect.com/harga/list?id=905ccd028329b0a&produk=all_zona`;
    const response = await axios.get(apiUrl);
    const filteredData = response.data.filter(item => allowedProductsAllZona.includes(item.kode));
    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan.' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching All Zona products:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk All Zona.' });
  }
};

module.exports = { 
  getTelkomProducts, 
  getAxisProducts, 
  getIndosatProducts, 
  getXLProducts,
  getAxisPulsa,
  getByuPulsa,
  allowedProductsIndosat,
  getSmartfrenPulsa,
  getTelkomselPulsa,
  getThreePulsa,
  getXLPulsa,
  getAxisPulsa,
  getTelkomselDigipostMini,
  getTelkomselMiniHarian,
  getTelkomselMinimalam,
  getTelkomselMinimingguan,
  getTelkomselUmkm,
  getTelkomselFacebook,
  getTelkomselInstagram,
  getTelkomselTiktok,
  getTelkomselWA,
  getTelkomselYT,
  getOrbitModem,
  getAllZona
};
