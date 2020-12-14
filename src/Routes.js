import React from 'react';
import {Route, Switch} from "react-router-dom";
import MainPage from "./containers/MainPage";

const Routes = () => {

    return (
        <>
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/:page' component={MainPage}/>
                <Route render={() => <h1>Not found</h1>}/>
            </Switch>
        </>
    );
};

export default Routes;