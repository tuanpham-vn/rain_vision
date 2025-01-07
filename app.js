// Create the map centered at a specific location (e.g., Manila)

const map = L.map('map', {
    center: [12.8797, 121.7740], 
    zoom: 5,
    minZoom: 3,
    maxZoom: 16,
    attributionControl: false,
    zoomControl: true
});
// Add OpenStreetMap tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 14,
    minZoom: 4
}).addTo(map);

// Define image sets for different layers
// amount 
const layerData = {
    rainsat: [
        { url: 'images/rainsat/2025-01-06_0800_colored.png', time: '2025-01-06 08:00', amount: '2.5' },
        { url: 'images/rainsat/2025-01-06_0805_colored.png', time: '2025-01-06 08:05', amount: '2.7' },
        { url: 'images/rainsat/2025-01-06_0810_colored.png', time: '2025-01-06 08:10', amount: '2.9' },
        { url: 'images/rainsat/2025-01-06_0815_colored.png', time: '2025-01-06 08:15', amount: '3.0' },
        { url: 'images/rainsat/2025-01-06_0820_colored.png', time: '2025-01-06 08:20', amount: '3.2' },
        { url: 'images/rainsat/2025-01-06_0825_colored.png', time: '2025-01-06 08:25', amount: '3.5' },
        { url: 'images/rainsat/2025-01-06_0830_colored.png', time: '2025-01-06 08:30', amount: '3.7' },
        { url: 'images/rainsat/2025-01-06_0835_colored.png', time: '2025-01-06 08:35', amount: '3.9' },
        { url: 'images/rainsat/2025-01-06_0840_colored.png', time: '2025-01-06 08:40', amount: '4.1' },
        { url: 'images/rainsat/2025-01-06_0845_colored.png', time: '2025-01-06 08:45', amount: '4.5' },
        { url: 'images/rainsat/2025-01-06_0850_colored.png', time: '2025-01-06 08:50', amount: '4.9' },
        { url: 'images/rainsat/2025-01-06_0855_colored.png', time: '2025-01-06 08:55', amount: '5.3' },
        { url: 'images/rainsat/2025-01-06_0900_colored.png', time: '2025-01-06 09:00', amount: '5.7' },
        { url: 'images/rainsat/2025-01-06_0905_colored.png', time: '2025-01-06 09:05', amount: '5.5' },
        { url: 'images/rainsat/2025-01-06_0910_colored.png', time: '2025-01-06 09:10', amount: '5.3' },
        { url: 'images/rainsat/2025-01-06_0920_colored.png', time: '2025-01-06 09:15', amount: '5.0' },
        { url: 'images/rainsat/2025-01-06_0925_colored.png', time: '2025-01-06 09:20', amount: '4.8' },
        { url: 'images/rainsat/2025-01-06_0930_colored.png', time: '2025-01-06 09:25', amount: '4.6' },
        { url: 'images/rainsat/2025-01-06_0935_colored.png', time: '2025-01-06 09:30', amount: '4.4' },
        { url: 'images/rainsat/2025-01-06_0910_colored.png', time: '2025-01-06 09:35', amount: '5.3' },
        { url: 'images/rainsat/2025-01-06_0920_colored.png', time: '2025-01-06 09:40', amount: '5.0' },
        { url: 'images/rainsat/2025-01-06_0925_colored.png', time: '2025-01-06 09:45', amount: '4.8' },
        { url: 'images/rainsat/2025-01-06_0930_colored.png', time: '2025-01-06 09:50', amount: '4.6' },
        { url: 'images/rainsat/2025-01-06_0935_colored.png', time: '2025-01-06 10:00', amount: '4.4' }
        ],
    himawari: [
        { url: 'images/himawari/2025-01-04_2100.png', time: '2025-01-04 21:00', amount: '2.5' },
        { url: 'images/himawari/2025-01-04_2110.png', time: '2025-01-04 21:10', amount: '3.2' },
        { url: 'images/himawari/2025-01-04_2120.png', time: '2025-01-04 21:20', amount: '4.1' },
        { url: 'images/himawari/2025-01-04_2130.png', time: '2025-01-04 21:30', amount: '5.7' },
        { url: 'images/himawari/2025-01-04_2140.png', time: '2025-01-04 21:40', amount: '4.8' },
        { url: 'images/himawari/2025-01-04_2150.png', time: '2025-01-04 21:50', amount: '3.9' },
        { url: 'images/himawari/2025-01-04_2200.png', time: '2025-01-04 22:00', amount: '3.3' },
        { url: 'images/himawari/2025-01-04_2210.png', time: '2025-01-04 22:10', amount: '2.8' },
        { url: 'images/himawari/2025-01-04_2220.png', time: '2025-01-04 22:20', amount: '2.2' },
        { url: 'images/himawari/2025-01-04_2230.png', time: '2025-01-04 22:30', amount: '1.5' },
        { url: 'images/himawari/2025-01-04_2240.png', time: '2025-01-04 22:40', amount: '1.5' },
        { url: 'images/himawari/2025-01-04_2250.png', time: '2025-01-04 22:50', amount: '1.5' }
    ]
};
const layerIntervals = {
    rainsat: 5 * 60 * 1000,  // 5 phút = 300000 ms
    himawari: 10 * 60 * 1000 // 10 phút = 600000 ms
};

