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
        toggleItem(item.id, 'YOU GOT IT')
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
        editItem(item.id, editedItemName)
        setItemName(editedItemName)
    }
       
    const isEditedFlagTEMPORARY = isEdited ? " " : ""
    const itemGot = isGot ? <strike className = "mr-auto">{getItemName}</strike> : ""

    const isGotBtn = <i className="fas fa-check-square" onClick={handleItemClick} hidden={!isGot}><FontAwesomeIcon icon={faCheckSquare} className="text-success mx-2"/></i>
    const notGotBtn = <i className="far fa-square" onClick={handleItemClick} hidden={isGot}><FontAwesomeIcon icon={faSquare} className = "text-dark mx-2"/></i>
 
    const checkBtn = <i className='fa fa-check' onClick={handleItemEditSubmit} hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faCheck} className="text-success mx-2"/></i>
    const cancelBtn = <i className='fa fa-times' onClick={handleItemEditCancel} hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTimes} className="text-danger mx-2"/></i>

    const editBtn = <i className='fa fa-edit' onClick={handleItemEdit} hidden={isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faEdit} className="text-primary mx-2"/></i>
    const deleteBtn = <i className='fa fa-trash' onClick={handleItemDelete} hidden={isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTrash} className="text-danger mx-2"/></i>

    const editField = <input className="mr-auto input-group-sm p-0 text-wrap" type="text" defaultValue={getItemName} ref={editedItemRef} hidden={!isEditedFlagTEMPORARY}></input>
    const itemNameField = <span className="mr-auto text-wrap" hidden={isEditedFlagTEMPORARY || isGot}>{item.itemName}</span>

    const itemToAdd = (<p className="listItem d-inline-flex align-items-center flex-nowrap w-100 mw-100">{notGotBtn}{isGotBtn}{itemGot}{itemNameField}{editField}{checkBtn}{cancelBtn}{editBtn}{deleteBtn}</p>)
    
    return (
        <div>
            {itemToAdd}         
        </div>
    )
}