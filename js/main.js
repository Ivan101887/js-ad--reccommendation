const elemAd = document.querySelector('#Main #Ad')
let data = [];
getData();
setEvent();
function getData() {
  const url = makeUrlStr();
  fetch(url)
    .then((res) => { return res.json() })
    .then((json) => {
      data = json;
      render();
    })
}
function makeUrlStr() {
  const cate = check();
  switch (cate) {
    case '1':
      return '../data/technology.json'
    case '2':
      return '../data/daily.json'
    case '3':
      return '../data/food.json'
    case '4':
      return '../data/activity.json'
    default: 
      return '../data/normal.json'
  }
}
function check() {
  let cookieStr = document.cookie;
  if (cookieStr.includes('cate')) {
    let pos = cookieStr.indexOf('cate');
    console.log(cookieStr[pos+5]);
    return cookieStr[pos+5];
  }
  return '';
}
function setEvent() {
  elemAd.addEventListener('click', recordCate, false);
}
function render() {
  elemAd.innerHTML = makeStr();
}
function recordCate(e) {
  const self = e.target;
  const now = new Date();
  const exp = new Date(now.setDate(now.getDate() + 1));
  if (self.nodeName !== 'IMG') return;
  document.cookie = `cate = ${self.dataset.cate};expires=${exp.toUTCString()}`
}
function makeStr(str='') {
  data.forEach((item) => {
    str += `
      <a href=${item.url} class="ad__link" target="_blank" >
        <img src= "../images/${item.src}" class="ad__img" alt="第${item.cate}類廣告" width="500" height="330" data-cate=${item.cate}>
      </a>`
  })
  return str;
}



