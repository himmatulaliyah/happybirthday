document.addEventListener("DOMContentLoaded", () => {
    
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

    // --- SKRIP UNTUK JAR OF HAPPINESS ---
    const loves = document.querySelectorAll(".love");
    const messageNote = document.getElementById("messageNote");
    const messageText = document.getElementById("messageText");

    loves.forEach(love => {
        love.addEventListener("click", () => {
            const msg = love.dataset.msg;

            // Efek pop pada hati
            love.style.transform = 'scale(1.3)';
            setTimeout(() => { love.style.transform = 'scale(1)'; }, 300);

            // Jika surat sudah terlihat, sembunyikan dulu untuk animasi ulang
            if (messageNote.classList.contains("show")) {
                messageNote.classList.remove("show");

                // Tunggu sebentar lalu tampilkan lagi dengan pesan baru
                setTimeout(() => {
                    messageText.textContent = msg;
                    messageNote.classList.add("show");
                }, 400); // Harus sama dengan durasi transisi di CSS
            } else {
                // Jika ini klik pertama, langsung tampilkan
                messageText.textContent = msg;
                messageNote.classList.add("show");
            }
        });
    });

    // --- SKRIP UNTUK GALERI FOTO DRAG & DROP ---
    const draggablePhotos = document.querySelectorAll('.draggable-photo');
    const spots = document.querySelectorAll('.clothespin-spot');

    const gallerySection = document.querySelector('.gallery');
    if (gallerySection) {
        const galleryObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setTimeout(() => {
                        draggablePhotos.forEach(photo => photo.classList.add('show'));
                    }, 500);
                    galleryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        galleryObserver.observe(gallerySection);
    }

    draggablePhotos.forEach(photo => {
        photo.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => { photo.classList.add('dragging'); }, 0);
        });

        photo.addEventListener('dragend', () => {
            photo.classList.add('dragging');
        });
    });

    spots.forEach(spot => {
        spot.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            if (spot.children.length === 0) {
                 spot.classList.add('drag-over');
            }
        });

        spot.addEventListener('dragleave', () => {
            spot.classList.remove('drag-over');
        });

        spot.addEventListener('drop', (e) => {
            e.preventDefault();
            spot.classList.remove('drag-over');

            if (spot.children.length > 0) return; 

            const photoId = e.dataTransfer.getData('text/plain');
            const draggedPhoto = document.getElementById(photoId);

            if (draggedPhoto) {
                spot.appendChild(draggedPhoto); 
                draggedPhoto.classList.remove('show');
                draggedPhoto.classList.add('placed');
                draggedPhoto.setAttribute('draggable', 'false');
            }
        });
    });
});