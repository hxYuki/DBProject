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

export default function Review() {
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
              {news.Title}
            </Typography>
            <Typography gutterBottom variant="caption" align="right">
              {new Date(news.PublishTime).toDateString()}
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: news.Content }}
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
