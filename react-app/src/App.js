import React, { useState, useEffect } from 'react';
import './App.css';
import MapObject from './components/MapObject';
import {ReactComponent as GreenRect} from './Green_rectangle.svg'

function App() {
  return (
    // Each MapObject corresponds to an icon that will display a form when clicked
    <div className="App">
      <div className="mapWrapper0" style={{
        position: "absolute",
        left: "50%",
        top: "25%",
        zIndex: 100}}>
          <MapObject id ={0} />
      </div>
      <div className="mapWrapper1" style={{
        position: "absolute",
        left: "50%",
        top: "75%",
        zIndex: 100}}>
          <MapObject id ={1} />
      </div>
      <div className="mapWrapper2" style={{
        position: "absolute",
        left: "25%",
        top: "50%",
        zIndex: 100}}>
          <MapObject id ={2} />
      </div>
      <div className="mapWrapper3" style={{
        position: "absolute",
        left: "75%",
        top: "50%",
        zIndex: 100}}>
          <MapObject id ={3} />
      </div>
      <div className="mapWrapper" style={{
         position: "absolute",
         left: "0%",
         top: "0%",
         width: "100%",
         height: "100%",
         opacity: 0.5,
         zIndex: 1
         }}>
            <GreenRect />
        </div>
      

    </div>
  );
}

export default App;
