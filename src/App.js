import './App.css';
import {CenterSvg} from './components/Center'
import { Left } from './components/Left';
import { Right } from './components/Right';
import { Test } from './components/Test';
// import nodes from "./resume.json"
import links from "./resume2.json"
import * as d3 from 'd3'

// import {Test} from './components/Test'
const zoom = d3.zoom()
const root=d3.hierarchy(links)
const nodes=root.descendants()
function App() {
  return (
    <div className="App">
      <div className="Header">
        <img src={process.env.PUBLIC_URL+"/images/header.svg"}></img>
        {/* <div className="HeaderButtons">
          <div><button className="HotNews">News</button></div>
          <div><button className="Attributes">Flaticons</button></div>

        </div> */}
      </div>
      <div>
       <Left nodes={nodes} /></div>
      <div> <CenterSvg nodes={nodes} links={links} /></div>
      <div><Right nodes={nodes}/></div>
    </div>
  );
}

export default App;
