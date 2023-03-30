import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authentication } from '../../../compose/firebase';
import { DoorOpen } from 'react-bootstrap-icons';


function LogOut() { 
    authentication.signOut();
    window.location.href= "/";
}

function userToast() {
     
}

const UserLogin = ({ user }) => {
    return (
        <div>
            <img src={user.photoURL} alt={user.displayName} width={30} height={30} className="rounded-circle"/>
            <DoorOpen className="mx-3" size={30} onClick={ LogOut } />
        </div>
    )
 }

export default UserLogin;