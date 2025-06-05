import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/users/prenoms')
      .then((res) => res.json())
      .then((data) => {
        console.log('Received data:', data); // ici, data est bien défini
        setUsers(data.users);
      })
      .catch(console.error); // le .catch doit être à la fin de la chaîne
  }, []);

  console.log(users);

  return (
    <header className="Header">
      <div className="Logo">
        <Link to="/">🍿 PopCorn Advisor</Link>
      </div>
      <nav className="NavLinks">
        <Link className="NavButton" to="/users">
          Users
        </Link>
        <Link className="NavButton" to="/about">
          About
        </Link>
      </nav>
      <div
        style={{
          marginTop: '0px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">-- Choisir un prénom --</option>
          {Array.isArray(users) &&
            users.map((user, index) => (
              <option key={index} value={user.id}>
                {user.firstname}
              </option>
              // L'identifiant est stocké dans la variable selectedUser
            ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
