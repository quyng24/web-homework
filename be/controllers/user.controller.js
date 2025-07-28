import User from '../models/user.model.js';

//GET /
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

//PORT /
export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists in the system." });
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

//GET /:id
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ message: "Invalid ID" });
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

//DELETE /:id
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ message: "Invalid ID" });
        const result = await User.deleteOne({ _id: id });
        res.status(result.deletedCount ? 200 : 404).json({message: result.deletedCount ? "User deleted" : "User not found",});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

//PUT /:id
export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        if(!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({message: "Invalid ID"});
        const updateData = req.body;
        const updateUser = await User.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
        if(!updateUser) return res.status(404).json({message:'User not found'});
        res.json(updateUser);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}