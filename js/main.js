const elemAd = document.querySelector('#Main #Ad')
makeUrlStr();
function makeUrlStr() {
  const cate = localStorage.getItem('cate')
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
getData();
function getData() {
  const url = makeUrlStr();
  console.log(url)
  fetch(url)
    .then((res) => { return res.json() })
    .then((json) => {
      console.log(json);
    })
}

