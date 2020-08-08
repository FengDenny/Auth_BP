import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import Navbar from './utility/Navbar/Navbar';
import Footer from './utility/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ConfirmSignup from './pages/Signup/ConfirmSignup';
import ForgotPassword from './pages/ForgotPassword/SendToken';
import Redirect from './pages/ForgotPassword/Redirect';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import NotFound from './pages/404Page/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Navbar} />
        <Switch>
          <Route exact path="/" component={Hero} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/email_verified" component={ConfirmSignup} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/password_reset" component={ResetPassword} />
          <Route exact path="/sent" component={Redirect} />
          <Route component={NotFound} />
        </Switch>
        <Route path="/" component={Footer} />
      </div>
    </Router>
  );
}

export default App;
