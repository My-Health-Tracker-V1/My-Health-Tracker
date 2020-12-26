import React from 'react'
import { LineChart, PieChart } from 'react-chartkick'
import { useState, useEffect } from "react";
import axios from 'axios';
// import { DataContext } from "./contexts/DataContext";

export default function RealData(props) {
  // console.log(props.user)
  const [userData, setUserData] = useState()
  const [user, setUser] = useState(props.user)
  
  const [pieData, setPieData] = useState([["Croissant", 8],["Peanuts", 15], ["Milk", 23],  ["Cheese", 23]])
  const [timeSeriesData, setTimeSeriesData] = useState([])

    useEffect( () => {
      fetchData()

      }, [userData]);
      
      

    const fetchData = async () => {
          const result = await axios(`/api/users/${user}`);
          await console.log('before setting state: axios get', result.data.days)
          setUserData(result.data.days)
          createTimeSeriesData(userData)
    }
    
    let colors = [,,"#666","#b00"]

    const createTimeSeriesData = (userData) => {
      //select the last 4 days
      if (!userData) {fetchData()} else {
        console.log('in create time series:', userData)
        userData.length = 4;
        let foodCheck = 'Cake';
        let allData = [];
        let sleepData = {"name": "sleep", "data": []};
        let energyData = {"name": "energy", "data": []};
        let symptomData = {"name": "symptom", "data": []};
      
        //iterate over each day
        let foodData = {"name": foodCheck, "data": []};
        
        userData.map(day => {
        
        // map the sleep data and date for that day
          day.sleep && sleepData.data.push(([day.date, day.sleep[0].duration]))
        // map the energy data and date for that day  
          day.energy && energyData.data.push([day.date, day.energy.energyLevel])
         //map the symptom data for that day 
          day.symptoms && symptomData.data.push([day.date, day.symptoms[0].intensity])
          //map a type of "food" => then how much was eaten
          day.foods && day.foods.forEach(el => {
            console.log(el.name)
            if(el.name == foodCheck){
              console.log(true)
              foodData.data.push([day.date, 1])
            } else {
              foodData.data.push([day.date, 0])
            }
          })
      
          })
        allData = [sleepData, energyData,symptomData, foodData]
  
        
        return setTimeSeriesData(allData)
      }
      
    }

    console.log('before calling create timeseries: userdata', userData)

  return (
    <div className="charts">
    <h3>Foods associated with strong symptoms</h3>
    <PieChart colors={colors} data={pieData} height="80vh" legend="right"/>
    <h3>Habits and food suspect over time</h3>
    <LineChart data={timeSeriesData} height="80vh" legend="right"/>
  </div>
  )
}
