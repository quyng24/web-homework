import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)return res.status(400).json({ message: "Email đã tồn tại" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      });
      res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) res.status(400).json({message: 'Email không đúng'});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Sai mật khẩu'});
            res.json({
                message: 'Đăng nhập thành công',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}