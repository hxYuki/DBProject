import React from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const columns = [
  { id: "name", label: "姓名", minWidth: 170 },
  { id: "code", label: "证件号", minWidth: 100 },
  {
    id: "action",
    label: "操作",
    minWidth: 170,
    align: "right",
    format: (buttons, editHandle, disableHandle) =>
      buttons(editHandle, disableHandle),
  },
];

function createData(name, code, id) {
  const action = (editHandle, disableHandle) => (
    <ButtonGroup variant="contained" key={id}>
      <Button
        onClick={() => {
          editHandle(id);
        }}
      >
        编辑
      </Button>
      <Button
        onClick={() => {
          disableHandle(id);
        }}
        color="secondary"
      >
        禁用
      </Button>
    </ButtonGroup>
  );
  return { name, code, action };
}

const rows = [
  createData("Qian Qin", 10001, 0),
  createData("Wang Xilong", 10002, 1),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
export default function Management() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [sex, setSex] = React.useState("");

  const handleChange = (event) => {
    setSex(event.target.value);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container spacing={3}>
      <Grid item container alignItems="flex-end">
        <Grid item xs={8}>
          <Typography gutterBottom variant="h4" component="h2">
            人员管理
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained">添加记者</Button>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format
                                ? column.format(
                                    value,
                                    handleClickOpen,
                                    () => {}
                                  )
                                : value}
                              {/* {value} */}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">编辑成员信息</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField label="姓名" />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={5}>
              <TextField type="phonenumber" label="电话" />
            </Grid>
            <Grid item xs={5}>
              <TextField
                autoFocus
                id="name"
                label="邮箱"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="地址" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="新密码" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleClose} color="primary">
            确认修改
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
