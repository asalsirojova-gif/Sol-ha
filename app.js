const letters = [
  ["A","Anor"],["B","Bola"],["D","Daraxt"],["E","Eshik"],["F","Fil"],
  ["G","Gul"],["H","Havo"],["I","Ilon"],["J","Jo‘ja"],["K","Kitob"],
  ["L","Lola"],["M","Mushuk"],["N","Non"],["O","Olma"],["P","Paxta"],
  ["Q","Quyon"],["R","Ruchka"],["S","Suv"],["T","Tog‘"],["U","Uzum"],
  ["V","Vaza"],["X","Xurmo"],["Y","Yulduz"],["Z","Zebra"],["O‘","O‘rik"],
  ["G‘","G‘oz"],["Sh","Sham"],["Ch","Choy"],["Ng","Tong"]
];

const numbers = [["1","Bir"],["2","Ikki"],["3","Uch"],["4","To‘rt"],["5","Besh"],["6","Olti"],["7","Yetti"],["8","Sakkiz"],["9","To‘qqiz"],["10","O‘n"]];
const colors = [["Qizil","#ef6b6b"],["Sariq","#f5cf55"],["Yashil","#78c77a"],["Ko‘k","#69a8e8"],["Pushti","#ef9fbe"],["Binafsha","#a889d6"],["To‘q sariq","#f29a55"],["Havorang","#70cbd0"]];
const shapes = [["Doira","●"],["Uchburchak","▲"],["Kvadrat","■"],["To‘g‘ri to‘rtburchak","▰"],["Oval","⬭"],["Yulduz","★"]];
const bodyParts = [["Ko‘z","eye.svg"],["Quloq","ear.svg"],["Burun","nose.svg"],["Og‘iz","mouth.svg"],["Qo‘l","hand.svg"],["Oyoq","foot.svg"],["Bosh","head.svg"]];
const animals = [["Mushuk","cat.svg"],["It","dog.svg"],["Quyon","rabbit.svg"],["Fil","elephant.svg"],["Sher","lion.svg"],["Qush","bird.svg"]];
const fruits = [["Olma","apple.svg"],["Banan","banana.svg"],["Uzum","grapes.svg"],["Nok","pear.svg"],["Apelsin","orange.svg"],["Qulupnay","strawberry.svg"]];

const $ = id => document.getElementById(id);
const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];

function showScreen(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  navItems.forEach(n => n.classList.toggle("active", n.dataset.target === id));
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-target]").forEach(btn=>{
  btn.addEventListener("click",()=>showScreen(btn.dataset.target));
});
document.querySelectorAll(".back").forEach(btn=>btn.addEventListener("click",()=>showScreen("home")));

function speak(text){
  if("speechSynthesis" in window){
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "uz-UZ"; u.rate = .82; u.pitch = 1.05;
    speechSynthesis.speak(u);
  }
}

const letterGrid = $("letterGrid");
letters.forEach(([l,w],i)=>{
  const b=document.createElement("button"); b.className="letter-tile"; b.innerHTML=`${l}<small style="display:block;font-size:10px;font-weight:600;margin-top:4px;color:#806f66">${w}</small>`;
  b.onclick=()=>{ $("bigLetter").textContent=l; $("letterWord").textContent=`${l} — ${w}`; $("letterProgress").style.width=`${((i+1)/letters.length)*100}%`; speak(`${l}. ${w}`); };
  letterGrid.appendChild(b);
});
$("letterProgress").style.width="3.5%";

const numberGrid=$("numberGrid");
numbers.forEach(([n,w])=>{
  const b=document.createElement("button"); b.className="number-tile"; b.innerHTML=`${n}<span>${w}</span>`;
  b.onclick=()=>{ $("bigNumber").textContent=n; $("numberWord").textContent=w; speak(`${n}. ${w}`); };
  numberGrid.appendChild(b);
});

const colorGrid=$("colorGrid");
colors.forEach(([name,color])=>{
  const b=document.createElement("button"); b.className="color-card"; b.innerHTML=`<div class="color-dot" style="background:${color}"></div><b>${name}</b>`;
  b.onclick=()=>speak(name); colorGrid.appendChild(b);
});

