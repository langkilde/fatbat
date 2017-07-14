import * as React from "react";

export default class Signin extends React.Component {
  
  public render() {
    return (
      <div>
        <form className="" action="http://localhost:3000/auth">
          <button className="" type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}
