import React, { useState, useRef, useEffect } from 'react';
import ShoppingList from './ShoppingList';
import uuidv4 from 'uuid/v4';
import 'bootstrap/dist/css/bootstrap.min.css';
import bakeryIcon from "./images/bakery_icon.png";
import breadIcon from "./images/bread_icon.png";
import cansIcon from "./images/cans_icon.png";
import dairyIcon from "./images/dairy_icon.png";
import deliIcon from "./images/deli_icon.png";
import freezerIcon from "./images/freezer_icon.png";
import householdIcon from "./images/household_icon.png";
import meatIcon from "./images/meat_icon.png";
import produceIcon from "./images/produce_icon.png";


const LOCAL_STORAGE_KEY = 'shoppingApp.item'

function App() {
  const [item, setItems] = useState([])  // we will get rid of this
  const [itemLists, setItemLists] = useState({
    'Bakery': [],
    'Bread': [],
    'Cans': [],
    'Dairy': [],
    'Deli': [],
    'Frozen': [],
    'Household': [],
    'Meat': [],
    'Produce': [],
  })
  const itemNameRef = useRef()
  const itemListRef = useRef()
  const iconStyle = {height: "2rem", width: "2rem", marginRight: ".5rem"}
  
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(item))
  }, [item])

  function toggleItem(id, listName, itemName) {
    setItemLists( prevItems => {
      const copyPrevItems = {...prevItems}
      //const currentList = copyPrevItems[listName]
      //const itemIndex = currentList.findIndex(item => item.id === id)
      console.log(itemName)
      return copyPrevItems;
    })
  }

  /*function toggleItem(id) {
    const newItems = [...item]
    const items = newItems.find(item => item.id === id)
    items.got = !items.got
    setItems(newItems)
  }
  */
  function deleteItem(id, listName) {

    setItemLists( prevItems => {
      // Step 1: get the WHOLE data structure from the state hook getter and clone it 
      const copyPrevItems = {...prevItems}
      // Step 2: modify the (shallow) copied data structure
      const currentList = copyPrevItems[listName]
      const itemIndex = currentList.findIndex(item => item.id === id)
      currentList.splice(itemIndex, 1)
      // Step 3: return the modified data structure
      return copyPrevItems;
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
      currentList[itemIndex].isEdited = !currentList[itemIndex].isEdited;
      // Step 3: If you finished editing, then change the name
      // (when the item is not edited anymore --> isEdited property is changed to false)
      if ( !currentList[itemIndex].isEdited ) {
        currentList[itemIndex].itemName = newItemName
      }
      // Step 4: return the modified data structure
      return copyPrevItems;
    })
  }


  /*
    TODO for making Edit work
      1. In Item.js, render a textfield when you see EDITING
      2. Make this textfield in Item.js a stateful controlled component 
  */

  function handleAddItem(event) {
    event.preventDefault();

    const itemName = itemNameRef.current.value
    const itemListName = itemListRef.current.value
    if (itemName === '') return 

    setItemLists( prevItems => {
      const copyPrevItems = {...prevItems};
      const newValue = {id: uuidv4(), itemName: itemName, complete: false, isEdited: false};
      copyPrevItems[itemListName].push( newValue );
      return copyPrevItems;
    })

    // DELETE THIS LATER ALONG WITH THE setItems useState hook
    /*
    setItems(prevItems => {
      return [...prevItems, {id: uuidv4(), itemName: itemName, complete: false}]
    }) */

    itemNameRef.current.value = null
    itemListRef.current.value = ""  // Set it to a proper value
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
              <option value="Bread"> Bread</option>
              <option value="Cans"> Cans</option>
              <option value="Dairy"> Dairy</option>
              <option value="Deli"> Deli</option>
              <option value="Frozen"> Frozen</option>
              <option value="Household"> Household</option>
              <option value="Meat"> Meat</option>
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

      <ShoppingList item={item} toggleItem={toggleItem} deleteItem={deleteItem} />

      <div className="card-deck-wrapper">
      <div className="card-columns">

        <div className="card">
          <div className="card-header bg-info text-white" id="bakery">
            <img src={bakeryIcon} className="list-icon" alt="clipart of bread" style={iconStyle}></img>
            Bakery      
          </div>
          <div className="card-body" id="bakeryList" title="Bakery">
            <ShoppingList item={itemLists['Bakery']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Bakery')} editItem={(id, name) => toggleEditItem(id, name, 'Bakery')} />
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="bread">
            <img src={breadIcon} className="list-icon" alt="clipart of bread" style={iconStyle}></img>
            Bread
          </div>
          <div className="card-body" id="breadList">
          <ShoppingList item={itemLists['Bread']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Bread')} editItem={(id, name) => toggleEditItem(id, name, 'Bread')} />
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="cannedgood">
            <img src={cansIcon} className="list-icon" alt="clipart of canned good" style={iconStyle}></img>
            Cans
          </div>
          <div className="card-body" id="cannedgoodList">
            <ShoppingList item={itemLists['Cans']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Cans')} editItem={(id, name) => toggleEditItem(id, name, 'Cans')} />
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="dairy">
            <img src={dairyIcon} className="list-icon" alt="clipart of cheese" style={iconStyle}></img>
            Dairy
          </div>
          <div className="card-body" id="dairyList">
          <ShoppingList item={itemLists['Dairy']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Dairy')} editItem={(id, name) => toggleEditItem(id, name, 'Dairy')} />
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="deli">
            <img src={deliIcon} className="list-icon" alt="clipart of sandwich" style={iconStyle}></img>
            Deli
          </div>
          <div className="card-body" id="deliList">
          <ShoppingList item={itemLists['Deli']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Deli')} editItem={(id, name) => toggleEditItem(id, name, 'Deli')} />
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="frozen">
            <img src={freezerIcon} className="list-icon" alt="clipart of snowflake" style={iconStyle}></img>
            Frozen
          </div>
          <div className="card-body" id="frozenList">
            <ShoppingList item={itemLists['Frozen']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Frozen')} editItem={(id, name) => toggleEditItem(id, name, 'Frozen')} />
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="household">
            <img src={householdIcon} className="list-icon" alt="clipart of cleaning items" style={iconStyle}></img>
            Household
          </div>
          <div className="card-body" id="householdList">
            <ShoppingList item={itemLists['Household']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Household')} editItem={(id, name) => toggleEditItem(id, name, 'Household')} />
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="meat">
            <img src={meatIcon} className="list-icon" alt="clipart of steak" style={iconStyle}></img>
            Meat
          </div>
          <div className="card-body" id="meatList">
          <ShoppingList item={itemLists['Meat']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Meat')} editItem={(id, name) => toggleEditItem(id, name, 'Meat')} />
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="produce">
            <img src={produceIcon} className="list-icon" alt="clipart of broccoli" style={iconStyle}></img>
            Produce      
          </div>
          <div className="card-body" id="produceList">
          <ShoppingList item={itemLists['Produce']} toggleItem={toggleItem} deleteItem={id => deleteItem(id, 'Produce')} editItem={(id, name) => toggleEditItem(id, name, 'Produce')} />
          </div>
        </div>
      </div>
      </div>
      </div>
  </>
  )
    
}

export default App;
