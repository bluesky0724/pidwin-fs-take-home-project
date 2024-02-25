import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, CardContent, Typography } from '@mui/material';

function HistoryTable({ history }) {
    return (
        <Card sx={{ width: '400px' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    History
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Payout</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((item, index) => (
                                <TableRow key={index} style={{ backgroundColor: item.result ? 'green' : 'red' }}>
                                    <TableCell>{item.time}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                    <TableCell>{item.result ? 'Win' : 'Loss'}</TableCell>
                                    <TableCell>{item.payout}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </CardContent>
        </Card>
    );
}

export default HistoryTable;