const createWorker = Tesseract.createWorker;

const log = document.getElementById('log');
const result = document.getElementById('result');
const statusText = document.getElementById('status');
const progress = document.getElementById('progress');
const startBtn = document.getElementById('start');
const clearBtn = document.getElementById('delete');
const itemTemp = document.getElementById('result-item').content;

function updateProgress(data) {
  statusText.textContent = data.status;
  progress.value = data.progress;
}

function deleteFields() {
  const items = result.querySelectorAll('.result-item');
  if(items.length === 0) return;
  items.forEach(item => item.remove());
}

function setResult(text) {
  text = text.replace(/\n\s*\n/g, '\n');
  const newText = itemTemp.querySelector('.result-item').cloneNode(true);
  newText.textContent = text;
  result.append(newText);
}

async function recognize(file, lang, logger) {
  try {
    const {data} = await Tesseract.recognize(file, lang, {logger});
    return data.text;
  } catch(err) {
    console.log(err);
  }
}

async function imgProccesing() {
  try {
    const files = document.getElementById('file').files;
    if (!files) return;
    const lang = document.getElementById('langs').value;

    for (const file of files) {
      const text = await recognize(file, lang, updateProgress)
      setResult(text);
    }
  } catch(err) {
    console.log(err);
  }
}

startBtn.addEventListener('click', imgProccesing);
clearBtn.addEventListener('click', deleteFields);