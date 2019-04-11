import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="text-center">
      <h2> <i className="fa fa-italic"></i> </h2>
      <Link to="/"> Back to home </Link>
    </div>
  )
}
