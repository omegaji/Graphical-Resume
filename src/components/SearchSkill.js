import React, { useEffect,useRef, useState } from 'react'
import * as d3 from 'd3'
import { reduce } from 'd3'

export const SearchSkill=(props)=>{
    
    var skills=new Set([])
    var hash=new Set([])
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
    console.log(skillset.length)
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
        document.getElementById("inputSkill").value=inputVal
        d3.selectAll(".stars").attr("display",(d)=>{
            if(d.skillTag==undefined){return "none";}
            if(d.skillTag){
                for(let i=0;i<d.skillTag.length;i++){
                    if( d.skillTag[i]==inputVal){
                        return "block";
                    }
                }
                return "none";
            }
        })
    },[inputVal])
    return(
        <div className="divSkill">
                            <div>hello there {inputVal}</div>

            <input id="inputSkill" type="text" onKeyUp={changeDropdown.bind(this)}></input>
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