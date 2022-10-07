import "./toolbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTool} from "../../store/tool-store";

const ToolBar = () => {

  const dispatch = useDispatch();
  const tool = useSelector((store) => store.toolStore.tool);

  return (
    <div className="toolbar">
      <div className="buttonGroup">
        <div className={`button ${(tool === 'rect') ? 'active' : ''}`} onClick={(e)=>dispatch(setTool('rect'))}>
          <div className="rectangle"></div>
        </div>
        <div className={`button ${(tool === 'pencil') ? 'active' : ''}`}>
          <img className ="pencil" onClick={(e)=>dispatch(setTool('pencil'))} src="https://cdn-icons-png.flaticon.com/512/1828/1828918.png"/>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
