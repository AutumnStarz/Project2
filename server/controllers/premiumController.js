// for those who are PREMIUM
const User = require('../models/User');

const upgradeToPremium = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.premium = true;
    await user.save();

    res.json({ message: 'Upgraded to premium!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upgrade' });
  }
};

module.exports = { upgradeToPremium };