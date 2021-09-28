import './App.css';
import MapObject from './components/MapObject';
import {ReactComponent as WorldMap} from './world.svg'

function App() {

  // These constants roughly correspond the limits to which the icons should be allowed to be
  // (otherwise they will be too far off the map)
  const min_x = 0.2 * window.innerWidth;
  const min_y = 0.2 * window.innerHeight;
  const max_x = 0.8 * window.innerWidth;
  const max_y = 0.7 * window.innerHeight;

  return (
    // Each MapObject corresponds to an icon that will display a form when clicked
    // (starting out at arbitrary coordinates)
    <div className="App">
      
        <MapObject id ={0} locationX={0.4 * max_x} locationY={0.5 * max_y} minX={min_x} 
        maxX={max_x} minY={min_y} maxY={max_y} nodeColor="green"
        />
        <MapObject id ={1} locationX={(min_x + max_x)/2} locationY={(min_y+max_y)/2} minX={min_x} 
        maxX={max_x} minY={min_y} maxY={max_y}nodeColor="red" />
      
        <MapObject id ={2} locationX={0.8 * max_x} locationY={0.5 * max_y} minX={min_x} 
        maxX={max_x} minY={min_y} maxY={max_y}  nodeColor="blue"/>
      
        <MapObject id ={3} locationX={0.9*max_x} locationY={0.8*max_y} minX={min_x} 
        maxX={max_x} minY={min_y} maxY={max_y} nodeColor = "purple" />


      
      <div className="mapWrapper" style={{
         position: "absolute",
         right: "15%",
         top: "20%",
         width: "70%",
         height: "90%",
         zIndex: 1
         }}>
            <WorldMap/> 
        </div>
    </div>
  );
}

export default App;
