import styles from "./Login.module.scss";
import {
  Container,
  Typography,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useState } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => false,
  },
};

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const checkLogin = () => {
    if (email === "blackleo99@gmail.com" && password === "brokenHeart") {
      props.setIsSignedIn(true);
    } else setError("Email Address or Password incorrect");
  };

  return (
    <div className="App">
      <Container maxWidth="xs">
        <div className={styles.paper}>
          <Avatar className={styles.loginIcon}>
            <LockOutlined />
          </Avatar>
          <Typography className={styles.login} component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <p className={styles.error}>{error}</p>}
          <TextField
            id="email"
            fullWidth
            required
            label="Email Address"
            margin="normal"
            autoComplete="email"
            variant="outlined"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            margin="normal"
            autoComplete="email"
            variant="outlined"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          className={styles.submit}
          onClick={()=>checkLogin}
          color="primary"
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
        <div className={styles.formDivSpan}>
          <span className={styles.formSpan}>Or</span>
        </div>
        <StyledFirebaseAuth className={styles.chao}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <div className={styles.example}>
          (You can try with Email: <span>blackleo99@gmail.com </span>
          Password: <span>brokenHeart</span>)
        </div>
      </Container>
    </div>
  );
}
