import React from 'react'
import Item from './Item'

export default function ShoppingList({ item}) {
    return (
      item.map(item => {
          return <Item key={item.id} item={item} />
      })
    )
}
