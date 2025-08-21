// ===== 60분 누적 사용 후 페이지 내 기능 잠금(합법적 소프트 게이트) =====
const LIMIT_MINUTES = 60;                  // 사용 가능 총 시간(분)
const KEY_ACC = "unipia_accumulated_ms";   // 누적 사용 시간 키
const KEY_LAST = "unipia_last_tick_ms";    // 마지막 방문 기준 시각

const gate = document.getElementById('hardGate');
const exitInfo = document.getElementById('exitInfo');

// 누적 시간 읽기
const getNum = (k, d=0)=> {
  const v = localStorage.getItem(k);
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

// 시작/복귀 시 타임스탬프 업데이트
function startTick(){
  localStorage.setItem(KEY_LAST, String(Date.now()));
}
function stopTick(){
  const last = getNum(KEY_LAST, Date.now());
  const acc = getNum(KEY_ACC, 0);
  const delta = Math.max(0, Date.now() - last);
  localStorage.setItem(KEY_ACC, String(acc + delta));
  localStorage.removeItem(KEY_LAST);
}

// 제한 초과 확인
function exceeded(){
  const acc = getNum(KEY_ACC, 0);
  return acc >= LIMIT_MINUTES * 60 * 1000;
}

// 오버레이 표시
function showGate(){
  gate.hidden = false;
  gate.classList.add('show');
  // 페이지 상호작용 차단(오버레이로 충분하지만 명시적 포커스)
  gate.focus?.();
}

// 타이머 루프(1초 간격)
let timer = null;
function loop(){
  if (exceeded()){
    showGate();
    clearInterval(timer);
    // 더 이상 누적하지 않도록 정지
    stopTick();
    return;
  }
  // 누적 업데이트
  stopTick();
  startTick();
}

// 페이지 가시성 핸들링
document.addEventListener('visibilitychange', ()=>{
  if (document.hidden){ stopTick(); }
  else{ startTick(); }
});

// 나가기 정보 링크(탭/브라우저 종료는 사용자가 결정)
exitInfo?.addEventListener('click', (e)=>{
  e.preventDefault();
  alert('브라우저의 닫기(✕)나 뒤로가기를 사용해 페이지를 떠날 수 있습니다.');
});

// 초기화
(function init(){
  if (exceeded()){
    showGate();
    return;
  }
  if (!localStorage.getItem(KEY_ACC)) localStorage.setItem(KEY_ACC, "0");
  startTick();
  timer = setInterval(loop, 1000);
})();

// 스토어 버튼 클릭 로깅
document.getElementById('btnAppStore')?.addEventListener('click', ()=>console.log('App Store Click'));
document.getElementById('btnGooglePlay')?.addEventListener('click', ()=>console.log('Google Play Click'));

// 스크롤 시 자연스럽게 나타나는 효과 추가
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".iphone-img");
  elements.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});