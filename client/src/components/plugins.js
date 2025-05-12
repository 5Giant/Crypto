export const crosshairLabelPlugin = {
  id: "crosshairLabel",
  afterEvent(chart, args) {
    chart._lastMouse = args.event;
    chart.draw();
  },
  afterDraw(chart) {
    const event = chart._lastMouse;
    if (!event || !chart.scales) return;

    const { ctx, chartArea, scales } = chart;
    const { x, y } = event;
    const xScale = scales.x;
    const yScale = scales.y;

    const xValue = xScale.getValueForPixel(x);
    const yValue = yScale.getValueForPixel(y);

    if (
      !xScale ||
      !yScale ||
      x < chartArea.left ||
      x > chartArea.right ||
      y < chartArea.top ||
      y > chartArea.bottom
    )
      return;

    ctx.save();

    // ==== Пунктирные линии ====
    ctx.setLineDash([3, 3]); // [длина, зазор]
    ctx.lineWidth = 1;
    ctx.strokeStyle = "grey";

    // Горизонтальная линия
    ctx.beginPath();
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();

    // Вертикальная линия
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();

    ctx.setLineDash([]); // Сброс пунктирного режима

    // ==== Настройки текста ====
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // ==== Отображение координат ====

    const xLabel = xValue.toFixed(2);
    const yLabel = yValue.toFixed(2);

    // Стили для фона
    const paddingX = 3;
    const paddingY = 1;

    // ======= Фон и текст X =======

    // ======= Фон и текст Y =======
    const yTextWidth = ctx.measureText(yLabel).width;
    const yBoxWidth = yTextWidth + paddingY * 2;
    const yBoxHeight = 18;
    // console.log(chartArea.left);
    const yBoxX = chartArea.right;
    // const yBoxX = chartArea.left - yBoxWidth + 1;
    const yBoxY = y - yBoxHeight / 2;

    ctx.fillStyle = "grey";
    ctx.fillRect(yBoxX, yBoxY, yBoxWidth, yBoxHeight);

    ctx.strokeStyle = "grey";
    ctx.strokeRect(yBoxX, yBoxY, yBoxWidth, yBoxHeight);

    ctx.fillStyle = "#000";
    ctx.fillText(yLabel, yBoxX + yBoxWidth / 2, y);

    ctx.restore();
  },
};
