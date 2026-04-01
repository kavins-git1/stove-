const stoves = [
    {
        id: 1,
        name: "Aura Premium Gas Stove",
        state: "TN",
        branchId: "erode",
        branchName: "Erode Premium Showroom",
        type: "gas",
        price: "₹ 37,500",
        priceValue: 37500,
        rating: 4.8,
        reviews: 128,
        features: ["4 Burners", "Glass Top", "Auto Ignition"],
        status: "available",
        image: "modern_gas_stove.png",
        phone: "+91 99999 11111",
        mapLink: "https://maps.google.com/?q=Erode,+Tamil+Nadu",
        fallbackImg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: 2,
        name: "EcoHeat Induction Pro",
        state: "KL",
        branchId: "kochi",
        branchName: "Kerala Grand Superstore",
        type: "induction",
        price: "₹ 56,500",
        priceValue: 56500,
        rating: 4.9,
        reviews: 245,
        features: ["Smart Controls", "Energy Efficient", "Child Lock"],
        status: "available",
        image: "electric_induction_stove.png",
        phone: "+91 99999 22222",
        mapLink: "https://maps.google.com/?q=Kochi,+Kerala",
        fallbackImg: "https://images.unsplash.com/photo-1584305574647-063b8d4f4044?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: 3,
        name: "Classic Chef Freestanding",
        state: "TN",
        branchId: "chennai",
        branchName: "Chennai Luxury Kitchens",
        type: "gas",
        price: "₹ 99,500",
        priceValue: 99500,
        rating: 4.7,
        reviews: 89,
        features: ["Double Oven", "Cast Iron Grates", "Convection"],
        status: "available",
        image: "freestanding_stove_oven.png",
        phone: "+91 99999 33333",
        mapLink: "https://maps.google.com/?q=Chennai,+Tamil+Nadu",
        fallbackImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: 4,
        name: "Zenith Electric Cooktop",
        state: "TN",
        branchId: "coimbatore",
        branchName: "Coimbatore Stove Branch",
        type: "electric",
        price: "₹ 26,500",
        priceValue: 26500,
        rating: 4.6,
        reviews: 56,
        features: ["4 Elements", "Ceramic Glass", "Hot Surface Indicator"],
        status: "available",
        image: "modern_gas_stove.png",
        phone: "+91 99999 44444",
        mapLink: "https://maps.google.com/?q=Coimbatore,+Tamil+Nadu",
        fallbackImg: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300"
    }
];

const branchesData = [
    {
        id: 'erode',
        state: 'TN',
        name: 'Erode Premium Showroom',
        location: 'Erode, Tamil Nadu',
        status: 'Open Now',
        image: 'assets/erode_branch.png',
        branchPhone: '+91 99999 11111',
        headOffice: '+91 80000 00000',
        mapLink: 'https://maps.google.com/?q=Erode,+Tamil+Nadu'
    },
    {
        id: 'kochi',
        state: 'KL',
        name: 'Kerala Grand Superstore',
        location: 'Kochi, Kerala',
        status: 'Open Now',
        image: 'assets/kerala_branch.png',
        branchPhone: '+91 99999 22222',
        headOffice: '+91 80000 00000',
        mapLink: 'https://maps.google.com/?q=Kochi,+Kerala'
    },
    {
        id: 'chennai',
        state: 'TN',
        name: 'Chennai Luxury Kitchens',
        location: 'Chennai, Tamil Nadu',
        status: 'Open Now',
        image: 'assets/chennai_branch.png',
        branchPhone: '+91 99999 33333',
        headOffice: '+91 80000 00000',
        mapLink: 'https://maps.google.com/?q=Chennai,+Tamil+Nadu'
    },
    {
        id: 'coimbatore',
        state: 'TN',
        name: 'Coimbatore Stove Branch',
        location: 'Coimbatore, Tamil Nadu',
        status: 'Open Now',
        image: 'assets/coimbatore_branch.png',
        branchPhone: '+91 99999 44444',
        headOffice: '+91 80000 00000',
        mapLink: 'https://maps.google.com/?q=Coimbatore,+Tamil+Nadu'
    }
];

