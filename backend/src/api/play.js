import express from "express";
const router = express.Router();
import History from '../models/history.js';
import User from '../models/user.js';
import auth from "../utils/auth.js";

router.post('/toss', auth, async (req, res) => {
    const { wagered_amount } = req.body;
    const user_id = req.userId;

    try {
        // Check user's balance
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.balance < wagered_amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct wagered tokens from the user's account
        user.balance -= wagered_amount;
        await user.save();

        // Generate a random result for the coin toss
        const result = Math.random() < 0.5 ? 'HEAD' : 'TRAIL';

        // Determine the outcome based on the game rules
        let payout = 0;
        if (result === req.body.answer) {
            // User wins
            if (user.winning_streak === 4) {
                payout = wagered_amount * 10;
                user.winning_streak = 0;
            } else if (user.winning_streak === 2) {
                payout = wagered_amount * 3;
                user.winning_streak = user.winning_streak + 1;
            } else {
                payout = wagered_amount * 2;
                user.winning_streak = user.winning_streak + 1;
            }
            user.balance += payout;
        }
        else {
            user.winning_streak = 0;
        }

        // Save toss game history
        const history = new History({
            user_id,
            answer: req.body.answer,
            result: result == req.body.answer,
            amount: wagered_amount,
            payout,
        });
        await history.save();

        // Update user's winning streak and balance
        await user.save();

        res.json({ result, payout, balance: user.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/history', auth, async (req, res) => {
    const user_id = req.userId;
    try {
        const history = await History.find({ user_id }).sort({ _id: -1 }).limit(10);

        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;