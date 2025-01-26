const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword , role});
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(201).json({ message: 'User registered successfully', token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const responseUser = {
      username: user.username,
      email: user.email,
      role: user.role,
    }

    res.json({ message: 'Login successful', token, user: responseUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find(); // Fetch all users from the database
      res.status(200).json({
          success: true,
          message: 'Users retrieved successfully.',
          data: users,
      });
  } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to retrieve users.',
          error: error.message,
      });
  }
};

exports.getUserByUsername = async (req, res) => {
  const { username } = req.params; // Get the username from the request parameters

  try {
      // Find the user by username in the database
      const user = await User.findOne({ username }); // Replace with the appropriate query for your DB
      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'User not found',
          });
      }

      res.status(200).json({
          success: true,
          message: 'User retrieved successfully',
          data: user,
      });
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
          success: false,
          message: 'Error fetching user',
          error: error.message,
      });
  }
};
// ... other user-related controller functions ...