import { Home } from "./Pages/Home/Home";
import { Route, Switch, Link } from 'react-router-dom';
import { Ascending } from './Pages/Ascending/Ascending';
import { Decending } from './Pages/Decending.jsx/Decending';
import  Main  from './Components/Main';
function App() {
  return (
    <div className="appContainer">
      <div className="appWrapper">
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/age/sort/ascending' component={Ascending}/>
          <Route exact path='/age/sort/decending' component={Decending}/> */}
        </Switch>
        
       </div>
       {/* <Main/> */}
    </div>
  );
}

export default App;
