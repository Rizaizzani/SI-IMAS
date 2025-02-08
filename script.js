// Data berita contoh (gunakan API jika diperlukan)
const newsData = [
    { title: "Pendidikan", category: "Pendidikan", content: "Alasan KJMU 2025 Belum Cair, Mahasiswa Tidak Lagi Dapat Rp 9 Juta", link: "https://www.kompas.com/edu/read/2025/02/07/183544871/alasan-kjmu-2025-belum-cair-mahasiswa-tidak-lagi-dapat-rp-9-juta" },
    { title: "Peningkatan Layanan Kesehatan", category: "Kesehatan", content: "Cek Kesehatan Gratis Di mulai 10 Februari Khusus 7-17 Tahun Dilakukan di Sekolah", link: "https://health.detik.com/berita-detikhealth/d-7768250/cek-kesehatan-gratis-dimulai-10-februari-khusus-7-17-tahun-dilakukan-di-sekolah" },
    { title: "Dampak Sosial Media", category: "Sosial", content: "Komisi I DPR: PP turunan UU ITE bisa batasi media sosial untuk anak.", link: "https://www.antaranews.com/berita/4587982/komisi-i-dpr-pp-turunan-uu-ite-bisa-batasi-media-sosial-untuk-anak#google_vignette" },
    { title: "Kasus Jiwas Raya", category: "Politik", content: "Dirjen Kemenkeu Isa Rachmatarwata jadi tersangka, kejagung : Kasus Jiwasraya Rugikan Negara Rp 16,8 T", link: "https://nasional.kompas.com/read/2025/02/07/22145731/dirjen-kemenkeu-isa-rachmatarwata-jadi-tersangka-kejagung-kasus-jiwasraya" }
];

// Fungsi untuk menampilkan berita
function displayNews(filteredNews = newsData) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; 
    filteredNews.forEach(news => {
        const newsCard = document.createElement("div");
        newsCard.className = "card bg-white p-4 rounded-lg shadow hover:shadow-lg transition";
        newsCard.innerHTML = `
            <h3 class="text-lg font-bold">${news.title}</h3>
            <p class="text-gray-600">${news.category}</p>
            <p>${news.content}</p>
            <a href="${news.link}" class="text-blue-500 font-bold">Baca selengkapnya</a>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// Menampilkan berita saat halaman dimuat
displayNews();

// Pencarian berita real-time
document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredNews = newsData.filter(news => news.title.toLowerCase().includes(query));
    displayNews(filteredNews);
});
// Toggle menu responsif
document.getElementById("menu").addEventListener("click", function() {
    document.getElementById("nav-links").classList.toggle("active");
});

// Form pengaduan dengan validasi
document.getElementById("complaint-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const complaint = document.getElementById("complaint").value.trim();
    const notification = document.getElementById("notification");

    if (name && complaint) {
        // Tampilkan notifikasi
        notification.textContent = "✅ Pengaduan berhasil dikirim!";
        notification.classList.add("show");

        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);

        // Reset form
        this.reset();
    } else {
        alert("Harap isi semua kolom!");
    }
});

// Hero section dengan gambar yang berganti otomatis
document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.getElementById("hero-section");

    // Daftar gambar yang akan digunakan
    const images = [
        "kesehatan.png",  // Sesuaikan path gambar
        "sosial.png",
        "pend.png",
        "politik.png"
    ];

    let currentIndex = 0;

    function changeBackground() {
        heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
        heroSection.style.backgroundSize = "cover";
        heroSection.style.backgroundPosition = "center";
        heroSection.style.transition = "background-image 1s ease-in-out";
        
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Ganti gambar pertama kali
    changeBackground();

    // Ganti gambar setiap 5 detik
    setInterval(changeBackground, 5000);
});

// Fungsi untuk mengambil berita terbaru dari API (opsional)
async function fetchNews() {
    const API_KEY = "e43be4d878944c0ea25841c597ba3e6d"; // Ganti dengan API Key Anda
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=id&category=general&apiKey=${API_KEY}`);
        const data = await response.json();
        
        if (data.articles) {
            const newsFromAPI = data.articles.map(article => ({
                title: article.title,
                category: "Berita Umum",
                content: article.description || "Tidak ada deskripsi",
                link: article.url
            }));
            displayNews(newsFromAPI);
        }
    } catch (error) {
        console.error("Gagal mengambil berita dari API:", error);
    }
}

// Uncomment jika ingin mengambil berita dari API
// fetchNews();
// setInterval(fetchNews, 86400000); // Update setiap 24 jam
