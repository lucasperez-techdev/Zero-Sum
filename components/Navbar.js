'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDrawerOpen(false); // Close the drawer
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const DrawerList = (
    <List>
      <ListItem button onClick={() => { setDrawerOpen(false); router.push('/homepage'); }}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => { setDrawerOpen(false); router.push('/profile'); }}>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={() => {
        setDrawerOpen(false);
        handleLogout();
      }}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Zero-Sum</Link>
      </div>
      <div className={styles.navLinks}>
        {user ? (
          <>
            <Button onClick={toggleDrawer(true)} className={styles.menuButton}>
              Menu
            </Button>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
