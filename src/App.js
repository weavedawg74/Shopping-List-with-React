import React, { useState, useRef, useEffect } from 'react';
import ShoppingList from './ShoppingList';
import uuidv4 from 'uuid/v4';
import 'bootstrap/dist/css/bootstrap.min.css';
import bakeryIcon from "./images/bakery_icon.png";
import cansIcon from "./images/cans_icon.png";
import dairyIcon from "./images/dairy_icon.png";
import deliIcon from "./images/deli_icon.png";
import freezerIcon from "./images/freezer_icon.png";
import householdIcon from "./images/household_icon.png";
import meatIcon from "./images/meat_icon.png";
import produceIcon from "./images/produce_icon.png";
import fishIcon from "./images/fish_icon.png";
import beverageIcon from "./images/beverage_icon.png";
import condimentsIcon from "./images/condiment_icon.png";
import petIcon from "./images/pet_icon.png";


const LOCAL_STORAGE_KEY = 'shoppingApp.itemLists'

function App() {
  //const [item, setItems] = useState([])  // we will get rid of this
  const [itemLists, setItemLists] = useState({
    'Bakery': [],
    'Beverage': [],
    'Cans': [],
    'Condiments': [],
    'Dairy': [],
    'Deli': [],
    'Fish': [],
    'Frozen': [],
    'Household': [],
    'Meat': [],
    'Pet': [],
    'Produce': [],
  })
  const itemNameRef = useRef()
  const itemListRef = useRef()
  const iconStyle = {height: "2rem", width: "2rem", marginRight: ".5rem"}
  
  useEffect(() => {
    const storedItemLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItemLists) setItemLists(storedItemLists)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itemLists))
  }, [itemLists])

  function toggleItem(id, listName) {
    console.log( id, listName )
    setItemLists( prevItems => {
      const copyPrevItems = {...prevItems}
      const currentList = copyPrevItems[listName]
      const itemIndex = currentList.findIndex(item => item.id === id)
      currentList[itemIndex].isGot = !currentList[itemIndex].isGot
      return copyPrevItems
    })
  }

  function deleteItem(id, listName) {
    setItemLists( prevItems => {
      const copyPrevItems = {...prevItems}
      const currentList = copyPrevItems[listName]
      const itemIndex = currentList.findIndex(item => item.id === id)
      currentList.splice(itemIndex, 1)
      return copyPrevItems
    })
  }

  function toggleEditItem(id, newItemName, listName) {
    console.log( id, listName )
    setItemLists( prevItems => {
      // Step 1: get the WHOLE data structure from the state hook getter and clone it 
      const copyPrevItems = {...prevItems}
      // Step 2: modify the (shallow) copied data structure
      const currentList = copyPrevItems[listName]
      const itemIndex = currentList.findIndex(item => item.id === id)
      currentList[itemIndex].isEdited = !currentList[itemIndex].isEdited
      // Step 3: If you finished editing, then change the name
      // (when the item is not edited anymore --> isEdited property is changed to false)
      if ( !currentList[itemIndex].isEdited ) {
        currentList[itemIndex].itemName = newItemName
      }
      // Step 4: return the modified data structure
      return copyPrevItems
    })
  }
  /*
    TODO for making Edit work
      1. In Item.js, render a textfield when you see EDITING
      2. Make this textfield in Item.js a stateful controlled component 
  */

  function handleAddItem(event) {
    event.preventDefault()
    const itemName = itemNameRef.current.value
    const itemListName = itemListRef.current.value
    if (itemName === '') return 
    setItemLists( prevItems => {
      const copyPrevItems = {...prevItems}
      const newValue = {id: uuidv4(), itemName: itemName, complete: false, isEdited: false}
      copyPrevItems[itemListName].push( newValue )
      return copyPrevItems
    })
    itemNameRef.current.value = null
    itemListRef.current.value = ""
  }

  return (
    <>
      <div className="container">
      <nav className="navbar navbar-expand-md bg-primary text-white navbar-dark sticky-top">
        <a className="navbar-brand" href="/#">Shopping List</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#bakery">Bakery</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#bread">Bread</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#cannedgood">Canned Goods</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#dairy">Dairy</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#deli">Deli</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#frozen">Frozen</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#household">Household</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#meat">Meat</a>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#produce">Produce</a>
          </li>
        </ul>
      </div>
      </nav>

      <form id="submitform">
        <div className="form-row mt-4 mb-4"> 
          <div className="col col-6 col-sm-6	col-md-6	col-lg-6	col-xl-6"> 
            <div className="md-form mt-0">
              <input type="text" className="form-control" placeholder="Type in your item" id="textarea" ref={itemNameRef}></input>
            </div>
          </div>

          <div className="col col-4 col-sm-4	col-md-4	col-lg-4	col-xl-4"> 

            <select className="browser-default custom-select" id="selectedOption" ref={itemListRef}>
              <option value="" disabled>Select your option</option>
              <option value="Bakery"> Bakery</option>
              <option value="Beverage"> Beverage</option>
              <option value="Cans"> Cans</option>
              <option value="Condiments"> Condiments</option>
              <option value="Dairy"> Dairy</option>
              <option value="Deli"> Deli</option>
              <option value="Fish"> Fish</option>
              <option value="Frozen"> Frozen</option>
              <option value="Household"> Household</option>
              <option value="Meat"> Meat</option>
              <option value="Pet"> Pet</option>
              <option value="Produce"> Produce </option>
            </select>
          </div>

          <div className="col col-2 col-sm-2	col-md-2	col-lg-2	col-xl-2"> 

            <div className="form-group">
                <button className="btn btn-primary" style={{width: "100%"}} onClick={handleAddItem}>Add</button>
            </div>
          </div>

        </div>

      </form>

     

      <div className="card-deck-wrapper">
      <div className="card-columns">

        <div className="card">
          <div className="card-header bg-info text-white" id="bakery">
            <img src={bakeryIcon} className="list-icon" alt="clipart of bread" style={iconStyle}></img>
            Bakery      
          </div>
          <div className="card-body" id="bakeryList" title="Bakery">
            <ShoppingList item={itemLists['Bakery']} toggleItem={id => toggleItem(id, 'Bakery')} deleteItem={id => deleteItem(id, 'Bakery')} editItem={(id, name) => toggleEditItem(id, name, 'Bakery')}/>
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="beverage">
            <img src={beverageIcon} className="list-icon" alt="clipart of a drink" style={iconStyle}></img>
            Beverage      
          </div>
          <div className="card-body" id="beverageList">
            <ShoppingList item={itemLists['Beverage']} toggleItem={id => toggleItem(id, 'Beverage')} deleteItem={id => deleteItem(id, 'Beverage')} editItem={(id, name) => toggleEditItem(id, name, 'Beverage')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="cannedgood">
            <img src={cansIcon} className="list-icon" alt="clipart of canned good" style={iconStyle}></img>
            Cans
          </div>
          <div className="card-body" id="cannedgoodList">
            <ShoppingList item={itemLists['Cans']} toggleItem={id => toggleItem(id, 'Cans')} deleteItem={id => deleteItem(id, 'Cans')} editItem={(id, name) => toggleEditItem(id, name, 'Cans')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="condiments">
            <img src={condimentsIcon} className="list-icon" alt="clipart of ketchup and mustard" style={iconStyle}></img>
            Condiments      
          </div>
          <div className="card-body" id="condimentsList">
            <ShoppingList item={itemLists['Condiments']} toggleItem={id => toggleItem(id, 'Condiments')} deleteItem={id => deleteItem(id, 'Condiments')} editItem={(id, name) => toggleEditItem(id, name, 'Condiments')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="dairy">
            <img src={dairyIcon} className="list-icon" alt="clipart of cheese" style={iconStyle}></img>
            Dairy
          </div>
          <div className="card-body" id="dairyList">
          <ShoppingList item={itemLists['Dairy']} toggleItem={id => toggleItem(id, 'Dairy')} deleteItem={id => deleteItem(id, 'Dairy')} editItem={(id, name) => toggleEditItem(id, name, 'Dairy')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="deli">
            <img src={deliIcon} className="list-icon" alt="clipart of sandwich" style={iconStyle}></img>
            Deli
          </div>
          <div className="card-body" id="deliList">
          <ShoppingList item={itemLists['Deli']} toggleItem={id => toggleItem(id, 'Deli')} deleteItem={id => deleteItem(id, 'Deli')} editItem={(id, name) => toggleEditItem(id, name, 'Deli')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="fish">
            <img src={fishIcon} className="list-icon" alt="clipart of fish" style={iconStyle}></img>
            Fish      
          </div>
          <div className="card-body" id="fishList">
            <ShoppingList item={itemLists['Fish']} toggleItem={id => toggleItem(id, 'Fish')} deleteItem={id => deleteItem(id, 'Fish')} editItem={(id, name) => toggleEditItem(id, name, 'Fish')} />
          </div>   
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="frozen">
            <img src={freezerIcon} className="list-icon" alt="clipart of snowflake" style={iconStyle}></img>
            Frozen
          </div>
          <div className="card-body" id="frozenList">
            <ShoppingList item={itemLists['Frozen']} toggleItem={id => toggleItem(id, 'Frozen')} deleteItem={id => deleteItem(id, 'Frozen')} editItem={(id, name) => toggleEditItem(id, name, 'Frozen')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="household">
            <img src={householdIcon} className="list-icon" alt="clipart of cleaning items" style={iconStyle}></img>
            Household
          </div>
          <div className="card-body" id="householdList">
            <ShoppingList item={itemLists['Household']} toggleItem={id => toggleItem(id, 'Household')} deleteItem={id => deleteItem(id, 'Household')} editItem={(id, name) => toggleEditItem(id, name, 'Household')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="meat">
            <img src={meatIcon} className="list-icon" alt="clipart of steak" style={iconStyle}></img>
            Meat
          </div>
          <div className="card-body" id="meatList">
          <ShoppingList item={itemLists['Meat']} toggleItem={id => toggleItem(id, 'Meat')} deleteItem={id => deleteItem(id, 'Meat')} editItem={(id, name) => toggleEditItem(id, name, 'Meat')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="pet">
            <img src={petIcon} className="list-icon" alt="clipart of dog and cat" style={iconStyle}></img>
            Pet      
          </div>
          <div className="card-body" id="petList">
            <ShoppingList item={itemLists['Pet']} toggleItem={id => toggleItem(id, 'Pet')} deleteItem={id => deleteItem(id, 'Pet')} editItem={(id, name) => toggleEditItem(id, name, 'Pet')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="produce">
            <img src={produceIcon} className="list-icon" alt="clipart of broccoli" style={iconStyle}></img>
            Produce      
          </div>
          <div className="card-body" id="produceList">
          <ShoppingList item={itemLists['Produce']} toggleItem={id => toggleItem(id, 'Produce')} deleteItem={id => deleteItem(id, 'Produce')} editItem={(id, name) => toggleEditItem(id, name, 'Produce')} />
          </div>
        </div>
      </div>
      </div>
      </div>
  </>
  )
    
}

export default App;
