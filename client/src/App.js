import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import 'react-toastify/dist/ReactToastify.css'
import Register from './Screens/Register';
import Login from './Screens/Login';
import Activate from './Screens/Activate';
import Forget from './Screens/Forget';
import ResetPassword from './Screens/ResetPassword';
import Dashboard from './Screens/Dashboard';
import CreatePoll from './Screens/CreatePoll';
import GetPollList from './Screens/GetPollList';
import Vote from './Screens/Vote';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path='/' exact render={props => <App {...props} />} /> */}
        <Route path='/' exact render={props => <Login {...props} />} />
        <Route path='/register' exact render={props => <Register {...props} />} />
        <Route path='/auth/activate/:token' exact render={props => <Activate {...props} />} />
        <Route path='/auth/forgot-password' exact render={props => <Forget {...props} />} />
        <Route path='/auth/reset-password/:token' exact render={props => <ResetPassword {...props} />} />
        
        <Layout>
          <Route path='/dashboard' exact render={props => <Dashboard {...props} />} />
          <Route path='/create/poll' exact render={props => <CreatePoll {...props} />} />
          <Route path='/poll' exact render={props => <GetPollList {...props} />} />
          <Route path='/vote' exact render={props => <Vote {...props} />} />
        </Layout>

      </Switch>
    </BrowserRouter>
  );
}

export default App;