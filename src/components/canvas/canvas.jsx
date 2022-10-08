import "./canvas.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

let bound, ctx, canvas;

const CustomCanvas = () => {
  const dispatch = useDispatch();
  const tool = useSelector((store) => store.toolStore.tool);
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

    console.log(bound);
    console.log(ctx);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [window.innerWidth, window.innerHeight]);

  window.addEventListener("resize", () => {
    try {
      canvas.width = window.innerWidth - 145;
      canvas.height = window.innerHeight;
    } catch (e) {
      console.log(e);
    }
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - 70;
    mouse.y = e.clientY;

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
  //   ctx.arc(mouse.x, mouse.y, 1, 1, 2 * Math.PI);
  //   ctx.fillStyle = "black";
  //   ctx.fill();

  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();

  ctx.closePath();
}

export default CustomCanvas;
