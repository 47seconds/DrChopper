// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// // Login function
// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   // Dummy user for demonstration
//   const user = { id: 1, username: 'admin' };
//   const validPassword = await bcrypt.compare(password, '$2a$10$dummyhash'); // Compare with hashed password

//   if (!validPassword) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token, user });
// };

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Temporary user storage for demonstration
//console.log("allah");
const demoUsers = [
  {
    id: 1,
    username: 'admin',
    // Password: "1" hashed properly
    password: '$2a$10$7Bclk6VU3DfqO5kgzR1.OU4t6f7QzZn7YIoL4h6e6L3c5Jj4JZ7mW'
  }
];

// Login function
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    // Input validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find user
    const user = demoUsers.find(u => u.username === username);
    console.log("user", user);
    if (!user) {
      console.log("allah");
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
        
      });
    }

    // Password comparison
    //const validPassword = await bcrypt.compare(password, user.password);
    const validPassword=user.password;
    
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};