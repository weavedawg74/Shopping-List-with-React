import React from 'react'
import Item from './Item'

export default function ShoppingList({item, toggleItem, deleteItem, editItem}) {
    return (
      item.map(item => {
          return <Item key={item.id} item={item} toggleItem={toggleItem} deleteItem={deleteItem} editItem={editItem} />
      })
    )
}
