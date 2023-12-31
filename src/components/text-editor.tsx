import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "./text-editor.css";

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('# Header');
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node))
            {
                
                return;
            }
            setEditing(false)
                
        }
        document.addEventListener("click", listener, { capture: true })
        return () => {
            document.removeEventListener("click", listener, { capture: true })
        }
    },[])
    if (editing)
    {
        return <div ref={ref} className="text-editor">
            <MDEditor value={value} onChange={(v)=>{setValue(v || '')}}></MDEditor>
            </div>
        ;
        }
    return <div onClick={() => setEditing(true)} className="text-editor card">
            <div className="card-content">
            <MDEditor.Markdown source={value} ></MDEditor.Markdown>
            </div>
            </div>
        ;
}
export default TextEditor;