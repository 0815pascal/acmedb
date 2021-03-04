import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent'
import NavbarComponent from './components/NavbarComponent'

function App() {
  return (
    <div className="App">
      <Router>
      <NavbarComponent/>
        <div className="container">
          <Switch>
            <Route path = "/" exact component={ListEmployeeComponent}></Route>
            <Route path = "/employee" exact component={ListEmployeeComponent}></Route>
            <Route path = "/employee/add" component={CreateEmployeeComponent}></Route>
            <Route path = "/employee/update/:id" component={UpdateEmployeeComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
