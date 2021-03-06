import React, { useState } from "react";
import "./SignIn.scss";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";

//import { auth, signInWithGoogle } from "../../Firebase/Firebase";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../Redux/User/userActions";
import { connect } from "react-redux";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  //!HOOKS
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    //prevent mistakes
    event.preventDefault();
    //no more setState. Reduc will handle the
    //state from here on ou with sagas
    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value }); //name can be email or password; dinamic selector
    //this way we dont have to write separate functions that do the same
    //... -> spread userCredentials, and update the value that needs to be changed
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          handleChange={handleChange}
          value={password}
          label="password"
          required
        />

        <div className="buttons">
          {/*<input type='submit' value='Submit Form' />*/}
          <CustomButton type="submit" isGoogleSignIn={false}>
            Sign In
          </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  //we pass them as an object
});

export default connect(null, mapDispatchToProps)(SignIn);
