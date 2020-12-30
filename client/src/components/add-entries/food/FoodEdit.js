import axios from 'axios';
import React, { Component } from 'react';
import TopBar from '../../shared/TopBar';
import BottomNavbar from '../../shared/BottomNavbar';
import IngrForm from './IngrForm';
import DateTimeInput from '../helper-components/DateTimeInput'
import RepForm from './RepForm';

export default class FoodEdit extends Component {
  state = {
    user: this.props.user,
    date: this.props.location.state?.day || new Date().toISOString().split('T')[0],
    ingredients: [],
    tempStartTime: this.props.location.state?.element.startTime || new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0,5),
    tempIngredient: {
      name: "",
      brand: "",
      category: "",
      servingAmount: "",
      servingSize: ""
    },
    food: this.props.location.state.element,
    editing: true,
    add: false,
    edit: false,
    tempIngId: '',
    selectedIngredient: false,
    handleShowSingle: true,
    ingredientCount: 0,
    query: ''
  }

  // Get initial ingredients data
  // getAllIngredients = () => {
  //   axios.get('/api/ingredients')
  //    .then(response => {
  //      console.log(response.data);
  //      this.setState({
  //         ingredients: response.data
  //      })
  //    })
  //    .catch(err => {
  //      console.log(err.response)
  //    })
  // }

  // componentDidMount = () => {
  //   this.getAllIngredients();
  // }

  // // Functions for search bar
  // setQuery = query => {
  //   this.setState({
  //     query: query
  //   })
  // }
  // handleSearch = event => {
  //   const filteredIngredients = this.state.ingredients.filter(ingredient => 
  //     ingredient.name.toLowerCase().includes(event.target.value.toLowerCase())
  //   );
  //   this.setState({
  //     query: event.target.value,
  //     ingredients: filteredIngredients
  //   })
  // }

  // Function for fill out the ingredient form
//   handleClick = event => {
//     const key = event.target.getAttribute('data-key')
//     console.log(key);
//     console.log('this.state.ingredients is:', this.state.ingredients)
//     const clickedIngredient = this.state.ingredients.filter(ingredient => {
//       return ingredient._id === key;
//     });
//     const newTempIngredient = this.state.tempIngredient;
//     newTempIngredient.name = clickedIngredient[0].name;
//     newTempIngredient.brand = clickedIngredient[0].brand;
//     newTempIngredient.category = clickedIngredient[0].category;
//     this.setState ({
//       tempIngredient: newTempIngredient
//     })
//     console.log(this.state.tempIngredient);
//   }

// // Functions for toggle Recipe
//   toggleRecipe = () => {
//     this.setState({
//       handleShowSingle: false,
//       ingredientCount: 0
//     })
//   }
//   toggleSingle = () => {
//     this.setState({
//       handleShowSingle: true,
//       ingredientCount: 0
//     })
//   }

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

  editIngrSave = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.ingredients[this.state.tempIngIdx] = this.state.tempIngredient;
    console.log('hallo')
    this.setState({
      food: newFood,
      edit: false,
      tempIngId: '',
      tempIngredient: {
        name: '',
        brand: '',
        category: '',
        servingAmount: 0,
        servingSize: '',
      }
    })
  }

  addNewIngrSave = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.ingredients.push(this.state.tempIngredient);
    this.setState({
      food: newFood,
      add: false
    })
  }
  

  saveIngr2Rep = () => {
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

    editRecipeSubmit = event => {
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
        })
        .catch(err => console.log(err))
    }

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
      const ingIdx = event.target.getAttribute('data-key');
      const newFood = this.state.food;
      newFood.ingredients.splice(ingIdx, 1);
      this.setState({
        food: newFood
      });
    }
    handleDeleteFood = event => {
      event?.preventDefault();
      const foodId = event.target.getAttribute('data-key');
      axios.put(`/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${foodId}/delete`)
      .then(res => {
        console.log(res);
        this.props.history.push("/dashboard")
      })
      .catch(err=>console.log(err))
    }
// toggle
    toggleAddIngr = event => {
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
    toggleEditIngr = event => {
      event?.preventDefault();
      const ingIdx = event.target.getAttribute('data-key');
      console.log(ingIdx);
      const tempIng = Object.assign( {}, this.state.food.ingredients[ingIdx]);
      this.setState({
        edit: true,
        tempIngredient: tempIng,
        tempIngIdx: ingIdx
      })
    }
  
    render() {
      // let editInterface;
      // if(this.state.edit === true){
      //   editInterface = (
      //     <div>
      //       <IngrForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSingleSubmit}/>    
      //     </div>
      //   )
      // } else {
      //   editInterface = (
      //     <div>
            
      //     </div>
      //   )
      // }
      // let addInterface;
      // if(this.state.add === true){
      //   addInterface = (
      //     <div>
      //       <IngrForm {...this.state} handleChange={this.handleChange} 
      //       handleSubmit={this.handleAddSubmit}
      //       handleEdit={this.handleEdit}
      //       /> 
      //     </div>
      //   )
      // } else {
      //   addInterface = (
      //     <div>
            
      //     </div>
      //   )
      // }
      return (
        <div>
        <TopBar icon="Foods" title="Your Foods"/>
        <div className="pb5">
          <DateTimeInput {...this.state} handleChange={this.handleChange} 
          editRecipeSubmit={this.editRecipeSubmit}/>
          <div className="mw6 center" >
          
          <RepForm {...this.state} handleChange={this.handleChange} 
                          saveIngr2Rep={this.saveIngr2Rep}
                          editRecipeSubmit={this.editRecipeSubmit}
                          handleDeleteIngredient={this.handleDeleteIngredient}
                          handleDeleteFood={this.handleDeleteFood} 
                          toggleAddIngr={this.toggleAddIngr}
                          toggleEditIngr={this.toggleEditIngr}
                          editIngrSave={this.editIngrSave}
                          addNewIngrSave={this.addNewIngrSave}
                          />
            {/* {editInterface}
            {addInterface} */}
          </div>
        </div>
        <BottomNavbar />
        </div>
      )
    }
}

