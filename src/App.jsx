import 'bootstrap/dist/css/bootstrap.min.css'; // import from react bootstrap
import "./App.css"; // add css link 
import { useContext } from 'react';
import { MyContext } from './Contact/MyProvider';
import StageOne from './Components/StageOne';
import StageTwo from './Components/StageTwo';


const App = ()=>{
  const context = useContext(MyContext)
  return ( <>
 <div className='wrapper'>
  <div className='center-wrapper'>
    <h1>who pays the bill?</h1>
    {context.stage === 1? <StageOne/> : <StageTwo/>}
  </div>
 </div>
  </> );
};

 export default App;