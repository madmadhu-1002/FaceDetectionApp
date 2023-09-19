import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
  return (
    <div>
        <p className='f3'>
            {'This magic brain will detect faces in your pictures. get it a try'}
        </p>
        <div className='center'>
            <div className='center form pa4 br3 shadow-5'>
            <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} placeholder='Provide link of the image'/>
            <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
        </div>
        </div>
    </div>
  )
}

export default ImageLinkForm