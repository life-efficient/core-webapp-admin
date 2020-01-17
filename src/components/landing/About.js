import React from "react"
import { LandingPage } from "mvp-webapp"
import hero from "../../images/heros/4.jpg"
import us from "../../images/heros/us.png"
import { css } from "@emotion/core"
/** @jsx jsx */ import { jsx } from '@emotion/core'

const heros = [us, us]

const dets = css`
    display: flex;
    flex-direction: column; 
    font-size: 20px; 
    justify-content: space-around;
    min-height: 300px;
    align-items: center;

    .point {
        display: flex;
        align-items: center;
        img {
            height: 50px;
            margin-left: 20px;
        } 
    }
`

var About = (props) => {
    return (
        <LandingPage 
        />
    )
}

export default About