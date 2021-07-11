import './App.css';
import {CenterSvg} from './components/Center'
import { Left } from './components/Left';
import nodes from "./resume.json"
import links from "./resume2.json"
import * as d3 from 'd3'

// import {Test} from './components/Test'
const zoom = d3.zoom()

function App() {
  return (
    <div className="App">
      {/* <Test/> */}
      <Left nodes={nodes} />
     <CenterSvg nodes={nodes} links={links} />
    </div>
  );
}

export default App;
