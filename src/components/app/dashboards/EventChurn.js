import React, { Component } from "react"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Chart, TableToGraph } from "../../../analytics/Index"

const test_data = [
                {
                    a: {
                        value: 10,
                        type: 'has_proportion',
                        proportion: 0.1
                    },
                    b: {
                        value: 15,
                        type: 'has_proportion',
                        proportion: 0.6
                    }
                }
                ,
                {
                    a: {
                        value: 25,
                        type: 'has_proportion',
                        proportion: 0.8
                    },
                    b: {
                        value: 40,
                        type: 'has_proportion',
                        proportion: 1
                    }
                }
            ]

const EventChurn = (props) => {

    return (<>
        <div className="title">
            Event churn
        </div>
        <TableToGraph rawL_data={test_data} data_key={'event_churn'}/>
        {/* <Chart 
            data_key='event_churn'
            raw_data={[{x: 1, y: 2}]} 
            keys={['member_idx']} 
            label_name='Session' 
            _css={css`min-width: 100px; width: 100%; min-height: 300px`}
        /> */}
    </>)
}

export default EventChurn