const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d');
const socket = io();

let drawing = false;
let color = '#000000';
let lineWidth = 5;

// Toolbar controls
document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
});
document.getElementById('lineWidth').addEventListener('input', (e) => {
    lineWidth = parseInt(e.target.value, 10);
});
document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clear');
});
document.getElementById('saveButton').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    socket.emit('drawing', { x, y, color, lineWidth });
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', stopDrawing);

// Listen for drawing data from server
socket.on('drawing', (data) => {
    ctx.lineWidth = data.lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = data.color;

    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
});

// Clear canvas event
socket.on('clear', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
