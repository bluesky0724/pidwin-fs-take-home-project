import React, { useEffect, useState } from "react";
import { Container, Grow, Paper, Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import TossGameForm from "../TossGameForm";
import HistoryTable from "../HistoryTable";
import { getHistory, getMyProfile, playToss } from "../../api";
import { error, info } from "../../messages";
import { formatTime } from "../../utils/function";

const Home = () => {

  const [userData, setUserData] = useState();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;

  const fetchUserData = async () => {
    try {
      const result = await getMyProfile();
      setUserData(result.data)
    }
    catch (e) {
      console.log(e);
    }
  }

  const fetchHistory = async () => {
    try {
      const result = await getHistory();
      if (result.data) {
        setHistory(result.data.map((item) => ({
          ...item,
          time: formatTime(item.created_at)
        })));
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const submitAnswer = async (formData) => {
    try {
      const result = await playToss(formData);
      if (result.data) {
        switch (result.data.game_result) {
          case "LOSS":
            info("Sorry, you lost. You can win next time.");
            break;
          case "WIN":
            info("Congratulation, you won!");
            break;
          case "3X":
            info("Well done! You won 3 times.");
            break;
          case "5X":
            info("Amazing! You won 5 times.");
            break;
          default: break;
        }
        await fetchHistory();
        await fetchUserData();
      }
    }
    catch (e) {
      error("Error in API call");
    }

  }

  useEffect(() => {
    fetchUserData();
    fetchHistory();
  }, [])

  return (
    <Grow in>
      <Container component="main">
        <Paper>
          {isSingedIn !== "null" && isSingedIn !== null && userData ? (
            <Stack>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <Stack direction="row" gap="20px">
                <TossGameForm userBalance={userData.balance} onSubmit={submitAnswer} />
                <HistoryTable history={history} />
              </Stack>
            </Stack>

          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow >
  );
};

export default Home;
