import React, { Component } from 'react';
import axios from 'axios';
import TopBar from '../../shared/TopBar';
import BottomNavbar from '../../shared/BottomNavbar';
import SearchField from '../food/SearchField';
import DrinkIngrForm from './DrinkIngrForm';
import DateTimeInput from '../helper-components/DateTimeInput';

export default class AddDrinks extends Component {
  state = {
    user: this.props.user,
    date: this.props.location.state?.day || 
          new Date().toISOString().split('T')[0],
    startTime: this.props.location.state?.element.startTime || 
          new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0,5),
    name: this.props.location.state?.element.ingredients[0].name,
    brand: this.props.location.state?.element.ingredients[0].brand,
    category: this.props.location.state?.element.ingredients[0].category,
    servingAmount: this.props.location.state?.element.ingredients[0].servingAmount,
    servingSize: this.props.location.state?.element.ingredients[0].servingSize,
    // id:this.props.location.state?.drinks._id,
    // editing:this.props.location.state?.editing,
  }
  
  // Functions for search bar
  setQuery = query => {
    this.setState({
      query: query
    })
  }
  handleSearch = event => {
    const filteredIngredients = this.state.ingredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({
      query: event.target.value,
      ingredients: filteredIngredients
    })
  }
// Function for fill out the ingredient form
  handleClick = event => {
    const key = event.target.getAttribute('data-key')
    console.log(key);
    console.log('this.state.ingredients is:', this.state.ingredients)
    const clickedIngredient = this.state.ingredients.filter(ingredient => {
      return ingredient._id === key;
    });
    console.log(clickedIngredient[0])
    this.setState ({
      name: clickedIngredient[0].name,
      brand: clickedIngredient[0].brand,
      category: clickedIngredient[0].category
    })
  }
// Functions for submit form
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value)
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const payload = this.state;
    console.log(payload);
    console.log(this.state.date)
    axios.post(`/api/drinks/user/${this.props.user._id}/day/${this.state.date}`, payload)
      .then(() => {
        this.setState({
          date: '',
          startTime: '',
          servingAmount: '',
          servingSize: '',
          name : '',
          brand: '',
          category: '',
        })
        this.props.history.push("/dashboard")
      })
      .catch(err => console.log(err))
  }

  handleDelete = event => {
    event?.preventDefault();
    // const date = event.target.name;
    // const foodId = event.target.value;
    axios.put(`/api/ingredients/drinks/user/${this.state.user._id}/day/${this.state.date}/${this.state.id}/delete`)
    .then(res => {
      console.log(res);
      this.props.history.push("/dashboard")
    })
    .catch(err=>console.log(err))
  }
  handleEditing = event => {
    event?.preventDefault();
    axios.put( `/api/ingredients/drinks/user/${this.state.user._id}/day/${this.state.date}/${this.state.id}/edit`)
  }
  render() {
    // if (!this.state.ingredients) return <h1>Loading...</h1>
    console.log('this is the user in foodentry', this.state.user)
    console.log(this.props.location)
    return (
      <div>
      
      <TopBar title='Drinks' icon='Drinks'/>
      <div className="pt3 pb6">
        <DateTimeInput date={this.state.date} 
                       startTime={this.state.startTime} 
                       handleChange={this.state.handleChange}/>
        <SearchField {...this.state} 
                    query={this.state.query} 
                    setQuery={this.setQuery} />
        
        <DrinkIngrForm {...this.state} handleChange={this.handleChange} 
                                        handleSubmit={this.handleSubmit} 
                                        handleClick={this.handleClick} 
                                        handleEditing={this.handleEditing} 
                                        handleDelete={this.handleDelete}/>
      </div>
      <BottomNavbar />
      </div>
    )
  }
}
