import React, { useState } from 'react';
import { TextField, FormControlLabel, Radio, RadioGroup, Button, Typography, Card, CardContent } from '@mui/material';

function TossGameForm({ userBalance, onSubmit }) {
    const [amount, setAmount] = useState('');
    const [choice, setChoice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ amount, answer: choice });
    };

    return (
        <Card sx={{ width: '400px' }}>
            <CardContent>
                <Typography variant="h6">User Balance: {userBalance}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Token Amount"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        required
                    />
                    <RadioGroup
                        aria-label="choice"
                        name="choice"
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                        row
                        required
                    >
                        <FormControlLabel value="HEAD" control={<Radio />} label="HEAD" />
                        <FormControlLabel value="TRAIL" control={<Radio />} label="TRAIL" />
                    </RadioGroup>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default TossGameForm;