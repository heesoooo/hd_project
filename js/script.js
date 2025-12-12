document.addEventListener("DOMContentLoaded", function () {
    // 좋아요 버튼(.share__btn--like) 클릭 시 .is-active 토글
    document.querySelectorAll('.share__btn--like').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('is-active');
        });
    });

    // drop down toggle
    document.querySelectorAll('.breadcrumb__item--dropdown').forEach(item => {
        item.addEventListener('click', (e) => {
            // 하위 a 클릭이 아닌 경우에만 토글
            if (e.target.tagName.toLowerCase() === 'a') return;

            e.preventDefault();

            const dropdown = item.querySelector('.breadcrumb__dropdown-list');
            if (!dropdown) return;

            dropdown.classList.toggle('is-open');
        });
    });

    // dropdown 내부 a 클릭 시 드롭다운 닫기 + 버블링 막기
    document.querySelectorAll('.breadcrumb__dropdown-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();  // 부모로 이벤트 전파 방지

            const dropdown = link.closest('.breadcrumb__dropdown-list');
            if (dropdown) dropdown.classList.remove('is-open');
        });
    });

    // 탭클릭시 해당 영역으로 스크롤 
    const tabLinks = document.querySelectorAll(".tab__item .tab__link");
    const header = document.querySelector(".header");

    function getHeaderHeight() {
        return header ? header.offsetHeight : 0;
    }

    tabLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // active 초기화
            tabLinks.forEach((item) => {
                item.parentElement.classList.remove("tab__item--active");
                item.setAttribute("aria-selected", "false");
            });

            // active 적용
            this.parentElement.classList.add("tab__item--active");
            this.setAttribute("aria-selected", "true");

            // 스크롤 이동 처리
            const targetId = this.getAttribute("href");
            const targetEl = document.querySelector(targetId);

            if (!targetEl) return;

            const headerHeight = getHeaderHeight();
            const targetTop =
                targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetTop,
                behavior: "smooth",
            });
        });
    });

    // 장바구니 버튼 클릭시 헤더우측 장바구니에 카운트 up
    const cartButtons = document.querySelectorAll(".product-card__cart-btn");
    const floatingMsg = document.querySelector(".floating-message");
    const floatingText = floatingMsg.querySelector("span");
    const cartCountEl = document.querySelector(".header__btn--cart .count");

    let cartItems = new Set(); 
    let cartCount = 0;
    let hideTimer = null;

    cartButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const productId = index;

            // 중복 클릭 시
            if (cartItems.has(productId)) {
                showMessage("이미 담겨있습니다.");
                return;
            }

            // 장바구니 추가 처리
            cartItems.add(productId);
            cartCount++;
            updateCartCount();
            showMessage("장바구니에 담겼습니다.");
        });
    });

    // 장바구니 카운트 업데이트
    function updateCartCount() {
        cartCountEl.textContent = cartCount;

        if (cartCount > 0) {
            cartCountEl.style.display = "inline-block";
        } else {
            cartCountEl.style.display = "none";
        }
    }

    // 메시지 표시
    function showMessage(text) {
        floatingText.textContent = text;
        floatingMsg.classList.add("show");

        if (hideTimer) clearTimeout(hideTimer);

        hideTimer = setTimeout(() => {
            floatingMsg.classList.remove("show");
        }, 1500);
    }
});
// 추천상품 swiper
const swiper = new Swiper('.recommend__swiper', {
    slidesPerView: 2.5,
    spaceBetween: 16,

    breakpoints: {
        768: {
            slidesPerView: 4,
            spaceBetween: 24,
            navigation: {
                nextEl: '.recommend-next',
                prevEl: '.recommend-prev',
            },
        }
    }
});

// 이런 상품은 어떠세요 swiper
const swiper2 = new Swiper('.suggest__swiper', {
    slidesPerView: 2.5,
    spaceBetween: 16,

    breakpoints: {
        768: {
            slidesPerView: 4,
            spaceBetween: 24,
            navigation: {
                nextEl: '.suggest-next',
                prevEl: '.suggest-prev',
            },
        }
    }
});