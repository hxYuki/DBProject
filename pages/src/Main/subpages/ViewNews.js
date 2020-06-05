import React, { useEffect, useState } from "react";
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
  withStyles,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams, Link } from "react-router-dom";
import api from "../../requests/api";
// import './ViewNews.css';


const styles = {
    clearAStyle:{
        '&:link, &:visited, &:hover, &:active':{
            textDecoration:'none',
            color:'inherit'
        }
    }
}
export default withStyles(styles)(class ViewNewsClass extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataList:[]
    }
  }

  componentWillMount(){
    api.get('News/view').then(res=>{
      this.setState({dataList:res.data})
    })
  }
  render(){
    // const classes = useStyles();
    const { classes } = this.props;
    return(
      <Box>
      <Router>
        <Switch>
          <Route path={`/view/:newsId`}>
            <News/>
          </Route>
          <Route path={'/'}>
            <List>
              {this.state.dataList.map((v) => (
                <ListItem key={v.newsId}>
                  <Card style={{ width: "100%" }}>
                    <Link className={classes.clearAStyle} to={`view/${v.newsId}`}>
                    <CardActionArea>
                      <CardMedia />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {v.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {v.abstract}
                        </Typography>
                        <Typography variant="caption">
                          {new Date(v.publishTime).toDateString()}
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
    )
  }
})


// function ViewNews() {
//   const dataList = [
//     {
//       Id: 0,
//       Title: "title1",
//       Abstract:
//         "asodfjiasdfoahjsdofihaosidfhoiahsdofihoaisdhfioahsodifhoiahsdfoih",
//       HeadImage: "",
//       PublishTime: 1591155637000,
//     },
//   ];
  
//   const classes = useStyles();

//   return (
//     <Box>
//       <Router>
//         <Switch>
//           <Route path={`/view/:newsId`}>
//             <News/>
//           </Route>
//           <Route path={'/'}>
//             <List>
//               {dataList.map((v) => (
//                 <ListItem key={v.Id}>
//                   <Card style={{ width: "100%" }}>
//                     <Link className={classes.clearAStyle} to={`view/${v.Id}`}>
//                     <CardActionArea>
//                       <CardMedia />
//                       <CardContent>
//                         <Typography gutterBottom variant="h5" component="h2">
//                           {v.Title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           color="textSecondary"
//                           component="p"
//                         >
//                           {v.Abstract}
//                         </Typography>
//                         <Typography variant="caption">
//                           {new Date(v.PublishTime).toDateString()}
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>{/*  */}
//                     </Link>
//                   </Card>
//                 </ListItem>
//               ))}
//             </List>
//           </Route>
//         </Switch>
//       </Router>
//     </Box>
//   );
// }

class NewsClass extends React.Component{
  constructor(props){
    super(props);
    this.state={
      news:{}
    };
  }
  componentWillMount(){
    const {newsId} = this.props.match.params
    api.get(`News/view/${newsId}`).then(res=>{
      this.setState({news:res.data})
    })
  }
  render(){
    return(
      <Paper style={{padding:20}}>
            <Typography gutterBottom variant="h1">
                {this.state.news.title}
            </Typography>
            <Typography gutterBottom variant='caption' align='right' >
                {new Date(this.state.news.publishTime).toDateString()}
            </Typography>
            <Typography variant='body1' dangerouslySetInnerHTML={{__html:this.state.news.content}}>

            </Typography>
        </Paper>
    )
  }
}

function News(){
    const {newsId} = useParams();
    const [news, setNews] = useState({});
    useEffect(()=>{
      api.get(`News/view/${newsId}`).then(res=>{
        setNews(res.data)
      })
    },[])
    return(
        <Paper style={{padding:20}}>
            <Typography gutterBottom variant="h1">
                {news.title}
            </Typography>
            <Typography gutterBottom variant='caption' align='right' >
                {new Date(news.publishTime).toDateString()}
            </Typography>
            <Typography variant='body1' dangerouslySetInnerHTML={{__html:news.content}}>

            </Typography>
        </Paper>
    )
}