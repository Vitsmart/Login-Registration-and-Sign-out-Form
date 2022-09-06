import React, { useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Form} from "react-validation/build/form"
import {Input} from "react-validation/build/input"
import {CheckButton} from "react-validation/build/button"
import { useNavigate } from 'react-router-dom'
import { login } from "../actions/auth";


const Login = (props) => {
    const navigate = useNavigate();
const form = useRef();
const checkBtn = useRef();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const {isLoggedIn} = useSelector(state => state.auth);
const {message} = useSelector(state => state.message);
const dispatch = useDispatch();

const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
}
const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
}

const LoginHandler = (event) => {
event.preventDefault();
setLoading(true);
form.current.validateAll();
if (checkBtn.current.context._errors.length === 0) {
    dispatch(login(username, password))
    .then(() => {
        props.history.push("/profile");
        window.location.reload();
    })
    .catch(()=> {
        setLoading(false);
    });
} else {
    setLoading(false);
}

};
if (isLoggedIn) {
    return navigate ("/profile");
}


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                src=""
                alt=""
                className="profile-img-card"
                />
                <Form onSubmit={LoginHandler} ref={form}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[validations]}
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button>
                            <span>Login</span>
                            </button>

                    </div>
                    {message && (<div className="form-group">
                        <div className="alert alert-danger" role="alert">{message}</div>
                    </div>)}
<CheckButton style={{}} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
};
export default Login;