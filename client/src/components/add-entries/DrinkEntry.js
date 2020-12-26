import React, { Component } from 'react';
import axios from 'axios';
import TopBar from '../shared/TopBar';
import BottomNavbar from '../shared/BottomNavbar';
import Icons from '../shared/Icons';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import IngredientList from './IngredientList'
import AddIngDrink from './AddIngDrink';
export default class AddDrinks extends Component {
  state = {
    // this is the loggedin user from App.js
    user: this.props.user,
    days: [],
    ingredients: [],
    ingredientsOfDay: [],
    name: this.props.location.state?.drinks.ingredients[0].name,
    brand: this.props.location.state?.drinks.ingredients[0].brand,
    category: this.props.location.state?.drinks.ingredients[0].category,
    date: this.props.location.state?.day ||new Date().toISOString().split('T')[0],
    startTime: this.props.location.state?.drinks.ingredients[0].startTime ||new Date().toISOString().split('T')[1].slice(0,5),
    servingAmount: this.props.location.state?.drinks.ingredients[0].servingAmount,
    servingSize: this.props.location.state?.drinks.ingredients[0].servingSize,
    selectedIngredient: false,
    ingredientCount: 0,
    query: '',
    id:this.props.location.state?.drinks._id,
    editing:this.props.location.state?.editing,
  }
  // Get initial ingredients data
  getAllIngredients = () => {
    axios.get('/api/ingredients')
     .then(response => {
       console.log(response.data);
       this.setState({
          ingredients: response.data
       })
     })
     .catch(err => {
       console.log(err.response)
     })
  }
  componentDidMount = () => {
    this.getAllIngredients()
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
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const payload = this.state;
    console.log(payload);
    console.log(this.state.date)
    axios.post(`/api/ingredients/drinks/user/${this.props.user._id}/day/${this.state.date}`, payload)
      .then(() => {
        // set the form to it's initial state (empty input fields)
        this.setState({
          date: '',
          startTime: '',
          servingAmount: '',
          servingSize: '',
          name : '',
          brand: '',
          category: '',
          ingredientCount: ++this.state.ingredientCount
        })
        this.props.history.push("/dashboard")
        // update the parent components state (in Projects) by calling getData()
        // this.props.getData();
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
    if (!this.state.ingredients) return <h1>Loading...</h1>
    console.log('this is the user in foodentry', this.state.user)
    console.log(this.props.location)
    return (
      <div>
      {/* Top Navbar */}
      <TopBar title='Drinks' icon='Drinks'/>
      <div className="pt3 pb6">
        <form onSubmit={this.handleSubmit}>
          <div className="mv3 flex justify-center items-center">
                <label htmlFor="date" className="f6">Date:</label>
                <input type="date" id="date"
                      name="date" value={this.state.date}
                  onChange={this.handleChange}
                  className="f6 pa1 mr3 ml1 w4"
                />
                <label htmlFor="startTime" className="f6">Time:</label>
                <input type="time" id="startTime"
                    name="startTime" value={this.state.startTime}
                  onChange={this.handleChange}
                  className="f6 pa1 mr3 ml1"
                />
              </div>
          </form>
      <SearchField {...this.state} query={this.state.query} setQuery={this.setQuery} />
      <IngredientList {...this.state} query={this.state.query} setQuery={this.setQuery} handleClick={this.handleClick}/>
      <AddIngDrink {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleClick={this.handleClick} handleEditing={this.handleEditing} handleDelete={this.handleDelete}/>
      <Link className="link blue hover-silver dib mh3 tc" style={{
        "display": "flex", "flexDirection":"row", "justifyContent": "center", "alignItems":"center"}}>
      <Icons icon="FoodsDetails"/>
      <span className="f6 db" style={{"marginLeft": "10px"}}>{this.state.ingredientCount} drinks added</span>
      </Link>
      {/* Bottom navbar */}
      </div>
      <BottomNavbar />
      </div>
    )
  }
}
