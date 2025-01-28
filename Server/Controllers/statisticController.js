import User from '../Models/userModel.js';

export const reduceLife = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user && user.life > 0) {
      user.life -= 1;
      await user.save();
      res.status(200).json({ message: 'Life reduced by 1', life: user.life });
    } else {
      res.status(400).json({ message: 'No life left or user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const refillLife = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user && user.gems >= 350) {
      user.gems -= 350;
      user.life = 5;
      await user.save();
      res.status(200).json({ message: 'Life refilled', life: user.life, gems: user.gems });
    } else {
      res.status(400).json({ message: 'Insufficient gems or user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const rewardGems = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.gems += 30;
      await user.save();
      res.status(200).json({ message: 'Gems rewarded', gems: user.gems });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const xpPoints = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.xpPoints += 15
      await user.save();
      res.status(200).json({ xpPoints: user.xpPoints });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
