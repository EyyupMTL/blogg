// BLOG LİSTELEME
let allPosts = []; // Tüm postları saklamak için

function displayPosts(posts) {
  const list = document.getElementById("blog-list");
  list.innerHTML = "";
  posts.forEach(post => {
    list.innerHTML += `
      <div class="blog-card">
        <img src="${post.cover}" class="cover">
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <a href="${post.link}">${post.linkText}</a>
      </div>
    `;
  });
}

// Fetch JSON ve listele
if (document.getElementById("blog-list")) {
  fetch("data/posts.json")
    .then(res => res.json())
    .then(data => {
      allPosts = data.posts;  // tüm postları sakla
      displayPosts(allPosts);
    });
}

// Arama fonksiyonu
const searchInput = document.getElementById("blog-search");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allPosts.filter(post => post.title.toLowerCase().includes(query));
    displayPosts(filtered);
  });
}


// BLOG YAZISI GÖSTER
if (location.pathname.includes("post.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  fetch("data/posts.json")
    .then(res => res.json())
    .then(data => {
      const post = data.posts.find(p => p.id === id);

      if (!post) {
        document.body.innerHTML = "<h1 style='padding:100px;'>Yazı Bulunamadı</h1>";
        return;
      }

      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-date").textContent = post.date;

      // Post içeriği: cover resmi + content HTML
      document.getElementById("post-content").innerHTML =
        (post.cover ? `<img src="${post.cover}" style="width:100%; border-radius:10px; margin-bottom:20px;">` : "") +
        post.content;
    });
}

// Hamburger kodu zaten varsa bırak
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if(hamburger){
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}
const blogGrid = document.getElementById('blog-grid');

fetch('site/data/index-posts.json')
  .then(response => response.json())
  .then(data => {
    data.posts.forEach(post => {
      const card = document.createElement('div');
      card.classList.add('blog-card');
      card.innerHTML = `
        <img src="${post.cover}" alt="${post.title}" class="cover">
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <a href="${post.link}">${post.linkText}</a>
      `;
      blogGrid.appendChild(card);
    });
  })
  .catch(err => console.error("JSON yüklenemedi:", err));

// İletişim formu gönderimi
const contactForm = document.getElementById("contact-form");
if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;

    const subject = encodeURIComponent(`İletişim Formu Mesajı: ${name}`);
    const body = encodeURIComponent(`Ad: ${name}\nEmail: ${email}\nMesaj:\n${message}`);

    // Gmail gönderimi için mailto link
    window.location.href = `mailto:seningmail@gmail.com?subject=${subject}&body=${body}`;document.addEventListener('DOMContentLoaded', () => {
  const posts = [
    {
      id: 1,
      title: "Fotoğraf Örnekli Blog",
      date: "2025-01-10",
      summary: "Fotoğraf ekleme testi",
      cover: "assets/foto1.jpg",
      content: "<p>Bu blog yazısında fotoğraf ekliyoruz.</p><img src='assets/foto1.jpg' style='width:100%; border-radius:10px;'>"
    },
    {
      id: 2,
      title: "Video Örnekli Blog",
      date: "2025-01-15",
      summary: "Video ekleme testi",
      cover: "assets/video_thumb.jpg",
      content: "<p>Video örneği:</p><video controls style='width:100%; border-radius:10px;'><source src='assets/video.mp4' type='video/mp4'></video>"
    },
    {
      id: 3,
      title: "YouTube Örneği",
      date: "2025-01-20",
      summary: "YouTube embed örneği",
      cover: "assets/youtube_thumb.jpg",
      content: "<iframe width='100%' height='400' src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameborder='0' allowfullscreen></iframe>"
    },
    {
      id: 4,
      title: "PDF Örneği",
      date: "2025-01-25",
      summary: "PDF görüntüleme testi",
      cover: "assets/pdf_thumb.jpg",
      content: "<p>PDF görüntüleme:</p><embed src='assets/dosya.pdf' type='application/pdf' width='100%' height='600px' />"
    },
    {
      id: 5,
      title: "Dosya İndirme Örneği",
      date: "2025-01-30",
      summary: "Dosya indirme testi",
      cover: "assets/download_thumb.jpg",
      content: "<p>Dosya indirme linki:</p><a href='assets/ornek_dosya.zip' download style='color:#ff0055; font-weight:bold;'>Dosyayı İndir</a>"
    }
  ];

  const blogGrid = document.querySelector('.blog-grid');

  if(blogGrid){
    // Eğer sayfa ana sayfa ise sadece son 3 yazıyı göster
    const isHomePage = document.querySelector('body').classList.contains('home');
    const postsToShow = isHomePage ? posts.slice(-3).reverse() : posts;

    postsToShow.forEach(post => {
      const card = document.createElement('div');
      card.classList.add('blog-card');
      card.innerHTML = `
        <img src="${post.cover}" alt="${post.title}" class="cover">
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <a href="post.html?id=${post.id}">Devamını Oku</a>
      `;
      blogGrid.appendChild(card);
    });
  }

  // Post sayfası
  const postContainer = document.querySelector('.post-container');
  if(postContainer){
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const post = posts.find(p => p.id === id);

    if(post){
      postContainer.innerHTML = `
        <h1>${post.title}</h1>
        <p><em>${post.date}</em></p>
        ${post.content}
      `;
    } else {
      postContainer.innerHTML = "<p>Gönderi bulunamadı.</p>";
    }
  }
});


    document.getElementById("form-status").textContent = "Mailiniz açılıyor...";
  });
}
// Üst sabit butonun aktif sayfa renk ayarı
const contactButton = document.querySelector('.contact-button');

if(contactButton) {
  const currentPage = window.location.pathname.split("/").pop(); // index.html, about.html, blog.html...
}