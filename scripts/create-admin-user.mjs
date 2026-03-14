#!/usr/bin/env node
/**
 * WordPress Admin User Creator
 * Run this script to create an admin user for headless CMS access
 * 
 * Usage: node scripts/create-admin-user.mjs
 * 
 * Prerequisites:
 * 1. Install Application Passwords plugin OR enable it in wp-config.php
 * 2. Or create user manually in WordPress Admin > Users > Add New
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const WP_URL = process.env.WORDPRESS_API_URL?.replace('/wp/v2', '') || 'https://azure-dugong-563921.hostingersite.com';
const USERNAME = process.env.WORDPRESS_AUTH_USERNAME || 'admin';
const PASSWORD = process.env.WORDPRESS_AUTH_PASSWORD || 'iLTrxF^0YWh9s*fLx9lPGszj';

const NEW_USER = {
  username: 'forward_admin',
  email: 'forwardfalls@gmail.com',
  password: 'X1mL5zud$AkWfup(@svjO$B3',
  role: 'administrator'
};

async function createUser() {
  console.log('Creating WordPress admin user...\n');
  console.log('Site:', WP_URL);
  console.log('Auth as:', USERNAME);
  console.log('New user:', NEW_USER.username, '\n');

  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`
      },
      body: JSON.stringify(NEW_USER)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ User created successfully!');
      console.log('User ID:', data.id);
      console.log('Username:', data.username);
      console.log('Email:', data.email);
      console.log('Role:', data.roles);
    } else {
      console.log('❌ Failed to create user');
      console.log('Error:', JSON.stringify(data, null, 2));
      console.log('\n💡 Try creating the user manually in WordPress Admin:');
      console.log('   1. Go to https://azure-dugong-563921.hostingersite.com/wp-admin');
      console.log('   2. Login with: admin / iLTrxF^0YWh9s*fLx9lPGszj');
      console.log('   3. Navigate to Users > Add New');
      console.log('   4. Create user with username: forwardfalls_admin');
      console.log('   5. Set role to Administrator');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createUser();