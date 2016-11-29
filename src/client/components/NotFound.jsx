import React from 'react';
import Footer from './Footer';

const notFound = props => {
  return (
    <div>
    	<div className='error_message_ctn'>
      	<h1>404 - Page Not Found</h1>
      </div>
      <Footer />
    </div>
  )
}

export default notFound;