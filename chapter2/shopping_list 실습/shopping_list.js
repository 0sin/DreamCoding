'use strick';

// 변수 선언
const inputList = document.querySelector('.input_list');
const addBtn = document.querySelector('.add_btn');
const items = document.querySelector('.items');


function onAddList() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = inputList.value;
  if (text === '') {
    inputList.focus();
    return;
  }

  // 2. 새로운 아이템을 만듦 (텍스트 + 삭제 버튼)
  const item = createItem(text);
  
  // 3. item 컨테이너안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);

  // 4.새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({block: 'center'});
  
  // 5. input을 초기화한다.
  inputList.value = '';
  inputList.focus();
}


function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item_name');
  itemName.textContent = text;

  const itemDelete = document.createElement('button');
  itemDelete.setAttribute('class', 'item_delete');
  itemDelete.innerHTML = `<i class="far fa-trash-alt"></i>`;
  itemDelete.addEventListener('click', () => {
    items.removeChild(itemRow);
  })

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item_divider');

  item.appendChild(itemName);
  item.appendChild(itemDelete);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

  return itemRow; 
}


addBtn.addEventListener('click', onAddList);
inputList.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    onAddList();
  }
})
