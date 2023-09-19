import React from 'react'
import { Tilt } from 'react-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
        <Tilt className='Tilt br2 shadow-2'options={{max: 50}} style={{ height: 100, width: 100 }}>
            <div className='Tilt-inner '><img alt='brain logo'src={brain} style={{height:'70%', width:'70%', padding:'10%'}}/></div>
        </Tilt>
    </div>
  )
}

export default Logo