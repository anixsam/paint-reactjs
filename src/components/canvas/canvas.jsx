import "./canvas.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

let bound, ctx, canvas;

let color;

const CustomCanvas = () => {
  const tool = useSelector((store) => store.toolStore.tool);
  color = useSelector((store) => store.toolStore.color);
  const canvasRef = useRef(null);

  let mouse = {
    x: 0,
    y: 0,
    down: false,
  };

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    bound = canvas.getBoundingClientRect();
    canvas.width = window.innerWidth - 148;
    canvas.height = window.innerHeight;
  }, [window.innerWidth, window.innerHeight]);

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

    if (mouse.down && tool === "pencil") {
      freeHandDraw(ctx, mouse);
    }
  });

  window.addEventListener("mousedown", (e) => {
    mouse.down = true;
    freeHandDraw(ctx, mouse);
  });

  window.addEventListener("mouseup", (e) => {
    mouse.down = false;
  });

  return <canvas ref={canvasRef} id="canvas"></canvas>;
};

function freeHandDraw(ctx, mouse) {
  ctx.beginPath();

  ctx.lineWidth = 20;
  ctx.lineCap = "round";

  ctx.lineTo(mouse.x, mouse.y);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.closePath();
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export default CustomCanvas;
export const clearAll = clearCanvas;
