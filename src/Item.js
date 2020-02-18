import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'


export default function Item( {item, toggleItem, deleteItem, editItem, isEdited, isGot} ) {
    const editedItemRef = useRef()
    const [getItemName, setItemName] = useState(item.itemName)
    
    function handleItemClick() {
        toggleItem(item.id)
    }
    function handleItemDelete() {
        deleteItem(item.id)
    }  
    function handleItemEdit() {
        editedItemRef.current.value = getItemName
        editItem(item.id)
    }
    function handleItemEditCancel() {
        editItem(item.id, getItemName)
    }  
    function handleItemEditSubmit() {
        let editedItemName = editedItemRef.current.value
        if (editedItemName === '') return
        editItem(item.id, editedItemName)
        setItemName(editedItemName)
    }
       
    const isEditedFlagTEMPORARY = isEdited ? " " : ""
    const itemGot = isGot ? <strike className = "fa-md mr-auto">{getItemName}</strike> : ""

    const isGotBtn = <i className="fas fa-lg fa-check-square" onClick={handleItemClick} hidden={!isGot}><FontAwesomeIcon icon={faCheckSquare} className="text-success mx-2"/></i>
    const notGotBtn = <i className="far fa-lg fa-square" onClick={handleItemClick} hidden={isGot||isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faSquare} className = "text-dark mx-2"/></i>
 
    const checkBtn = <i className='fa fa-lg fa-check' onClick={handleItemEditSubmit} hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faCheck} className="text-success mx-2"/></i>
    const cancelBtn = <i className='fa fa-lg fa-times' onClick={handleItemEditCancel} hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTimes} className="text-danger mx-2"/></i>

    const editBtn = <i className='fa fa-lg fa-edit' onClick={handleItemEdit} hidden={isEditedFlagTEMPORARY||isGot}><FontAwesomeIcon icon={faEdit} className="text-primary mx-2"/></i>
    const deleteBtn = <i className='fa fa-lg fa-trash' onClick={handleItemDelete} hidden={isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTrash} className="text-danger mx-2"/></i>

    const editField = <input className="mr-auto input-group-md p-0 text-wrap col col-6 col-sm-6	col-md-6 col-lg-6 col-xl-6" type="text" defaultValue={getItemName} ref={editedItemRef} hidden={!isEditedFlagTEMPORARY}></input>
    const itemNameField = <span className="mr-auto fa-md text-wrap" hidden={isEditedFlagTEMPORARY || isGot}>{item.itemName}</span>

    const itemToAdd = (<p className="listItem d-inline-flex align-items-center flex-nowrap w-100 mw-100 px-0">{notGotBtn}{isGotBtn}{itemGot}{itemNameField}{editField}{checkBtn}{cancelBtn}{editBtn}{deleteBtn}</p>)
    
    return (
        <div>
            {itemToAdd}         
        </div>
    )
}