const canvas = document.getElementById('horizonCanvas');
const ctx = canvas.getContext('2d');

// --- Dynamic resize ---
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- Canvas dimensions ---
let width = canvas.width;
let height = canvas.height;
let horizonY = height / 2;

// --- Floor trapezoids data ---
const floorTrapezoids = [
  { topLeft: [0, 905], topRight: [235, 905], bottomRight: [40, 1002], bottomLeft: [0, 1002] },
  { topLeft: [349, 956], topRight: [438, 956], bottomRight: [363, 1016], bottomLeft: [259, 1016] },
  { topLeft: [337, 818], topRight: [384, 818], bottomRight: [333, 842], bottomLeft: [282, 842] },
  { topLeft: [508, 740], topRight: [541, 740], bottomRight: [401, 805], bottomLeft: [357, 805] },
  { topLeft: [481, 702], topRight: [545, 702], bottomRight: [509, 716], bottomLeft: [438, 716] },
  { topLeft: [711, 644], topRight: [723, 644], bottomRight: [563, 708], bottomLeft: [544, 708] },
  { topLeft: [663, 727], topRight: [694, 727], bottomRight: [603, 790], bottomLeft: [560, 790] },
  { topLeft: [531, 960], topRight: [581, 960], bottomRight: [502, 1050], bottomLeft: [441, 1050] },
  { topLeft: [684, 807], topRight: [714, 807], bottomRight: [590, 945], bottomLeft: [545, 945] },
  { topLeft: [704, 976], topRight: [777, 976], bottomRight: [737, 1080], bottomLeft: [645, 1080] },
  { topLeft: [828, 779], topRight: [862, 779], bottomRight: [822, 887], bottomLeft: [773, 887] },
  { topLeft: [890, 626], topRight: [895, 626], bottomRight: [797, 769], bottomLeft: [781, 769] },
  { topLeft: [838, 655], topRight: [849, 655], bottomRight: [825, 680], bottomLeft: [811, 680] },
  { topLeft: [870, 696], topRight: [893, 696], bottomRight: [875, 746], bottomLeft: [844, 746] },
  { topLeft: [912, 639], topRight: [918, 639], bottomRight: [915, 649], bottomLeft: [909, 649] },
  { topLeft: [958, 626], topRight: [961, 626], bottomRight: [985, 717], bottomLeft: [978, 717] },
  { topLeft: [866, 836], topRight: [1057, 836], bottomRight: [1081, 894], bottomLeft: [850, 894] },
  { topLeft: [989, 647], topRight: [1009, 647], bottomRight: [1022, 665], bottomLeft: [997, 665] },
  { topLeft: [1068, 635], topRight: [1077, 635], bottomRight: [1126, 664], bottomLeft: [1113, 664] },
  { topLeft: [1074, 682], topRight: [1096, 682], bottomRight: [1103, 687], bottomLeft: [1079, 687] },
  { topLeft: [1152, 700], topRight: [1178, 700], bottomRight: [1208, 718], bottomLeft: [1180, 718] },
  { topLeft: [1079, 814], topRight: [1147, 813], bottomRight: [1178, 853], bottomLeft: [1099, 853] },
  { topLeft: [1105, 886], topRight: [1226, 886], bottomRight: [1393, 1080], bottomLeft: [1200, 1080] },
  { topLeft: [1202, 753], topRight: [1236, 753], bottomRight: [1291, 791], bottomLeft: [1251, 791] },
  { topLeft: [1249, 684], topRight: [1270, 684], bottomRight: [1366, 721], bottomLeft: [1338, 721] },
  { topLeft: [1305, 927], topRight: [1557, 927], bottomRight: [1741, 1039], bottomLeft: [1412, 1039] },
  { topLeft: [1306, 800], topRight: [1348, 800], bottomRight: [1446, 860], bottomLeft: [1395, 860] },
  { topLeft: [1312, 751], topRight: [1402, 751], bottomRight: [1527, 804], bottomLeft: [1412, 804] },
  { topLeft: [1501, 819], topRight: [1681, 819], bottomRight: [1825, 871], bottomLeft: [1611, 871] }
];

// --- Create trapezoid objects ---
function createTrapezoid(trap, mirrored = false) {
  const points = mirrored
    ? [
        { x: width - trap.topLeft[0], y: horizonY - (trap.topLeft[1] - horizonY) },
        { x: width - trap.topRight[0], y: horizonY - (trap.topRight[1] - horizonY) },
        { x: width - trap.bottomRight[0], y: horizonY - (trap.bottomRight[1] - horizonY) },
        { x: width - trap.bottomLeft[0], y: horizonY - (trap.bottomLeft[1] - horizonY) }
      ]
    : [
        { x: trap.topLeft[0], y: trap.topLeft[1] },
        { x: trap.topRight[0], y: trap.topRight[1] },
        { x: trap.bottomRight[0], y: trap.bottomRight[1] },
        { x: trap.bottomLeft[0], y: trap.bottomLeft[1] }
      ];

  const moveDistance = 10 + Math.random() * 5;
  const direction = Math.random() < 0.5 ? 1 : -1;
  const speed = 0.01 + Math.random() * 0.01;

  return {
    points,
    baseColor: "0,0,0",
    opacity: 0.00,
    targetOpacity: 0.00, // no hover changes
    fadeSpeed: 0.08,
    moveDistance,
    direction,
    speed,
    originalPoints: points.map(p => ({ ...p }))
  };
}

let trapezoids = [
  ...floorTrapezoids.map(t => createTrapezoid(t, false)),
  ...floorTrapezoids.map(t => createTrapezoid(t, true))
];

// --- Draw a single trapezoid ---
function drawTrapezoid(trap) {
  ctx.beginPath();
  ctx.moveTo(trap.points[0].x, trap.points[0].y);
  for (let i = 1; i < trap.points.length; i++) ctx.lineTo(trap.points[i].x, trap.points[i].y);
  ctx.closePath();
  ctx.fillStyle = `rgba(${trap.baseColor},${trap.opacity})`;
  ctx.shadowColor = `rgba(0,0,0,${trap.opacity * 0.6})`;
  ctx.shadowBlur = 3;
  ctx.fill();
  ctx.shadowBlur = 0;
}

// --- Animation loop ---
function animate() {
  // Update dimensions if canvas resized
  if (canvas.width !== width || canvas.height !== height) {
    width = canvas.width;
    height = canvas.height;
    horizonY = height / 2;
    // Recreate trapezoids so coordinates scale properly
    trapezoids = [
      ...floorTrapezoids.map(t => createTrapezoid(t, false)),
      ...floorTrapezoids.map(t => createTrapezoid(t, true))
    ];
  }

  ctx.clearRect(0, 0, width, height);

  trapezoids.forEach(trap => {
    trap.points.forEach(p => p.y += trap.direction * trap.speed);
    const dy = trap.points[0].y - trap.originalPoints[0].y;
    if (Math.abs(dy) >= trap.moveDistance) trap.direction *= -1;

    const diff = trap.targetOpacity - trap.opacity;
    trap.opacity += diff * trap.fadeSpeed;
    if (Math.abs(trap.opacity - trap.targetOpacity) < 0.001) trap.opacity = trap.targetOpacity;

    drawTrapezoid(trap);
  });

  requestAnimationFrame(animate);
}

animate();