const shapeGrid=$("shapeGrid");
shapes.forEach(([name,icon])=>{
  const b=document.createElement("button"); b.className="shape-card"; b.innerHTML=`<div class="shape-icon">${icon}</div><b>${name}</b>`;
  b.onclick=()=>speak(name); shapeGrid.appendChild(b);
});

function makeImageGrid(containerId,data){
  const box=$(containerId);
  data.forEach(([name,file])=>{
    const b=document.createElement("button"); b.className=containerId==="bodyGrid"?"body-card":"word-card";
    b.innerHTML=`<img src="assets/icons/${file}" alt=""><b>${name}</b>`;
    b.onclick=()=>speak(name); box.appendChild(b);
  });
}
makeImageGrid("bodyGrid",bodyParts);
makeImageGrid("animalGrid",animals);
makeImageGrid("fruitGrid",fruits);

function setClock(t){
  let [h,m]=t.split(":").map(Number);
  $("clockText").textContent=`Soat ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
  $("clock").querySelector(".hour").style.transform=`translateX(-50%) rotate(${(h%12)*30+m*.5}deg)`;
  $("clock").querySelector(".minute").style.transform=`translateX(-50%) rotate(${m*6}deg)`;
}
document.querySelectorAll(".time-buttons button").forEach(b=>b.onclick=()=>{setClock(b.dataset.time);speak(`Soat ${b.dataset.time}`)});
setClock("3:00");

const quiz = [
  {icon:"A",q:"Qaysi harf A?",a:["A","B","D","M"],correct:0},
  {icon:"3",q:"Qaysi son uch?",a:["2","3","5","8"],correct:1},
  {icon:"●",q:"Bu qaysi shakl?",a:["Doira","Kvadrat","Yulduz","Oval"],correct:0},
  {icon:"🍎",q:"Bu nima?",a:["Olma","Nok","Banan","Uzum"],correct:0},
  {icon:"🟢",q:"Bu qaysi rang?",a:["Qizil","Yashil","Ko‘k","Sariq"],correct:1},
  {icon:"7",q:"Yetti qaysi son?",a:["6","7","8","9"],correct:1},
  {icon:"▲",q:"Bu qaysi shakl?",a:["Doira","Uchburchak","Oval","Kvadrat"],correct:1},
  {icon:"B",q:"B harfi bilan nima boshlanadi?",a:["Bola","Olma","Uzum","Anor"],correct:0},
  {icon:"12",q:"Soatning katta raqami nechta?",a:["10","11","12","13"],correct:2},
  {icon:"🦋",q:"Bu qaysi guruh?",a:["Hayvonlar","Mevalar","Shakllar","Ranglar"],correct:0}
];
let qi=0, score=0, answered=false;
function renderQuiz(){
  const x=quiz[qi]; answered=false;
  $("quizCount").textContent=`${qi+1} / ${quiz.length}`;
  $("score").textContent=`⭐ ${score}`;
  $("quizIcon").textContent=x.icon; $("quizQuestion").textContent=x.q;
  $("nextQuiz").disabled=true;
  $("quizAnswers").innerHTML="";
  x.a.forEach((ans,i)=>{
    const b=document.createElement("button"); b.className="answer"; b.textContent=ans;
    b.onclick=()=>{
      if(answered)return; answered=true;
      if(i===x.correct){b.classList.add("correct");score++;speak("Barakalla! To‘g‘ri javob.");}
      else {b.classList.add("wrong");speak("Yana bir bor o‘ylab ko‘ring."); [...$("quizAnswers").children][x.correct].classList.add("correct");}
      $("score").textContent=`⭐ ${score}`; $("nextQuiz").disabled=false;
    };
    $("quizAnswers").appendChild(b);
  });
}
$("nextQuiz").onclick=()=>{qi=(qi+1)%quiz.length;renderQuiz()};
renderQuiz();

$("soundBtn").onclick=()=>speak("Bolajonlar uchun qiziqarli ta’lim olami!");
