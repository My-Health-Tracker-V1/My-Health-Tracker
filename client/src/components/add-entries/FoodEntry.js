import axios from 'axios';
import React, { Component } from 'react';
import TopBar from '../shared/TopBar';
import BottomNavbar from '../shared/BottomNavbar';
import DateTimeInput from './DateTimeInput';
import AddIngredient from './AddIngredient';
import SearchField from './SearchField'
import AddIgt from './AddIgt';
import '../add-entries/FoodEntry.css'

export default class FoodEntry extends Component {
  state = {
    user: this.props.user,
    date: this.props.location.state?.day ||new Date().toISOString().split('T')[0],
    ingredients: [],
    tempStartTime: "",
    tempIngredient: {
      name: "",
      brand: "",
      category: "",
      servingAmount: "",
      servingSize: ""
    },
    food: {
      startTime: '',
      name: '',
      portion: '',
      eatenPortion: '',
      ingredients: [
      ]
    },
    selectedIngredient: false,
    handleShowSingle: true,
    ingredientCount: 0,
    query: ''
  }

  getIngredientsFromEdamam = () => {
    axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=apple&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`)
     .then(res => {
       console.log(res.data);
       this.setState({
         ingredients: res.data.hints
       })   
     })
     .catch(err => {
        console.log(err.response)
     })
  }
  componentDidMount = () => {
    this.getIngredientsFromEdamam();
  }
  // Function for fill out the ingredient form
  handleClick = event => {
    event.preventDefault();
    const key = event.target.getAttribute('data-key')
    console.log(key);
    console.log('this.state.ingredients is:', this.state.ingredients)
    const clickedIngr = this.state.ingredients.find(ingredient => ingredient.food.foodId === key);
    const newTempIngredient = this.state.tempIngredient;
    newTempIngredient.name = clickedIngr.food.label;
    newTempIngredient.brand = clickedIngr.food.brand;
    newTempIngredient.category = clickedIngr.food.category;
    this.setState ({
      tempIngredient: newTempIngredient
    })
    console.log(this.state.tempIngredient);
  }

  setQuery = query => {
    this.setState({
      query: query
    })
  }

  handleSearch = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

// handle query
  handleQuery = (event) => {
    event?.preventDefault();
    console.log(this.state.query)
    axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${this.state.query}&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`)
    .then(res => {
      console.log(res.data);
      this.setState({
        query: event.target.value,
        ingredients: res.data.hints
      })   
    })
    .catch(err => {
      console.log(err.response)
    })
  }
// Functions for toggle Recipe
  toggleRecipe = () => {
    this.setState({
      handleShowSingle: false,
      ingredientCount: 0
    })
  }
  toggleSingle = () => {
    this.setState({
      handleShowSingle: true,
      ingredientCount: 0
    })
  }
  // Functions for submit form
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
      console.log(this.state.food);
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
  
  handleSingleSubmit = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.portion = 1;
    newFood.eatenPortion = 1;
    newFood.ingredients = [this.state.tempIngredient];
    newFood.name = newFood.ingredients[0].name;
    newFood.startTime = this.state.tempStartTime;
    this.setState({
      food: newFood
    })
    const payload = {
      user: this.state.user,
      date: this.state.date,
      food: this.state.food
    };
    console.log(payload);
    axios.post(`/api/ingredients/user/${this.props.user._id}/day/${this.state.date}`, payload)
      .then(() => {
        this.setState({
          date: '',
          food: {
            startTime: '',
            name: '',
            portion: 0,
            eatenPortion: 0,
            ingredients: [{
              name: '',
              brand: '',
              category: '',
              servingAmount: 0,
              servingSize: '',
            }]},
          tempIngredient: {
            name: '',
            brand: '',
            category: '',
            servingAmount: 0,
            servingSize: '',
          },
          tempStartTime: '',
          ingredientCount: ++this.state.ingredientCount
        })
        this.props.history.push("/dashboard")
        // update the parent components state (in Projects) by calling getData()
        // this.props.getData();
      })
      .catch(err => console.log(err))
  }

  handleAddButton = () => {
    const addedIngredients = this.state.food.ingredients;
    addedIngredients.push({
      name: this.state.tempIngredient.name,
      brand: this.state.tempIngredient.brand,
      category: this.state.tempIngredient.category,
      servingAmount: this.state.tempIngredient.servingAmount,
      servingSize: this.state.tempIngredient.servingSize,
    })
    this.setState({
      ingredientCount: ++this.state.ingredientCount,
      tempIngredient: {
        name: '',
        brand: '',
        category: '',
        servingAmount: 0,
        servingSize: '',
      }
    })
    console.log(this.state.food);
  }

  handleRecipeSubmit = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.startTime = this.state.tempStartTime;
    this.setState({
      food: newFood
    })
    const payload = {
      user: this.state.user,
      date: this.state.date,
      food: this.state.food
    };
    console.log(payload);
    axios.post(`/api/ingredients/user/${this.props.user._id}/day/${this.state.date}`, payload)
      .then(() => {
        // set the form to it's initial state (empty input fields)
        this.setState({
          date: '',
          food: {
            startTime: '',
            name: '',
            portion: 0,
            eatenPortion: 0,
            ingredients: []},
          tempIngredient: {
            name: '',
            brand: '',
            category: '',
            servingAmount: 0,
            servingSize: '',
          },
          tempStartTime: '',
          ingredientCount: 0
        })
        this.props.history.push("/dashboard")
        // update the parent components state (in Projects) by calling getData()
        // this.props.getData();
      })
      .catch(err => console.log(err))
  }

// Function to get the user day history
    getAllDaysFromUser = () => {
      axios.get(`/api/days/user/${this.state.user._id}`)
      .then(response => {
          console.log(response.data)
          this.setState({
            days: response.data
          })
      })
    }
// delete
    handleDelete = event => {
      event?.preventDefault();
      // const date = event.target.name;
      // const foodId = event.target.value;
      axios.put(`/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${this.state.id}/delete`)
      .then(res => {
        console.log(res);
        this.props.history.push("/dashboard")
      })
      .catch(err=>console.log(err))
    }
    
    handleEditing = event => {
      event?.preventDefault();
      console.log('this is props', this.props);
      const newFood = this.state.food;
      newFood.startTime = this.state.tempStartTime;
      this.setState({
        food: newFood
      })
      const payload = {
        user: this.state.user,
        date: this.state.date,
        food: this.state.food
      };
      axios.put(`/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${this.state.id}/edit`, 
      payload)
      .then(res => {
        console.log('hallo');
        this.props.history.push("/dashboard")
      })
      .catch(err=>console.log(err))
    }
  
  render() {
    
    return (
      <div>
        <TopBar title="Foods" icon="Foods" /> 

        {/* <Buttons /> */}
        <DateTimeInput {...this.state} handleChange={this.handleChange} 
        handleSubmit={this.handleRecipeSubmit}/>
        
        <div className="food-container">
          <SearchField {...this.state} handleSearch={this.handleSearch} handleQuery={this.handleQuery}/>
          <AddIngredient {...this.state} handleClick={this.handleClick} 
          setQuery={this.setQuery} 
          handleSearch={this.handleSearch}
          handleQuery={this.handleQuery}
          />
          <AddIgt AddIgt {...this.state} handleChange={this.handleChange} 
          handleSubmit={this.handleSingleSubmit} 
          handleDelete={this.handleDelete} 
          handleEditing={this.handleEditing}/>
        </div>
        <BottomNavbar {...this.state} />
      </div>
    )
  }
}
