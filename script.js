// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// DEMO AUTO CHAT FOR 3 INDUSTRIES
// ================================

// Demo data for 3 industries
const industryDemoData = {
    fashion: [
        { type: 'bot', text: 'Xin chào! Tôi là AIban, trợ lý mua sắm thời trang. Bạn đang quan tâm đến sản phẩm nào ạ?' },
        { type: 'user', text: 'Tôi muốn xem áo khoác da' },
        { type: 'bot', text: 'Áo khoác da cao cấp đang có flash sale giảm 25%. Còn 5 chiếc cuối. Bạn mặc size gì ạ?' },
        { type: 'user', text: 'Size L. Có màu đen không?' },
        { type: 'bot', text: 'Có ạ! Size L màu đen còn 2 chiếc. Nếu mua ngay hôm nay, bạn được tặng kèm 1 chiếc khăn lụa trị giá 300k.' },
        { type: 'user', text: 'Giá bao nhiêu?' },
        { type: 'bot', text: 'Giá gốc 2.5 triệu, sau giảm 25% còn 1.875 triệu. Có freeship không ạ?' },
        { type: 'user', text: 'Nếu bạn chốt đơn trong 15 phút, chúng tôi miễn phí ship hỏa tốc 4h. Bạn muốn tôi giữ size L màu đen và áp dụng ưu đãi không?' },
        { type: 'bot', text: 'OK, tôi lấy 1 cái' },
        { type: 'user', text: 'Tuyệt vời! Vui lòng cho tôi số điện thoại để tôi chuyển thông tin cho nhân viên liên hệ xác nhận đơn hàng trong 5 phút nhé!' }
    ],
    tech: [
        { type: 'bot', text: 'Chào bạn! Tôi là AIban chuyên tư vấn công nghệ. Bạn cần hỗ trợ gì ạ?' },
        { type: 'user', text: 'Tôi muốn mua laptop gaming' },
        { type: 'bot', text: 'Chúng tôi có laptop gaming RTX 4060, CPU i7 đang giảm 3 triệu. Còn 3 chiếc cuối kho.' },
        { type: 'user', text: 'Giá bao nhiêu? Có trả góp không?' },
        { type: 'bot', text: 'Giá 28.9 triệu sau giảm. Có trả góp 0% lãi suất 6 tháng qua thẻ tín dụng.' },
        { type: 'user', text: 'Bảo hành bao lâu?' },
        { type: 'bot', text: 'Bảo hành 24 tháng chính hãng. Nếu mua hôm nay, tặng thêm 6 tháng bảo hành mở rộng và balo gaming.' },
        { type: 'user', text: 'Đắt quá, có giảm thêm không?' },
        { type: 'bot', text: 'Tôi có thể xin thêm giảm 500k và tặng chuột gaming trị giá 800k nếu bạn chốt đơn ngay.' },
        { type: 'user', text: 'OK, tôi lấy 1 chiếc' },
        { type: 'bot', text: 'Xuất sắc! Vui lòng cung cấp email để tôi gửi hóa đơn và hướng dẫn trả góp. NVKD sẽ gọi bạn trong 5 phút!' }
    ],
    food: [
        { type: 'bot', text: 'Xin chào! Tôi là AIban chuyên về thực phẩm tươi sống. Bạn cần đặt món gì ạ?' },
        { type: 'user', text: 'Tôi muốn đặt hải sản tươi' },
        { type: 'bot', text: 'Chúng tôi có combo 5 món hải sản tươi sống: tôm, mực, cua, nghêu, cá hồi. Đang giảm 20% chỉ còn 590k.' },
        { type: 'user', text: 'Có đảm bảo tươi không? Ship trong bao lâu?' },
        { type: 'bot', text: '100% tươi sống, đánh bắt trong ngày. Ship hỏa tốc 2h trong nội thành. Miễn phí ship đơn từ 500k.' },
        { type: 'user', text: 'Tôi ở quận 7, ship được không?' },
        { type: 'bot', text: 'Có ạ! Quận 7 ship trong 1.5h. Nếu đặt trước 11h, nhận hàng trước 12h30. Đặt ngay để giữ hàng tươi nhất!' },
        { type: 'user', text: 'Combo có đủ cho 4 người không?' },
        { type: 'bot', text: 'Combo đủ cho 4-5 người ăn. Nếu đặt 2 combo, giảm thêm 10% và tặng 1 chai nước mắm đặc sản.' },
        { type: 'user', text: 'OK, tôi lấy 1 combo' },
        { type: 'bot', text: 'Hoàn hảo! Vui lòng cho tôi địa chỉ cụ thể và số điện thoại. Nhân viên giao hàng sẽ liên hệ bạn trong 5 phút!' }
    ]
};

