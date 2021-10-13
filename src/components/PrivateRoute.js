import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {

    const {route, myHooks, component:Component, accRest} = props;

    const checkAccRest = () => {
        if (accRest === "user") {
            return (myHooks.user.userRoleId === 1 || myHooks.user.userRoleId === 2);
        } else if (accRest === "admin") {
            return myHooks.user.userRoleId === 2;
        } else if (accRest === "empl") {
            return myHooks.user.userRoleId === 1;
        } else {
            return false;
        }
    }

    return (
        <div>
            { checkAccRest() ?
             <Route exact path={route}>
                 <Component myHooks={myHooks}/>
             </Route> : 
             <Redirect to="/"/>}
        </div>
    );
}


export default PrivateRoute;