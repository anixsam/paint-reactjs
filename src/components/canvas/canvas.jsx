import "./canvas.css";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

let bound,
  ctx,
  canvas,
  color,
  toolValue = "",
  marquee;

let rectangles = [];
let circles = [];
let lines = [];
let strokes = [];

const CustomCanvas = () => {
  color = useSelector((store) => store.toolStore.color);
  const canvasRef = useRef(null);

  let mouse = {
    x: 0,
    y: 0,
    down: false,
  };

  let rect = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };

  let circle = {
    x: 0,
    y: 0,
    radius: 0,
  };

  let line = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };

  marquee = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    bound = canvas.getBoundingClientRect();
    canvas.width = window.innerWidth - 190;
    canvas.height = window.innerHeight;
  }, []);

  window.addEventListener(
    "resize",
    () => {
      try {
        canvas.width = window.innerWidth - 190;
        canvas.height = window.innerHeight;
      } catch (e) {
        console.log(e);
      }
    },
    [window.innerWidth, window.innerHeight]
  );

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - bound.left;
    mouse.y = e.clientY - bound.top;
    if (mouse.down && toolValue === "pencil") {
      strokes.push({
        x: mouse.x,
        y: mouse.y,
        color: color,
      });
      freeHandDraw(ctx, mouse);
      restoreCircles(ctx, circles);
      restoreRectangles(ctx, rectangles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    } else if (mouse.down && toolValue === "eraser") {
      eraser(ctx, mouse);
    } else if (mouse.down && toolValue === "rect") {
      rect.endX = mouse.x - rect.startX;
      rect.endY = mouse.y - rect.startY;
      drawRect(ctx, rect);
      restoreCircles(ctx, circles);
      restoreRectangles(ctx, rectangles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    } else if (mouse.down && toolValue === "marquee") {
    
        marquee.endX = mouse.x - marquee.startX;
        marquee.endY = mouse.y - marquee.startY;

        selectArea(ctx, marquee);
      

      restoreCircles(ctx, circles);
      restoreRectangles(ctx, rectangles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    } else if (mouse.down && toolValue === "circle") {
      circle.radius = Math.sqrt(
        Math.pow(mouse.x - circle.x, 2) + Math.pow(mouse.y - circle.y, 2)
      );
      circle.radius =
        circle.radius < 0
          ? -Number(circle.radius.toFixed(2))
          : Number(circle.radius.toFixed(2));

      drawCircle(ctx, circle);
      restoreCircles(ctx, circles);
      restoreRectangles(ctx, rectangles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    } else if (mouse.down && toolValue === "line") {
      line.endX = mouse.x;
      line.endY = mouse.y;

      drawLine(ctx, line);
      restoreCircles(ctx, circles);
      restoreRectangles(ctx, rectangles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    }
  });

  window.addEventListener("mousedown", (e) => {
    mouse.down = true;
    if (toolValue === "pencil") freeHandDraw(ctx, mouse);
    else if (toolValue === "rect") {
      rect.startX = mouse.x;
      rect.startY = mouse.y;

      rect.endX = 0;
      rect.endY = 0;
    } else if (toolValue === "marquee") {
      marquee.startX = mouse.x;
      marquee.startY = mouse.y;

      marquee.endX = 0;
      marquee.endY = 0;
    } else if (toolValue === "eraser") {
      eraser(ctx, mouse);
    } else if (toolValue === "circle") {
      circle.x = mouse.x;
      circle.y = mouse.y;
    } else if (toolValue === "line") {
      line.startX = mouse.x;
      line.startY = mouse.y;
    } else if (toolValue === "text" && mouse.x > 0 && mouse.x < canvas.width) {
      const text = prompt("Enter text");
      ctx.font = "30px Arial";
      ctx.fillText(text !== null ? text : "", mouse.x, mouse.y);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearCanvas();
    } else if (e.key === "Delete") {
      deleteSelected(ctx, marquee);
    }
  });

  window.addEventListener("mouseup", (e) => {
    mouse.down = false;
    if (toolValue === "rect") {
      rect.endX = mouse.x - rect.startX;
      rect.endY = mouse.y - rect.startY;

      const endX = mouse.x;
      const endY = mouse.y;

      const rectCordinates = {
        a: { x: rect.startX, y: rect.startY },
        c: { x: endX, y: endY },
        b: { x: endX, y: rect.startY },
        d: { x: rect.startX, y: endY },
        color: color,
      };

      rectangles.push(rectCordinates);
      drawRect(ctx, rect);
      restoreRectangles(ctx, rectangles);
      restoreCircles(ctx, circles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);

      if (rect.endX !== 0 && rect.endY !== 0)
        getCordinates(ctx, rectCordinates);
    } else if (toolValue === "marquee") {
        marquee.endX = mouse.x - marquee.startX;
        marquee.endY = mouse.y - marquee.startY;

        selectArea(ctx, marquee);


      restoreRectangles(ctx, rectangles);
      restoreCircles(ctx, circles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    } else if (toolValue === "circle") {
      circle.radius = Math.sqrt(
        Math.pow(mouse.x - circle.x, 2) + Math.pow(mouse.y - circle.y, 2)
      );
      circle.radius =
        circle.radius < 0
          ? -Number(circle.radius.toFixed(2))
          : Number(circle.radius.toFixed(2));

      circles.push({ x: circle.x, y: circle.y, radius: circle.radius });
      drawCircle(ctx, circle);
      restoreRectangles(ctx, rectangles);
      restoreCircles(ctx, circles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    } else if (toolValue === "line") {
      line.endX = mouse.x;
      line.endY = mouse.y;

      lines.push({
        startX: line.startX,
        startY: line.startY,
        endX: line.endX,
        endY: line.endY,
      });
      drawLine(ctx, line);
      restoreCircles(ctx, circles);
      restoreRectangles(ctx, rectangles);
      restoreLines(ctx, lines);
      restoreStrokes(ctx, strokes);
    }
  });

  return <canvas ref={canvasRef} id="canvas"></canvas>;
};

const restoreStrokes = (ctx, strokes) => {
  strokes.forEach((stroke) => {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.moveTo(stroke.x, stroke.y);
    ctx.setLineDash([0]);
    ctx.lineTo(stroke.x, stroke.y);
    ctx.strokeStyle = stroke.color;
    ctx.stroke();
  });
};

const restoreRectangles = (ctx, rectangles) => {
  rectangles.forEach((rect) => {
    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = rect.color;
    ctx.rect(rect.a.x, rect.a.y, rect.c.x - rect.a.x, rect.c.y - rect.a.y);
    getCordinates(ctx, rect);
    ctx.stroke();
  });
};

const restoreCircles = (ctx, circles) => {
  circles.forEach(({ x, y, radius }) => {
    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.lineCap = "round";
    ctx.stroke();
  });
};

const restoreLines = (ctx, lines) => {
  lines.forEach(({ startX, startY, endX, endY }) => {
    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    ctx.lineCap = "round";
    ctx.stroke();
  });
};

const deleteSelected = () => {

    ctx.clearRect(marquee.startX, marquee.startY, marquee.endX, marquee.endY);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.setLineDash([0]);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.strokeRect(marquee.startX, marquee.startY, marquee.endX, marquee.endY);
    ctx.closePath();
};

const drawRect = (ctx, rect) => {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.setLineDash([0]);
  ctx.strokeStyle = color;
  ctx.strokeRect(rect.startX, rect.startY, rect.endX, rect.endY);
  ctx.stroke();
  ctx.closePath();
};

const selectArea = (ctx, { startX, startY, endX, endY }) => {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.setLineDash([10]);
  ctx.strokeStyle = "#0000ff";
  ctx.strokeRect(startX, startY, endX, endY);
  ctx.stroke();
  ctx.closePath();
};

const drawCircle = (ctx, { x, y, radius }) => {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([0]);
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
};

// const drawCircle = (ctx, { x, y, radius }) => {};

const drawLine = (ctx, { startX, endX, startY, endY }) => {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([0]);
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.closePath();
};

const getCordinates = (ctx, cords) => {
  const cordinates = cords;

  console.log(cordinates);

  printCordinates(ctx, cordinates);
};

const printCordinates = (ctx, cordinates) => {
  ctx.font = "12px Sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText(
    `A:(${Number(cordinates.a.x.toFixed(2))}),(${Number(
      cordinates.a.y.toFixed(2)
    )})`,
    cordinates.a.x - 15,
    cordinates.a.y - 10
  );
  ctx.fillText(
    `B:(${Number(cordinates.b.x.toFixed(2))}),(${Number(
      cordinates.b.y.toFixed(2)
    )})`,
    cordinates.b.x - 20,
    cordinates.b.y - 10
  );
  ctx.fillText(
    `C:(${Number(cordinates.c.x.toFixed(2))}),(${Number(
      cordinates.c.y.toFixed(2)
    )})`,
    cordinates.c.x - 20,
    cordinates.c.y + 20
  );
  ctx.fillText(
    `D:(${Number(cordinates.d.x.toFixed(2))}),(${Number(
      cordinates.d.y.toFixed(2)
    )})`,
    cordinates.d.x - 25,
    cordinates.d.y + 20
  );
};

const eraser = (ctx, mouse) => {
  ctx.beginPath();

  ctx.lineWidth = 20;
  ctx.lineCap = "round";

  ctx.lineTo(mouse.x, mouse.y);
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  ctx.closePath();
};

const freeHandDraw = (ctx, mouse) => {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 20;
  ctx.lineCap = "round";

  ctx.lineTo(mouse.x, mouse.y);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.closePath();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangles = [];
  circles = [];
  lines = [];
  strokes = [];
};

const setTools = (toolName) => {
  toolValue = toolName;
};

export default CustomCanvas;
export const clearAll = clearCanvas;
export const setToolValue = setTools;