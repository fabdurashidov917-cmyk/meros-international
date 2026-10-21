/**
 * Meros International Clinic - Main Scripts
 */

// 36 Actual Clinic Photos List
const galleryImages = [
  { src: 'images/XXXL.webp', title: 'Meros International binosi tashqi ko‘rinishi', category: 'exterior' },
  { src: 'images/XXXL (1).webp', title: 'Qabulxona (Reseption) va kutish zali', category: 'exterior' },
  { src: 'images/XXXL (2).webp', title: 'Shifokor ko‘rik xonasi va zamonaviy jihozlar', category: 'rooms' },
  { src: 'images/XXXL (3).webp', title: 'Laboratoriya tahlil xonasi', category: 'equipment' },
  { src: 'images/XXXL (4).webp', title: 'Klinika vestibyuli va ro‘yxatga olish bo‘limi', category: 'exterior' },
  { src: 'images/XXXL (5).webp', title: 'Bemorlar uchun qulay kutish divanlari', category: 'rooms' },
  { src: 'images/XXXL (6).webp', title: 'Diagnostika va tekshiruv apparatlari', category: 'equipment' },
  { src: 'images/XXXL (7).webp', title: 'Keng va yorug‘ yo‘laklar', category: 'exterior' },
  { src: 'images/XXXL (8).webp', title: 'Muolaja xonasi va steril sharoitlar', category: 'rooms' },
  { src: 'images/XXXL (9).webp', title: 'Qon olish va ekspress tahlil punkti', category: 'equipment' },
  { src: 'images/XXXL (10).webp', title: 'Zamonaviy shifokor kabineti', category: 'rooms' },
  { src: 'images/XXXL (11).webp', title: 'UTT (UZI) apparati va monitor', category: 'equipment' },
  { src: 'images/XXXL (12).webp', title: 'Yuqori aniqlikdagi skanerlash uskunasi', category: 'equipment' },
  { src: 'images/XXXL (13).webp', title: 'Bemorlar uchun shinam palata', category: 'rooms' },
  { src: 'images/XXXL (14).webp', title: 'Palata qulayliklari va krovatlar', category: 'rooms' },
  { src: 'images/XXXL (15).webp', title: 'Kardiologiya va EKG tekshiruv burchagi', category: 'equipment' },
  { src: 'images/XXXL (16).webp', title: 'Konsultatsiya va mutaxassis stoli', category: 'rooms' },
  { src: 'images/XXXL (17).webp', title: 'Laboratoriya mikroskop va analizatorlari', category: 'equipment' },
  { src: 'images/XXXL (18).webp', title: 'Avtomatlashgan qon tahlilatori', category: 'equipment' },
  { src: 'images/XXXL (19).webp', title: 'Shinam qabul zali', category: 'exterior' },
  { src: 'images/XXXL (20).webp', title: 'Sterilizatsiya va tozalik nazorati', category: 'rooms' },
  { src: 'images/XXXL (21).webp', title: 'Kunduzgi statsionar palatasi', category: 'rooms' },
  { src: 'images/XXXL (22).webp', title: 'Bemorlar salomatligi nazorati', category: 'rooms' },
  { src: 'images/XXXL (23).webp', title: 'Tibbiy asbob-uskunalar jamlanmasi', category: 'equipment' },
  { src: 'images/XXXL (24).webp', title: 'Pediatriya va bolalar ko‘rigi xonasi', category: 'rooms' },
  { src: 'images/XXXL (25).webp', title: 'Qon bosimi va puls monitoringi', category: 'equipment' },
  { src: 'images/XXXL (26).webp', title: 'Muolaja stoli va qulay sharoit', category: 'rooms' },
  { src: 'images/XXXL (27).webp', title: 'Klinika fasadi va kirish qismi', category: 'exterior' },
  { src: 'images/XXXL (28).webp', title: 'Bemorlar uchun qulay yo‘naltiruvchi belgilar', category: 'exterior' },
  { src: 'images/XXXL (29).webp', title: 'Klinika shifokorlar kabinetlari qatori', category: 'rooms' },
  { src: 'images/XXXL (30).webp', title: 'Biokimyoviy reagentlar va probirkalar', category: 'equipment' },
  { src: 'images/XXXL (31).webp', title: 'Steril tibbiy sarflanuvchi materiallar', category: 'equipment' },
  { src: 'images/XXXL (32).webp', title: 'Diagnostika monitorlari va natijalar ekrani', category: 'equipment' },
  { src: 'images/XXXL (33).webp', title: 'Klinika binosining umumiy manzarasi', category: 'exterior' },
  { src: 'images/XXXL (34).webp', title: 'Tashrif buyuruvchilar kutish maydoni', category: 'exterior' },
  { src: 'images/XXXL (35).webp', title: 'Meros International tibbiyot markazi zallari', category: 'rooms' }
];

