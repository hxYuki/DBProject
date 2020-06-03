import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Button,
  Box,
  Divider,
} from "@material-ui/core";

export default function Profile() {
  const [sex, setSex] = React.useState("");

  const handleChange = (event) => {
    setSex(event.target.value);
  };
  return (
    <Container>
      <Grid container spacing={3} alignItems='flex-end'>
        <Grid item xs={3}>
          <TextField label="姓名" />
        </Grid>
        <Grid item xs={3}>
          <TextField label="年龄" type="number" />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel id="sex">性别</InputLabel>
            <Select
              labelId="sex"
              id="sex"
              value={sex}
              onChange={handleChange}
              style={{ minWidth: 60 }}
            >
              <MenuItem value={"male"}>男</MenuItem>
              <MenuItem value={"female"}>女</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={'auto'}>
            <Button variant='contained'>保存修改</Button>
        </Grid>
        <Grid item xs={4}>
          <TextField type="phonenumber" label="电话" />
        </Grid>
        <Grid item xs={5}>
          <TextField autoFocus id="name" label="邮箱" type="email" fullWidth />
        </Grid>
        <Grid item xs={10}>
          <TextField label="地址" fullWidth />
        </Grid>
        <Grid item xs={10}>
          <TextField label="个人介绍" fullWidth />
        </Grid>
        <Grid item xs={12}>
        <Divider/>
        </Grid>
        <Grid item xs={12} container alignItems="flex-end">
          <Grid item xs={3}>
            <Box style={{paddingBottom:5}}>
              <TextField label="旧密码" />
            </Box>
            <Box style={{paddingBottom:5}}>
              <TextField label="新密码" />
            </Box>
            <Box>
              <TextField label="确认密码" />
            </Box>
          </Grid>
          <Grid item>
            <Button variant="outlined">修改密码</Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
