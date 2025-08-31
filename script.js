// Ambil semua elemen HTML yang dibutuhkan
const selectionScreen = document.getElementById('selectionScreen');
const matchScreen = document.getElementById('matchScreen');
const playAgainBtn = document.getElementById('playAgainBtn');
const messageText = document.getElementById('messageText');

const playerHand = document.getElementById('nabilacl'); 
const computerHand = document.getElementById('svkti'); 

const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');
const drawsEl = document.getElementById('draws');

const weaponBtns = document.querySelectorAll('.weapon');

// Simpan data game
let scores = {
    wins: 0,
    losses: 0,
    draws: 0
};

const choices = ['rock', 'paper', 'scissors'];
const imagePaths = {
    rock: 'images/batu.png',
    paper: 'images/kertas.png',
    scissors: 'images/gunting.png'
};

// Event listener untuk setiap pilihan senjata
weaponBtns.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        playGame(playerChoice);
    });
});

// Event listener untuk tombol "Main Lagi"
playAgainBtn.addEventListener('click', resetGame);

function playGame(playerChoice) {
    // 1. Sembunyikan layar pilihan, tampilkan layar pertandingan
    selectionScreen.classList.add('hidden');
    matchScreen.style.display = 'flex';
    messageText.textContent = 'Suit!';

    // 2. Set tangan ke posisi awal (batu) dan mulai animasi shake
    playerHand.src = 'images/nabilacl.jpg';
    computerHand.src = 'images/svkti.png';
    playerHand.classList.add('shake');
    computerHand.classList.add('shake');
    
    // 3. Setelah animasi selesai, tentukan hasilnya
    setTimeout(() => {
        // Hentikan animasi
        playerHand.classList.remove('shake');
        computerHand.classList.remove('shake');

        // Dapatkan pilihan komputer secara acak
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        // Perbarui gambar tangan sesuai pilihan
        playerHand.src = imagePaths[playerChoice];
        computerHand.src = imagePaths[computerChoice];
        
        // Tentukan pemenang
        const result = determineWinner(playerChoice, computerChoice);
        
        // Perbarui skor dan tampilkan pesan
        updateScore(result);
        updateMessage(result);
        
        // Tampilkan tombol "Main Lagi"
        playAgainBtn.classList.remove('hidden');

    }, 1500); // Durasi ini harus cocok dengan durasi animasi (0.5s * 3 kali = 1.5s)
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    }
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    return 'loss';
}

function updateScore(result) {
    if (result === 'win') {
        scores.wins++;
    } else if (result === 'loss') {
        scores.losses++;
    } else {
        scores.draws++;
    }
    
    // Perbarui teks di papan skor
    winsEl.textContent = scores.wins;
    lossesEl.textContent = scores.losses;
    drawsEl.textContent = scores.draws;
}

function updateMessage(result) {
    if (result === 'win') {
        messageText.textContent = 'Selamat, Kamu Menang! 🎉';
    } else if (result === 'loss') {
        messageText.textContent = 'Yah, Kamu Kalah! 😥';
    } else {
        messageText.textContent = 'Hasilnya Seri! 🤝';
    }
}

function resetGame() {
    // Kembalikan ke tampilan awal
    matchScreen.style.display = 'none';
    selectionScreen.classList.remove('hidden');
    playAgainBtn.classList.add('hidden');
    messageText.textContent = 'Pilih senjatamu!';
}