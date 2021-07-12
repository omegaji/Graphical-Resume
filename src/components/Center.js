import React, { useEffect,useRef } from 'react'
import * as d3 from 'd3'
import { reduce, tree } from 'd3'
var currentTransform;
var Nodes;
var Links;
var Stars;
var Titles;
export const CenterSvg=(props)=>{
    const svgref=React.useRef("svg")
    const divref=React.useRef("div")
    const zoom = d3.zoom()
    useEffect(()=>{
    const svg=d3.select(svgref.current)
    const div=d3.select(divref.current)
    svg.attr("class","CenterSvg")
    svg.attr("id","CenterSvg")
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
    console.log(width)
    const root=d3.hierarchy(props.links)
    // let link= d3.hierarchy(props.links).links()
    const rootnodes=root.descendants()
    Links=svg.append("g")
        .attr("stroke", "#BBB8B2")
        .attr("class","links")
        .selectAll("line")
        .attr("marker-end", "url(#triangle)")
        .data(root.links())
        .join("line")
    // Links=svg.append("g")
    //     .attr("stroke", "#BBB8B2")
    //     .attr("class","links")
    //     .selectAll("line")
    //     .attr("marker-end", "url(#triangle)")
    //     .data(props.links)
    //     .join("line")
    Stars=svg.selectAll(".stars")
        .data(rootnodes)
        .enter()
        .append("image")
        .attr("href",process.env.PUBLIC_URL+'/images/splat.svg')
        .attr("class","stars")
        .attr("display","none")
    Nodes=svg.selectAll(".nodes")
                .data(rootnodes)
                .enter()
                .append("circle")
                .attr("fill",(d)=>{
                    if (d.data.type=="user")return "#2E2E3A";
                    if(d.data.category=="ds") return "#F34213";
                    else if(d.data.category=="dev") return "#E8D33F"
                })
                .attr("class","nodes")
    Titles=div.selectAll(".titles")
                .data(rootnodes)
                .enter()
                .append("p")
                .text((d)=>d.data.name)
                .attr("class","titles")
    

    const ticked=()=>{
        Links
            .attr("x1", d => {return d.source.x})
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        Nodes.attr("cx",function(d){    
            return d.x  })
            .attr("cy",function(d){
            return d.y  })
        Stars.attr("x",function(d){    
            return d.x  })
            .attr("y",function(d){
            return d.y})
        Titles.style("left",(d)=>{
            // return "0px"
            return d.x-15+"px";
        })
        Titles.style("top",(d)=>{
            // return "0px"
            return d.y+"px"
        })
    }
    
    const zoomed=({transform})=>{
        let hheight=height/2
        let hwidth=width/2
        // Nodes.attr("transform", transform).attr("r",20/transform.k);
        Nodes.attr("transform", "translate(" + transform.x + " " + transform.y + ") scale(" + transform.k + ")").attr("r",20/transform.k);
        Nodes.style("stroke-width",5/transform.k);
        Nodes.style("stroke","black")
        var ll=d3.selectAll(".links")

        Links.attr("transform",transform).attr("stroke-width",2/transform.k).attr("marker-end", "url(#triangle)")
        // Titles.style("transform", "translate(" + transform.x +"px," + transform.y+ "px) scale(" + transform.k + ")");
       
        Titles.style("transform",(d)=>{
         

            let finalx= transform.x+(d.x*transform.k)
            let finaly=(transform.k*d.y)+transform.y
            
            return "translate(" + (-1*d.x) +"px," +(-1*d.y)+ "px)"+"translate(" + finalx +"px," + finaly+ "px)"

            

        })
        
        transform.x=transform.x-70
        transform.y=transform.y-69// 140 135
        Stars.attr("transform",transform).attr("width",140/transform.k).attr("height",135/transform.k)
        transform.x=transform.x+70
        transform.y=transform.y+69
       

        
    }
    
    zoom.on("zoom",zoomed)
    svg.call(zoom).call(zoom.transform, d3.zoomIdentity.scale(1).translate(0,0))//.on("dblclick.zoom", null);;
    var simulation=d3.forceSimulation(rootnodes)
    // .force("collide",d3.forceCollide(70))
    .force("charge", d3.forceManyBody().strength(d=>{
        return -1000
        if(d.data.name=="om"){
            return -500;
        }
        else return -200
    }))
    .force("link",d3.forceLink().links(root.links()).id(d => d.id).distance(100).strength(1).id(function(d) {
            return d.id
    }))
    .force("center", d3.forceCenter(width/2, height/2 ))
    
    simulation.on("tick",ticked)
                
    })
return (
    <div className="CenterDiv">
        <div  id="DivTitle"ref={divref}></div>
        <svg ref={svgref}/>

    </div>
)
}
export {currentTransform,Nodes,Links,Stars,Titles};