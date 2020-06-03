import React from "react";
import {
  Box,
  List,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  ListItem,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams, Link } from "react-router-dom";
// import './ViewNews.css';


const useStyles = makeStyles({
    clearAStyle:{
        '&:link, &:visited, &:hover, &:active':{
            textDecoration:'none',
            color:'inherit'
        }
    }
})
export default function ViewNews() {
  const dataList = [
    {
      Id: 0,
      Title: "title1",
      Abstract:
        "asodfjiasdfoahjsdofihaosidfhoiahsdofihoaisdhfioahsodifhoiahsdfoih",
      HeadImage: "",
      PublishTime: 1591155637000,
    },
  ];

  let match = useRouteMatch();
  const classes = useStyles();

  return (
    <Box>
      <Router>
        <Switch>
          <Route path={`/view/:newsId`}>
            <News/>
          </Route>
          <Route path={'/'}>
            <List>
              {dataList.map((v) => (
                <ListItem key={v.Id}>
                  <Card style={{ width: "100%" }}>
                    <Link className={classes.clearAStyle} to={`view/${v.Id}`}>
                    <CardActionArea>
                      <CardMedia />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {v.Title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {v.Abstract}
                        </Typography>
                        <Typography variant="caption">
                          {new Date(v.PublishTime).toDateString()}
                        </Typography>
                      </CardContent>
                    </CardActionArea>{/*  */}
                    </Link>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

function News(){
    const {newsId} = useParams();
    const news = {
        Id: 0,
        Title: "title1",
        Abstract:
          "asodfjiasdfoahjsdofihaosidfhoiahsdofihoaisdhfioahsodifhoiahsdfoih",
        Content:"<p>aoihfusdddddddddweflabsdkfhgaiksudgyfuyagsdiufygauiosydgfuyagsduyfgauisydgfuiaygsidufguiasydgfuiy</p>",
        HeadImage: "",
        PublishTime: 1591155637000,
      }
    console.log(newsId)
    return(
        <Paper style={{padding:20}}>
            <Typography gutterBottom variant="h1">
                {news.Title}
            </Typography>
            <Typography gutterBottom variant='caption' align='right' >
                {new Date(news.PublishTime).toDateString()}
            </Typography>
            <Typography variant='body1' dangerouslySetInnerHTML={{__html:news.Content}}>

            </Typography>
        </Paper>
    )
}