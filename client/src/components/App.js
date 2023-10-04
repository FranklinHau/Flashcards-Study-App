//serves as the entry point for my application's frontend
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import UserComponent from './UserComponent';


function App() {
  return (
    <Router>
      <div className='App'>
        <Switch> 
          <Route path='/' exact component={Home} />
          <Route path='/register' component={UserComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;