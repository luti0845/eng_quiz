// 單字資料庫
const vocabulary = [
    { word: 'apple', meaning: '蘋果', options: ['蘋果', '香蕉', '橘子', '葡萄'] },
    { word: 'book', meaning: '書本', options: ['書本', '筆', '尺', '橡皮擦'] },
    { word: 'cat', meaning: '貓', options: ['貓', '狗', '兔子', '鳥'] },
    { word: 'door', meaning: '門', options: ['門', '窗戶', '牆壁', '天花板'] },
    { word: 'elephant', meaning: '大象', options: ['大象', '獅子', '老虎', '長頸鹿'] }
];

let currentWordIndex = -1;
let timer;
let timeLeft;
let isAnswered = false;

// 初始化遊戲
function initGame() {
    nextWord();
}

// 播放單字發音
function playSound() {
    const word = vocabulary[currentWordIndex].word;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// 開始計時器
function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!isAnswered) {
                showResult(false);
            }
        }
    }, 1000);
}

// 更新計時器顯示
function updateTimerDisplay() {
    document.querySelector('.timer').textContent = `剩餘時間：${timeLeft}秒`;
}

// 顯示下一個單字
function nextWord() {
    clearInterval(timer);
    isAnswered = false;
    document.getElementById('result').textContent = '';
    document.querySelector('.next-btn').style.display = 'none';
    
    currentWordIndex = (currentWordIndex + 1) % vocabulary.length;
    const currentWord = vocabulary[currentWordIndex];
    
    document.getElementById('current-word').textContent = currentWord.word;
    
    // 打亂選項順序
    const shuffledOptions = [...currentWord.options].sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
    
    startTimer();
}

// 檢查答案
function checkAnswer(selectedOption) {
    if (isAnswered) return;
    
    isAnswered = true;
    clearInterval(timer);
    
    const correct = selectedOption === vocabulary[currentWordIndex].meaning;
    showResult(correct);
}

// 顯示結果
function showResult(correct) {
    const resultDiv = document.getElementById('result');
    if (correct) {
        resultDiv.textContent = '答對了！';
        resultDiv.style.color = '#2ecc71';
    } else {
        resultDiv.textContent = `答錯了！正確答案是：${vocabulary[currentWordIndex].meaning}`;
        resultDiv.style.color = '#e74c3c';
    }
    
    document.querySelector('.next-btn').style.display = 'block';
}

// 當頁面載入時開始遊戲
window.onload = initGame;