// Global variables for demo control
let demoIntervals = {};
let currentSpeed = 1; // 1x speed

// Initialize all demos
function initAllIndustryDemos() {
    // Clear existing intervals
    Object.values(demoIntervals).forEach(interval => clearInterval(interval));
    demoIntervals = {};
    
    // Start demos with slight delays for visual effect
    setTimeout(() => initIndustryDemo('fashion'), 0);
    setTimeout(() => initIndustryDemo('tech'), 500);
    setTimeout(() => initIndustryDemo('food'), 1000);
    
    // Start hero demo
    initHeroDemoChat();
}

// Initialize a single industry demo
function initIndustryDemo(industry) {
    const chatWindow = document.getElementById(`${industry}Chat`);
    if (!chatWindow) return;
    
    // Clear chat window
    chatWindow.innerHTML = '';
    
    const messages = industryDemoData[industry];
    let currentIndex = 0;
    
    // Function to add next message with typing effect
    function addNextMessage() {
        if (currentIndex >= messages.length) {
            clearInterval(demoIntervals[industry]);
            // Restart this demo after 5 seconds
            setTimeout(() => {
                initIndustryDemo(industry);
            }, 5000);
            return;
        }
        
        const messageData = messages[currentIndex];
        
        // Simulate typing delay
        setTimeout(() => {
            const messageDiv = createMessageElement(messageData);
            chatWindow.appendChild(messageDiv);
            
            // Show message with animation
            setTimeout(() => {
                messageDiv.classList.add('show');
            }, 10);
            
            // Scroll to bottom
            chatWindow.scrollTop = chatWindow.scrollHeight;
            
            currentIndex++;
        }, 500); // Typing delay
    }
    
    // Create message element
    function createMessageElement(messageData) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${messageData.type}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        
        const icon = document.createElement('i');
        icon.className = messageData.type === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        avatarDiv.appendChild(icon);
        
        const textDiv = document.createElement('div');
        textDiv.className = 'text';
        textDiv.textContent = messageData.text;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(textDiv);
        
        // Initially hidden
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        messageDiv.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        return messageDiv;
    }
    
    // Clear existing interval
    if (demoIntervals[industry]) {
        clearInterval(demoIntervals[industry]);
    }
    
    // Calculate delay based on speed
    const baseDelay = 2500; // 2.5 seconds between messages
    const delay = baseDelay / currentSpeed;
    
    // Start auto chat
    demoIntervals[industry] = setInterval(addNextMessage, delay);
    
    // Add first message immediately
    setTimeout(() => {
        if (messages.length > 0) {
            const firstMessage = createMessageElement(messages[0]);
            chatWindow.appendChild(firstMessage);
            setTimeout(() => firstMessage.classList.add('show'), 10);
            chatWindow.scrollTop = chatWindow.scrollHeight;
            currentIndex = 1;
        }
    }, 100);
}

