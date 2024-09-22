const User = require('./User.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const userData = req.body;
    userData.role = "user";
    try {
        const newUser = await User.create(userData);
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Username/password incorrect...' });
    }

    const { _id, email, role } = user;
    const token = jwt.sign(
      { id: _id, email, role, username }, 
      process.env.JSON_SECRETKEY || 'your-default-secret-key', 
      { expiresIn: '1800s' }
    );

    res.status(200).json({ token, user: { id: _id, username, email, role } });  
  } catch (error) {
    console.log('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUser = async(req,res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
}

const addUser = async(req,res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add user' });
    }
};

const updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
};
  
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = { registerUser, loginUser, getUser, addUser, updateUser, deleteUser };