const stoveList = document.getElementById('stove-list');
const resultsCount = document.getElementById('results-count');
const stateSelect = document.getElementById('state-select');
const navHome = document.getElementById('nav-home');
const navBranches = document.getElementById('nav-branches');
const navContact = document.getElementById('nav-contact');
const resultsType = document.getElementById('results-type');
const filtersContainer = document.querySelector('.filters');
const topBar = document.querySelector('.top-bar');
const contactSection = document.getElementById('contact-section');
const resultsSection = document.querySelector('.results-section');
const sortPriceBtn = document.getElementById('sort-price-btn');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const applyPriceBtn = document.getElementById('apply-price-btn');
const clearPriceBtn = document.getElementById('clear-price-btn');

const modal = document.getElementById('booking-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBranch = document.getElementById('modal-branch');
const modalPhone = document.getElementById('modal-phone');

function renderStoves(filterState = 'all', filterBranch = 'all', filterType = 'all') {
    stoveList.innerHTML = '';
    
    const minPrice = minPriceInput && minPriceInput.value ? parseInt(minPriceInput.value) : NaN;
    const maxPrice = maxPriceInput && maxPriceInput.value ? parseInt(maxPriceInput.value) : NaN;

    let filteredStoves = stoves.filter(stove => {
        const stateMatch = filterState === 'all' || stove.state === filterState;
        const branchMatch = filterBranch === 'all' || stove.branchId === filterBranch;
        const typeMatch = filterType === 'all' || stove.type === filterType;
        
        let priceMatch = true;
        if (!isNaN(minPrice) && stove.priceValue < minPrice) priceMatch = false;
        if (!isNaN(maxPrice) && stove.priceValue > maxPrice) priceMatch = false;

        return stateMatch && branchMatch && typeMatch && priceMatch;
    });

    if (currentSort === 'asc') {
        filteredStoves.sort((a, b) => a.priceValue - b.priceValue);
    } else if (currentSort === 'desc') {
        filteredStoves.sort((a, b) => b.priceValue - a.priceValue);
    }

    resultsCount.textContent = filteredStoves.length;

    filteredStoves.forEach(stove => {
        const card = document.createElement('div');
        card.className = 'stove-card';
        
        const statusClass = 'available';
        const statusText = 'Available';
        
        // Clean phone number for tel: link e.g. +15551234567
        const cleanPhone = stove.phone.replace(/[^0-9+]/g, '');

        card.innerHTML = `
            <img src="${stove.image}" alt="${stove.name}" class="card-image" onerror="this.src='${stove.fallbackImg}'">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${stove.name}</h3>
                        <div class="card-branch" style="font-size:0.85rem; color:var(--text-muted); margin-top:0.3rem;">📍 ${stove.branchName}</div>
                    </div>
                    <div style="text-align: right;">
                        <div class="rating">⭐ ${stove.rating}</div>
                        <span class="status ${statusClass}" style="margin-top: 0.4rem; display: inline-block;">${statusText}</span>
                    </div>
                </div>
                
                <div class="features">
                    ${stove.features.map(f => `<span class="feature">${f}</span>`).join('')}
                </div>
                
                <div class="card-footer">
                    <div class="price">${stove.price}<span>/unit</span></div>
                    <div class="action-buttons">
                        <a href="${stove.mapLink}" target="_blank" class="secondary-btn" aria-label="Open Map">📍 Maps</a>
                        <button class="book-btn" onclick="window.openBookingModal('${stove.branchName}', '${stove.phone}')">
                            Book
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        stoveList.appendChild(card);
    });
}

// Global modal open function
window.openBookingModal = function(branchName, phone) {
    modalBranch.textContent = branchName;
    modalPhone.textContent = phone;
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    const modalCallBtn = document.getElementById('modal-call-btn');
    if (modalCallBtn) modalCallBtn.href = 'tel:' + cleanPhone;
    modal.classList.add('active');
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

let currentBranchFilter = 'all';

if(stateSelect) {
    stateSelect.addEventListener('change', () => {
        currentBranchFilter = 'all';
        applyFilters();
    });
}

function applyFilters() {
    renderStoves(stateSelect ? stateSelect.value : 'all', currentBranchFilter, 'all');
}

let currentView = 'home';
let currentSort = 'none';

if(applyPriceBtn) {
    applyPriceBtn.addEventListener('click', applyFilters);
}
if(clearPriceBtn) {
    clearPriceBtn.addEventListener('click', () => {
        if(minPriceInput) minPriceInput.value = '';
        if(maxPriceInput) maxPriceInput.value = '';
        applyFilters();
    });
}
if(sortPriceBtn) {
    sortPriceBtn.addEventListener('click', () => {
        if (currentSort === 'none' || currentSort === 'desc') {
            currentSort = 'asc';
            sortPriceBtn.innerHTML = '<span style="color:var(--text-main); font-weight:600;">Sort by price &uarr;</span>';
        } else {
            currentSort = 'desc';
            sortPriceBtn.innerHTML = '<span style="color:var(--text-main); font-weight:600;">Sort by price &darr;</span>';
        }
        applyFilters();
    });
}

function switchTab(view) {
    currentView = view;
    navHome.classList.remove('active');
    navBranches.classList.remove('active');
    if(navContact) navContact.classList.remove('active');
    
    if(view === 'home') {
        navHome.classList.add('active');
        if(resultsSection) {
            resultsSection.style.display = 'block';
            // Also show cards list since it's inside resultsSection
        }
        if(contactSection) contactSection.style.display = 'none';
        if(topBar) topBar.style.display = 'flex';
        if(filtersContainer) filtersContainer.style.display = 'flex';
        if(resultsType) resultsType.textContent = 'options';
        applyFilters();
    } else if(view === 'branches') {
        navBranches.classList.add('active');
        if(resultsSection) resultsSection.style.display = 'block';
        if(contactSection) contactSection.style.display = 'none';
        if(topBar) topBar.style.display = 'none';
        if(filtersContainer) filtersContainer.style.display = 'none';
        if(resultsType) resultsType.textContent = 'branches';
        renderBranches();
    } else if(view === 'contact') {
        if(navContact) navContact.classList.add('active');
        if(resultsSection) resultsSection.style.display = 'none';
        if(topBar) topBar.style.display = 'none';
        if(contactSection) contactSection.style.display = 'flex';
    }
}

if(navHome) navHome.addEventListener('click', (e) => { e.preventDefault(); switchTab('home'); });
if(navBranches) navBranches.addEventListener('click', (e) => { e.preventDefault(); switchTab('branches'); });
if(navContact) navContact.addEventListener('click', (e) => { e.preventDefault(); switchTab('contact'); });

function renderBranches() {
    stoveList.innerHTML = '';
    resultsCount.textContent = branchesData.length;

    branchesData.forEach(branch => {
        const card = document.createElement('div');
        card.className = 'stove-card';
        const cleanBranchPhone = branch.branchPhone.replace(/[^0-9+]/g, '');
        const cleanHeadPhone = branch.headOffice.replace(/[^0-9+]/g, '');

        card.innerHTML = `
            <img src="${branch.image}" alt="${branch.name}" class="card-image" onerror="this.src='https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=300'">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${branch.name}</h3>
                        <div class="card-branch">📍 ${branch.location}</div>
                    </div>
                    <div style="text-align: right;">
                        <span class="status available" style="margin-top: 0.4rem; display: inline-block;">${branch.status}</span>
                    </div>
                </div>
                
                <div class="features">
                    <span class="feature">Branch Contact: <a href="tel:${cleanBranchPhone}" style="color:var(--text-main); font-weight:600; text-decoration:none; margin-left: 0.3rem;">${branch.branchPhone}</a></span>
                    <span class="feature">Head Office: <a href="tel:${cleanHeadPhone}" style="color:var(--text-main); font-weight:600; text-decoration:none; margin-left: 0.3rem;">${branch.headOffice}</a></span>
                </div>
                
                <div class="card-footer" style="justify-content: flex-end;">
                    <div class="action-buttons">
                        <button class="primary-btn" onclick="viewBranchProducts('${branch.id}', '${branch.state}')" style="width: auto; padding: 0.6rem 1.2rem; border-radius: 20px;">📦 View Products</button>
                        <a href="tel:${cleanBranchPhone}" class="primary-action-btn" aria-label="Call Branch">📞 Call Branch</a>
                        <a href="tel:${cleanHeadPhone}" class="secondary-btn" aria-label="Call Head Office">🏢 Call Head Office</a>
                        <a href="${branch.mapLink}" target="_blank" class="secondary-btn" aria-label="Open Map">📍 Directions</a>
                    </div>
                </div>
            </div>
        `;
        
        stoveList.appendChild(card);
    });
}

window.viewBranchProducts = function(branchId, stateId) {
    if(stateSelect) {
        stateSelect.value = stateId;
    }
    currentBranchFilter = branchId;
    switchTab('home');
}

// Initial render
renderStoves();