// Hero demo chat
function initHeroDemoChat() {
    const heroChat = document.getElementById('heroDemoChat');
    const heroTyping = document.getElementById('heroTyping');
    
    if (!heroChat || !heroTyping) return;
    
    const heroMessages = [
        { type: 'user', text: 'Giá bao nhiêu?' },
        { type: 'bot', text: 'Giá 28.9 triệu ạ. Có trả góp 0% lãi 6 tháng. Bạn muốn đặt mua không?' },
        { type: 'user', text: 'Có bảo hành không?' },
        { type: 'bot', text: 'Bảo hành 24 tháng, tặng thêm 6 tháng nếu mua hôm nay. Tôi giữ máy cho bạn nhé?' },
        { type: 'user', text: 'Được, tôi lấy 1 chiếc' },
        { type: 'bot', text: 'Xuất sắc! Vui lòng cung cấp email để tôi bàn giao cho NVKD liên hệ trong 5 phút!' }
    ];
    
    let heroIndex = 0;
    let heroInterval;
    
    function addHeroMessage() {
        if (heroIndex >= heroMessages.length) {
            clearInterval(heroInterval);
            // Reset after 3 seconds
            setTimeout(() => {
                heroChat.innerHTML = `
                    <div class="message bot">
                        <div class="avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="text">Xin chào! Tôi là AIban, chatbot chuyên chốt sale. Bạn đang quan tâm sản phẩm nào ạ?</div>
                    </div>
                    <div class="message user">
                        <div class="avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="text">Tôi muốn mua laptop gaming</div>
                    </div>
                    <div class="message bot">
                        <div class="avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="text">Tuyệt vời! Laptop gaming RTX 4060 đang giảm 3 triệu. Còn 2 chiếc cuối kho!</div>
                    </div>
                `;
                heroIndex = 0;
                setTimeout(startHeroDemo, 2000);
            }, 3000);
            return;
        }
        
        // Show typing indicator
        heroTyping.style.display = 'flex';
        
        setTimeout(() => {
            heroTyping.style.display = 'none';
            
            const messageData = heroMessages[heroIndex];
            const messageDiv = createMessageElement(messageData);
            heroChat.appendChild(messageDiv);
            
            // Animate
            setTimeout(() => {
                messageDiv.classList.add('show');
            }, 10);
            
            // Scroll to bottom
            heroChat.scrollTop = heroChat.scrollHeight;
            
            heroIndex++;
        }, 1000);
    }
    
    function startHeroDemo() {
        const baseDelay = 3000;
        const delay = baseDelay / currentSpeed;
        heroInterval = setInterval(addHeroMessage, delay);
        
        // Start first message
        setTimeout(addHeroMessage, 1500);
    }
    
    // Clear existing interval
    if (heroInterval) {
        clearInterval(heroInterval);
    }
    
    // Start hero demo
    setTimeout(startHeroDemo, 3000);
}

// Speed control buttons
document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentSpeed = parseFloat(btn.dataset.speed);
        
        // Restart all demos with new speed
        initAllIndustryDemos();
    });
});

// Chat control buttons in hero
document.querySelectorAll('.chat-control-btn[data-speed]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.chat-control-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentSpeed = btn.dataset.speed === 'fast' ? 2 : 1;
        
        // Update speed buttons in demo section
        document.querySelectorAll('.speed-btn').forEach(speedBtn => {
            speedBtn.classList.remove('active');
            if (parseFloat(speedBtn.dataset.speed) === currentSpeed) {
                speedBtn.classList.add('active');
            }
        });
        
        initAllIndustryDemos();
    });
});

// Restart all demos button
const restartAllBtn = document.getElementById('restartAllDemos');
if (restartAllBtn) {
    restartAllBtn.addEventListener('click', initAllIndustryDemos);
}

// Restart hero chat button
const restartHeroBtn = document.getElementById('restartChat');
if (restartHeroBtn) {
    restartHeroBtn.addEventListener('click', () => {
        const heroChat = document.getElementById('heroDemoChat');
        if (heroChat) {
            heroChat.innerHTML = `
                <div class="message bot">
                    <div class="avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="text">Xin chào! Tôi là AIban, chatbot chuyên chốt sale. Bạn đang quan tâm sản phẩm nào ạ?</div>
                </div>
                <div class="message user">
                    <div class="avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="text">Tôi muốn mua laptop gaming</div>
                </div>
                <div class="message bot">
                    <div class="avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="text">Tuyệt vời! Laptop gaming RTX 4060 đang giảm 3 triệu. Còn 2 chiếc cuối kho!</div>
                </div>
            `;
            initHeroDemoChat();
        }
    });
}

