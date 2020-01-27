import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

export default function Item( {item} ) {
    const checkbox = <input type="checkbox" checked={item.got}/>
    const uncheckSquare = <FontAwesomeIcon icon={faSquare} className = "text-dark p2 mx-2" />
    const checkSquare = <FontAwesomeIcon icon={faCheckSquare} className = "text-success p2 mx-2" />
    const itemName = <span className = "mr-auto p-2">{item.itemName}</span>
    const editBtn = <FontAwesomeIcon icon={faEdit} className = "text-primary p2 mx-2" />
    const deleteBtn = <FontAwesomeIcon icon={faTrash} className= "text-danger p2 mx-2" />
    const itemToAdd = (<p className ="listItem d-inline-flex align-items-center flex-wrap w-100">{checkbox}{uncheckSquare}{checkSquare}{itemName}{editBtn}{deleteBtn} </p>
    );
    return (
        
        <div>
            {itemToAdd}            
        </div>
    )
}
