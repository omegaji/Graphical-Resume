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
    const [inputval,setInputVal]=useState("")
    const changeDropdown=()=>{
        let searchTerm=document.getElementById("inputSkill").value
        skillset.forEach(element=>{
            if(element.id.toLowerCase().includes(searchTerm)){
                element.vis="block"
            }
            else{
                console.log("nai hai bhai")
                element.vis="none"}
        })
        setSkillSet([...skillset])
        // d3.selectAll(".itemSkill")
        //     .
    }
    return(
        <div className="divSkill">
            <input id="inputSkill" type="text" onKeyUp={changeDropdown.bind(this)}></input>
                {skillset.map(
                    item=>{
                        console.log(item)
                        return (<div className="itemSkill" style={{display:item.vis}}>{item.id}</div>)
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