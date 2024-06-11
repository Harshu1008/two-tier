import { useState } from 'react';
import './App.css';

function App() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Add state for message

    function updateUser(event) {
        setUser(event.target.value);
    }
    function updatePass(event) {
        setPassword(event.target.value);
    }

    function callLogin() {
        const postData = {
            username: user,
            password: password
        };
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => setMessage(data.message)) // Update message state
        .catch(error => setMessage('Error: ' + error));
    }

    function callSignup() {
        const postData = {
            username: user,
            password: password
        };

        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setMessage('Signup successful: ' + data.message)) // Update message state
        .catch(error => setMessage('Error: ' + error));
    }

    return (
        <div className="app-container">
            <table className="form-table">
                <tr>
                    <th><label>UserName </label></th>
                    <td><input type="text" placeholder="username" value={user} onChange={updateUser}></input></td>
                </tr>
                <tr>
                    <th><label>Password </label></th>
                    <td><input type="password" placeholder="password" value={password} onChange={updatePass}></input></td>
                </tr>
                <tr>
                    <td><button onClick={callLogin}>Login</button></td>
                    <td><button onClick={callSignup}>Register New User</button></td>
                </tr>
            </table>
            {message && <div className="message-box">{message}</div>} {/* Conditionally render message */}
        </div>
    );
}

export default App;
