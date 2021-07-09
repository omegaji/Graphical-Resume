import './App.css';
import {CenterSvg} from './components/Center'
import { Left } from './components/Left';
import nodes from "./resume.json"
import links from "./resume_links.json"
// import {Test} from './components/Test'

function App() {
  return (
    <div className="App">
      {/* <Test/> */}
      <Left nodes={nodes}/>
     <CenterSvg nodes={nodes} links={links}/>
    </div>
  );
}

export default App;