let currentLightboxIndex = 0;
let filteredGalleryImages = [...galleryImages];
let isShowingAllPhotos = false;
const INITIAL_PHOTO_COUNT = 12;

document.addEventListener('DOMContentLoaded', () => {
  initLiveClinicStatus();
  renderGallery();
  initGalleryTabs();
  initServiceSearchAndTabs();
});

/* ----------------------------------------------------
   1. REAL-TIME CLINIC STATUS & TIMETABLE
   ---------------------------------------------------- */
function initLiveClinicStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let isOpen = false;
  let closingTime = '';
  let openingTime = '07:00';

  if (day === 0) {
    // Sunday: 08:30 - 17:00
    const openTime = 8 * 60 + 30; // 510 min
    const closeTime = 17 * 60;    // 1020 min
    isOpen = currentMinutes >= openTime && currentMinutes < closeTime;
    closingTime = '17:00';
    openingTime = '08:30';
  } else {
    // Monday to Saturday: 07:00 - 22:00
    const openTime = 7 * 60;      // 420 min
    const closeTime = 22 * 60;    // 1320 min
    isOpen = currentMinutes >= openTime && currentMinutes < closeTime;
    closingTime = '22:00';
    openingTime = '07:00';
  }

  // Update header status badge
  const headerStatusBadge = document.getElementById('headerClinicStatusBadge');
  const headerStatusText = document.getElementById('headerStatusText');
  const statusLiveText = document.getElementById('statusLiveText');

  if (isOpen) {
    if (headerStatusText) headerStatusText.textContent = `Hozir ochiq (${closingTime} gacha)`;
    if (statusLiveText) {
      statusLiveText.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-emerald-700 font-bold">Klinika hozir ochiq • Bugun soat ${closingTime} gacha</span>
      `;
    }
  } else {
    if (headerStatusBadge) {
      headerStatusBadge.className = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30';
    }
    if (headerStatusText) headerStatusText.textContent = `Bungacha yopiq (Ertaga ochiladi)`;
    if (statusLiveText) {
      statusLiveText.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-amber-500"></span>
        <span class="text-amber-800 font-bold">Hozir yopiq • Ertaga soat ${day === 6 ? '08:30' : '07:00'} da ochiladi</span>
      `;
    }
  }

  // Highlight today's row in schedule timetable
  const rows = document.querySelectorAll('.schedule-row');
  rows.forEach(row => {
    const rowDay = parseInt(row.getAttribute('data-day'), 10);
    if (rowDay === day) {
      row.classList.add('active-today');
      const badge = document.createElement('span');
      badge.className = 'ml-2 text-[10px] font-bold text-brand-700 bg-brand-100 px-1.5 py-0.5 rounded';
      badge.textContent = 'Bugun';
      const labelEl = row.querySelector('span:first-child');
      if (labelEl) labelEl.appendChild(badge);
    }
  });
}

/* ----------------------------------------------------
   2. GALLERY RENDERING & LIGHTBOX
   ---------------------------------------------------- */
function renderGallery() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  container.innerHTML = '';
  const displayList = isShowingAllPhotos 
    ? filteredGalleryImages 
    : filteredGalleryImages.slice(0, INITIAL_PHOTO_COUNT);

  displayList.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card group shadow-sm border border-slate-200';
    card.onclick = () => openLightbox(index);

    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover">
      <div class="gallery-card-overlay">
        <div>
          <div class="text-[11px] font-semibold text-brand-300 uppercase tracking-wider">Meros International</div>
          <div class="text-white text-xs sm:text-sm font-bold line-clamp-1">${item.title}</div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  const moreWrapper = document.getElementById('galleryMoreWrapper');
  const showAllBtn = document.getElementById('showAllPhotosBtn');
  if (moreWrapper && showAllBtn) {
    if (filteredGalleryImages.length <= INITIAL_PHOTO_COUNT) {
      moreWrapper.classList.add('hidden');
    } else {
      moreWrapper.classList.remove('hidden');
      if (isShowingAllPhotos) {
        showAllBtn.textContent = 'Kamroq ko‘rsatish';
      } else {
        showAllBtn.textContent = `Barcha 36 ta fotosuratni ko‘rish (${filteredGalleryImages.length} ta)`;
      }
    }
  }
}

function initGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab-btn');
  const showAllBtn = document.getElementById('showAllPhotosBtn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.className = 'gallery-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition shrink-0';
      });
      tab.className = 'gallery-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 text-white shadow-sm transition shrink-0';

      const filter = tab.getAttribute('data-filter');
      if (filter === 'all') {
        filteredGalleryImages = [...galleryImages];
      } else {
        filteredGalleryImages = galleryImages.filter(img => img.category === filter);
      }
      isShowingAllPhotos = false;
      renderGallery();
    });
  });

  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      isShowingAllPhotos = !isShowingAllPhotos;
      renderGallery();
    });
  }
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  const modal = document.getElementById('galleryLightbox');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function closeLightbox() {
  const modal = document.getElementById('galleryLightbox');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function updateLightboxContent() {
  if (currentLightboxIndex < 0) currentLightboxIndex = filteredGalleryImages.length - 1;
  if (currentLightboxIndex >= filteredGalleryImages.length) currentLightboxIndex = 0;

  const current = filteredGalleryImages[currentLightboxIndex];
  const imgEl = document.getElementById('lightboxImage');
  const indexEl = document.getElementById('lightboxIndex');
  const captionEl = document.getElementById('lightboxCaption');

  if (imgEl) imgEl.src = current.src;
  if (indexEl) indexEl.textContent = `${currentLightboxIndex + 1} / ${filteredGalleryImages.length}`;
  if (captionEl) captionEl.textContent = current.title;
}

function prevLightboxImage() {
  currentLightboxIndex--;
  updateLightboxContent();
}

function nextLightboxImage() {
  currentLightboxIndex++;
  updateLightboxContent();
}

// Lightbox keyboard controls
window.addEventListener('keydown', (e) => {
  const modal = document.getElementById('galleryLightbox');
  if (modal && !modal.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'Escape') closeLightbox();
  }
});

/* ----------------------------------------------------
   3. SERVICES SEARCH & CATEGORY FILTER
   ---------------------------------------------------- */
function initServiceSearchAndTabs() {
  const searchInput = document.getElementById('serviceSearchInput');
  const tabs = document.querySelectorAll('.service-tab-btn');
  const cards = document.querySelectorAll('.service-card');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterServices() {
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.getAttribute('data-name') || card.textContent.toLowerCase();

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = searchQuery === '' || cardText.includes(searchQuery.toLowerCase().trim());

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterServices();
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.className = 'service-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-700 hover:bg-slate-200 transition shrink-0';
      });
      tab.className = 'service-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 text-white shadow-sm transition shrink-0';

      activeCategory = tab.getAttribute('data-category');
      filterServices();
    });
  });
}

/* ----------------------------------------------------
   4. BOOKING MODAL
   ---------------------------------------------------- */
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  const notice = document.getElementById('bookingSuccessNotice');
  const form = document.getElementById('bookingForm');
  if (notice) notice.classList.add('hidden');
  if (form) form.classList.remove('hidden');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function bookSpecificService(serviceName) {
  openBookingModal();
  const select = document.getElementById('bookingService');
  if (select) {
    let matched = false;
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.includes(serviceName) || serviceName.includes(select.options[i].value)) {
        select.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Add custom option and select it
      const opt = new Option(serviceName, serviceName, true, true);
      select.add(opt);
    }
  }
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('bookingForm');
  const notice = document.getElementById('bookingSuccessNotice');

  if (form) form.classList.add('hidden');
  if (notice) notice.classList.remove('hidden');

  setTimeout(() => {
    closeBookingModal();
    if (form) {
      form.reset();
      form.classList.remove('hidden');
    }
    if (notice) notice.classList.add('hidden');
  }, 4000);
}

/* ----------------------------------------------------
   5. MOBILE MENU & FAQ ACCORDION
   ---------------------------------------------------- */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  if (!menu) return;

  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    menu.classList.remove('hidden');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    }
  } else {
    menu.classList.add('hidden');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  }
}

const mobileBtn = document.getElementById('mobileMenuBtn');
if (mobileBtn) {
  mobileBtn.addEventListener('click', toggleMobileMenu);
}

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.fa-chevron-down');
  if (!answer) return;

  const isHidden = answer.classList.contains('hidden');
  if (isHidden) {
    answer.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    answer.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}
