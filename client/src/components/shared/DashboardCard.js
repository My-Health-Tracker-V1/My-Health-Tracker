import React from 'react'

export default function DashboardCard(props) {

  switch(props.entryType){
    case 'energy':
      break;
    case 'exercise':
      break;
    case 'symptom':
      break;
    case 'sleep':
      break;
    case 'food':
      break;
    case 'drink':
      break;
  }

  return (
    <div className="pt5">
      I'm a card
    </div>
  )
}
