const canvas = document.getElementById('signatureCanvas');
const clearButton = document.getElementById('clearButton');
const downloadbtn = document.getElementById('downloadbtn');
const pencolor = document.querySelector("#pencolor")
const papercolor = document.querySelector("#papercolor")
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.style.backgroundColor = papercolor.value;
ctx.strokeStyle = pencolor.value;
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


pencolor.addEventListener("change", (e)=>{
  ctx.strokeStyle = e.target.value;
})
papercolor.addEventListener("change", (e)=>{
  canvas.style.backgroundColor = e.target.value;
})

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadbtn.addEventListener('click', () => {
  const signatureData = canvas.toDataURL(); 
  const downloadLink = document.createElement('a');
  downloadLink.href = signatureData;
  downloadLink.download = 'signature.png'; // Set the download file name
  downloadLink.click();
});