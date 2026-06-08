/* scripts.js - Interactive Logic & State Management */

// Global Product Prices
const PRODUCT_PRICES = {
    // Notebooks
    'Laptop Pro 16': 2490000,
    'Air Light 13': 1290000,
    'Gaming Beast X': 1850000,
    'Flex Tablet PC': 990000,
    'Code Master 15': 1590000,
    // Smartphones
    'Galaxy Ultra X': 1450000,
    'Phone Pro 15': 1550000,
    'Lite Phone Gen 3': 650000,
    'Fold Master 5': 2100000,
    'Photo Phone Z': 1100000,
    // Tablets
    'Tab Pro 12.9': 1350000,
    'Tab Air Gen 5': 890000,
    'Note Tab E': 450000,
    'Cinema Tab 11': 590000,
    'Kids Play Tab': 290000,
    // Peripherals
    'Mechanical K1 Pro': 159000,
    'Wireless Master 3S': 129000,
    'Stream Cam 4K': 210000,
    'SSD Portable 2TB': 240000,
    'Audio Engine A2+': 350000,
    // Main Page / Detail Page Defaults
    'Laptop Pro': 1890000,
    'Ultra Gen 5': 1250000,
    'Headset': 350000
};

// Utility: Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.right = '2rem';
    toast.style.padding = '1rem 2rem';
    toast.style.backgroundColor = type === 'success' ? 'var(--success)' : 'var(--error)';
    toast.style.color = 'var(--white)';
    toast.style.borderRadius = 'var(--radius)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '2000';
    toast.style.fontWeight = '600';
    toast.style.animation = 'slideUp 0.3s ease-out';
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add CSS for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Cart State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const counts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    counts.forEach(count => {
        count.innerText = totalItems;
    });
}

function addToCart(productName) {
    const existing = cart.find(item => item.name === productName);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: productName, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${productName} 상품이 장바구니에 담겼습니다.`);
}

// Auth Logic
const patterns = {
    username: /^[a-zA-Z0-9]{4,12}$/,
    password: /^.{8,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]+$/
};

function validateLogin() {
    const id = document.getElementById('username').value;
    const pw = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (!id || !pw) {
        message.innerText = '아이디와 비밀번호를 모두 입력해주세요.';
        return false;
    }

    showToast('로그인 성공! 메인 페이지로 이동합니다.');
    setTimeout(() => {
        location.href = './Main_Page.html';
    }, 1500);
    return true;
}

function validateRegister() {
    const id = document.getElementById('reg-id').value;
    const pw = document.getElementById('reg-pw').value;
    const pwConfirm = document.getElementById('reg-pw-confirm').value;
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const terms = document.getElementById('terms-all').checked;

    if (!patterns.username.test(id)) {
        alert('아이디는 영문/숫자 조합 4~12자리여야 합니다.');
        return false;
    }

    if (!patterns.password.test(pw)) {
        alert('비밀번호는 8자리 이상이어야 합니다.');
        return false;
    }

    if (pw !== pwConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }

    if (!name) {
        alert('이름을 입력해주세요.');
        return false;
    }

    if (!patterns.email.test(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return false;
    }

    if (!patterns.phone.test(phone)) {
        alert('휴대폰 번호는 숫자만 입력해주세요.');
        return false;
    }

    if (!terms) {
        alert('필수 약관에 동의하셔야 합니다.');
        return false;
    }

    showToast('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    setTimeout(() => {
        location.href = './login.html';
    }, 1500);
    return true;
}

function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (query) {
        showToast(`'${query}' 검색 결과가 준비 중입니다.`, 'warning');
    } else {
        showToast('검색어를 입력해주세요.', 'warning');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
