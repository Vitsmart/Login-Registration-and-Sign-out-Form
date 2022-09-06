import React, { useRef, useState } from "react";
import { useDispatch} from "react-redux";
import {Form} from "react-validation/build/form"
import { Input } from "react-validation/build/input";
import {CheckButton} from "react-validation/build/button" 
import {isEmail} from "react-validation"
import { register } from "../actions/auth";




const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role={alert}>
                This field is required!
            </div>
        )
    }
}
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role={alert}>
                This is not a valid Email</div>
        )
    }
}
const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div>This username must be between 3 and 20 characters</div>
        )
    }
}
const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div>
                The password must be between 6 and 40 characters.
            </div>
        )
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [successful, setSuccessful] = useState("");
    const {message} = useDispatch();
    const dispatch = useDispatch();


    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
    };
    const onchangeEmail = (event) => {
        const email = event.target.value;
        setEmail(email);
    };
    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    }
    const registerHandler = (event) => {
        event.preventDefault();
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
.then(() => {
    setSuccessful(true);
})
.catch (() => {
    setSuccessful(false);
});
        }
    }


return (
    <div>
        <div>
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            />
            <Form onSubmit={registerHandler} ref={form}>
                {!successful && (
                <div>
                    <div className="form-group">
<label htmlFor="username">Username</label>
<Input
type="text"
className="form-control"
name="username"
value={username}
onchange={onChangeUsername}
validations={[required, vusername]}
/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={onchangeEmail}
                        validations={[required, validEmail]}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
                )}
                {message && (
                    <div>
                        <div className="form-group">

<div className={ successful ? 'alert alert-success': 'alert alert-danger'} role={alert}>{message}</div>
                        </div>
                    </div>
                )}
                <CheckButton  ref={checkBtn} />
            </Form>
        </div>
    </div>
)
                }
export default Register;
