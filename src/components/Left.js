import React, { useEffect,useRef } from 'react'
import * as d3 from 'd3'
import { reduce } from 'd3'
import { SearchSkill } from './SearchSkill'
export const Left=(props)=>{
    return(
        <div className="Left">
            <SearchSkill nodes={props.nodes}/>
        </div>
    )
}