import './App.css';
//import Nav from './Front/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Front from './Front/Front';
import Back from './Back/Back';
import Login from './Back/Login';
import {BrowserRouter,Route} from 'react-router-dom';


//smk revit react js
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Route path="/" component={Front} exact />
        <Route path="/home" component={Front}/>
        <Route path="/admin" component={Back}/>
        <Route path="/login" component={Login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
