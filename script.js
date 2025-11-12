document.addEventListener('DOMContentLoaded', () => {
  const passInput = document.getElementById('passInput');
  const container = document.querySelector('.container');
  const nums = document.querySelectorAll('.num');
  const clearBtn = document.querySelector('.clear');
  const enterBtn = document.querySelector('.enter');
  
  const correctCode = "010203"; 

  // Tambah angka ke input
  nums.forEach(btn => {
    btn.addEventListener('click', () => {
      if (passInput.value.length < 6) {
        passInput.value += btn.textContent;
      }
    });
  });

  // Tombol Clear
  clearBtn.addEventListener('click', () => {
    passInput.value = "";
  });

  // Tombol Enter
  enterBtn.addEventListener('click', () => {
    if (passInput.value === correctCode) {
      // Jika benar → langsung ke halaman berikut
      window.location.href = "home.html";
    } else {
      // Jika salah → efek shake + kosongkan input
      container.classList.add('shake');
      passInput.value = "";
      setTimeout(() => {
        container.classList.remove('shake');
      }, 500);
    }
  });
});
