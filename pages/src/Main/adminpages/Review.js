import React, { useState } from "react";

import {
  Grid,
  List,
  ListItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Hidden,
  TextField,
} from "@material-ui/core";
import api from "../../requests/api";

export default class ReviewClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataList: [],
      news: {},
      open: false,
      currentStep: 'view',
      remark: '',
      abstract: ''
    }
  }

  componentWillMount() {
    api.get('News/review').then(res => {
      if(res.status === 200)
        this.setState({ ...this.state, dataList: res.data })
    })
  }
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };
  handleClickOpen = (id) => {
    api.get(`News/view/${id}`).then(res => {
      this.setState({ ...this.state, news: res.data })
    })
    this.setState({ ...this.state, open: true });
  };
  handleConfirm = (id) => {
    api.put(`News/review/${id}`, { pass: this.state.currentStep==='pass', content: this.state.remark || this.state.abstract }).then(() => {
      this.setState({ ...this.state, open: false, news: {} });
    })

  }
  render() {
    return (
      <Grid container>
        <Grid item lg={10} xs={12}>
          <List>
            {this.state.dataList.map((v) => (
              <ListItem key={v.newsId}>
                <Card style={{ width: "100%" }}>
                  <CardActionArea
                    onClick={() => {
                      this.handleClickOpen(v.newsId);
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {v.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ textOverflow: "ellipsis" }}

                        dangerouslySetInnerHTML={{ __html: v.content }}
                      >
                        {/* {v.content} */}
                      </Typography>
                      <Typography variant="caption">
                        {new Date(v.submitTime).toDateString()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">审核文章</DialogTitle>
          <DialogContent>
            <Box>
              <Typography gutterBottom variant="h1">
                {this.state.news.title}
              </Typography>
              <Typography gutterBottom variant="caption" align="right">
                {new Date(this.state.news.publishTime).toDateString()}
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: this.state.news.content }}
              ></Typography>
            </Box>
          </DialogContent>
          {/* {this.state.currentStep === "view" ? (
            ""
          ) : (
              <DialogContent>
                
              </DialogContent>
            )} */}
          <DialogActions>
          {this.state.currentStep === "revert" ? <TextField label="批注" value={this.state.remark} onChange={(event) => { this.setState({ ...this.state, remark: event.target.value }) }} /> : ""}
                {this.state.currentStep === "pass" ? <TextField label="摘要" value={this.state.abstract} onChange={(event) => { this.setState({ ...this.state, abstract: event.target.value }) }} /> : ""}
            {this.state.currentStep === "view" ? (
              <Box>
                <Button onClick={this.handleClose}>取消</Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    this.setState({ ...this.state, currentStep: "revert" });
                  }}
                >
                  打回
                </Button>
                <Button
                  onClick={() => {
                    this.setState({ ...this.state, currentStep: "pass" });
                  }}
                  color="primary"
                >
                  通过
                </Button>
              </Box>
            ) : (
                <Box>
                  <Button
                    onClick={() => {
                      this.setState({ ...this.state, currentStep: "view" });
                    }}
                  >
                    取消
                </Button>
                  <Button onClick={() => { this.handleConfirm(this.state.news.newsId) }} color="primary">确认</Button>
                </Box>
              )}
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}


function Review() {
  const dataList = [
    {
      Id: 0,
      Title: "title1",
      Content:
        "asodfjiasdfoahjsdofihaosidfhoiahsdofihoaisdhfioahsodifhoiahsdfoih",
      SubmitTime: 1591155637000,
      Status: 0,
    },
  ];
  const news = {
    Id: 0,
    Title: "title1",
    Abstract:
      "asodfjiasdfoahjsdofihaosidfhoiahsdofihoaisdhfioahsodifhoiahsdfoih",
    Content:
      "<p>aoihf usddddddd ddweflabsdkfhga iksudgyfuyags diufygau iosyd gfuyagsdu yfgau isydgfu  iaygs idufguias ydg fuiy</p>",
    HeadImage: "",
    PublishTime: 1591155637000,
  };
  const [open, setOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = useState("view");

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
  };
  return (
    <Grid container>
      <Grid item lg={10} xs={12}>
        <List>
          {dataList.map((v) => (
            <ListItem key={v.Id}>
              <Card style={{ width: "100%" }}>
                <CardActionArea
                  onClick={() => {
                    handleClickOpen(v.Id);
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {v.Title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textOverflow: "ellipsis" }}
                    >
                      {v.Content}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(v.SubmitTime).toDateString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">审核文章</DialogTitle>
        <DialogContent>
          <Box>
            <Typography gutterBottom variant="h1">
              {news.title}
            </Typography>
            <Typography gutterBottom variant="caption" align="right">
              {new Date(news.publishTime).toDateString()}
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></Typography>
          </Box>
        </DialogContent>
        {currentStep === "view" ? (
          ""
        ) : (
            <DialogContent>
              {currentStep === "revert" ? <TextField label="批注" /> : ""}
              {currentStep === "pass" ? <TextField label="摘要" /> : ""}
            </DialogContent>
          )}
        <DialogActions>
          {currentStep === "view" ? (
            <Box>
              <Button onClick={handleClose}>取消</Button>
              <Button
                color="secondary"
                onClick={() => {
                  setCurrentStep("revert");
                }}
              >
                打回
              </Button>
              <Button
                onClick={() => {
                  setCurrentStep("pass");
                }}
                color="primary"
              >
                通过
              </Button>
            </Box>
          ) : (
              <Box>
                <Button
                  onClick={() => {
                    setCurrentStep("view");
                  }}
                >
                  取消
              </Button>
                <Button color="primary">确认</Button>
              </Box>
            )}
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
