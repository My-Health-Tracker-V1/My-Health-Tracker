import { Component } from 'react';

export default class FoodBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      date: props.location.state?.day || new Date().toISOString().split('T')[0],
      tempStartTime: props.location.state?.element.startTime || 
                     new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0,5),
      tempIngredient: {
        name: "",
        brand: "",
        category: "",
        servingAmount: "",
        servingSize: ""
      },
      food: {},
      add: false,
      edit: false,
      tempIngId: '',
      selectedIngredient: false,
      handleShowSingle: true,
      query: ''
    }
  }

  capitalizeFirstLetter = string => {
    const splitStr = string.toLowerCase().split(' ');
    for(let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    if(name==='date') {
      this.setState({
        date: value
      })} else if(name==='startTime') {
      this.setState({
        tempStartTime: value
      })
    } else if(name==='recipeName') {
      const newFood = this.state.food;
      newFood.name = value;
      this.setState({
        food: newFood
      })
      
    } else if(name==='eatenPortion') {
      const newFood = this.state.food;
      newFood.eatenPortion = value;
      this.setState({
        food: newFood
      })
    } else if(name==='portion') {
      const newFood = this.state.food;
      newFood.portion = value;
      this.setState({
        food: newFood
      })
    } else {
      const newIngredient = this.state.tempIngredient;
      newIngredient[name] = value;
      this.setState({
        tempIngredient: newIngredient
      });
    };
  }
}