const elemAd = document.querySelector('#Main #Ad');
setInit();
async function setInit() {
  const data = localStorage.getItem('cate') ? localStorage.getItem('cate') : [];
  getCateInCookie() ? render(JSON.parse(data))
  : render(await getData('../data/normal.json'));
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
  const res = await fetch(url);
  return await res.json();
}
function getCateInCookie() {
  return document.cookie.includes('isChoosen')
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
  if (self.nodeName !== 'IMG' || getCateInCookie()) return;
  const data = await getData(makeUrlStr(self.dataset.cate));
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



