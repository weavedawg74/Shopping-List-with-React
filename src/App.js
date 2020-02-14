import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import NavbarShopping from './NavbarShopping'
import ShoppingList from './ShoppingList';
import uuidv4 from 'uuid/v4';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bakeryIcon from "./images/bakery_icon.png";
import cansIcon from "./images/cans_icon.png";
import dairyIcon from "./images/dairy_icon.png";
import deliIcon from "./images/deli_icon.png";
import freezerIcon from "./images/freezer_icon.png";
import householdIcon from "./images/household_icon.png";
import meatIcon from "./images/meat_icon.png";
import produceIcon from "./images/produce_icon.png";
import hygieneIcon from "./images/hygiene_icon.png";
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
    'Frozen': [],
    'Household': [],
    'Hygiene': [],
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
    setItemLists( prevItems => {
      const copyPrevItems = {...prevItems}
      const currentList = copyPrevItems[listName]
      const itemIndex = currentList.findIndex(item => item.id === id)
      currentList[itemIndex].isEdited = !currentList[itemIndex].isEdited
      if ( !currentList[itemIndex].isEdited ) {
        currentList[itemIndex].itemName = newItemName
      }
      return copyPrevItems
    })
  }

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
    itemListRef.current.value = itemListName
  }

  return (
    <>
     
      <div className="container">
      <NavbarShopping />
      <form id="submitform">
        <div className="form-row mt-4 mb-4"> 
          <div className="col col-6 col-sm-6	col-md-6	col-lg-6	col-xl-6"> 
            <div className="md-form mt-0">
              <input type="text" className="form-control" placeholder="Type in your item" id="textarea" ref={itemNameRef}></input>
            </div>
          </div>

          <div className="col col-4 col-sm-4	col-md-4 col-lg-4	col-xl-4"> 

            <select className="browser-default custom-select" id="selectedOption" ref={itemListRef}>
              <option value="" disabled>Select your option</option>
              <option value="Bakery"> Bakery</option>
              <option value="Beverage"> Beverage</option>
              <option value="Cans"> Cans</option>
              <option value="Condiments"> Condiments</option>
              <option value="Dairy"> Dairy</option>
              <option value="Deli"> Deli</option>
              <option value="Frozen"> Frozen</option>
              <option value="Household"> Household</option>
              <option value="Hygiene"> Hygiene</option>
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

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="bakery">
            <img src={bakeryIcon} className="list-icon" alt="clipart of bread" style={iconStyle}></img>
            Bakery      
          </div>
          <div className="card-body" id="bakeryList" title="Bakery">
            <ShoppingList item={itemLists['Bakery']} toggleItem={id => toggleItem(id, 'Bakery')} deleteItem={id => deleteItem(id, 'Bakery')} editItem={(id, name) => toggleEditItem(id, name, 'Bakery')}/>
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="beverage">
            <img src={beverageIcon} className="list-icon" alt="clipart of a drink" style={iconStyle}></img>
            Beverage      
          </div>
          <div className="card-body" id="beverageList">
            <ShoppingList item={itemLists['Beverage']} toggleItem={id => toggleItem(id, 'Beverage')} deleteItem={id => deleteItem(id, 'Beverage')} editItem={(id, name) => toggleEditItem(id, name, 'Beverage')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="cannedgood">
            <img src={cansIcon} className="list-icon" alt="clipart of canned good" style={iconStyle}></img>
            Cans
          </div>
          <div className="card-body" id="cannedgoodList">
            <ShoppingList item={itemLists['Cans']} toggleItem={id => toggleItem(id, 'Cans')} deleteItem={id => deleteItem(id, 'Cans')} editItem={(id, name) => toggleEditItem(id, name, 'Cans')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="condiments">
            <img src={condimentsIcon} className="list-icon" alt="clipart of ketchup and mustard" style={iconStyle}></img>
            Condiments      
          </div>
          <div className="card-body" id="condimentsList">
            <ShoppingList item={itemLists['Condiments']} toggleItem={id => toggleItem(id, 'Condiments')} deleteItem={id => deleteItem(id, 'Condiments')} editItem={(id, name) => toggleEditItem(id, name, 'Condiments')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="dairy">
            <img src={dairyIcon} className="list-icon" alt="clipart of cheese" style={iconStyle}></img>
            Dairy
          </div>
          <div className="card-body" id="dairyList">
          <ShoppingList item={itemLists['Dairy']} toggleItem={id => toggleItem(id, 'Dairy')} deleteItem={id => deleteItem(id, 'Dairy')} editItem={(id, name) => toggleEditItem(id, name, 'Dairy')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="deli">
            <img src={deliIcon} className="list-icon" alt="clipart of sandwich" style={iconStyle}></img>
            Deli
          </div>
          <div className="card-body" id="deliList">
          <ShoppingList item={itemLists['Deli']} toggleItem={id => toggleItem(id, 'Deli')} deleteItem={id => deleteItem(id, 'Deli')} editItem={(id, name) => toggleEditItem(id, name, 'Deli')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="frozen">
            <img src={freezerIcon} className="list-icon" alt="clipart of snowflake" style={iconStyle}></img>
            Frozen
          </div>
          <div className="card-body" id="frozenList">
            <ShoppingList item={itemLists['Frozen']} toggleItem={id => toggleItem(id, 'Frozen')} deleteItem={id => deleteItem(id, 'Frozen')} editItem={(id, name) => toggleEditItem(id, name, 'Frozen')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="household">
            <img src={householdIcon} className="list-icon" alt="clipart of cleaning items" style={iconStyle}></img>
            Household
          </div>
          <div className="card-body" id="householdList">
            <ShoppingList item={itemLists['Household']} toggleItem={id => toggleItem(id, 'Household')} deleteItem={id => deleteItem(id, 'Household')} editItem={(id, name) => toggleEditItem(id, name, 'Household')} />
          </div>
        </div>
        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="hygiene">
            <img src={hygieneIcon} className="list-icon" alt="clipart of hygiene" style={iconStyle}></img>
            Hygiene      
          </div>
          <div className="card-body" id="hygieneList">
            <ShoppingList item={itemLists['Hygiene']} toggleItem={id => toggleItem(id, 'Hygiene')} deleteItem={id => deleteItem(id, 'Hygiene')} editItem={(id, name) => toggleEditItem(id, name, 'Hygiene')} />
          </div>   
        </div>
        
        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="meat">
            <img src={meatIcon} className="list-icon" alt="clipart of steak" style={iconStyle}></img>
            Meat
          </div>
          <div className="card-body" id="meatList">
          <ShoppingList item={itemLists['Meat']} toggleItem={id => toggleItem(id, 'Meat')} deleteItem={id => deleteItem(id, 'Meat')} editItem={(id, name) => toggleEditItem(id, name, 'Meat')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="pet">
            <img src={petIcon} className="list-icon" alt="clipart of dog and cat" style={iconStyle}></img>
            Pet      
          </div>
          <div className="card-body" id="petList">
            <ShoppingList item={itemLists['Pet']} toggleItem={id => toggleItem(id, 'Pet')} deleteItem={id => deleteItem(id, 'Pet')} editItem={(id, name) => toggleEditItem(id, name, 'Pet')} />
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-info text-white fa-lg" id="produce">
            <img src={produceIcon} className="list-icon" alt="clipart of broccoli" style={iconStyle}></img>
            Produce      
          </div>
          <div className="card-body" id="produceList">
          <ShoppingList item={itemLists['Produce']} toggleItem={id => toggleItem(id, 'Produce')} deleteItem={id => deleteItem(id, 'Produce')} editItem={(id, name) => toggleEditItem(id, name, 'Produce')} />
          </div>
        </div>
      </div>
      </div>
      <Navbar />
      </div>
  </>
  )
    
}

export default App;
