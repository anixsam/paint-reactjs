import "./canvas.css";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

let bound,
  ctx,
  canvas,
  color,
  toolValue = "",
  marquee,
  selected = false;
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
      freeHandDraw(ctx, mouse);
    } else if (mouse.down && toolValue === "eraser") {
      eraser(ctx, mouse);
    } else if (mouse.down && toolValue === "rect") {
      rect.endX = mouse.x;
      rect.endY = mouse.y;
    } else if (mouse.down && toolValue === "marquee") {
      if(!selected)
      {marquee.endX = mouse.x;
      marquee.endY = mouse.y;}
    } else if (mouse.down && toolValue === "circle") {
      circle.radius = Math.sqrt(
        Math.pow(mouse.x - circle.x, 2) + Math.pow(mouse.y - circle.y, 2)
      );
      circle.radius =
        circle.radius < 0
          ? -Number(circle.radius.toFixed(2))
          : Number(circle.radius.toFixed(2));
    } else if (mouse.down && toolValue === "line") {
      line.endX = mouse.x;
      line.endY = mouse.y;
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

      if (!selected) {
        line.startX = mouse.x;
        line.startY = mouse.y;
      }
    }
    else if(toolValue === "text" && mouse.x > 0 && mouse.x < canvas.width)
    {
      const text = prompt("Enter text");
      ctx.font = "30px Arial";
      ctx.fillText(text!==null ? text : "" , mouse.x, mouse.y);
    }
  });


  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearCanvas();
    }
    else if(e.key === "Delete")
    {
      deleteSelected(ctx,marquee);
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
      };

      drawRect(ctx, rect);
      if (rect.endX !== 0 && rect.endY !== 0)
        getCordinates(ctx, rectCordinates);
    } else if (toolValue === "marquee") {
      if(!selected){marquee.endX = mouse.x - marquee.startX;
      marquee.endY = mouse.y - marquee.startY;
      selectArea(ctx, marquee);}
    } else if (toolValue === "circle") {
      circle.radius = Math.sqrt(
        Math.pow(mouse.x - circle.x, 2) + Math.pow(mouse.y - circle.y, 2)
      );
      circle.radius =
        circle.radius < 0
          ? -Number(circle.radius.toFixed(2))
          : Number(circle.radius.toFixed(2));
      drawCircle(ctx, circle);
    } else if (toolValue === "line") {
      line.endX = mouse.x;
      line.endY = mouse.y;
      drawLine(ctx, line);
    }
  });

  return <canvas ref={canvasRef} id="canvas"></canvas>;
};

const deleteSelected = () => {
  if(selected)
  {    ctx.clearRect(marquee.startX, marquee.startY, marquee.endX, marquee.endY);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.setLineDash([0]);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.strokeRect(marquee.startX, marquee.startY, marquee.endX, marquee.endY);
    ctx.closePath();
    selected = false;
  }
}

const drawRect = (ctx, rect) => {
  ctx.beginPath();
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
  ctx.lineWidth = 5;
  ctx.setLineDash([10]);
  ctx.strokeStyle = "#0000ff";
  ctx.strokeRect(startX, startY, endX, endY);
  ctx.stroke();
  ctx.closePath();

  selected = true;
  //   marquee = {
  //     startX: 0,
  //     startY: 0,
  //     endX: 0,
  //     endY: 0,
  //   };
};

const drawCircle = (ctx, { x, y, radius }) => {
  ctx.beginPath();
  ctx.setLineDash([0]);
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
};

const drawLine = (ctx, { startX, endX, startY, endY }) => {
  ctx.beginPath();
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

  ctx.lineWidth = 20;
  ctx.lineCap = "round";

  ctx.lineTo(mouse.x, mouse.y);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.closePath();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  selected = false;
};

const setTools = (toolName) => {
  toolValue = toolName;
};

export default CustomCanvas;
export const clearAll = clearCanvas;
export const setToolValue = setTools;
