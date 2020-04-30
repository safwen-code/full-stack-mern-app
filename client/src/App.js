import React, {  Fragment ,  useEffect  } from "react"
import { Provider } from 'react-redux'
import store from './store'


import {
  Container
}
  from "reactstrap"

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import RegisterUser from './component/RegisterUser'
import Login from "./component/Login"
import Navba from "./component/Navba"
import Register from './component/Register'
import Alerts from './component/Alert'
import Dachboard from './component/Dachboard'
import PrivateRoute from '../src/Routing/PrivateRoute'
import CreatProfil from './component/CreatProfil'
import EditeProfile from './component/EditeProfile'
import AddExperience from './component/AddExperience'
import AddEducation from './component/AddEducation'
import setAuthToken from './utils/setAuthToken'
import {userLoad} from './action/registerAction'
import Profiles from './component/Profiles'
import Profile from './component/Profile'
import Posts from './component/Posts'
import Post from './component/Post'

if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App =()=> {
  useEffect(()=>{
    store.dispatch(userLoad())
  },[])
    return (
      <Provider store={store}>
        <Fragment>
        <Router>
          <div>
            <Navba/>
            <Alerts/>
            <Switch>
            <Container>
              <Route path="/login" component={Login}/>
              <Route path='/registerUser' component={Register}/>
              <Route path='/profiles' component={Profiles}/>
              <Route path='/profile/:id' component={Profile}/>
              <PrivateRoute path='/profileUser' component={Dachboard}/>
              <PrivateRoute path='/post' component={Posts}/>
              <PrivateRoute exact path= '/posts/:id' component={Post}/>
              <PrivateRoute path='/create-profile' component ={CreatProfil}/>
              <PrivateRoute path='/editeProfile' component={EditeProfile}/>
              <PrivateRoute path='/addExperience' component={AddExperience}/>
              <PrivateRoute path ='/addEdcuation' component={AddEducation}/> 
            </Container>
            </Switch>
           
          </div>
        </Router>
        </Fragment>
      </Provider>
    )
  }


export default App
