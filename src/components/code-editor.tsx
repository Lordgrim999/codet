


import { useRef } from "react";

import  MonacoEditor,{ EditorDidMount }from "@monaco-editor/react";
interface CodeEditorProps
{
    initialValue: string,
    onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();
    const onEditorDidMount:EditorDidMount = (getValue,monacoEditor) => {
        //every time some value changes in editor
        // getValue will show the content

        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
            
        })
        editorRef.current = monacoEditor;
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    };


    

    return(
        <div>
         
        
        <MonacoEditor 
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language='javascript'
        height="100%"
        theme='dark'
        options={
            { 
               
                wordWrap: "on",
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16, 
                automaticLayout:true, 
                scrollBeyondLastLine:false,
                minimap: {
                    enabled:false
                }
                
            }
        }
            />
            </div>)
}
export default CodeEditor;