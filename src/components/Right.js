import React, { useEffect,useRef, useState } from 'react'
import * as d3 from 'd3'
import { reduce } from 'd3'
import { Nodes } from './Center'
export const Right=(props)=>{
    const [name,updateName]=useState("")
    const [skillTags,updateSkillTags]=useState([])
    const [url,updateUrl]=useState("")
    const [educationArray,updateEducationArray]=useState([])
    const [type,updateType]=useState("")
    const [contents,updateContents]=useState([])
    const [duration,updateDuration]=useState("")
    useEffect(()=>{
        Nodes.on("click",(i,d)=>{
            updateName(d.data.name)
            updateType(d.data.type)
            if(d.data.skillTags){
                updateSkillTags([...d.data.skillTags])
            }
            else{
                updateSkillTags([])
            }
            if(d.data.type=="education"){
                updateEducationArray([d.data.cgpa,d.data.yearPassout])
            }
            else{
                updateEducationArray([])
            }
            if(d.data.contents){
                updateContents([...d.data.contents])
            }
            else{
                updateContents([])
            }
            if(d.data.duration){
                updateDuration(d.data.duration)
            }
            else{
                updateDuration("")
            }
            if(d.data.links){
                updateUrl(d.data.links)
            }
            else{
                updateUrl("")
            }

        })
    })
    return(
        <div className="Right">
         
            <div>
               {name}
            </div>
            
        </div>
    )
}