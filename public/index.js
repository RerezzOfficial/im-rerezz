    // Fungsi untuk membuka/menutup sidebar kiri
    function toggleLeftSidebar() {
        const leftSidebar = document.getElementById('leftSidebar');
        const overlay = document.getElementById('overlay');
        const leftIcon = document.getElementById('leftIcon');
        const rightSidebar = document.getElementById('rightSidebar');
        const rightIcon = document.getElementById('rightIcon');
    
        if (leftSidebar.style.left === '0px') {
            leftSidebar.style.left = '-300px';
            overlay.style.display = 'none';
            leftIcon.classList.remove('fa-times');
            leftIcon.classList.add('fa-bars');
            leftIcon.classList.add('spin');
        } else {
            leftSidebar.style.left = '0';
            overlay.style.display = 'block';
            leftIcon.classList.remove('fa-bars');
            leftIcon.classList.add('fa-times');
            leftIcon.classList.add('spin'); 
            rightSidebar.style.right = '-300px'; 
            rightIcon.classList.remove('fa-times');
            rightIcon.classList.add('fa-user');
        }
    }
    
    // Fungsi untuk membuka/menutup sidebar kanan
    function toggleRightSidebar() {
        const rightSidebar = document.getElementById('rightSidebar');
        const overlay = document.getElementById('overlay');
        const rightIcon = document.getElementById('rightIcon');
        const leftSidebar = document.getElementById('leftSidebar');
        const leftIcon = document.getElementById('leftIcon');
    
        if (rightSidebar.style.right === '0px') {
            rightSidebar.style.right = '-320px';
            overlay.style.display = 'none';
            rightIcon.classList.remove('fa-times');
            rightIcon.classList.add('fa-user');
            rightIcon.classList.add('spin'); // Tambahkan animasi spin
        } else {
            rightSidebar.style.right = '0';
            overlay.style.display = 'block';
            rightIcon.classList.remove('fa-user');
            rightIcon.classList.add('fa-times');
            rightIcon.classList.add('spin'); // Tambahkan animasi spin
            leftSidebar.style.left = '-320px'; // Tutup sidebar kiri jika terbuka
            leftIcon.classList.remove('fa-times');
            leftIcon.classList.add('fa-bars');
        }
    }
    
    // Fungsi untuk menutup semua sidebar saat mengklik overlay
    function closeAllSidebars() {
        const leftSidebar = document.getElementById('leftSidebar');
        const rightSidebar = document.getElementById('rightSidebar');
        const overlay = document.getElementById('overlay');
        const leftIcon = document.getElementById('leftIcon');
        const rightIcon = document.getElementById('rightIcon');
    
        leftSidebar.style.left = '-320px';
        rightSidebar.style.right = '-320px';
        overlay.style.display = 'none';
        leftIcon.classList.remove('fa-times');
        leftIcon.classList.add('fa-bars');
        leftIcon.classList.add('spin'); // Tambahkan animasi spin
        rightIcon.classList.remove('fa-times');
        rightIcon.classList.add('fa-user');
        rightIcon.classList.add('spin'); // Tambahkan animasi spin
    }
    
    // Hapus kelas spin setelah animasi selesai
    document.querySelectorAll('.menu-icon i, .profile-icon i').forEach(icon => {
        icon.addEventListener('animationend', () => {
            icon.classList.remove('spin');
        });
    });
    
    // Fungsi untuk menambahkan animasi spin pada ikon
    function addSpinAnimation(element) {
        element.classList.add('spin');
        setTimeout(() => {
            element.classList.remove('spin');
        }, 500); // Durasi animasi spin
    }
    
    // Event listener untuk ikon menu dan profile
    document.getElementById('menuIcon').addEventListener('click', function () {
        addSpinAnimation(document.getElementById('leftIcon'));
    });
    
    document.getElementById('profileIcon').addEventListener('click', function () {
        addSpinAnimation(document.getElementById('rightIcon'));
    });
    
    // Event listener untuk overlay
    document.getElementById('overlay').addEventListener('click', closeAllSidebars);
    
    // Fungsi untuk mengaktifkan/menonaktifkan mode gelap
    function toggleDarkMode() {
        const body = document.body;
        const darkModeIcon = document.getElementById('darkModeIcon');
    
        body.classList.toggle('dark-mode');
    
        if (body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        }
    }
    
    document.getElementById('darkModeIcon').addEventListener('click', toggleDarkMode);
        
        
        function displayCurrentDate() {
                // Array untuk nama hari dan bulan
                const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
                // Dapatkan tanggal saat ini
                const today = new Date();
    
                // Ambil hari, tanggal, bulan, dan tahun
                const dayName = days[today.getDay()]; // Nama hari
                const date = today.getDate(); // Tanggal
                const monthName = months[today.getMonth()]; // Nama bulan
                const year = today.getFullYear(); // Tahun
    
                // Format tampilan
                const formattedDate = `${dayName}, ${date} ${monthName} ${year}`;
    
                // Tampilkan di elemen HTML
                document.getElementById('dateDisplay').textContent = formattedDate;
            }
    
            // Panggil function saat halaman dimuat
            displayCurrentDate();
        
        function updateClock() {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
                const clockElement = document.getElementById('clock');
                clockElement.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
            }
    
            // Memperbarui jam setiap milidetik
            setInterval(updateClock, 1);
        
        async function getIPDetails() {
            try {
                const response = await fetch('https://ipinfo.io/json');
                const data = await response.json();
                const ipAddress = data.ip;
                const city = data.city;
                const region = data.region;
                const country = data.country;
                const org = data.org;
    
                // Menampilkan detail IP
                document.getElementById('ip-address').innerHTML = `
                    <strong>IP:</strong> ${ipAddress}<br>
                    <strong>Provider:</strong> ${org}
                `;
            } catch (error) {
                console.error('Gagal mendapatkan detail IP:', error);
                document.getElementById('ip-address').textContent = 'Gagal memuat detail IP.';
            }
        }
        getIPDetails();
        
    
async function fetchVisitorCount() {
      try {
        const response = await fetch('/api/visitor');
        const data = await response.text();
        document.getElementById('visitor-count').innerText = `${data}`;
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        document.getElementById('visitor-count').innerText = 'Failed to load visitor count';
      }
    }
fetchVisitorCount();
