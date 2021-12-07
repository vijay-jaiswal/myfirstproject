import React from 'react'
import Login from './Login'

export default function Input(props) {
    return (
        <div>
            <input  type={props.type} 
             placeholder={props.placeholder} 
              name={props.name} 
              onChange={props.onChange} 
              value={props.value}/>
        </div>
    )
}