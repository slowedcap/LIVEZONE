const events = [
  {id:1,sport:"Football",home:"Bayern Munich",away:"Dortmund",homeIcon:"🔴",awayIcon:"🟡",time:"LIVE",status:"Live now",url:"#"},
  {id:2,sport:"Basketball",home:"Lakers",away:"Celtics",homeIcon:"🟣",awayIcon:"☘️",time:"LIVE",status:"Live now",url:"#"},
  {id:3,sport:"Tennis",home:"Player A",away:"Player B",homeIcon:"🎾",awayIcon:"🎾",time:"LIVE",status:"Set 2",url:"#"},
  {id:4,sport:"Football",home:"Real Madrid",away:"Barcelona",homeIcon:"⚪",awayIcon:"🔵",time:"20:00",status:"Today",url:"#"},
  {id:5,sport:"Rugby",home:"Zimbabwe",away:"South Africa",homeIcon:"🇿🇼",awayIcon:"🇿🇦",time:"21:30",status:"Today",url:"#"},
  {id:6,sport:"Basketball",home:"Warriors",away:"Bulls",homeIcon:"🔵",awayIcon:"🔴",time:"23:00",status:"Today",url:"#"},
  {id:7,sport:"Tennis",home:"Player C",away:"Player D",homeIcon:"🎾",awayIcon:"🎾",time:"Tomorrow 16:00",status:"Tomorrow",url:"#"}
];

const liveCards = document.getElementById("liveCards");
const scheduleList = document.getElementById("scheduleList");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalHeading = document.getElementById("modalHeading");
const officialLink = document.getElementById("officialLink");

function liveTemplate(e){
  return `<article class="card">
    <div class="sport">${e.sport} · ${e.status}</div>
    <div class="teams">
      <div class="team"><span class="team-icon">${e.homeIcon}</span>${e.home}</div>
      <div class="vs">VS</div>
      <div class="team"><span class="team-icon">${e.awayIcon}</span>${e.away}</div>
    </div>
    <button class="watch" data-id="${e.id}">▶ Watch</button>
  </article>`;
}

function scheduleTemplate(e){
  return `<div class="schedule-item">
    <div class="date">${e.time}</div>
    <div><div class="event-name">${e.home} vs ${e.away}</div><div class="event-meta">${e.sport}</div></div>
    <button class="watch" data-id="${e.id}">${e.time === "LIVE" ? "▶ Watch" : "Details"}</button>
  </div>`;
}

function render(filter=""){
  const live = events.filter(e => e.time === "LIVE" && (!filter || e.sport === filter));
  const upcoming = events.filter(e => e.time !== "LIVE" && (!filter || e.sport === filter));
  liveCards.innerHTML = live.length ? live.map(liveTemplate).join("") : `<p class="muted">No live events in this category right now.</p>`;
  scheduleList.innerHTML = upcoming.length ? upcoming.map(scheduleTemplate).join("") : `<p class="muted">No matching upcoming events.</p>`;
  document.querySelectorAll(".watch").forEach(btn => btn.addEventListener("click", () => openEvent(Number(btn.dataset.id))));
}

function openEvent(id){
  const e = events.find(x => x.id === id);
  modalTitle.textContent = `${e.home} vs ${e.away}`;
  modalHeading.textContent = e.time === "LIVE" ? `Watch ${e.home} vs ${e.away}` : `${e.home} vs ${e.away}`;
  officialLink.href = e.url;
  modal.classList.remove("hidden");
}

document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", e => { if(e.target === modal) modal.classList.add("hidden"); });

search.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = events.filter(x => `${x.sport} ${x.home} ${x.away}`.toLowerCase().includes(q));
  liveCards.innerHTML = filtered.filter(x=>x.time==="LIVE").map(liveTemplate).join("") || `<p class="muted">No matching live events.</p>`;
  scheduleList.innerHTML = filtered.filter(x=>x.time!=="LIVE").map(scheduleTemplate).join("") || `<p class="muted">No matching upcoming events.</p>`;
  document.querySelectorAll(".watch").forEach(btn => btn.addEventListener("click", () => openEvent(Number(btn.dataset.id))));
});

document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    search.value = "";
    render(btn.dataset.filter);
    document.getElementById("live").scrollIntoView({behavior:"smooth"});
  });
});

render();
