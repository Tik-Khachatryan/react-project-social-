import React, {useState, useMemo} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Profile from './components/profile/Profile'
import UserPosts from "./components/usersPosts/UserPosts";
import Posts from './components/posts/Posts'
import {Context} from './Context';


function App() {
    const [status, setStatus] = useState({});
    const providerUser    = useMemo(() => ({status, setStatus}), [status, setStatus]);
    const [init, setInit] = useState({complete: false});
    return (
        <Router>
            <Header init={init} setInit={setInit}/>
            <Switch>
                <Context.Provider value={providerUser}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" render={props => (
                        <Login
                            {...props}
                            init={init}
                            setInit={setInit}
                        />
                    )}/>
                    <Route path="/register" component={Register}/>
                    <Route path={"/profile/:id?"} component={Profile}/>
                    <Route path={"/posts"} component={UserPosts}/>
                    <Route path={"/Tiko"} component={Posts}/>

                </Context.Provider>
            </Switch>
        </Router>
    );

}


export default App;
