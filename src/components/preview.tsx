import { useEffect, useRef } from "react";
import "./preview-wrapper.css";
interface PreviewProps
{
    code: string;
    err: string;
}
    const html =
    `<html>
        <header></header>
        <body>
            <div id="root"></div>
            <script>
                const handleError=(err)=>
                {
                    const errorMessage=document.getElementById("root");
                    errorMessage.innerHTML='<div style="color:red;"><h4>Runtime exception</h4>'+err+'</div>';
                    console.error(err);
                }
                window.addEventListener("error",(event)=>{
                    event.preventDefault();
                    handleError(event.error);
                })
                window.addEventListener("message",(event)=>{
                    try
                    {
                        eval(event.data)
                    }
                    catch(err)
                    {
                        handleError(err)
                    }
                
                },false);
            </script>
        </body>
     <html>`;
const Preview: React.FC<PreviewProps> = ({ code ,err}) => {
    const iframe = useRef<any>();
    useEffect(() => {
        //reseting the iframe contents to orginal
        iframe.current.srcdoc = html;
        // we are sending message from parent to child(iframe)
        setTimeout(() => { iframe.current.contentWindow.postMessage(code, "*");},50)
        
    },[code])
    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                title="codet"
                sandbox='allow-scripts allow-modals'
                srcDoc={html}
                
            />
            { err && <div className="preview-error">{ err}</div>}
        </div>
        
    )
}
export default Preview;