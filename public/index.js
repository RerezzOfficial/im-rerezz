      function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('active');
      document.getElementById('overlay').classList.toggle('active');
    }

    function closeSidebar() {
      document.getElementById('sidebar').classList.remove('active');
      document.getElementById('overlay').classList.remove('active');
    }

    function toggleMode() {
      document.body.classList.toggle('light-mode');
      const modeIcon = document.getElementById('mode-icon');
      modeIcon.classList.toggle('fa-moon');
      modeIcon.classList.toggle('fa-sun');
    }

    function openLink(url) {
      window.open(url, '_blank');
    }

async function fetchUsageData() {
    try {
        let response = await fetch('/api/get-usage-count');
        let data = await response.json();
        document.getElementById('usageCount').innerText = data.usageCount;

        response = await fetch('/api/reqtoday');
        data = await response.json();
        document.getElementById('reqToday').innerText = data.reqtoday;
    } catch (error) {
        console.error(error);
    }
}

// Fungsi untuk memperbarui visitor count
async function fetchVisitorData() {
    try {
        let response = await fetch('/api/visitor');
        let data = await response.text();
        document.getElementById('visitorCount').innerText = data;
    } catch (error) {
        console.error(error);
    }
}
setInterval(fetchUsageData, 5000);

fetchVisitorData();

fetchUsageData();

    function updateClock() {
            let now = new Date();
            let hours = now.getHours().toString().padStart(2, '0');
            let minutes = now.getMinutes().toString().padStart(2, '0');
            let seconds = now.getSeconds().toString().padStart(2, '0');
            document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
        }
        setInterval(updateClock, 1000);
        updateClock();
  
    function getDeviceName() {
            let userAgent = navigator.userAgent;
            let deviceName = "Perangkat Tidak Diketahui";

            if (/windows phone/i.test(userAgent)) {
                deviceName = "Windows Phone";
            } else if (/android/i.test(userAgent)) {
                deviceName = "Android";
            } else if (/iPad|Macintosh/i.test(userAgent) && 'ontouchend' in document) {
                deviceName = "iPad";
            } else if (/iPhone/i.test(userAgent)) {
                deviceName = "iPhone";
            } else if (/Macintosh/i.test(userAgent)) {
                deviceName = "Mac";
            } else if (/Windows/i.test(userAgent)) {
                deviceName = "Windows PC";
            } else if (/Linux/i.test(userAgent)) {
                deviceName = "Linux";
            }

            document.getElementById('device-info').textContent = deviceName;
        }
        getDeviceName();

    function getRAMInfo() {
            if (navigator.deviceMemory) {
                let totalRAM = navigator.deviceMemory; // Dapatkan jumlah RAM dalam GB
                document.getElementById('ram-info').textContent = ` ${totalRAM} GB`;
            } else {
                document.getElementById('ram-info').textContent = "RAM tidak dapat dideteksi";
            }
        }
        getRAMInfo();

    function getDateInfo() {
            const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            
            const today = new Date();
            const day = days[today.getDay()]; 
            const date = today.getDate(); 
            const month = months[today.getMonth()]; 
            const year = today.getFullYear(); 

            document.getElementById('date-info').textContent = `${day}, ${date} ${month} ${year}`;
        }
        getDateInfo();

    fetch('https://httpbin.org/ip')
      .then(response => response.json()) 
      .then(data => {
          document.getElementById('ip-address').textContent = `${data.origin}`;
    })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('ip-address').textContent = 'Error loading IP';
    });
   

    document.querySelectorAll('.menu-toggle').forEach(item => {
      item.addEventListener('click', function() {
        const parent = this.closest('.menu-item');
        const submenu = parent.querySelector('.menu-sub');
        
        if (parent.classList.contains('active')) {
          submenu.style.height = '0';
          submenu.style.opacity = '0';
          setTimeout(() => {
            parent.classList.remove('active');
          }, 500);
        } else {

          document.querySelectorAll('.menu-item.active').forEach(activeMenu => {
            if (activeMenu !== parent) {
              const activeSubmenu = activeMenu.querySelector('.menu-sub');
              activeSubmenu.style.height = '0';
              activeSubmenu.style.opacity = '0';
              activeMenu.classList.remove('active');
            }
          });

          parent.classList.add('active');
          submenu.style.height = submenu.scrollHeight + 'px';
          submenu.style.opacity = '1';
        }
      });
    });

    function showLoading() {
      document.getElementById('loading').style.display = 'flex';
      setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
      }, 1500); // 1.5 s
    }
    showLoading();


    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
          event.preventDefault();
          alert('View Source dinonaktifkan!');
      }
  });
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    alert('Klik kanan dinonaktifkan!');
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i')) {
        event.preventDefault();
        alert('Inspect Element dinonaktifkan!');
    }
});
                  
