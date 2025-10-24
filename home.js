document.addEventListener("DOMContentLoaded", () => {

    // ===== SECTION 1 =====
    const topSection = document.querySelector("section.top");
    const topObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topSection.classList.add("show");
                observer.unobserve(topSection);
            }
        });
    }, { threshold: 0.3 });
    topObserver.observe(topSection);

    // ===== WISH SECTION =====
    const wishSection = document.querySelector("section.wish");
    const wishObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                wishSection.classList.add("show");
                observer.unobserve(wishSection);
            }
        });
    }, { threshold: 0.3 });
    wishObserver.observe(wishSection);
    
    // ===== PROLOG FLOWERS =====
    const prolog = document.querySelector(".prolog");
    if (prolog) {
        const flowers = document.querySelectorAll(".flower");
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    prolog.classList.add("show-flowers");
                    setTimeout(() => {
                        flowers.forEach(f => f.classList.add("floating"));
                    }, 3000);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(prolog);
    }

    // ===== JAR OF HAPPINESS =====
    const loves = document.querySelectorAll(".love");
    const messageNote = document.getElementById("messageNote");
    const messageText = document.getElementById("messageText");

    loves.forEach(love => {
        love.addEventListener("click", () => {
            const msg = love.dataset.msg;
            love.style.transform = "scale(1.3)";
            setTimeout(() => { love.style.transform = "scale(1)"; }, 300);

            if (messageNote.classList.contains("show")) {
                messageNote.classList.remove("show");
                setTimeout(() => {
                    messageText.textContent = msg;
                    messageNote.classList.add("show");
                }, 400);
            } else {
                messageText.textContent = msg;
                messageNote.classList.add("show");
            }
        });
    });

    // ===== GALERI FOTO =====
    const draggablePhotos = document.querySelectorAll('.draggable-photo');
    const spots = document.querySelectorAll('.clothespin-spot');
    const gallerySection = document.querySelector('section.gallery');

    function animateGallery() {
        draggablePhotos.forEach((photo, i) => {
            const offsetX = (Math.random() - 0.5) * 200;
            const offsetY = (Math.random() - 0.5) * 40;
            const rotation = (Math.random() - 0.5) * 20;
            photo.style.transform = `translate(calc(-50% + ${offsetX}px), ${offsetY}px) rotate(${rotation}deg) scale(0.8)`;
            photo.style.opacity = 0;
            setTimeout(() => {
                photo.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease';
                photo.style.opacity = 1;
                photo.style.transform = `translate(calc(-50% + ${offsetX}px), ${offsetY}px) rotate(${rotation}deg) scale(1)`;
            }, i * 150);
        });

        spots.forEach((spot, i) => {
            spot.style.opacity = 0;
            spot.style.transform = 'translateY(30px)';
            setTimeout(() => {
                spot.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
                spot.style.opacity = 1;
                spot.style.transform = 'translateY(0)';
            }, draggablePhotos.length * 150 + i * 100);
        });
    }

    if (gallerySection) {
        const galleryObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateGallery();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        galleryObserver.observe(gallerySection);
    }

    // ===== DRAG & DROP =====
    draggablePhotos.forEach(photo => {
        photo.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.id);
            photo.style.zIndex = 20;
        });
        photo.addEventListener('dragend', () => {
            photo.style.zIndex = '';
        });
    });

    spots.forEach(spot => {
        spot.addEventListener('dragover', e => {
            e.preventDefault();
            spot.classList.add('drag-over');
            spot.style.border = '2px dashed #d1b3c2';
            spot.style.borderRadius = '8px';
            spot.style.animation = 'dashBorder 1s linear infinite';
        });
        spot.addEventListener('dragleave', () => {
            spot.classList.remove('drag-over');
            spot.style.border = '2px dashed transparent';
            spot.style.animation = '';
        });
        spot.addEventListener('drop', e => {
            e.preventDefault();
            spot.classList.remove('drag-over');
            spot.style.border = '2px dashed transparent';
            spot.style.animation = '';
            if (spot.children.length > 0) return;
            const photoId = e.dataTransfer.getData('text/plain');
            const draggedPhoto = document.getElementById(photoId);
            if (draggedPhoto) {
                spot.appendChild(draggedPhoto);
                draggedPhoto.classList.add('placed');
                draggedPhoto.style.transform = 'rotate(0deg) scale(1)';
                draggedPhoto.style.opacity = 1;
                draggedPhoto.setAttribute('draggable', 'false');
            }
        });
    });

    // ===== REVEAL SECTIONS =====
    const animatedHeadings = document.querySelectorAll('.reveal-section h1');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.01 });
    animatedHeadings.forEach(heading => revealObserver.observe(heading));

    // ===== BORDER DASH ANIMATION =====
    const style = document.createElement('style');
    style.textContent = `
    @keyframes dashBorder {
        0% { border-color: #d1b3c2; }
        50% { border-color: #8b1e3f; }
        100% { border-color: #d1b3c2; }
    }`;
    document.head.appendChild(style);

});
