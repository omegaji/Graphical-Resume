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
            <div className="BottomLeft">
            <div className="ribbon">
                <div className="rect" > <p className="rotate">&#x1F50D;</p><p className="rotate">Search</p> </div>
                <div className="ribbottom">
                <div className="arrow-down"></div>
                <div className="arrow-down2"></div>
            </div>
            </div>

            <div className="ribbon">
                <div className="rect"><p className="rotate">&#x1F30D;</p><p className="rotate">Explore</p> </div>
                <div className="ribbottom">
                <div className="arrow-down"></div>
                <div className="arrow-down2"></div>
            </div>
            </div>

            <div className="ribbon">
                <div className="rect"><p className="rotate">&#x1F447;</p><p className="rotate">Click</p> </div>
                <div className="ribbottom">
                <div className="arrow-down"></div>
                <div className="arrow-down2"></div>
            </div>
            </div>

                    

                {/* <div></div>
                <div>explorable</div>
                <div>clickable</div> */}
            </div>
        </div>
    )
}