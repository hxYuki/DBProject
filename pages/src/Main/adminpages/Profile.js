import React, { useState, useEffect } from "react";
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
import api from "../../requests/api";
import { useHistory } from "react-router-dom";

export default function Profile() {
  let history = useHistory();
  const [sex, setSex] = React.useState("");
  const [form, setForm] = useState({
    journalistId: '',
    name: '',
    age: '',
    gender: '',
    phonenumber: '',
    emailAddress: '',
    address: '',
    intro:'',
    password: '',
    
    
  })
  const [pwd, setPwd] = useState({
    newpass:'',
    confirmpass:''
  })
  useEffect(()=>{
    api.get(`profile`).then(res=>{
      setForm(res.data)
    })
  },[])
  const handleChangeProfile=()=>{
    api.put('profile', form).then(res=>{
      setForm(res.data);
    })
  }
  const handleChangePwd=()=>{
    api.put('passwd', {
      password:form.password,
      newPass: pwd.newpass
    }).then(res=>{
      history.push('');
    })
  }
  return (
    <Container>
      <Grid container spacing={3} alignItems='flex-end'>
        <Grid item xs={3}>
          <TextField readonly value={form.name} onChange={(e)=>{setForm({...form, name:e.target.value})}} label="姓名" />
        </Grid>
        <Grid item xs={3}>
          <TextField value={form.age} onChange={(e)=>{setForm({...form, age:e.target.value})}} label="年龄" type="number" />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel id="sex">性别</InputLabel>
            <Select
              labelId="sex"
              id="sex"
              value={form.gender} onChange={(e)=>{setForm({...form, gender:e.target.value})}}
              style={{ minWidth: 60 }}
            >
              <MenuItem value={"Male"}>男</MenuItem>
              <MenuItem value={"Female"}>女</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={'auto'}>
            <Button onClick={handleChangeProfile} variant='contained'>保存修改</Button>
        </Grid>
        <Grid item xs={4}>
          <TextField value={form.phonenumber} onChange={(e)=>{setForm({...form, phonenumber:e.target.value})}} type="phonenumber" label="电话" />
        </Grid>
        <Grid item xs={5}>
          <TextField value={form.emailAddress} onChange={(e)=>{setForm({...form, emailAddress:e.target.value})}} id="name" label="邮箱" type="email" fullWidth />
        </Grid>
        <Grid item xs={10}>
          <TextField value={form.address} onChange={(e)=>{setForm({...form, address:e.target.value})}} label="地址" fullWidth />
        </Grid>
        <Grid item xs={10}>
          <TextField value={form.intro} onChange={(e)=>{setForm({...form, intro:e.target.value})}} label="个人介绍" fullWidth />
        </Grid>
        <Grid item xs={12}>
        <Divider/>
        </Grid>
        <Grid item xs={12} container alignItems="flex-end">
          <Grid item xs={3}>
            <Box style={{paddingBottom:5}}>
              <TextField value={form.password} onChange={(e)=>{setForm({...form, password:e.target.value})}} type='password' label="旧密码" />
            </Box>
            <Box style={{paddingBottom:5}}>
              <TextField value={pwd.newpass} onChange={(e)=>{setPwd({...pwd, newpass:e.target.value})}} type='password' label="新密码" />
            </Box>
            <Box>
              <TextField value={pwd.confirmpass} onChange={(e)=>{setPwd({...pwd, confirmpass:e.target.value})}} type='password' label="确认密码" />
            </Box>
          </Grid>
          <Grid item>
            <Button disabled={ pwd.newpass==="" || pwd.newpass!==pwd.confirmpass} onClick={handleChangePwd} variant="outlined">修改密码</Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
