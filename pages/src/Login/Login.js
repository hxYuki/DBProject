import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./Login.css";
import TokenInfo from "../store/LoginStore";
import Req from "../requests/requests";
function Login() {
  let history = useHistory();
  if (TokenInfo.getToken()) history.push("/");

  const [form, setForm] = useState({
    id: null,
    password: null,
    isEditor: false,
  });
  const [signed, setSigned] = useState(false);

  const handleLogin = async () => {
    try {
      var res = await Req.post("login", form);
      console.log(res);
      if (res.ok && res.status === 200) {
        TokenInfo.signin(await res.json());

        history.push("/");
      }
    } catch (error) {}
  };
  return (
    <Box bgcolor="primary.main" css={{ height: "100%" }}>
      <Container style={{ height: "100%" }}>
        <Grid
          style={{ height: "100%" }}
          container
          direction="column"
          justify="space-around"
          alignItems="stretch"
        >
          <Grid container justify="center">
            <Grid item xs={10} sm={6} lg={4}>
              <Box bgcolor="#fff" css={{ padding: 10, borderRadius: 5 }}>
                <Box color="primary.main" css={{ margin: 10 }}>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    新闻发布管理系统
                  </Typography>
                </Box>
                <Box css={{ margin: 10 }}>
                  <TextField
                    value={form.id}
                    onChange={(event) => {
                      setForm({ ...form, id: event.target.value });
                    }}
                    label="证件号"
                    fullWidth
                  />
                </Box>
                <Box css={{ margin: 10 }}>
                  <TextField
                    value={form.password}
                    onChange={(event) => {
                      setForm({ ...form, password: event.target.value });
                    }}
                    label="密码"
                    type="password"
                    fullWidth
                  />
                </Box>
                <Box css={{ marginRight: 10, marginLeft: 10 }}>
                  <Grid
                    container
                    direction="row-reverse"
                    justify="space-between"
                  >
                    <FormControlLabel
                      label={form.isEditor?"主编登录":"记者登录"}
                      labelPlacement="start"
                      control={
                        <Switch
                          value={form.isEditor}
                          onChange={(event) => {
                            console.log(event.target.value);

                            setForm({ ...form, isEditor: !form.isEditor });
                          }}
                        />
                      }
                    />
                    {/* <Button>重置密码</Button> */}
                  </Grid>
                </Box>
                <Box css={{ margin: 10 }}>
                  <Button
                    onClick={() => {
                      handleLogin();
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    登录
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
