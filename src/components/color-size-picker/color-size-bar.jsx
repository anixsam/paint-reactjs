import ColorPicker from "./widgets/color-picker";
import "./color-size.css";
const ColorSizePicker = () => {
  return (
    <div className="color-size-picker">
      <div className="picker-group">
        <div className="picker">
          <ColorPicker />
        </div>
      </div>
    </div>
  );
};

export default ColorSizePicker;
