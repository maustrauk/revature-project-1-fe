import { useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import HomePage from "./components/HomePage";
import Dashboard from "./components/dashboards/Dashboard";
import SignUp from "./forms/SingUp";
import AddReimb from "./forms/AddReimb";
import PrivateRoute from "./components/PrivateRoute";

const initUser = {
  userId: "",
  userName: "",
  userFirstName: "",
  userLastName: "",
  userEmail: "",
  userRoleId: ""
};

function App() {

  const [user, setUser] = useState(initUser);
  const [wrongCred, setWrongCred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reimbList, setReimbList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [emplList, setEmplList] = useState([]);

  
  const myHooks = {
    user: user,
    setUser: setUser,
    wrongCred: wrongCred,
    setWrongCred: setWrongCred,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    reimbList: reimbList,
    setReimbList: setReimbList,
    isPending: isPending,
    setIsPending: setIsPending,
    isApproved: isApproved,
    setIsApproved: setIsApproved,
    isDenied: isDenied,
    setIsDenied: setIsDenied,
    emplList: emplList,
    setEmplList: setEmplList
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signup">
            <SignUp myHooks={myHooks}/>
          </Route>
          <PrivateRoute exact path="/dashboard" component={Dashboard} myHooks={myHooks} accRest="user"/>
          <PrivateRoute exact path="/add-reimb" component={AddReimb} myHooks={myHooks} accRest="empl"/>
          <Route exact path='/'>
            <HomePage myHooks={myHooks}/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
