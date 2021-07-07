import React, { useEffect,useRef } from 'react'
import * as d3 from 'd3'
import { reduce } from 'd3'

export const Test=()=>{
    
    const ChangeColor=()=>{

        console.log("it started")
        d3.selectAll(".nodes")
        .attr("fill",(d)=>{
            console.log(d)
            if (d.id=="2") return "blue";
        })
    }
    
    return (

        <div>
            <input type="text" id="testinput"></input>
            <button id="testsubmit" onClick={ChangeColor.bind(this)}>Submit    </button>
        </div>
    )
}