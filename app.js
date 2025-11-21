function setTab(name) {
  const title = document.getElementById("page-title");
  const content = document.getElementById("content");

  document.querySelectorAll(".nav button")
    .forEach(btn => btn.style.background = "rgba(148,163,184,0.1)");
  document.getElementById("tab-" + name).style.background =
    "rgba(59,130,246,0.4)";

  if (name === "text") {
    title.innerText = "Pembuatan Teks (MegaLLM)";
    content.innerHTML = `
      <textarea id="prompt" class="area" placeholder="Masukkan prompt teks..."></textarea>
      <button onclick="runText()">Generate</button>
      <div id="result" class="result-box"></div>
    `;
  }

  if (name === "image") {
    title.innerText = "Pembuatan Gambar (Imagen)";
    content.innerHTML = `
      <textarea id="prompt" class="area" placeholder="Deskripsi visual..."></textarea>
      <button onclick="runImage()">Generate</button>
      <div id="result" class="result-box"></div>
    `;
  }

  if (name === "video") {
    title.innerText = "Pembuatan Video (Veo 3.1)";
    content.innerHTML = `
      <textarea id="prompt" class="area" placeholder="Deskripsi video..."></textarea>
      <button onclick="runVideo()">Generate</button>
      <div id="result" class="result-box"></div>
    `;
  }

  if (name === "tts") {
    title.innerText = "Text ke Suara (TTS)";
    content.innerHTML = `
      <textarea id="prompt" class="area" placeholder="Teks untuk dibacakan..."></textarea>
      <button onclick="runTTS()">Generate</button>
      <div id="result" class="result-box"></div>
    `;
  }
}

setTab("text");

/* ===========================
   TEXT (BACKEND)
=========================== */
async function runText() {
  let prompt = document.getElementById("prompt").value;
  let result = document.getElementById("result");

  result.innerHTML = "Loading...";

  let r = await fetch("/.netlify/functions/text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  let json = await r.json();
  result.innerHTML = json.text || json.error;
}

/* ===========================
   IMAGE (BACKEND)
=========================== */
async function runImage() {
  let prompt = document.getElementById("prompt").value;
  let result = document.getElementById("result");

  result.innerHTML = "Loading...";

  let r = await fetch("/.netlify/functions/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  let json = await r.json();

  if (json.error) {
    result.innerHTML = json.error;
  } else {
    result.innerHTML = `<img src="data:image/png;base64,${json.image}" />`;
  }
}

/* ===========================
   VIDEO (BACKEND)
=========================== */
async function runVideo() {
  let prompt = document.getElementById("prompt").value;
  let result = document.getElementById("result");

  result.innerHTML = "Rendering... (10–20 detik)";

  let r = await fetch("/.netlify/functions/video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  let json = await r.json();

  if (json.error) {
    result.innerHTML = json.error;
  } else {
    result.innerHTML = `<video controls src="${json.video}"></video>`;
  }
}

/* ===========================
   TTS (BACKEND)
=========================== */
async function runTTS() {
  let prompt = document.getElementById("prompt").value;
  let result = document.getElementById("result");

  result.innerHTML = "Loading audio...";

  let r = await fetch("/.netlify/functions/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  let json = await r.json();

  if (json.error) {
    result.innerHTML = json.error;
  } else {
    result.innerHTML = `<audio controls src="data:audio/wav;base64,${json.audio}"></audio>`;
  }
}