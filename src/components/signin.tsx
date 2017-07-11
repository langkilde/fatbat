import * as React from "react";

export default class Signin extends React.Component {
  
  public render() {
    return (
      <div>
        <div className="container">
          <form className="form-signin" action="http://localhost:3000/auth">
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}
