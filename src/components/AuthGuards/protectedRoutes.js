import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../app-firebase';

const ProtectedRoute = ({ component: C, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => (
                <AuthContext.Consumer>
                    {({ user }) => !!user ?

                        <Redirect to='/' />
                        :
                        <C {...props} />
                    }
                </AuthContext.Consumer>
            )}
        />
    );
}

export default ProtectedRoute;
