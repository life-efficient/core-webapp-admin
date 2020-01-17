import React, { Component } from "react";
import "./App.css";
import Amplify from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route, Match } from "react-router-dom"
import LandingIndex from "./components/landing/Index"
import NotFound from "./components/general/NotFound";
import { combineReducers, createStore } from "redux"
import { ProtectedRoute } from "./CustomRoutes"
import { Provider } from "react-redux"
import { Helmet } from 'react-helmet'
import { Modal, SideMenu } from "mvp-webapp"
import Login from "./components/landing/Login"
import logo from "./images/logo.png"
import AppRoutes from "./components/app/AppRoutes";
import SignUp from "./components/landing/SignUp"
import favicon from "./images/favicon.ico"
import { makeGetRequest } from "./api_calls";
import About from "./components/landing/About"

import createHistory from "history/createBrowserHistory"
export const history = createHistory()
history.listen((location, action) => {
    window.scrollTo(0, 0)
})

//Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'eu-west-2:a9b6789c-da76-4a3e-ae38-93373981ff11',
        
        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        //identityPoolRegion: 'eu-west-2',
 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-2_XRYfK4o2B',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '12rljt0gbcrc780r5tdeoctdvk',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true
    },
    Storage: {
        AWSS3: {
            bucket: 'theaicore-data', //REQUIRED -  Amazon S3 bucket
            region: 'eu-west-2', //OPTIONAL -  Amazon service region
        }
    }
});

window.api_root = 'https://yjr86j4o4f.execute-api.eu-west-2.amazonaws.com/prod/'

const slideUp = (state={open: false, content: null}, action) => {
    switch (action.type) {
        case "OPEN_SLIDEUP":
            console.log('opening slideup')
            return {
                open: true,
                content: action.content
            }
        case "CLOSE_SLIDEUP":
            console.log('closing slideup')
            return {
                open: false,
                content: null
            }
        default:
            return state
    }
}

const modal = (state={open: false, content: null}, action) => {
    switch (action.type) {
        case "OPEN_MODAL": 
            console.log('opening modal')
            return {
                open: true,
                content: action.content
            }
        case "CLOSE_MODAL":
            console.log('closing modal')
            return {
                open: false,
                content: null
            }
        default:
            return state
    }
}

const menu = (state = {open: false}, action) => {
    switch (action.type) {
        case "TOGGLE_MENU" :
            console.log('toggling sidenav')
            return {
                ...state,
                open: !state.open
            }
        default:
            return state
    }
}
const notify = (state={show: false}, action) => {
    switch (action.type) {
        case "NOTIFY":
            console.log('notifying')
            return {
                show: true,
                content: action.content
            }
        case "HIDE_NOTIFY":
            return {
                show: false,
                content: null
            }
        default:
            return state
    }
}

const app = (state={}, action) => {
    return {
        name: 'AI CORE',
        logo,
        address: '<Our address>',
        contact: '<Our number>'
    }
}

const user = (state={}, action) => {
    console.log('action:', action)
    switch (action.type) {
        case "SET_USER":
            console.log('update:', action.update)
            var s = {
                ...state,
                ...action.update
            }
            console.log('new user:', s)
            return s
        default:
            return {
                display_pic: null,
                ...state
            }
    }
}

const reducer = combineReducers({
    modal,
    slideUp,
    menu,
    notify,
    app,
    user
})

export const store = createStore(reducer)

// GET INITIAL DATA
makeGetRequest('app/user/info', (update)=>{store.dispatch({type: "SET_USER", update})})

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log('rendering app')
        return (
            <Provider store={store}>
                <Router >                   
                    <div className="App">
                        <Helmet>
                            <title>{store.getState().app.name}</title>
                              <meta name="ABC" content="ABC" />
                            <link rel="icon" href={favicon} sizes="16x16" />
                            <script src="https://kit.fontawesome.com/2de6851308.js" crossorigin="anonymous"></script>

                        </Helmet>
                        <Switch>
                            <ProtectedRoute path="/app" component={AppRoutes}/>
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/about" component={About} />
                            <Route path="/" component={LandingIndex} />
                            <Route component={NotFound} path=""/> 
                        </Switch>
                        <Modal />
                        <SideMenu />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;//withAuthenticator(App);