import React from 'react'
import { Link } from 'react-router-dom';
import Icons from '../shared/Icons'

export default function DashboardCard(props) {

  function returnCard(element,icon,title,subtitle,subtitleValue,path,specificName) {

    return (
              <div className="flex justify-around items-center mw6 center br3 ba b--light-blue bg-white blue mb2">
                <div className="flex justify-center items-center mv2">
                  <div className='ba br-100 pa2 items-center mv2 gray'>
                    <Icons icon={icon}/>
                  </div>
                  <div className="tl ml2 w4">
                    <p className="pv0 f4 b gray mb1 mt0">{title}</p>
                    {!specificName ? <></> : <p className="f6 gray mv0 i">{specificName}</p>}
                    {!subtitle ? <></> : <p className="f6 gray mv0 ">{subtitle}: {subtitleValue}</p>}
                  </div>
                </div>
                <Link to={{pathname: path, state:{ element: element, editing: true, day:props.day}}} className="link blue hover-silver dib mh3 tc" >
                  <Icons icon="Edit"/>
                </Link>
              </div>
    )
  }

  switch(props.entryType){

    case 'energy':
      return returnCard(props.energy,"Energy3","Energy","Energy level",props.energy.energyLevel,'/add/Energy')

    case 'exercise':
      return props.exercises.map(exercise=>returnCard(exercise,"Exercise3","Exercise","Intensity",exercise.intensityLevel,'/add/Exercise',exercise.name))
    
      case 'symptom':
      return props.symptoms.map(symptom=>returnCard(symptom,"Symptoms3","Symptom","Intensity",symptom.intensity,'/add/Symptoms',symptom.name))

    case 'sleep':
      return props.sleep.map(sleep=>returnCard(sleep,"Sleep3","Sleep","Duration",sleep.duration,'/add/Sleep'))

    case 'food':
      return props.foods.map(food=>returnCard(food,"Foods3","Foods","Portions",food.eatenPortion,'/edit/Foods',food.name))

    case 'drink':
      return props.drinks.map(drink=>returnCard(drink,"Drinks3","Drinks","Portions",drink.servingAmount,'/add/Drinks',drink.name))

  }

}
