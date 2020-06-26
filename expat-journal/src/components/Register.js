import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";
import bgImg from "../images/loginBackground.jpg";

const MainDiv = styled.div``;

const InnerDiv = styled.div`
  background-image: url(${bgImg});

  height: 700px;
  background-position: relative;
  background-size: cover;
`;

const SmallDiv = styled.div`
  width: 500px;
  display: flex;
  margin: auto;
  padding-top: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  background-color: black;
  color: white;
  padding: 2%;
  margin-top: 6%;
  margin-bottom: 2%;
`;

const LogBut = styled.button`
  margin: 8% 0;
  padding: 2% 5%;
`;

export class Register extends React.Component {
  state = {
    newAccount: {
      username: "",
      password: "",
      email: "",
      name: "",
      age: "",
      terms: false,
      // errors: "",
    },
  };

  changeHandler = (e) => {
    const value = e.target.name === "terms" ? e.target.checked : e.target.value;
    this.setState({
      newAccount: {
        ...this.state.newAccount,
        [e.target.name]: value,
      },
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    // console.log(this.state.newAccount);
    if (this.state.newAccount.terms === true) {
      axiosWithAuth()
        .post("/api/auth/register", this.state.newAccount)
        .then((res) => {
          // console.log(res);
          this.props.history.push("/login");
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        newAccount: {
          ...this.state.newAccount,
          errors: "Please accept terms and conditions",
        },
      });
    }
  };

  render() {
    return (
      <MainDiv>
        <h1>Register</h1>
        <InnerDiv>
          <SmallDiv>
            <form onSubmit={this.submitHandler} className="registerForm">
              <Label>Username: </Label>
              <input
                type="text"
                name="username"
                value={this.state.newAccount.username}
                onChange={this.changeHandler}
              />

              <Label>Password: </Label>
              <input
                type="text"
                name="password"
                value={this.state.newAccount.password}
                onChange={this.changeHandler}
              />

              <Label>Email: </Label>
              <input
                type="text"
                name="email"
                value={this.state.newAccount.email}
                onChange={this.changeHandler}
              />

              <Label>Name: </Label>
              <input
                type="text"
                name="name"
                value={this.state.newAccount.name}
                onChange={this.changeHandler}
              />

              <Label>Age: </Label>
              <input
                type="text"
                name="age"
                value={this.state.newAccount.age}
                onChange={this.changeHandler}
              />

              <div>
                <p style={{ color: "red" }}>{this.state.newAccount.errors}</p>
              </div>

              <input
                type="checkbox"
                name="terms"
                value={this.state.newAccount.terms}
                onChange={this.changeHandler}
              />
              <span>Terms and conditions</span>

              <LogBut>Register</LogBut>
            </form>
          </SmallDiv>
        </InnerDiv>
      </MainDiv>
    );
  }
}
