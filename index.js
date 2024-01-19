const createWorker = Tesseract.createWorker;

// Распознавание изображения
function recognize(file, lang, logger) {
  return Tesseract.recognize(file, lang, {logger})
   .then(({ data: {text}}) => {
     return text;
   })
}

const log = document.getElementById('log');
const result = document.getElementById('result');

// Отслеживание прогресса обработки
function updateProgress(data) {
  log.innerHTML = '';
  const statusText = document.createTextNode(data.status);
  const progress = document.createElement('progress');
  progress.max = 1;
  progress.value = data.progress;
  log.appendChild(statusText);
  log.appendChild(progress);
}

// Вывод результата
function setResult(text) {
  text = text.replace(/\n\s*\n/g, '\n');
  const p = document.createElement('p');
  p.textContent = text;
  result.appendChild(p);
}

document.getElementById('start').addEventListener('click', () => {
  const files = document.getElementById('file').files;
  if (!files) return;

  const lang = document.getElementById('langs').value;

  for (const file of files) {
    recognize(file, lang, updateProgress)
      .then(setResult);
  }
});