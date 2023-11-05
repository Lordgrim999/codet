
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect ,useState} from "react";
import "./resizable.css";
interface ResizableProps{
    direction: "horizontal" | "vertical";
    children: React.ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let [innerHeight, setInnerHeight] = useState(window.innerHeight);
    let [innerWidth, setInnerWidth] = useState(window.innerWidth);
    let [width, setWidth] = useState(window.innerWidth * 0.8);
    useEffect(() => {
        let timer: any;
        const listener = () => { 
            if (timer)
            {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                
                setInnerHeight(window.innerHeight)
                setInnerWidth(window.innerWidth)
                if (window.innerWidth * 0.8 < width)
                    setWidth(window.innerWidth*0.8)
            }, 100)
            
        }
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        }
    }, []);
    let resizableBoxProps: ResizableBoxProps;
    if (direction === "vertical")
    {
        resizableBoxProps = {
            height: 300,
            maxConstraints:[Infinity, innerHeight*0.97],
            width:Infinity,
            resizeHandles:['s'],
        }
        
    }
    else {
        resizableBoxProps = {
            className:"resizable-horizontal",
            height: Infinity,
            maxConstraints:[innerWidth*0.9,Infinity],
            width,
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            }
        }
        
    }
    return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
}
export default Resizable;