// 导航栏滚动吸顶效果
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    // 更新导航激活状态
    updateActiveNav();
});

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 更新导航激活状态
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 作品轮播
const carousel = document.getElementById('carousel');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
let currentSlide = 0;
const totalSlides = 4;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

carouselPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

carouselNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

// 自动轮播
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

// 作品筛选
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // 筛选作品
        workCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 作品详情弹窗
const modal = document.getElementById('workModal');
const modalBody = document.getElementById('modalBody');

const workDetails = {
    work1: {
        title: '电商平台',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        description: '这是一个功能完善的电商平台项目，采用前后端分离架构。前端使用React构建用户界面，实现了商品展示、购物车、订单管理等核心功能。后端使用Node.js和Express框架，配合MongoDB数据库，提供RESTful API接口。项目还集成了支付宝和微信支付，实现了完整的购物流程。',
        tags: ['React', 'Node.js', 'MongoDB', 'Express'],
        demoLink: '#',
        codeLink: '#'
    },
    work2: {
        title: '数据可视化平台',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        description: '基于Vue.js和D3.js开发的数据可视化大屏项目。支持多种图表类型，包括折线图、柱状图、饼图、地图等。使用WebSocket实现数据的实时更新，适用于监控大屏场景。项目采用响应式设计，适配各种屏幕尺寸。',
        tags: ['Vue.js', 'D3.js', 'ECharts', 'WebSocket'],
        demoLink: '#',
        codeLink: '#'
    },
    work3: {
        title: '健身追踪App',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
        description: '使用React Native开发的跨平台健身应用。功能包括运动记录、饮食追踪、体重管理、训练计划等。应用使用Firebase作为后端服务，实现了用户认证、数据存储和云同步功能。UI设计简洁美观，用户体验流畅。',
        tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
        demoLink: '#',
        codeLink: '#'
    },
    work4: {
        title: '金融App UI设计',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
        description: '为金融科技公司设计的移动端应用界面。设计遵循Material Design规范，注重用户体验和视觉美感。包含首页、账户、交易、理财等多个模块的完整设计稿，提供了详细的交互说明和标注。',
        tags: ['Figma', 'UI/UX', 'Material Design', 'Prototyping'],
        demoLink: '#',
        codeLink: '#'
    },
    work5: {
        title: '企业官网',
        image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=500&fit=crop',
        description: '使用Next.js开发的响应式企业官网。支持多语言切换，SEO优化完善，首屏加载速度快。使用Tailwind CSS进行样式开发，代码简洁易维护。集成了CMS系统，方便内容管理。',
        tags: ['Next.js', 'Tailwind CSS', 'i18n', 'Headless CMS'],
        demoLink: '#',
        codeLink: '#'
    },
    work6: {
        title: '外卖小程序',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop',
        description: '微信小程序开发项目，包含用户端和商家端。用户端支持浏览商家、下单、支付、订单追踪等功能。商家端支持商品管理、订单处理、数据统计等功能。使用微信云开发，无需搭建服务器。',
        tags: ['微信小程序', '云开发', '微信支付', '地图API'],
        demoLink: '#',
        codeLink: '#'
    }
};

function openModal(workId) {
    const work = workDetails[workId];
    if (!work) return;

    modalBody.innerHTML = `
        <img src="${work.image}" alt="${work.title}" class="modal-image">
        <div class="modal-info">
            <h3>${work.title}</h3>
            <p>${work.description}</p>
            <div class="work-tags" style="margin-bottom: 1.5rem;">
                ${work.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="modal-links">
                <a href="${work.demoLink}" target="_blank"><i class="fas fa-external-link-alt"></i> 查看演示</a>
                <a href="${work.codeLink}" target="_blank"><i class="fab fa-github"></i> 查看代码</a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 点击弹窗外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// 表单验证和提交
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 清除之前的错误信息
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    // 获取表单数据
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = '请输入有效的邮箱地址';
        isValid = false;
    }

    // 验证留言内容
    if (message.length < 10) {
        document.getElementById('messageError').textContent = '留言内容至少需要10个字符';
        isValid = false;
    }

    if (isValid) {
        // 模拟提交成功
        alert('感谢您的留言！我会尽快回复您。');
        messageForm.reset();
    }
});

// 实时验证
const inputs = messageForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        const errorEl = document.getElementById(`${input.id}Error`);
        if (errorEl) errorEl.textContent = '';
    });
});

function validateField(field) {
    const value = field.value.trim();
    const errorEl = document.getElementById(`${field.id}Error`);

    switch (field.id) {
        case 'name':
            if (value.length < 2) {
                errorEl.textContent = '姓名至少需要2个字符';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorEl.textContent = '请输入有效的邮箱地址';
            }
            break;
        case 'subject':
            if (value.length < 3) {
                errorEl.textContent = '主题至少需要3个字符';
            }
            break;
        case 'message':
            if (value.length < 10) {
                errorEl.textContent = '留言内容至少需要10个字符';
            }
            break;
    }
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.about-card, .work-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 添加visible类样式
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// 技能条动画
const skillBars = document.querySelectorAll('.progress-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 展开/收缩功能
function toggleExpand(header) {
    const item = header.parentElement;
    item.classList.toggle('expanded');
}

// 简历展开/收缩功能
function toggleResumeExpand(header) {
    const item = header.parentElement;
    item.classList.toggle('expanded');
}
