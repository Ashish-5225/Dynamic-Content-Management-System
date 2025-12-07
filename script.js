// GLOBAL DATA
let blocks = [];
let editingId = null;

// DOM elements
const listEl = document.getElementById("list");
const previewTitle = document.getElementById("pageTitle");
const contentArea = document.getElementById("contentArea");
const titleInput = document.getElementById("title");
const typeInput = document.getElementById("type");
const contentInput = document.getElementById("content");

// Generate unique ID
const uid = () => Math.random().toString(36).substring(2, 9);

// Add block
document.getElementById("addBlock").onclick = () => {
  const block = {
    id: uid(),
    type: typeInput.value,
    title: titleInput.value.trim(),
    content: contentInput.value.trim()
  };

  if (!block.content) return alert("Content required!");

  blocks.push(block);
  renderList();
  renderPreview();
  clearEditor();
};

// Update block
document.getElementById("updateBlock").onclick = () => {
  if (!editingId) return alert("Select a block to edit!");

  const b = blocks.find(x => x.id === editingId);
  b.type = typeInput.value;
  b.title = titleInput.value;
  b.content = contentInput.value;

  editingId = null;
  renderList();
  renderPreview();
  clearEditor();
};

// Render content list
function renderList() {
  listEl.innerHTML = "";
  blocks.forEach(b => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = b.title || b.type.toUpperCase();
    div.onclick = () => loadToEditor(b.id);
    listEl.appendChild(div);
  });
}

// Load selected block
function loadToEditor(id) {
  const b = blocks.find(x => x.id === id);
  editingId = id;
  titleInput.value = b.title;
  typeInput.value = b.type;
  contentInput.value = b.content;
}

// Render preview
function renderPreview() {
  contentArea.innerHTML = "";

  blocks.forEach(b => {
    const block = document.createElement("div");
    block.className = "content-block";

    if (b.type === "text")
      block.innerHTML = `<p>${b.content}</p>`;
    else if (b.type === "quote")
      block.innerHTML = `<blockquote>${b.content}</blockquote>`;
    else if (b.type === "image")
      block.innerHTML = `<img src="${b.content}" alt="Image Block">`;
    else if (b.type === "html")
      block.innerHTML = b.content;

    contentArea.appendChild(block);
  });

  previewTitle.textContent = titleInput.value || "Untitled Page";
}

// Clear editor inputs
function clearEditor() {
  titleInput.value = "";
  contentInput.value = "";
  editingId = null;
}

// Theme switch
document.getElementById("themeSelect").onchange = (e) => {
  if (e.target.value === "light")
    document.body.style.background = "white";
  else
    document.body.style.background = "linear-gradient(180deg,#071129,#081223)";
};

// Clear all blocks
document.getElementById("clearAll").onclick = () => {
  if (confirm("Delete all blocks?")) {
    blocks = [];
    renderList();
    renderPreview();
  }
};