// View demo button
const viewDemoBtn = document.getElementById('viewDemo');
if (viewDemoBtn) {
    viewDemoBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.getElementById('demo').offsetTop - 80,
            behavior: 'smooth'
        });
    });
}

// BỎ PHẦN CHAT WIDGET VÀ TRÒ CHUYỆN VỚI HOA
// ==========================================

// Form submission
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = ctaForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Cảm ơn bạn đã đăng ký dùng thử AIban! Chúng tôi sẽ liên hệ với bạn trong vòng 24h.');
            emailInput.value = '';
        }
    });
}

// Pricing card interaction
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        
        if (planName === 'Enterprise') {
            alert('Cảm ơn bạn quan tâm đến gói Enterprise! Đội ngũ tư vấn của chúng tôi sẽ liên hệ với bạn trong ít phút.');
        } else {
            alert(`Bạn đã chọn gói ${planName}! Bạn sẽ được chuyển hướng đến trang đăng ký.`);
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Initialize animations on load
window.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }
    
    // Start all auto chat demos
    initAllIndustryDemos();
});

// Feature cards animation on scroll
const featureCards = document.querySelectorAll('.feature-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Pricing plan selection animation
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('popular')) {
            card.style.transform = 'translateY(0)';
        } else {
            card.style.transform = 'scale(1.05) translateY(-10px)';
        }
    });
});

// Demo scenario interaction
document.querySelectorAll('.scenario-card').forEach(scenario => {
    scenario.addEventListener('click', () => {
        const scenarioTitle = scenario.querySelector('h3').textContent;
        alert(`Bạn đang xem kịch bản "${scenarioTitle}" của AIban. Trong thực tế, AIban sẽ tự động phát hiện và áp dụng kịch bản này khi khách hàng có dấu hiệu mua hàng tương ứng.`);
    });
});

// Contact Floating Button
const contactFloating = document.getElementById('contactFloating');
const contactMainBtn = document.getElementById('contactMainBtn');
const contactTooltip = document.getElementById('contactTooltip');

if (contactMainBtn) {
    let contactTimeout;
    
    contactMainBtn.addEventListener('click', () => {
        contactFloating.classList.toggle('active');
        contactMainBtn.classList.toggle('active');
        
        // Hide tooltip when expanded
        if (contactFloating.classList.contains('active')) {
            contactTooltip.style.opacity = '0';
            contactTooltip.style.visibility = 'hidden';
        }
    });
    
    // Auto-hide contact options after 5 seconds
    contactMainBtn.addEventListener('mouseenter', () => {
        clearTimeout(contactTimeout);
    });
    
    contactMainBtn.addEventListener('mouseleave', () => {
        if (contactFloating.classList.contains('active')) {
            contactTimeout = setTimeout(() => {
                contactFloating.classList.remove('active');
                contactMainBtn.classList.remove('active');
            }, 5000);
        }
    });
    
    // Keep options visible when hovering over them
    contactFloating.addEventListener('mouseenter', () => {
        clearTimeout(contactTimeout);
    });
    
    contactFloating.addEventListener('mouseleave', () => {
        if (contactFloating.classList.contains('active')) {
            contactTimeout = setTimeout(() => {
                contactFloating.classList.remove('active');
                contactMainBtn.classList.remove('active');
            }, 3000);
        }
    });
}

// Close contact options when clicking outside
document.addEventListener('click', (e) => {
    if (contactFloating && contactMainBtn) {
        if (!contactFloating.contains(e.target) && 
            contactFloating.classList.contains('active')) {
            contactFloating.classList.remove('active');
            contactMainBtn.classList.remove('active');
        }
    }
});