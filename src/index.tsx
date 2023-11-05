import { createRoot} from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
const App = () => {
    
    
    return <div>
        <TextEditor />
        
    </div>
};
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App/>);