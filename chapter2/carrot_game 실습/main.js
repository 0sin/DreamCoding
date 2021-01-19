'use strict';

// 변수 선언
let time = 10;
let timerLoop;
const field = document.querySelector('.field');
const alertWin = document.querySelector('.win');
const alertLose = document.querySelector('.lose');

let count = 10;
const counter = document.querySelector('.counter');


// SOUND
const bgm = document.querySelector('.bg_sound');
const bugSound = document.querySelector('.bug_sound');
const carrotSound = document.querySelector('.carrot_sound');
const winSound = document.querySelector('.win_sound');
const loseSound = document.querySelector('.lose_sound');





// 플레이 버튼 누름 -> GAME PLAY
const playBtn = document.querySelectorAll('.play_btn')
playBtn.forEach(e => e.addEventListener('click', playGame));

function playGame() {
  // 1. 초기화
  itemInit();
  
  // 2. 타이머 작동
  timerLoop = setInterval(timer, 1000);

  // 3. 당근과 이미지 난수로 필드에 10개씩 총 20개 랜덤 배치
  createItems(10);

  // 4. 당근 누르면 사라지기 + 카운터 올라가기
  clickRemoveItems();
}


// 1. 초기화
function itemInit() {
  counter.innerHTML = count;
  playBtn[0].children[0].style.display = "none";
  playBtn[0].children[1].style.display = "block";
  alertWin.style.display = "none";
  alertLose.style.display = "none";
  clearInterval(timerLoop)
  time = 10;

  // bgm.setAttribute = 'autoplay';
}

// 2. 타이머 작동
function timer(t) {
  const timerDiv = document.querySelector('.timer');
  
  time--;


  if (time < 0) {
    clearInterval(timerLoop);
    time = 10; 
  } else if (time === 0) {
    // time = 0이 되면 GAME OVER
    gameOver();
  }

  let timeStr = ''+time;
  if(time < 10) {
    timeStr = '0' + time;
  }
  timerDiv.textContent = `00:${timeStr}`
}



// 3. 당근과 이미지 난수로 필드에 10개씩 총 20개 랜덤 배치
function createItems(n) {
  let carrots = '';
  let bugs = '';

  // 당근과 벌레 아이템 10개씩 생성
  for(let id = 0; id < n; id++) {
    carrots += `<img src="img/carrot.png" alt="carrot" class="item carrot" data-id=${id}>`  
  }
  for(let id = n; id < n * 2; id++) {
    bugs += `<img src="img/bug.png" alt="bug" class="item bug" data-id=${id}>`  
  }

  field.innerHTML = carrots + bugs;


    // 위치 랜덤 지정
  for(let i = 0; i < n * 2; i++) {
    field.children[i].style.transform = `translate(${Math.floor(Math.random() * 1100)}px, ${Math.floor(Math.random() * 250)}px)`;
  }
}



// 4. 당근 누르면 사라지기 + 카운터 올라가기
function clickRemoveItems() {
  field.addEventListener('click', event => {
    
    const id = event.target.dataset.id;
    
    if(id) {
      const toBeDeleted = document.querySelector(`.item[data-id="${id}"]`)
      toBeDeleted.remove();
      count--;
      counter.innerHTML = count;

      // -카운터 10이 되면 -> GAME WIN
      if(count === 0) {
        gameWin();
        count = 10;
      }
      
      
      // 벌레를 클릭 -> GAME OVER
      if (id >= 10) {
        // 벌레 뽑는 사운드
        gameOver();
        count = 10;
        
      }
    }    
  })
};



// a. GAME OVER 
function gameOver() {
  // 타이머 스탑
  clearInterval(timerLoop);
  // You Lose 창 띄우기
  alertLose.style.display = "block";
}

// b. GAME WIN
function gameWin() {
  clearInterval(timerLoop);
  alertWin.style.display = "block";
}


