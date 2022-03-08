const elemAd = document.querySelector('#Main #Ad');
setInit();
async function setInit() {
  if (getCateInCookie()) {
    if (!localStorage.getItem('cate')) {
      return;
    }
    render(JSON.parse(localStorage.getItem('cate')));
  } else {
    console.log(await getData('../data/normal.json'))
    render(await getData('../data/normal.json'));
  }
  setEvent();
}
function makeUrlStr(cate) {
  switch (cate) {
    case '1':
      return '../data/technology.json';
    case '2':
      return '../data/daily.json';
    case '3':
      return '../data/food.json';
    case '4':
      return '../data/activity.json';
  }
}

async function getData(url) {
  let res = await fetch(url);
  let json = await res.json();
  return json;
}
function getCateInCookie() {
  let cookieStr = document.cookie;
  return cookieStr.includes('isChoosen')
}
function setEvent() {
  elemAd.addEventListener('click', recordCate, false);
}
function render(e) {
  elemAd.innerHTML = makeStr(e);
}
async function recordCate(e) {
  const self = e.target;
  const now = new Date();
  const exp = new Date(now.setDate(now.getDate() + 1));
  const isInCookie = document.cookie.includes('isChoosen');
  if (self.nodeName !== 'IMG' || isInCookie) return;
  let data = await getData(makeUrlStr(self.dataset.cate));
  localStorage.setItem('cate',JSON.stringify(data));
  document.cookie = `isChoosen=true;expires=${exp.toUTCString()}`
}
function makeStr(data, str = '') {
  data.forEach((item) => {
    str += `
      <a href=${item.url} class="ad__link" target="_blank" >
        <img src= "../images/${item.src}" class="ad__img" alt="第${item.cate}類廣告" width="500" height="330" data-cate=${item.cate}>
      </a>`
  })
  return str;
}