// Current active layer
let currentLayer = 'rainsat';
let currentData = layerData[currentLayer];

const layerBounds = {
    himawari: [
        [-12.0, 81.74],  // Southwest point [lat, lng]
        [32.94, 155.7]   // Northeast point [lat, lng]
    ],
    rainsat: [
        [4.5, 116.4],    // Southwest point [lat, lng] = [min_lat, min_long]
        [21.35, 127.0]   // Northeast point [lat, lng] = [max_lat, max_long]
    ]
};

let currentOverlay = null;
let currentIndex = 0;
let isPlaying = false;
let playInterval;

// Initialize controls
const playButton = document.getElementById('playButton');
const timeSlider = document.getElementById('timeSlider');
const currentTime = document.getElementById('currentTime');

function formatDateTime(dateTimeStr) {
    // Kiểm tra nếu chuỗi đầu vào có định dạng "YYYY-MM-DD HH:mm"
    const match = dateTimeStr.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
    
    if (match) {
        const [_, year, month, day, hours, minutes] = match;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthNames[parseInt(month) - 1];
        
        // Trả về chuỗi đã định dạng với ký tự xuống dòng
        return `${monthName} ${parseInt(day)}\n${hours}:${minutes}`;
    }

    // Nếu không khớp định dạng, trả về chuỗi gốc
    return dateTimeStr;
}

function updateTimeDisplayPosition() {
    const slider = document.getElementById('timeSlider');
    const timeDisplay = document.getElementById('currentTime');
    const sliderRect = slider.getBoundingClientRect();
    const thumbPosition = (slider.value - slider.min) / (slider.max - slider.min);
    const thumbOffset = thumbPosition * sliderRect.width;
    
    timeDisplay.style.left = `${thumbOffset}px`;
}

function updateMap(index) {
    if (currentOverlay) {
        map.removeLayer(currentOverlay);
    }
    
    currentOverlay = L.imageOverlay(currentData[index].url, layerBounds[currentLayer], {
        opacity: 0.7
    }).addTo(map);
    
    timeSlider.value = index;
    currentTime.textContent = formatDateTime(currentData[index].time);
    updateTimeDisplayPosition();
}

function playAnimation() {
    if (isPlaying) {
        currentIndex = (currentIndex + 1) % currentData.length;
        updateMap(currentIndex);
    }
}

// Thêm biến để theo dõi tốc độ
let playbackSpeed = 1;
const minSpeed = 0.25;
const maxSpeed = 8;


