import CustomCanvas from "./components/canvas/canvas";
import ColorSizePicker from "./components/color-size-picker/color-size-bar";
import ToolBar from "./components/toolbar/toolbar";

function App() {
  return (
    <div className="paint">
      <div>
        <ToolBar />
        <CustomCanvas/>
        <ColorSizePicker/>
      </div>
      <div className="paint__canvas"></div>
    </div>
  );
}

export default App;
