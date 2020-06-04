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
  withStyles,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Link,
} from "react-router-dom";
import api from "../../requests/api";

const styles = {
  clearAStyle: {
    "&:link, &:visited, &:hover, &:active": {
      textDecoration: "none",
      color: "inherit",
    },
  },
};
export default withStyles(styles)(class DraftListClass extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataList:[]
    }
  }
  componentWillMount(){
    api.get('News/draft').then(res=>{
      this.setState({dataList:res.data})
    })
  }

  render(){
    const { classes } = this.props;

    return (
      <Box>
        <List>
          {this.state.dataList.map((v) => (
            <ListItem key={v.newsId}>
              <Card style={{ width: "100%" }}>
                <Link className={classes.clearAStyle} to={`/new/${v.newsId}`}>
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
                        {/* {v.content} */}
                      </Typography>
                      <Typography variant="caption">
                        {new Date(v.createTime).toDateString()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/*  */}
                </Link>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
})

// function DraftList() {
//   const dataList = [
//     {
//       Id: 0,
//       Title: "title1",
//       Content:
//         "asodfjiasdfoahjsdofihaosidfhoiahsdofihoaisdhfioahsodifhoiahsdfoih",
//       CreateTime: 1591155637000,
//     },
//   ];

//   const classes = useStyles();

//   return (
//     <Box>
//       <List>
//         {dataList.map((v) => (
//           <ListItem key={v.Id}>
//             <Card style={{ width: "100%" }}>
//               <Link className={classes.clearAStyle} to={`/new/${v.Id}`}>
//                 <CardActionArea>
//                   <CardMedia />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       {v.Title}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="textSecondary"
//                       component="p"
//                     >
//                       {v.Content}
//                     </Typography>
//                     <Typography variant="caption">
//                       {new Date(v.CreateTime).toDateString()}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//                 {/*  */}
//               </Link>
//             </Card>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// }
