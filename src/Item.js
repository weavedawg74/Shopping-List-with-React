import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
//import { faSquare } from '@fortawesome/free-solid-svg-icons'
//import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

export default function Item( {item, toggleItem, deleteItem, editItem, isEdited} ) {
    function handleItemClick() {
        toggleItem(item.id)
      }
    function handleItemDelete() {
        deleteItem(item.id)
      }  
    function handleItemEdit() {
        editItem(item.id, 'DUMMY CHANGED VALUE')
    }  
    
    const checkbox = <input type="checkbox" checked={item.got} onChange={handleItemClick} />
    //const uncheckSquare = <FontAwesomeIcon icon={faSquare} className = "text-dark p2 mx-2" />
    //const checkSquare = <FontAwesomeIcon icon={faCheckSquare} className = "text-success p2 mx-2" />
    const isEditedFlagTEMPORARY = isEdited ? "EDITING" : "";
    const itemName = <span className = "mr-auto p-2">{item.itemName}</span>
    const editBtn = <i className='fa fa-edit' onClick={handleItemEdit}><FontAwesomeIcon icon={faEdit} className = "text-primary p2 mx-2"/></i>
    const deleteBtn = <i className='fa fa-trash' onClick={handleItemDelete}><FontAwesomeIcon icon={faTrash} className="text-danger p2 mx-2"/></i>
const itemToAdd = (<p className ="listItem d-inline-flex align-items-center flex-wrap w-100">{checkbox}{itemName}{editBtn}{isEditedFlagTEMPORARY}{deleteBtn}</p>
    )
    return (
        <div>
            {itemToAdd}            
        </div>
    )
}