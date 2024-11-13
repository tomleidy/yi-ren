const express = require('express');
const { User } = require('../models/user');
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const { HTTP_STATUS, ALLOWED_USER_UPDATE_FIELDS } = require("../constants");
const router = express.Router();

// Route handlers
const updateProfile = async (req, res) => {
    const { _id: userId } = req.session.passport.user;

    try {
        const updateFields = {};

        // Only include allowed fields that are present
        ALLOWED_USER_UPDATE_FIELDS.forEach(field => {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            {
                new: true,
                select: 'username email firstName lastName phoneNumber address dateOfBirth'
            }
        );

        if (!updatedUser) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "User not found"
            });
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Profile updated successfully",
            user: {
                username: updatedUser.username,
                userId: updatedUser._id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phoneNumber: updatedUser.phoneNumber,
                address: updatedUser.address,
                dateOfBirth: updatedUser.dateOfBirth
            }
        });

    } catch (err) {
        console.error('Profile update error:', err);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error updating profile"
        });
    }
};

const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne(
            { username: req.params.username },
            'username firstName lastName profilePicture'
        );

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "User not found"
            });
        }

        res.status(HTTP_STATUS.OK).json({ user });
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error fetching profile"
        });
    }
};

const getAdminUserList = async (req, res) => {
    try {
        const users = await User.find(
            {},
            'username email firstName lastName dateOfBirth isActive lastLogin'
        );
        res.status(HTTP_STATUS.OK).json({ users });
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error fetching user list"
        });
    }
};

// Routes
router.put('/profile', isAuthenticated, updateProfile);
router.get('/:username/profile', getPublicProfile);
router.get('/', isAuthenticated, isAdmin, getAdminUserList);

module.exports = router;