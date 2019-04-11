import React from 'react'
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="text-center">
      <h2><i className="fa-italic">PAGE NOT FOUND 404</i></h2>
      <h2><Link to="/"> Back to home </Link></h2>
    </div>
  )
}
