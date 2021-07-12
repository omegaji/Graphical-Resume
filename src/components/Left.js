import React, { useEffect,useRef } from 'react'
import * as d3 from 'd3'
import { reduce } from 'd3'
import { SearchSkill } from './SearchSkill'
import { SearchWork } from './SearchWork'
import { Test } from './Test'
export const Left=(props)=>{
    return(
        <div className="Left">
            <SearchSkill nodes={props.nodes}/>
            <SearchWork nodes={props.nodes}/>

        </div>
    )
}