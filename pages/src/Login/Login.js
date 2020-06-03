import React from 'react';
import {Box, Container, Button, TextField, Grid, Typography, Switch, FormControlLabel} from '@material-ui/core';
import './Login.css';

function Login(){
    return(
        <Box bgcolor="primary.main" css={{height:'100%'}}>
            <Container style={{height:'100%'}}>
                <Grid style={{height:"100%"}} container direction='column' justify='space-around' alignItems='stretch'>
                    <Grid container justify='center'>
                        <Grid item xs={10} sm={6} lg={4}>
                            <Box bgcolor="#fff" css={{padding:10, borderRadius:5}}>
                                <Box color='primary.main' css={{margin:10}}>
                                    <Typography variant='h6' style={{fontWeight:600}}>
                                        新闻发布管理系统
                                    </Typography>
                                </Box>
                                <Box css={{margin:10}}>
                                    <TextField label="用户名" fullWidth/>
                                </Box>
                                <Box css={{margin:10}}>
                                    <TextField label="密码" type="password" fullWidth/>
                                </Box>
                                <Box css={{marginRight:10, marginLeft:10}}>
                                    <Grid container direction='row-reverse' justify='space-between'>
                                        <FormControlLabel label={"记者登录"} labelPlacement="start" control={<Switch />} />
                                        <Button>重置密码</Button>
                                    </Grid>
                                </Box>
                                <Box css={{margin:10}}>
                                    <Button variant="contained" color="primary" fullWidth>登录</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Login;