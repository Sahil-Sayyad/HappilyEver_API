const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { universityId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Find the user in the database by universityId
    let user = await User.findOne({ universityId });
    if (!user) {
        user = await User.create({
        universityId,
        password: hashedPassword,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Incorrect password." });
    }
    // If authentication is successful, generate a JWT
    const token = jwt.sign({ userId: user._id }, 'sahil', {
      expiresIn: "1h",
    });
   return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {login};