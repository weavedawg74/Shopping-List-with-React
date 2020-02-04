import React from 'react'
import Item from './Item'

export default function ShoppingList({item, toggleItem, deleteItem, editItem, key}) {
    return (
      item.map(item => {
          return <Item key={item.id} isEdited={item.isEdited} item={item} toggleItem={toggleItem} deleteItem={deleteItem} editItem={editItem}/>
      })
    )
}
