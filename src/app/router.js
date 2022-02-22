import React from "react";
import { Route, Redirect, Router, Switch } from "react-router-dom";
import asyncComponent from "./helpers/async-func";
import Layout from "./components/layout";
import auth from "./containers/auth";

const RestrictedRoute = ({
  component: Component,
  layoutSettings = {},
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Layout settings={layoutSettings} user={auth.loggedUser()}>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const UnRestrictedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const CommonRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Redirect to="/dashboard" />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
// const PublicRoute = ({ component: Component, layoutSettings = {}, ...rest }) => (
//   <Route
//       {...rest}
//       render={props =>
//           <Layout settings={layoutSettings}>
//               <Component {...props} settings={layoutSettings} />
//           </Layout>
//       }
//   />
// );

export default ({ history, user,socket }) => {
  return (
    <Router history={history}>
      <Switch>
        <CommonRoute exact path={"/"} />
        <UnRestrictedRoute
          exact
          path={"/login"}
          component={asyncComponent(() => import("./containers/auth/login"))}
        />
        <UnRestrictedRoute
          exact
          path={"/register"}
          component={asyncComponent(() => import("./containers/auth/register"))}
        />
        <UnRestrictedRoute
          exact
          path={"/register-details"}
          component={asyncComponent(() => import("./containers/auth/registerDetails"))}
        />
        <UnRestrictedRoute
          exact
          path={"/thankyou"}
          component={asyncComponent(() => import("./containers/auth/thankyou"))}
        />
        <UnRestrictedRoute
          exact
          path={'/forgot-password'}
          component={asyncComponent(() => import("./containers/forgot-password"))}
        />
        <UnRestrictedRoute
          exact
          path={'/reset-password'}
          component={asyncComponent(() => import("./containers/forgot-password/reset-password"))}
        />
        <RestrictedRoute
          exact
          path={"/dashboard"}
          isLoggedIn={user}
          layoutSettings={{
            title: "Dashboard",
            socket,
            sidebar:true,
          }}
          component={asyncComponent(() => import("./containers/dashboard"))}
        />
        <RestrictedRoute
          exact
          path={"/users"}
          isLoggedIn={user}
          layoutSettings={{
            title: "List Users",
            socket,
            sidebar:true,
          }}
          component={asyncComponent(() => import("./containers/users/list"))}
        />
        <RestrictedRoute
          exact
          path={"/user/create"}
          isLoggedIn={user}
          layoutSettings={{
            title: "Create User",
            socket,
            sidebar:true,
          }}
          component={asyncComponent(() => import("./containers/users/create"))}
        />
        <RestrictedRoute
          exact
          path={"/user/edit/:id"}
          isLoggedIn={user}
          layoutSettings={{
            title: "Edit User",
            socket,
            sidebar:true,
          }}
          component={asyncComponent(() => import("./containers/users/edit"))}
        />
        
        <RestrictedRoute
          exact
          path={"/user/chain-permission/:useid"}
          isLoggedIn={user}
          layoutSettings={{
            title: "Chain Permission",
            socket,
            sidebar:true,
          }}
          component={asyncComponent(() =>
            import("./containers/users/chainPermisssions")
          )}
        />

      </Switch>
    </Router>
  );
};
