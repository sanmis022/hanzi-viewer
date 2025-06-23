const pinyinMap = {
  "你": "nǐ",
  "好": "hǎo",
  "永": "yǒng"
};
const characters = Object.keys(pinyinMap);

function createButtons() {
  const container = document.getElementById("buttons");
  characters.forEach(char => {
    const btn = document.createElement("button");
    btn.className = "char-btn";
    btn.innerText = char;
    btn.onclick = () => drawCharacter(char);
    container.appendChild(btn);
  });
}

function drawCharacter(char) {
  const code = char.codePointAt(0).toString(16);
  document.getElementById("pinyin").innerText = pinyinMap[char] || "";
  fetch(`hanzi-data/$6c38.json`)
    .then(res => res.json())
    .then(data => {
      const strokes = data.strokes;
      const paths = strokes.map((d, i) => `
        <path d="${d}" fill="none" stroke="black" stroke-width="3">
          <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="0.5s" begin="${i * 0.6}s" fill="freeze" />
          <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="0.5s" begin="${i * 0.6}s" fill="freeze" />
        </path>
      `).join('');
      const svg = `
        <svg viewBox="0 0 1024 1024" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(1, -1) translate(0, -1024)">
            ${paths}
          </g>
        </svg>
      `;
      document.getElementById("svg-container").innerHTML = svg;
    })
    .catch(() => {
      document.getElementById("svg-container").innerHTML = "<p style='color:red;'>Stroke data not found.</p>";
    });
}

window.onload = createButtons;
