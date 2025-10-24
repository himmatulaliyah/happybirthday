// Menunggu seluruh halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {
    
    // Pilih elemen-elemen yang dibutuhkan
    const passInput = document.getElementById('passInput');
    const container = document.querySelector('.container');
    const nums = document.querySelectorAll('.num');
    const clearBtn = document.querySelector('.clear');
    const enterBtn = document.querySelector('.enter');
    
    // Kode sandi yang benar (bisa diubah)
    const correctCode = "261005"; 

    // Tambahkan angka ke input saat tombol angka ditekan
    nums.forEach(btn => {
        btn.addEventListener('click', () => {
            if (passInput.value.length < 6) {
                passInput.value += btn.textContent;
            }
        });
    });

    // Hapus semua isi input saat tombol Clear ditekan
    clearBtn.addEventListener('click', () => {
        passInput.value = "";
    });

    // Cek kode saat tombol Enter ditekan
    enterBtn.addEventListener('click', () => {
        if (passInput.value === correctCode) {
            alert("Access Granted 💖");
            // Jika ingin pindah halaman setelah berhasil:
            window.location.href = "home.html";
        } else {
            // Tampilkan pesan error dan berikan efek gemetar
            container.classList.add('shake');
            alert("Wrong Passcode ❌");
            passInput.value = "";
            
            // Hapus class 'shake' setelah animasi selesai
            setTimeout(() => {
                container.classList.remove('shake');
            }, 500); // 500ms = 0.5 detik
        }
    });

});