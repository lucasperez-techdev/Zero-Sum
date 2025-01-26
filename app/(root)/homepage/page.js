// app/(root)/homepage/page.js
'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from "../../../styles/Homepage.module.css";

const Homepage = () => {
  const [currentUser, setCurrentUser] = useState(null); // For authenticated user
  const [users, setUsers] = useState([]); // For list of users
  const router = useRouter();

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Emily Johnson' },
      { id: 4, name: 'Michael Brown' },
      { id: 5, name: 'Sarah Wilson' },
      { id: 6, name: 'Chris Davis' },
    ];
    setUsers(users);
    // console.log('Mock Users:', mockUsers);
  }, []);

  if (!currentUser) return <p>Loading...</p>;

  // Function to render user cards
  const renderUserCards = (users) => {
    return users.map(user => (
      <div key={user.id} className={styles.card}> {/* styles.card */}
        <h3>{user.name}</h3>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
    <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
      Welcome, {currentUser.displayName || 'User'}!
    </h1>
    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
      Potential traders:
    </h2>
    <div className={styles.grid}>{renderUserCards(users)}</div>
  </div>
  );
};

export default Homepage;
