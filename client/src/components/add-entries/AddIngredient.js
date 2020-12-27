import React, { Component } from 'react';
import SearchField from './SearchField';
import axios from 'axios'
import TopBar from '../shared/TopBar';
import Buttons from './Buttons';

export default class AddFood extends Component {
  state = {
    ingredients: [],
    query: '',
    selectedIngr: []
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

  setQuery = query => {
    this.setState({
      query: query
    })
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleQuery = (event) => {
    event.preventDefault();
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

  render() {

    // const filteredIngredients = this.state.ingredients.filter(ingredient => 
    //   ingredient.name.toLowerCase().includes(this.state.query.toLowerCase())
    // );

    return (
      <div>
        <TopBar title="Foods" icon="Foods"/>
        <Buttons />

        <SearchField {...this.state} handleChange={this.handleChange} handleQuery={this.handleQuery}/>

       <h4>Selected Ingredients</h4>
       <div>

       </div>
       <h4>Suggested Ingredients</h4>
        <div className="list pa3 ml0 center mw12 ba b--light-silver br3" style={{height:"400px", width: "70%", overflow: "hidden", overflowY: "scroll", border:"solid 1px #ccc"}} >
        {
        this.state.ingredients.map(ingredient => {
          return (
            <article className="dt w-100 bb b--black-05 pb2 mt2">
                <div className="dtc w2 w3-ns v-mid">
                  <img src={ingredient.food.image} className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"/>
                </div>
                <div className="dtc v-mid pl3">
                  <h3 className="f6 f5-ns fw6 lh-title black mv0">{ingredient.food.label} </h3>
                  <h4 className="f6 fw4 mt0 mb0 black-60">{ingredient.food.category}</h4>
                </div>
                <div className="dtc v-mid">
                  <form className="w-100 tr">
                    <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" 
                    type="submit"
                    onClick={this.handleClick} key={ingredient.food.foodId} data-key={ingredient.food.foodId}>+ Add</button>
                  </form>
                </div>
              </article>
          )
        })
        }
      </div>
      </div>
    )
  }
}
