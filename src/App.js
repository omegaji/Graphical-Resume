import './App.css';
import {CenterSvg} from './components/Center'
import nodes from "./resume.json"
import links from "./resume_links.json"
// import {Test} from './components/Test'

function App() {
  return (
    <div className="App">
      {/* <Test/> */}
     <CenterSvg nodes={nodes} links={links}/>
    </div>
  );
}

export default App;
