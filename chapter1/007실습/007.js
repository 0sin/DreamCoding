'use strick';

const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const text = document.querySelector('.text');
const target = document.querySelector('.target');


// top, left는 layout부터 다시 그리기 때문에 composition만 일어나는 transform을 쓰는것이 낫다.
addEventListener('load', () => {

  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;

  document.addEventListener('mousemove', e => {
    let x = e.clientX;
    let y = e.clientY; //screenY는 window 전체 y값 (0, m)으로 찍혀서 쓰면 안됨
    vertical.style.transform = `translateX(${x}px)`;
    horizontal.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
    text.style.transform = `translate(${x}px, ${y}px)`;
    text.innerHTML =`X: ${x}, Y: ${y}`;
  });

});
