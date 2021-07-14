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
    const [duration,updateDuration]=useState([])


    const checkDuration=()=>{
        if(duration.length==0){
            return 
        }
        else{
            return (<div className="Duration">&#x23F3;{duration[0]+'-'+duration[1]}</div>)
        }
        
    }
    const checkUrl=()=>{
        if(url==""){
            return 
        }
        else{
            return (<div className="Url">{url}</div>)
        }
    }
    const checkEducationArray=()=>{
        if(educationArray.length==0){
            return
        }
        else{
            return(
                <React.Fragment>
                <div className="CGPA">{educationArray[0]}</div>
                <div className="yearPassout">{educationArray[1]}</div>
                </React.Fragment>
            )
        }
    }
    const checkSkillTags=()=>{
        if(skillTags.length==0){return}
        else{
            return(
            <div className="skillTags"> 
               { skillTags.map(item=>{
                    return(<div className="skillTagItem">{item}</div>)
                })}
            </div>)
        }
    }
    const checkContents=()=>{
        if(contents.length==0){
            return
        }
        else{
            return(
                <div className="ContentsBox">
                    {contents.map(element => {
                        return(<div className="Contents">{element}</div>)
                    })
                    }

                </div>
            )
        }
    }
    useEffect(()=>{
        Nodes.on("click",(i,d)=>{
            updateName(d.data.name)
            updateType(d.data.type)
            if(d.data.skillTag){
                console.log("yes they exist")
                updateSkillTags([...d.data.skillTag])
            }
            else{
                console.log("no they donext")
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
    },[name,duration,type,url,contents,educationArray,skillTags])
    return(
        <div className="Right">
            <div className="Name">
            &#x1F4DC;	{name}
            </div>
            <div className="beforeDuration">
            { checkDuration() }
            </div>
            {checkSkillTags()}
            {checkContents()  }

            <div> 
            {checkEducationArray}


            </div>
            { checkUrl() }

        </div>
    )
}