// Cập nhật interval time dựa trên tốc độ
function updatePlaybackSpeed() {
    if (isPlaying) {
        clearInterval(playInterval);
        playInterval = setInterval(playAnimation, 1000 / playbackSpeed);
    }
    // Thêm kiểm tra element tồn tại
    const speedDisplay = document.getElementById('speedDisplay');
    if (speedDisplay) {
        speedDisplay.textContent = playbackSpeed + 'x';
    }
}

// Xử lý sự kiện nút tăng tốc độ
document.getElementById('increaseSpeed').addEventListener('click', () => {
    if (playbackSpeed < maxSpeed) {
        playbackSpeed = Math.min(maxSpeed, playbackSpeed * 2);
        updatePlaybackSpeed();
    }
});

// Xử lý sự kiện nút giảm tốc độ
document.getElementById('decreaseSpeed').addEventListener('click', () => {
    if (playbackSpeed > minSpeed) {
        playbackSpeed = Math.max(minSpeed, playbackSpeed / 2);
        updatePlaybackSpeed();
    }
});

// Cập nhật lại hàm playButton event listener
playButton.addEventListener('click', () => {
    isPlaying = !isPlaying;
    const playIcon = playButton.querySelector('i');
    playIcon.classList.remove(isPlaying ? 'fa-play' : 'fa-pause');
    playIcon.classList.add(isPlaying ? 'fa-pause' : 'fa-play');
    
    if (isPlaying) {
        playInterval = setInterval(playAnimation, 1000 / playbackSpeed);
    } else {
        clearInterval(playInterval);
    }
});

timeSlider.addEventListener('input', (e) => {
    currentIndex = parseInt(e.target.value);
    updateMap(currentIndex);

    if (isPlaying) {
        isPlaying = false;
        const playIcon = playButton.querySelector('i');
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        clearInterval(playInterval);
    }
});

// Map controls position
map.zoomControl.setPosition('bottomleft');

// Add scale control
L.control.scale({
    position: 'bottomleft',
    imperial: false
}).addTo(map);
// Add layer switching functionality
document.querySelectorAll('.layer-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update current layer and data
        currentLayer = button.dataset.layer;
        currentData = layerData[currentLayer];

        // Update slider max value based on layer type
        if (currentLayer === 'himawari') {
            timeSlider.min = 0;
            timeSlider.max = 11;
        } else {
            timeSlider.min = 0;
            timeSlider.max = 23;
        }
        // Reset animation state
        currentIndex = 0;
        isPlaying = false;
        clearInterval(playInterval);
        
        // Update play button icon
        const playIcon = playButton.querySelector('i');
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        
        // Update map with new layer
        updateMap(0);
    });
});



// Thêm vào đầu file, sau các khai báo biến
const startDate = document.getElementById('startDate');
const startTime = document.getElementById('startTime');
const endDate = document.getElementById('endDate');
const endTime = document.getElementById('endTime');
const fetchButton = document.getElementById('fetchData');

// Set giá trị mặc định cho các input
const today = new Date();
startDate.value = today.toISOString().split('T')[0];
startTime.value = '00:00';
endDate.value = today.toISOString().split('T')[0];
endTime.value = '23:55';

// Xử lý sự kiện khi click nút fetch
fetchButton.addEventListener('click', async () => {
    const startDateTime = new Date(`${startDate.value} ${startTime.value}`);
    const endDateTime = new Date(`${endDate.value} ${endTime.value}`);
    
    try {
        const response = await fetch('/api/rainfall-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                layer: currentLayer
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Cập nhật dữ liệu mới
        currentData = data;
        currentIndex = 0;
        updateMap(0);
        
        // Reset animation state
        isPlaying = false;
        clearInterval(playInterval);
        const playIcon = playButton.querySelector('i');
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. The server is not ready yet.');
    }
});



// Initial map update
updateMap(0);

// Thêm event listener cho window resize
window.addEventListener('resize', updateTimeDisplayPosition);