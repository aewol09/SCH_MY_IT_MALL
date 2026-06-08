/* scripts.js - 유효성 검사 및 동적 로직 */

// 폼 유효성 검사 패턴
const patterns = {
    username: /^[a-zA-Z0-9]{4,12}$/,
    password: /^.{8,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]+$/
};

// 로그인 유효성 검사
function validateLogin() {
    const id = document.getElementById('username').value;
    const pw = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (!id || !pw) {
        message.innerText = '아이디와 비밀번호를 모두 입력해주세요.';
        return false;
    }

    alert('로그인 성공!');
    location.href = './Main_Page.html';
    return true;
}

// 회원가입 유효성 검사
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

    if (!email) {
        alert('이메일을 입력해주세요.');
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

    alert('회원가입이 완료되었습니다!');
    location.href = './login.html';
    return true;
}

// 검색 기능
function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (query) {
        alert(`'${query}' 검색 결과가 없습니다.`);
    } else {
        alert('검색어를 입력해주세요.');
    }
}

// 장바구니 담기
function addToCart(productName) {
    alert(`${productName} 상품이 장바구니에 담겼습니다.`);
}
