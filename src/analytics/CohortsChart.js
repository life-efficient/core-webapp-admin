import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import plus from "../../images/icons/plus.svg"
import { get } from 'http';
import { connect } from "react-redux"
import { makeGetRequest } from '../../api_calls';
import { hexToRgb } from "../../utils"
import './CohortsChart.css'

const make_dataset = (dataset, labels, color, label) => {
  return {
      label: label ? label : '',
      data: dataset,
      fill: false,
      lineTension: 0.6,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: color,
      pointBackgroundColor: color,
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
  }
}


class CohortsChart extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      // from: props.from ? props.from : 1483228800.0.toString(),
      // to: props.to? props.to : new Date().getTime().toString(),
      raw_data: null,
      data: {
        datasets: [],
        gridLines: [{
            display: false
        }]
      },
      slider: null
    }
  }

  componentDidMount = () => {this.getData()}

  getPlotData = (data) => {

  }

  getLabels = (data) => {
      var labels = []
      var label_key
      if (data) {
          label_key = Object.keys(data)[0]                                 // use first column name as label
          // labels = data.map((d) => {return d[label_key]})                         // map entries to list of values to be used as xticks
          labels = data[label_key]
          // labels = {[label_key]: labels}
      }
      return ['week', [1, 2, 3, 4]]
  }

  getData = () => {
    console.log('getting data')
    if (this.props.data) return null            // if data passed directly then this component doesnt need to fetch it
    makeGetRequest(`data?dataset=${this.props.dataset}`,//&from=${this.props.fromEpoch}&to=${this.props.toEpoch}`,
        data => {
            console.log(data)
            this.setState({
              raw_data: data,
              slider: Object.keys(data).length - 1
            })
        }
    )
    // var raw_data = {
    //     '0': {
    //       'availabilities':[4, 2, 1, 0.5], 'assignments':[6, 5, 4.5, 4.5], 'availabilities_active':[1,2 ,3, 4], 'assignments_active':[1, 3, 7, 9]
    //     },
    //     '1': {
    //       'availabilities':[6, 3, 1.5, 0.75], 'assignments':[3, 2.7, 2.5, 2], 'availabilities_active':[5, 6 ,8 , 9], 'assignments_active':[9, 8, 7, 5]
    //     }
    //   }

    // this.setState({
    //   slider: Object.keys(raw_data).length - 1,
    //   raw_data
    // })
  }

  save = () => {
    this.props.add(this.props.config)
  }

  handleSliderChange = (e) => {
    console.log('changing')
    this.setState({slider: e.target.value},
      () => {
        console.log('changed slider to', this.state.slider)
      }  
    )
  }

  render() {
    console.log('rendering')
        console.log(this.state.slider)
    if (this.state.raw_data || this.props.raw_data) {
        console.log(this.state.raw_data[0].assignments)
        console.log(this.state.raw_data[1].assignments)
        var raw_data = this.state.raw_data ? this.state.raw_data : this.props.raw_data
        // raw_data = {[this.state.slider]: raw_data[this.state.slider]}
        // raw_data = this.getPlotData(raw_data)
        var [ labels_name, labels ] = this.getLabels(raw_data)
        this.state.data.labels = labels
     
        var colors = ['#48C0C0', '#ff9b21', '#ff5151', '#5ee592', '#c86bff']
        var cohorts = raw_data
        cohorts = this.props.specific_cohort ? {[this.state.slider]: raw_data[this.state.slider]} : raw_data
        var datasets = Object.values(cohorts).map(         // map each cohort to a dataset of each key-value in the dict of cohorts
          (cohort_data, idx) => {
            return Object.keys(cohort_data)
              .filter(                                      // filter to only display cohort datasets given as key props
                (key) => {
                  return this.props.keys ? this.props.keys.includes(key) : true
                }
              )
              .map(            // map this cohort into a list of datasets
              (data, idx2) => {
                var hexColor = colors[idx2]
                var opacity = 1 - (idx != 0 ? 0.5 : 0) - idx * 0.1
                var color = hexToRgb(hexColor, opacity)
                var label = idx == 0 ? data : null
                return make_dataset(cohort_data[data], labels, color, label)
              }
            )
          }
        ).flat()                                            // flatten the list of lists of datasets
        this.state.data.datasets = datasets
        console.log(raw_data[0].assignments)
        console.log(raw_data[1].assignments)
        console.log('-------------------')
        return (
          <div className="" 
            style={{
              width: this.props.width ? this.props.width : '90%',       
              backgroundColor: 'rgba(75,192,192,0.4)',
              margin:'20px auto', 
              borderRadius: '1px', 
              padding: '10px', 
              backgroundColor: 'whitesmoke',
              animationDelay: `${0.1*this.props.idx}s`
            }} >
            <div style={{display: 'flex', justifyContent: 'space-between'}} className="chart">
              <div style={{float: 'left'}}>
                {this.props.title}
              </div>
              <button onClick={this.save}>
                <img style={{float: 'right', height: '10px'}} src={plus}/>
              </button>
            </div>
            {/* <div style={{backgroundColor: 'white'}}> */}

            <Line data={
                // labels: 'yooo',
                this.state.data
              }
              options = {{
                backgroundColor: '#231563',
                scales: {
                    xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: labels_name
                        }
                    }]
                },
                legend: {
                  labels: {
                    filter: (legend_item, chart_data) => {
                      return legend_item.text
                    }
                  }
                }
            }}
            />
            {
              this.props.specific_cohort && this.state.raw_data ?
              <div className="slide-container">
                <input type="range" min={Object.keys(raw_data)[0]} max={Object.keys(raw_data)[Object.keys(raw_data).length - 1]} value={this.state.slider} class="slider" id="slider" onChange={this.handleSliderChange}/>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {
                  Object.keys(raw_data).map(
                    (cohort_idx) => {
                      return <div className="slider-label" style={this.state.slider == cohort_idx ? {backgroundColor: 'var(--turq)'} : null}>{cohort_idx}</div>
                    }
                  )
                }
                </div>
              </div>
              :
              null
            }
            {/* // height={40} width={2} options={{ maintainAspectRatio: false }} */}
            {/* </div> */}
          </div>
        );
      }
      
    else {
      return null
    }
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (chart_config) => {
      console.log('adding chart')
      dispatch({
        type: 'ADD',
        chart: chart_config
      })

    }
  }
}

export default CohortsChart = connect(null, mapDispatchToProps)(CohortsChart)