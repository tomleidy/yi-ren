const express = require('express');
const { User } = require('../models/user');
const passport = require('passport');

const router = express.Router();
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.get('/', verifyUser, verifyAdmin, async (req, res, next) => {
    // return list of users for admin only
});

router.get('/:username/profile', async (req, res, next) => {
    // if logged in user = username, return full profile information
    // else return basic profile information for username
})

router.get("/:username/adminView", async (req, res, next) => {
    // if logged in user is an admin, return full profile information
    // else 404 (I know, 403 is better, but we're adding security through obscurity)
})

router.put('/profile', async (req, res) => {
    if (!req.session.passport) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const { _id: userId } = req.session.passport.user;

    try {
        const updateFields = {};
        const allowedFields = [
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'address',
            'dateOfBirth'
        ];

        // Only include fields that are present and allowed
        allowedFields.forEach(field => {
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
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
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
        res.status(500).json({ message: "Error updating profile" });
    }
});



module.exports = router;
