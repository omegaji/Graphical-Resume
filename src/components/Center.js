import React, { useEffect,useRef } from 'react'
import * as d3 from 'd3'
import { reduce } from 'd3'

export const CenterSvg=(props)=>{
    const svgref=React.useRef("svg")
    const zoom = d3.zoom()

    useEffect(()=>{
    const svg=d3.select(svgref.current)
    svg.attr("class","CenterSvg")
    svg.attr("width","100%")
    svg.attr("height","100%")

    var width = window.innerWidth
    var height =window.innerHeight
    console.log(width)
    console.log(height)
    var Nodes=svg.selectAll(".nodes")
                .data(props.nodes)
                .enter()
                .append("circle")
                .attr("fill",(d)=>{
                    if (d.type=="user")return "#2E2E3A";
                    if(d.category=="ds") return "#F34213";
                    else if(d.category=="dev") return "#E8D33F"
                })
                .attr("class","nodes")
                const ticked=()=>{
                    Nodes.attr("cx",function(d){    
                        return d.x  })
                        .attr("cy",function(d){
                        return d.y})
                }
                
                const zoomed=({transform})=>{
                    Nodes.attr("transform", transform).attr("r",15/transform.k);
                    Nodes.style("stroke-width",5/transform.k);

                }
                zoom.on("zoom",zoomed)
                svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(0,0)).on("dblclick.zoom", null);;
    var simulation=d3.forceSimulation(props.nodes)
    // .force("collide",d3.forceCollide(-10))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(width/2, height/2 ))
    simulation.on("tick",ticked)
                
    })
    
return (
    <div className="CenterDiv">
        <svg ref={svgref}/>

    </div>
)
}
