import React, { useRef, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes} from '@fortawesome/free-solid-svg-icons'


export default function Item( {item, toggleItem, deleteItem, editItem, isEdited, isGot, addEditedItem} ) {
    const editItemRef = useRef()

    function handleItemClick() {
        toggleItem(item.id, 'YOU GOT IT')
    }
    function handleItemDelete() {
        deleteItem(item.id)
      }  
    function handleItemEdit() {
        //const editItemValue = editItemRef.current.value
        editItem(item.id, 'edited')
    }  
    //function handleAddEditedItem() {
    //    const editItemValue = editItemRef.current.value
    //    addEditedItem(item.id, {editItemValue})
    //}

    
    
    const checkbox = <input type="checkbox" checked={item.got} onChange={handleItemClick} />
    const isEditedFlagTEMPORARY = isEdited ? " " : ""
    const checkBtn = <i className='fa fa-check' hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faCheck} className = "text-success p2 mx-2"/></i>
    const cancelBtn = <i className='fa fa-times' onClick={handleItemEdit} hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTimes} className = "text-danger p2 mx-2"/></i>
    const editField = <input type="text" placeholder={item.itemName} ref={editItemRef} hidden={!isEditedFlagTEMPORARY} />
    const itemGot = isGot ? <strike>{item.itemName}</strike> : ""
    const itemName = <span className = "mr-auto p-2" hidden={isEditedFlagTEMPORARY || isGot}>{item.itemName}</span>
    const editBtn = <i className='fa fa-edit' hidden={isEditedFlagTEMPORARY} onClick={handleItemEdit}><FontAwesomeIcon icon={faEdit} className = "text-primary p2 mx-2"/></i>
    const deleteBtn = <i className='fa fa-trash' onClick={handleItemDelete} hidden={isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTrash} className="text-danger p2 mx-2"/></i>
    const itemToAdd = (<p className ="listItem d-inline-flex align-items-center flex-wrap w-100">{checkbox}{itemGot}{itemName}{editField}{checkBtn}{cancelBtn}{editBtn}{deleteBtn}</p>)
    return (
        <div>
            {itemToAdd}         
        </div>
    )
}