import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../app-firebase';

const PrivateRoute = ({ component: C, ...rest }) => {
    return (

        <Route {...rest}
            render={(props) => (
                <AuthContext.Consumer>
                    {({ user }) => !!user ?
                        <C {...props} />
                        :
                        <Redirect to="/sign-in" />
                    }
                </AuthContext.Consumer>
            )}
        />
    );
}


export default PrivateRoute;
