import React from 'react'

import Locations  from './Locations/Locations'
import Map        from './Map/Map'
import Times      from './Times/Times'

import Header   from './Header/Header'
import Footer   from './Footer/Footer'

import './App.css'

const App = () => (

  <div className="main-wrapper">

    <Header />

    <Map />
    <Locations />
    <Times />

    <Footer />

  </div>
)

export default App
