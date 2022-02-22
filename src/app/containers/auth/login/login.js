import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import LoginForm from "./login-form";
import { history } from "../../../store";

const mapDispatchToProps = ({ login }) => {
  return {
    ...login
  };
};

const mapStateToProps = ({ login }) => {
  return {
    ...login
  };
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(user) {
    await this.props.login(user);
      history.push("/dashboard");
  }
  render() {
    let { loading } = this.props
    return (
        <div style={{ backgroundColor: "black"}}>
        <LoginForm loading={loading} onSubmit={this.handleSubmit} />
        </div>
    );
  }
}

Login.propTypes = {
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
