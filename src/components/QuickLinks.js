import React, { useEffect,useRef } from 'react'
import * as d3 from 'd3'
import { reduce } from 'd3'

export const QuickLinks=()=>{

    return(
        <div className="QuickLinks">
            <div className="QuickLinksTitle"><p>Quick Links</p></div>

            <div className="QuickLinksLinks">
            <div >
            <i class="fab fa-linkedin fa-2x"></i>
            </div>
            <div>
            <i class="fab fa-github fa-2x"></i>
            </div>

            <div>
            <i class="fab fa-kaggle fa-2x"></i>
            </div>
            </div>


        </div>
    )
}