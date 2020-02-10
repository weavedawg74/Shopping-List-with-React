import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes} from '@fortawesome/free-solid-svg-icons'


export default function Item( {item, toggleItem, deleteItem, editItem, isEdited, isGot} ) {
    const editedItemRef = useRef()


    function handleItemClick() {
        toggleItem(item.id, 'YOU GOT IT')
    }
    function handleItemDelete() {
        deleteItem(item.id)
      }  
    function handleItemEdit() {
        editItem(item.id)
    }  
    function handleItemEditCancel() {
    //    let uneditedItemName = uneditedItemRef.current.value
    //    console.log(uneditedItemName)
        editItem(item.id, 'Not Fucking Edited')
    }  
    function handleItemEditSubmit() {
        let editedItemName = editedItemRef.current.value
        editItem(item.id, editedItemName)
    }
   
    
    const isEditedFlagTEMPORARY = isEdited ? " " : ""
    const checkbox = <input type="checkbox" checked={item.got} onChange={handleItemClick} />
    const checkBtn = <i className='fa fa-check' onClick={handleItemEditSubmit}hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faCheck} className = "text-success p2 mx-2"/></i>
    const cancelBtn = <i className='fa fa-times' onClick={handleItemEditCancel} hidden={!isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTimes} className = "text-danger p2 mx-2"/></i>
    const editBtn = <i className='fa fa-edit' onClick={handleItemEdit} hidden={isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faEdit} className = "text-primary p2 mx-2"/></i>
    const deleteBtn = <i className='fa fa-trash' onClick={handleItemDelete} hidden={isEditedFlagTEMPORARY}><FontAwesomeIcon icon={faTrash} className="text-danger p2 mx-2"/></i>
    const editField = <input type="text" className="form-control" placeholder={item.itemName} defaultValue={item.itemName} ref={editedItemRef} hidden={!isEditedFlagTEMPORARY}></input>
    const itemGot = isGot ? <strike>{item.itemName}</strike> : ""
    const itemName = <span className = "mr-auto p-2" hidden={isEditedFlagTEMPORARY || isGot}>{item.itemName}</span>

    const itemToAdd = (<p className ="listItem d-inline-flex align-items-center flex-wrap w-100">{checkbox}{itemGot}{itemName}{editField}{checkBtn}{cancelBtn}{editBtn}{deleteBtn}</p>)
    return (
        <div>
            {itemToAdd}         
        </div>
    )
}