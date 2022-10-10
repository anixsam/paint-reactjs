import "./toolbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTool, setColor } from "../../store/tool-store";
import { clearAll, setToolValue } from "../canvas/canvas";

let imgSrc = "https://img.icons8.com/ios/344/"

const ToolBar = () => {
  const dispatch = useDispatch();
  const tool = useSelector((store) => store.toolStore.tool);

  return (
    <div className="toolbar">
      <div className="buttonGroup">
        <div className={`button ${tool === "rect" ? "active" : ""} `}>
          <div
            className={`rectangle`}
            onClick={() => {
              let colorInput = document.querySelector(".colorPicker");
              let colorValue = colorInput.value;
              dispatch(setColor(colorValue));
              dispatch(setTool(`rect`));
              setToolValue(`rect`);
            }}
          ></div>
        </div>
        <div className={`button ${tool === "line" ? "active" : ""} `}>
          <div className="line-div"  onClick={() => {
              let colorInput = document.querySelector(".colorPicker");
              let colorValue = colorInput.value;
              dispatch(setColor(colorValue));
              dispatch(setTool(`line`));
              setToolValue(`line`);
            }}>
          <div
            className={`line`}
           
          ></div></div>
        </div>
        <div className={`button ${tool === "circle" ? "active" : ""} `}>
          <div
            className={`circle`}
            onClick={() => {
              let colorInput = document.querySelector(".colorPicker");
              let colorValue = colorInput.value;
              dispatch(setColor(colorValue));
              dispatch(setTool(`circle`));
              setToolValue(`circle`);
            }}
          ></div>
        </div>
        <div className={`button ${tool === "pencil" ? "active" : ""}`}>
          <img
            className="icon"
            onClick={(e) => {
              let colorInput = document.querySelector(".colorPicker");
              let colorValue = colorInput.value;
              dispatch(setColor(colorValue));
              dispatch(setTool("pencil"));
              setToolValue("pencil");
            }}
            src={`${imgSrc}/pencil.png`}
            alt="pencil"
          />
        </div>
        <div className={`button ${tool === "text" ? "active" : ""}`}>
          <img
            className="icon"
            onClick={() => {
              dispatch(setTool("text"));
              setToolValue("text");
              let colorInput = document.querySelector(".colorPicker");
              let colorValue = colorInput.value;
              dispatch(setColor(colorValue));
            }}
            src={`${imgSrc}/text.png`}
            alt="eraser"
          />
        </div>
        <div className={`button ${tool === "eraser" ? "active" : ""}`}>
          <img
            className="icon"
            onClick={() => {
              dispatch(setTool("eraser"));
              setToolValue("eraser");
              dispatch(setColor("#ffffff"));
            }}
            src={`${imgSrc}/eraser.png`}
            alt="eraser"
          />
        </div>
        <div className={`button ${tool === "marquee" ? "active" : ""}`}>
          <div className="marquee" onClick={
            () => {
              dispatch(setTool("marquee"));
              setToolValue("marquee");
            }
          }></div>
        </div>
        <div className={`button`}>
          <img
            className="icon"
            onClick={() => {
              clearAll();
            }}
            src="https://img.icons8.com/ios-glyphs/344/filled-trash.png"
            alt="trash"
          />
        </div>
        
      </div>
    </div>
  );
};

export default ToolBar;
