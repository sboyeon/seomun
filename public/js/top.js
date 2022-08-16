const $topBtn = document.querySelector(".moveTopBtn");

//페이지에서 특정 위치로 스크롤 이동시키기 위해서는 window.scrollTo 메서드를 사용
//behavior: "smooth" 속성을 이용해 부드러운 이동을 구현
$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 처음에 페이지 상단으로 스크롤 위치 지정
window.onload = () => {
  window.scrollTo({ top: document.head.scrollHeight });
}


window.onscroll = function () {
  scrollE();
}

function scrollE() {
  var cont = document.querySelector('#container');
  var cli = 100 + window.scrollY;
  if (cli < window.innerHeight) {
    cont.style.opacity = 0;
  } else {
    cont.style.opacity = 1;
  }
}
window.addEventListener('load', scrollE);
window.addEventListener('scroll', scrollE);