import React, { Component } from "react"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Pie } from "../../../analytics/Index"

const style = css`
    .charts {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`

const Demographics = (props) => {

    return (<div css={style}>
        <div className="title">
            Demography
        </div>
        <div className="charts">
            <Pie data_key={"gender_demographics"} title={"Gender"}/>
            <Pie data_key={"university"} title={"University"}/>
            <Pie data_key={'level of study'} title={'Level of study'}/>
            <Pie data_key={'field of study or occupation'} title={'Background'}/>
            <Pie data_key={'source'} title={'Source'}/>
        </div>
    </div>)
}

export default Demographics