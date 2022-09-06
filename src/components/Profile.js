import React from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux"

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user: currentUser} = useSelector((state) => state.auth);
    if (!currentUser) {
        return navigate("/login");
    }

return (
    <div className="container">
        <header className="jumbotron">
            <h3>
                <strong>{currentUser.username}</strong>
            </h3>
        </header>
        <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{''}
             {currentUser.accessToken.substr(currentUser.acessToken.length - 20)}
        </p>
        <p>
            <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
            <strong>Email:</strong> {currentUser.email}
        </p>
        
            <strong>Authorities:</strong> 
            <ul>
                {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        
    </div>
)
};

export default Profile;