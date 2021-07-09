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
    svg.append('defs').append('marker')
    .attr('id','triangle')
    .attr('viewBox','-0 -5 10 10')
    .attr('refX',13)
    .attr('refY',0)  
    .attr('orient','auto')   
    .attr('markerWidth',8)
    .attr('markerHeight',8)  
    .attr('xoverflow','visible')   
        
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke','none');
    var width = window.innerWidth
    var height =window.innerHeight
    var Links=svg.append("g")
        .attr("stroke", "#BBB8B2")
        .attr("class","links")
        .selectAll("line")
        .attr("marker-end", "url(#triangle)")
        .data(props.links)
        .join("line")
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
    var Stars=svg.selectAll(".stars")
                .data(props.nodes)
                .enter()
                .append("image")
                .attr("href",process.env.PUBLIC_URL+'/images/star.svg')
                .attr("class","stars")
                .style("opacity","0")

    
    const ticked=()=>{
        Links
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        Nodes.attr("cx",function(d){    
            return d.x  })
            .attr("cy",function(d){
            return d.y})
        Stars.attr("x",function(d){    
            return d.x  })
            .attr("y",function(d){
            return d.y})
    }
    
    const zoomed=({transform})=>{
        Nodes.attr("transform", transform).attr("r",35/transform.k);
        Nodes.style("stroke-width",5/transform.k);
        Nodes.style("stroke","black")

        Links.attr("transform",transform).attr("stroke-width",2/transform.k).attr("marker-end", "url(#triangle)")
        let starttrans={"x":transform.x-(35/transform.k),"y":transform.y-(35/transform.k),"k":transform.k}
        // console.log(starttrans)
        transform.x=transform.x-70
        transform.y=transform.y-69
        Stars.attr("transform",transform).attr("width",140/transform.k).attr("height",135/transform.k)
        
    }
    zoom.on("zoom",zoomed)
    svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(0,0)).on("dblclick.zoom", null);;
    var simulation=d3.forceSimulation(props.nodes)
    .force("collide",d3.forceCollide(40))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("link",d3.forceLink().links(props.links).id(function(d) {
            return d.id
    }).distance(300).strength(1))
    .force("center", d3.forceCenter(width/2, height/2 ))
    simulation.on("tick",ticked)
                
    })
    
return (
    <div className="CenterDiv">
        <svg ref={svgref}/>

    </div>
)
}
