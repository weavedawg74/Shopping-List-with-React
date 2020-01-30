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
  const [item, setItems] = useState([])
  const setEditItemText = useState('')
  const setEditItem = useState(false)
  const currentText = useState()
  const [itemNameRef, itemListRef] = useRef()
  const iconStyle = {
    height: "2rem",
    width: "2rem", 
    marginRight: ".5rem"
  }

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(item))
  }, [item])

  //function handleDeleteItem(e) {
    // e.target.dataset.itemId
    // when you add an item, you have to add a data-itemId attribute to the delete button <button data-itemId="...">... 
    // pass down the handleDeleteItem handler as props to the child components
    // in the child component, use the handler e => props.handleDeleteItem(e)
    // modify your model such that you have a unique id for each item you have
    //{ value: 'cheesecake', key:0}  <---- research React keys and rendering lists (especially deleting list items)
  //}
  function toggleItem(id) {
    const newItems = [...item]
    const items = newItems.find(item => item.id === id)
    items.got = !items.got
    setItems(newItems)
  }

  function editItem(id) {
    state = {
      value: {itemName},
      isInEditMode: false
    }

    function changeEditMode ({
      setState ({
        isInEditMode: state.isInEditMode
      })
    })
    function renderEditView {
      return <div>
          <input type="text" defaultValue={itemName}/>
        </div>
    }
    function render() {
      return state.isInEditMode ? 
      :
      <div onDoubleCLick={changeEditMode}>{state.value}</div>
    }
  }

  function deleteItem(id) {
    const itemId = item.id
    const itemList = [...item]
    itemList.splice(itemId, 1)
    setItems(itemList)
  }

  function handleAddItem(e) {
    const itemName = itemNameRef.current.value
    if (itemName === '') return
    setItems(prevItems => {
      return [...prevItems, {id: uuidv4(), itemName: itemName, complete: false}]
    })
    itemNameRef.current.value = null
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
              <option value="" disabled>Choose your option</option>
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

      <ShoppingList item={item} toggleItem={toggleItem} deleteItem={deleteItem} editItem={editItem} />

      <div className="card-deck-wrapper">
      <div className="card-columns">

        <div className="card">
          <div className="card-header bg-info text-white" id="bakery">
            <img src={bakeryIcon} className="list-icon" alt="clipart of bread" style={iconStyle}></img>
            Bakery      
          </div>
          <div className="card-body" id="bakeryList">
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="bread">
            <img src={breadIcon} className="list-icon" alt="clipart of bread" style={iconStyle}></img>
            Bread
          </div>
          <div className="card-body" id="breadList">
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="cannedgood">
            <img src={cansIcon} className="list-icon" alt="clipart of canned good" style={iconStyle}></img>
            Cans
          </div>
          <div className="card-body" id="cannedgoodList">
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info text-white" id="dairy">
            <img src={dairyIcon} className="list-icon" alt="clipart of cheese" style={iconStyle}></img>
            Dairy
          </div>
          <div className="card-body" id="dairyList">
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="deli">
            <img src={deliIcon} className="list-icon" alt="clipart of sandwich" style={iconStyle}></img>
            Deli
          </div>
          <div className="card-body" id="deliList">
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="frozen">
            <img src={freezerIcon} className="list-icon" alt="clipart of snowflake" style={iconStyle}></img>
            Frozen
          </div>
          <div className="card-body" id="frozenList">
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="household">
            <img src={householdIcon} className="list-icon" alt="clipart of cleaning items" style={iconStyle}></img>
            Household
          </div>
          <div className="card-body" id="householdList">
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="meat">
            <img src={meatIcon} className="list-icon" alt="clipart of steak" style={iconStyle}></img>
            Meat
          </div>
          <div className="card-body" id="meatList">
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info text-white" id="produce">
            <img src={produceIcon} className="list-icon" alt="clipart of broccoli" style={iconStyle}></img>
            Produce      
          </div>
          <div className="card-body" id="produceList">
          </div>
        </div>
      </div>
      </div>
      </div>
  </>
  )
    
}

export default App;
