import { useDispatch, useSelector } from "react-redux";
import {setColor} from "../../../store/tool-store"
import '../color-size.css';

const ColorPicker = () => {
    const dispatch = useDispatch()
    return ( 
        <div className="color-picker">
            <input type="color" className="colorPicker" onChange={(e)=>{dispatch(setColor(e.target.value))}}/>
        </div>
     );
}
 
export default ColorPicker;