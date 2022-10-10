import "./toolbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTool, setColor } from "../../store/tool-store";
import { clearAll, setToolValue } from "../canvas/canvas";

const ToolBar = () => {
  const dispatch = useDispatch();
  const tool = useSelector((store) => store.toolStore.tool);
  const color = useSelector((store) => store.toolStore.color);

  return (
    <div className="toolbar">
      <div className="buttonGroup">
        <div className={`button ${tool === "rect" ? "active" : ""} `}>
          <div
            className={`rectangle`}
            onClick={() => {
              dispatch(setColor(color === "#ffffff" ? "#000000" : color));
              dispatch(setTool(`rect`));
              setToolValue(`rect`);
            }}
          ></div>
        </div>
        <div className={`button ${tool === "line" ? "active" : ""} `}>
          <div
            className={`line-div`}
            onClick={() => {
              dispatch(setColor(color === "#ffffff" ? "#000000" : color));
              dispatch(setTool(`line`));
              setToolValue(`line`);
            }}
          >
            <div className={`line`}></div>
          </div>
        </div>
        <div className={`button ${tool === "circle" ? "active" : ""} `}>
          <div
            className={`circle`}
            onClick={() => {
              dispatch(setColor(color === "#ffffff" ? "#000000" : color));
              dispatch(setTool(`circle`));
              setToolValue(`circle`);
            }}
          ></div>
        </div>
        <div className={`button ${tool === "pencil" ? "active" : ""}`}>
          <img
            className="icon"
            onClick={(e) => {
              dispatch(setColor(color === "#ffffff" ? "#000000" : color));
              dispatch(setTool("pencil"));
              setToolValue("pencil");
            }}
            src="https://cdn-icons-png.flaticon.com/512/1828/1828918.png"
            alt="pencil"
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
            src="https://img.icons8.com/ios/344/eraser.png"
            alt="eraser"
          />
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
