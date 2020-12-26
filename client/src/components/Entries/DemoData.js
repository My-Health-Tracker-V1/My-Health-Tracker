import React, { Component } from 'react'
import { LineChart, PieChart } from 'react-chartkick'
import './DemoData.css'
import 'chart.js'

export default class DemoData extends Component {
  
  render() {
    let colors = [,,"#666","#b00"]

    let pieData = [["Croissant", 8],["Peanuts", 15], ["Milk", 23],  ["Cheese", 23]]
    let lineData = [
      {"name":"Excercise", "data": {"2020-12-01": 3, "2020-12-02": 4,"2020-12-03": 6, "2020-12-04": 7, "2020-12-05": 0}},
      {"name":"Sleep", "data": {"2020-12-01": 7, "2020-12-02": 7, "2020-12-03": 8, "2020-12-04": 9, "2020-12-05": 4}},
      {"name":"Symptom", 'data': {"2020-12-01": 3, "2020-12-02": 3, "2020-12-03": 3, "2020-12-04": 5, "2020-12-05": 8}},
      {"name":"Cheese", 'data': {"2020-12-01": 0, "2020-12-02": 0, "2020-12-03": 3, "2020-12-04": 1, "2020-12-05": 0}}
    ]

    return (
      <div className="charts">
        <h3>Foods associated with strong symptoms</h3>
        <PieChart colors={colors} data={pieData} height="80vh" legend="right"/>
        <h3>Habits and food suspect over time</h3>
        <LineChart data={lineData} height="80vh" legend="right"/>
      </div>
    )
  }
}

// pie chart => likely causes
//time series => symptom intensity over time (sleeping hours, workout intensity, water intake)