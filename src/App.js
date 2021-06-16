import React, { Component } from 'react';
import './App.scss';
import HomePage from './pages/HomePage';
import { Route, Switch } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import Header from './components/Header';
import SignIn from './components/Sign-In';
import { auth, createUserProfileDocument } from './firebase/firebase-utility';
import AuthContext from './context/auth-context';
import CheckoutPage from './pages/CheckoutPage';

class App extends Component {
  state = {
    showLogin: false
  }
  render = () => (
    <AuthContext.Provider value={{ showLogin: () => this.setState({ showLogin: true }) }}>
      <Header />
      {
        this.state.showLogin && !this.state.user &&
        <SignIn close={() => this.setState({ showLogin: false })} />
      }
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </AuthContext.Provider>
  )
  componentDidMount = () => {
    this.unsubscribeFromAuth =
      auth.onAuthStateChanged(user => {
        this.setState({ showLogin: false });
        createUserProfileDocument(user);
      });
  }
  componentWillUnmount = () => this.unsubscribeFromAuth()
}

export default App;
