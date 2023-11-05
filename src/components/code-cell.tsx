

import { useState,useEffect} from 'react';
import bundle from "../bundler";
import CodeEditor from './code-editor'
import Preview from './preview';
import Resizable from './resizable';
import "./code-editor.css"
const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    //debounce logic to bundle code after 1 second of inactivity
    useEffect(() => {

        const timer=setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setError(output.error)
        }, 1000)
        
        return ()=>{ clearTimeout(timer)}
     }, [input]);
  
    
    return(
    <Resizable direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction='horizontal'>
                <div className='editor-wrapper'>
                    <CodeEditor initialValue="const a=1" onChange={(value) => setInput(value)} />
                </div>
                </Resizable>
                <Preview code={code} err={error } />
        </div>
        </Resizable>)
};

export default CodeCell;
