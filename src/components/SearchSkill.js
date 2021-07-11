import React, { useEffect,useRef, useState } from 'react'
import * as d3 from 'd3'
import { reduce, zoomTransform } from 'd3'
import { currentTransform,Nodes,Links,Stars,Titles} from './Center'
export const SearchSkill=(props)=>{
    
    var skills=new Set([])
    var hash=new Set([])
    var temparr=[]
    var svg=d3.select("#CenterSvg")
    const zoom = d3.zoom()

    var hwidth = window.innerWidth/2
    var hheight =window.innerHeight/2
    props.nodes.forEach(element => {
        if (element.skillTag!=undefined){
            for(let i=0;i<element.skillTag.length;i++){
                if (hash.has(element.skillTag[i])){
                    continue;
                }
                skills.add({"id":element.skillTag[i],"vis":"block"})
                hash.add(element.skillTag[i])
            }

        }
    });
    
    const [skillset,setSkillSet]=useState([...skills])
    const [zoomState]=useState(currentTransform)
    const [searchArr,updateSearchArr]=useState([])
    const [searchIndex,updateSearchIndex]=useState(0)
    const [inputVal,setInputVal]=useState("")
    const changeDropdown=()=>{
        let searchTerm=document.getElementById("inputSkill").value
        skillset.forEach(element=>{
            if(element.id.toLowerCase().includes(searchTerm)){
                element.vis="block"
            }
            else{
                element.vis="none"}
        })
        setSkillSet([...skillset])
        // d3.selectAll(".itemSkill")
        //     .
    }
    useEffect(()=>{
        temparr=[]

        document.getElementById("inputSkill").value=inputVal

        d3.selectAll(".stars").attr("display",(d)=>{
            if(d.skillTag==undefined){return "none";}
            if(d.skillTag){
                for(let i=0;i<d.skillTag.length;i++){
                    if( d.skillTag[i]==inputVal){
                        temparr.push([d.x,d.y])
                        return "block";
                    }
                }
                return "none";
            }
        })
        updateSearchArr([...temparr])
        updateSearchIndex(0)
    },[inputVal])
    useEffect(()=>{
        if (searchArr.length!=0){
            // let Nodes=d3.selectAll(".nodes")
            // let Links=d3.selectAll(".links")
            // let Stars=d3.selectAll(".stars")

            const zoomed=({transform})=>{
                Nodes.attr("transform", transform).attr("r",20/transform.k);
                Nodes.style("stroke-width",5/transform.k);
                Nodes.style("stroke","black")
                // console.log(L)
                Links.attr("transform",transform).attr("stroke-width",2/3.3).attr("marker-end", "url(#triangle)")
               
                transform.x=transform.x-70
                transform.y=transform.y-69// 140 135
                Stars.attr("transform",transform).attr("width",140/transform.k).attr("height",135/transform.k)
                 
                transform.x=transform.x+70
                transform.y=transform.y+69
                Titles.style("transform",(d)=>{
         

                    let finalx= transform.x+(d.x*transform.k)
                    let finaly=(transform.k*d.y)+transform.y
                    
                    return "translate(" + (-1*d.x) +"px," +(-1*d.y)+ "px)"+"translate(" + finalx +"px," + finaly+ "px)"
        
                    
                    // return "translate(" + transform.x +"px," + transform.y+ "px)"
        
                })
            }
            zoom.on("zoom",zoomed)





        console.log(searchArr)
        let xpoint=searchArr[searchIndex][0]
        let ypoint=searchArr[searchIndex][1]
        console.log(svg)
        svg.transition()
        .duration(750).call(zoom.transform, d3.zoomIdentity.translate((hwidth-xpoint*3.3),(hheight-ypoint*3.3)).scale(3.3));
        console.log(zoom.transform)
        }
    },[searchArr,searchIndex])
    return(
        <div className="divSkill">
                            <div>hello there {searchArr}</div>

            <input id="inputSkill" type="text" onKeyUp={changeDropdown.bind(this)}></input>
            <span><button onClick={event=>{if(searchIndex!=searchArr.length-1){updateSearchIndex(searchIndex+1)}}}>Next</button>
            <span>{searchIndex+1}/{searchArr.length}</span></span>

                {skillset.map(
                    item=>{
                        return (<div className="itemSkill" style={{display:item.vis}} onClick={event=>setInputVal(event.target.innerHTML)}>{item.id}</div>)
                    }
                )}
        </div>
    )
    return(
        <select>
                {skillset.map(
                    item=>{
                        return (<option value={item}>{item}</option>)
                    }
                )}
        </select>
    )
}