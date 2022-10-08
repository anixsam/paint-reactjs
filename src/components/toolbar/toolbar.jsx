import "./toolbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTool, setColor } from "../../store/tool-store";
import { clearAll } from "../canvas/canvas";

const ToolBar = () => {
  const dispatch = useDispatch();
  const tool = useSelector((store) => store.toolStore.tool);

  return (
    <div className="toolbar">
      <div className="buttonGroup">
        <div
          className={`button ${tool === "rect" ? "active" : ""}`}
          onClick={(e) => dispatch(setTool("rect"))}
        >
          <div className="rectangle"></div>
        </div>
        <div className={`button ${tool === "pencil" ? "active" : ""}`}>
          <img
            className="icon"
            onClick={(e) => {
              dispatch(setTool("pencil"));
              dispatch(setColor("#000000"));
            }}
            src="https://cdn-icons-png.flaticon.com/512/1828/1828918.png"
          />
        </div>
        <div className={`button ${tool === "eraser" ? "active" : ""}`}>
          <img
            className="icon"
            onClick={(e) => {
              dispatch(setTool("eraser"));
              dispatch(setColor("#ffffff"));
            }}
            src="https://img.icons8.com/ios/344/eraser.png"
          />
        </div>
        <div className={`button`}>
          <img
            className="icon"
            onClick={(e) => {
              clearAll();
            }}
            src="https://img.icons8.com/ios-glyphs/344/filled-trash.png"
          />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
