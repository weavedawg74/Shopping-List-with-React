import React from 'react'

export default function Item( {item} ) {
    return (
        <div>
            <label>
                <input type="checkbox" checked={item.got} />
                {item.name}
            </label>
            
        </div>
    )
}
