import "./canvas.css";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

let bound, ctx, canvas;

let color;
let toolValue = "";

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

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    bound = canvas.getBoundingClientRect();
    canvas.width = window.innerWidth - 148;
    canvas.height = window.innerHeight;
  }, []);

  window.addEventListener("resize", () => {
    try {
      canvas.width = window.innerWidth - 148;
      canvas.height = window.innerHeight;
    } catch (e) {
      console.log(e);
    }
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - bound.left;
    mouse.y = e.clientY - bound.top;

    if (mouse.down && toolValue === "pencil") {
      freeHandDraw(ctx, mouse);
    } else if (mouse.down && toolValue === "eraser") {
      eraser(ctx, mouse);
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

      drawRect(ctx, rect);
    } else if (toolValue === "eraser") {
      eraser(ctx, mouse);
    }
  });

  window.addEventListener("mouseup", (e) => {
    mouse.down = false;
    if (toolValue === "rect") {
      rect.endX = mouse.x - rect.startX;
      rect.endY = mouse.y - rect.startY;

      drawRect(ctx, rect);
    }
  });

  return <canvas ref={canvasRef} id="canvas"></canvas>;
};

const drawRect = (ctx, rect) => {
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.strokeRect(rect.startX, rect.startY, rect.endX, rect.endY);

  ctx.stroke();
  ctx.closePath();
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

  ctx.lineWidth = 20;
  ctx.lineCap = "round";

  ctx.lineTo(mouse.x, mouse.y);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.closePath();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const setTools = (toolName) => {
  toolValue = toolName;
};

export default CustomCanvas;
export const clearAll = clearCanvas;
export const setToolValue = setTools;
