import React, { Component } from "react"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Chart } from "../../../analytics/Index"

const increment_date = (date, val, unit) => {
    const units = ['years', 'months', 'day', 'hours', 'minutes', 'seconds', 'milliseconds']
    if (unit == 'months') {
        return date.getMonth() == 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    else if (unit == 'weeks') {
        var epoch = date.getTime() + (7*24*60*60*1000)
        return new Date(epoch)
    }
    else if (unit == 'days') {
        var epoch = date.getTime() + (24*60*60*1000)
        return new Date(epoch)
    }
}

const Growth = (props) => {

    return (<>
        <div className="title">
            Membership
        </div>
        {
            props.num_members ?
            <div css={css`font-size: 40px; font-weight: 1000; padding: 10px;`}>{props.num_members + 1500}<span css={css`font-size: 15px;`}>members</span></div>
            :
            null
        }
        <Chart 
            data_key='member_growth' 
            xtype='time'
            keys={['member_idx']} 
            label_name='epoch' 
            _css={css`min-width: 100px; width: 100%; min-height: 300px`}
            create_fields={{ // create extra fields using the data pulled from cloud
                'DoD growth': (data)=>{ // calculate month on month (MoM) growth 
                    var dods = []
                    var start_date = new Date("Nov 2, 2019 11:26:01") // initial date where we uploaded contacts
                    while (start_date < new Date()) {
                        var end_date = increment_date(start_date, 1, 'days')
                        var in_range = data['member_idx'].filter((entry)=>{var d = new Date(entry['x']); return d > start_date && d < end_date})
                        var percentage_growth = 100 * in_range.length / in_range[0].y
                        dods.push({x: in_range[in_range.length - 1]['x'], y: percentage_growth})
                        start_date = end_date
                    }
                    return dods
                },

                'WoW_growth': (data)=>{ // calculate month on month (MoM) growth 
                    var wows = []
                    var start_date = new Date("Nov 2, 2019 11:26:01") // initial date where we uploaded contacts
                    while (start_date < new Date()) {
                        var end_date = increment_date(start_date, 1, 'weeks')
                        var in_range = data['member_idx'].filter((entry)=>{var d = new Date(entry['x']); return d > start_date && d < end_date})
                        var percentage_growth = 100 * in_range.length / in_range[0].y
                        wows.push({x: in_range[in_range.length - 1]['x'], y: percentage_growth})
                        start_date = end_date
                    }
                    return wows
                },
                'MoM_growth': (data)=>{ // calculate month on month (MoM) growth 
                    var moms = []
                    var start_date = new Date("Nov 2, 2019 11:26:01") // initial date where we uploaded contacts
                    while (start_date < new Date()) {
                        var end_date = increment_date(start_date, 1, 'months')
                        var in_range = data['member_idx'].filter((entry)=>{var d = new Date(entry['x']); return d > start_date && d < end_date})
                        var percentage_growth = 100 * in_range.length / in_range[0].y
                        moms.push({x: in_range[in_range.length - 1]['x'], y: percentage_growth})
                        start_date = end_date
                    }
                    return moms
                }
            }}
        />
    </>)
}

export default Growth