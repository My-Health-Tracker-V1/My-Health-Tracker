import axios from 'axios';
import React, { Component } from 'react';
import TopBar from '../shared/TopBar';
import BottomNavbar from '../shared/BottomNavbar';
import Icons from '../shared/Icons';
import { Link } from 'react-router-dom';
import AddRep from '../add-entries/AddRep';
import AddIgt from '../add-entries/AddIgt';
import SearchField from '../add-entries/SearchField';


export default class FoodEdit extends Component {
  state = {
    // this is the loggedin user from App.js
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
    food: this.props.location.state.food,
    edit: false,
    add: false,
    tempIngId: '',
    selectedIngredient: false,
    handleShowSingle: true,
    ingredientCount: 0,
    query: ''}

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
    this.getAllIngredients();
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
    const newTempIngredient = this.state.tempIngredient;
    newTempIngredient.name = clickedIngredient[0].name;
    newTempIngredient.brand = clickedIngredient[0].brand;
    newTempIngredient.category = clickedIngredient[0].category;
    this.setState ({
      tempIngredient: newTempIngredient
    })
    console.log(this.state.tempIngredient);
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

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
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
    newFood.ingredients[this.state.tempIngIdx] = this.state.tempIngredient;
    this.setState({
      food: newFood,
      edit: false,
      tempIngId: ''
    })
  }

  handleAddSubmit = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.ingredients.push(this.state.tempIngredient);
    this.setState({
      food: newFood,
      add: false
    })
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
    
    const payload = {
      user: this.state.user,
      date: this.state.date,
      food: this.state.food
    };
    console.log(payload);
    axios.put(`/api/ingredients/user/${this.props.user._id}/day/${this.state.date}/${this.state.food._id}/edit`, payload)
      .then(() => {
        this.props.history.push("/dashboard")
        // update the parent components state (in Projects) by calling getData()
        // this.props.getData();
      })
      .catch(err => console.log(err))
  }

// Function for get an array of object and then send it back to server

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
    handleDeleteIngredient = event => {
      event?.preventDefault();
      const ingIdx = event.target.value;
      const newFood = this.state.food;
      newFood.ingredients.splice(ingIdx, 1);
      this.setState({
        food: newFood
      });
    }

    handleDeleteFood = event => {
      event?.preventDefault();
      const foodId = event.target.value;
      axios.put(`/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${foodId}/delete`)
      .then(res => {
        console.log(res);
        this.props.history.push("/dashboard")
      })
      .catch(err=>console.log(err))
    }
    
    handleAdd = event => {
      event?.preventDefault();
      const tempIng = {
        name: "",
        brand: "",
        category: "",
        servingAmount: "",
        servingSize: ""
      };
      this.setState({
        add: true,
        tempIngredient: tempIng
      });
    }

    handleEdit = event => {
      event?.preventDefault();
      const ingIdx = event.target.value;
      const tempIng = Object.assign( {}, this.state.food.ingredients[ingIdx]);
      this.setState({
        edit: true,
        tempIngredient: tempIng,
        tempIngIdx: ingIdx
      })
      
    }
  
    render() {
      let editInterface;
      if(this.state.edit === true){
        editInterface = (
          <div>
            <AddIgt {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSingleSubmit}/>    
          </div>
        )
      } else {
        editInterface = (
          <div>
            
          </div>
        )
      }
      let addInterface;
      if(this.state.add === true){
        addInterface = (
          <div>
            <AddIgt {...this.state} handleChange={this.handleChange} handleSubmit={this.handleAddSubmit}/> 
          </div>
        )
      } else {
        addInterface = (
          <div>
            
          </div>
        )
      }
      return (
        <div>
        <TopBar icon="Foods" title="Your Foods"/>
        <div className="mw6 center" >
         <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
         
          {/* <ul className="list pl0 ml0 center mw5 ba b--light-silver br3" style={{"height":"200px", "width": "60%", "overflow": "hidden", "overflowY": "scroll"}} > */}
          {
            this.state.food.ingredients.map((ingredient, index) => {
              return (
                <div style={{"display":"flex", "flexDirection": "row", "justifyContent":"space-around", "alignItems": "center", "margin": "20px"}}>
               
                <div class="dtc w2 w3-ns v-mid">
                <Icons icon="Foods"/>
                </div>

                <div class="dtc v-mid pl3">
                  <h1 class="f6 f5-ns fw6 lh-title black mv0">{ingredient.name} </h1>
                  <h2 class="f6 fw4 mt0 mb0 black-60">@ {ingredient.brand}</h2>
                </div>

                <div class="dtc v-mid">
                  <form class="w-100 tr">
                  <button onClick={this.handleEdit} value={index} className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-blue ma2">Edit</button>
                  <button onClick={this.handleDeleteIngredient} value={index}  className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-blue ma2">Delete</button>
                </form>
              </div>
               </div>
              )
            })
          }
          </article>
          {/* </ul> */}
          <button onClick={this.handleDeleteFood} value={this.state.food._id} className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-blue">Delete entire recipe</button>
          <button onClick={this.handleAdd} className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-blue">Add new ingredient</button>
          <button onClick={this.handleRecipeSubmit} value={this.state.food._id} className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue">Save</button>
          {editInterface}
          {addInterface}
        </div>
        <BottomNavbar />
        </div>
      )
    }
}

