import React, { Component } from "react"
import { panel } from "mvp-webapp"
import { connect } from "react-redux"
import Growth from "./dashboards/Growth"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { makeGetRequest } from "../../api_calls"
import Demographics from "./dashboards/Demographics"
import EventChurn from "./dashboards/EventChurn"
// import Chart from "../../analytics/Chart"

const style = css`
    > div {
        width: 600px;
        max-width: 100%;
        min-width: 600px;
        width: 500px;
        flex: 1;
        margin: 12.5px
    }
    
    display: flex; 
    flex-grow: 1; 
    flex-direction: row;
    flex-wrap: wrap;
`

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num_members: null
        }
    }

    componentDidMount = () => {
        window.analytics.page('home')
        makeGetRequest(`app/admin/stats?from=${this.props.fromEpoch}&to=${this.props.toEpoch}&data_key=num_members`,
            data => {
                console.log(data)
                this.setState({num_members: data})
            }
        )
    }

    render() {
        return(
        <>
        <div css={style}>
            <div css={css`${panel}; max-width: 100vw;`}>
                <Growth num_members={this.state.num_members} />
            </div>
            <div css={css`${panel}; min-width: 800px`}>
                <Demographics />
            </div>
            <div css={css`${panel}`}>
                <EventChurn />
            </div>
        </div>
        </>
    )}
}

const mapDispatchToProps = (dispatch) => {return{
    openModal: (content) => {
        dispatch({
            type: "OPEN_MODAL",
            content
        })
    }
}}

export default Home = connect(null, mapDispatchToProps)(Home)