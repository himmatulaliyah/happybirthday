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
    
      draggablePhotos.forEach(photo => {
        let offsetX, offsetY;

        photo.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = photo.getBoundingClientRect();

            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;

            photo.classList.add('dragging');
            photo.style.position = 'absolute';
            photo.style.zIndex = 1000;
        }, { passive: false });

        photo.addEventListener('touchmove', (e) => {
            if (!photo.classList.contains('dragging')) return;
            e.preventDefault();
            const touch = e.touches[0];

            photo.style.left = `${touch.clientX - offsetX}px`;
            photo.style.top = `${touch.clientY - offsetY}px`;

            spots.forEach(spot => {
                const rect = spot.getBoundingClientRect();
                if (
                    touch.clientX > rect.left && touch.clientX < rect.right &&
                    touch.clientY > rect.top && touch.clientY < rect.bottom &&
                    spot.children.length === 0
                ) {
                    spot.classList.add('drag-over');
                } else {
                    spot.classList.remove('drag-over');
                }
            });
        }, { passive: false });

        photo.addEventListener('touchend', (e) => {
            if (!photo.classList.contains('dragging')) return;
            e.preventDefault();
            
            spots.forEach(spot => spot.classList.remove('drag-over'));
            
            const touch = e.changedTouches[0];
            let droppedOnSpot = false;

            spots.forEach(spot => {
                const rect = spot.getBoundingClientRect();
                if (
                    touch.clientX > rect.left && touch.clientX < rect.right &&
                    touch.clientY > rect.top && touch.clientY < rect.bottom
                ) {
                    if (spot.children.length === 0) {
                        spot.appendChild(photo);
                        photo.style.position = '';
                        photo.style.left = '';
                        photo.style.top = '';
                        photo.style.transform = '';
                        photo.style.zIndex = '';
                        photo.classList.remove('dragging');
                        photo.classList.add('placed');
                        photo.setAttribute('draggable', 'false');
                        droppedOnSpot = true;
                    }
                }
            });

            if (!droppedOnSpot) {
                photo.classList.remove('dragging');
                photo.style.position = '';
                photo.style.left = '';
                photo.style.top = '';
                photo.style.transform = '';
                photo.style.zIndex = '';
            }
        }, { passive: false });
    

    // ================================
    // Handle Touch End for Mobile (DIUBAH)
    // ================================
    photo.addEventListener('touchend', (e) => {
        if (!photo.classList.contains('dragging')) return;
        
        e.preventDefault();
        const touch = e.changedTouches[0];
        let droppedOnSpot = false;

        // Cek apakah dilepaskan di atas salah satu spot
        spots.forEach(spot => {
            const rect = spot.getBoundingClientRect();
            if (
                touch.clientX > rect.left && touch.clientX < rect.right &&
                touch.clientY > rect.top && touch.clientY < rect.bottom
            ) {
                // Jika spot kosong, letakkan foto di dalamnya
                if (spot.children.length === 0) {
                    spot.appendChild(photo);
                    
                    // Reset semua style inline agar CSS class .placed yang mengambil alih
                    photo.style.position = '';
                    photo.style.left = '';
                    photo.style.top = '';
                    photo.style.transform = '';
                    photo.style.zIndex = '';
                    
                    photo.classList.remove('dragging');
                    photo.classList.add('placed');
                    photo.setAttribute('draggable', 'false'); // Matikan drag setelah ditempatkan
                    droppedOnSpot = true;
                }
            }
        });

        // Jika tidak dilepaskan di spot yang valid, kembalikan foto
        if (!droppedOnSpot) {
            photo.classList.remove('dragging');
            // Reset style agar kembali ke tumpukan
            photo.style.position = '';
            photo.style.left = '';
            photo.style.top = '';
            photo.style.transform = ''; // Biarkan CSS yang mengatur posisi awal
            photo.style.zIndex = '';
        }
    }, { passive: false });
});
    

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
