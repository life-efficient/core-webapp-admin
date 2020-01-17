import React, {Component} from "react"
import Dropdown from "../general/form_components/Dropdown";
import "./SetTimeframe.css"
import Select from "react-select"

class SetTimeframe extends Component {

    render() {
        var options = [{value: 'days', label: 'days'}, {value: 'weeks', label: 'weeks'}, {value: 'months', label: 'months'}]
        var tf = this.props.timeframe
        return (
            <div className="set-timeframe"> 
                <div>
                    View data from 
                </div>
                <input id="from" type="select" value={tf.from} onChange={this.props.changeTimeframe}/>
                <div>
                    to
                </div>
                <input id="to" type="select" value={tf.to} onChange={this.props.changeTimeframe}/>
                <Select name="unit" placeholder={tf.unit} className="set-timeframe-unit" onChange={this.props.changeTimeframeOption} options={options}/>
                {/* <Dropdown id='unit' options={['days', 'weeks', 'months']} value={this.state.unit} onChange={this.handleChange}/> */}
                <div>
                    ago
                </div>
                {/* <button>Update</button> */}

            </div>
        )
    }
}

export default SetTimeframe