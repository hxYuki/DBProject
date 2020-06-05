import React, { useEffect, useMemo, useState } from "react";
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
import api from "../../requests/api";

const columns = [
  { id: "name", label: "姓名", minWidth: 170 },
  { id: "code", label: "证件号", minWidth: 100 },
  {
    id: "action",
    label: "操作",
    minWidth: 170,
    align: "right",
    format: (buttons, editHandle, disabled, disableHandle) =>
      buttons(editHandle, disabled, disableHandle),
  },
];

function createData(name, code, id, disabled) {
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
        {disabled ? '启用' : '禁用'}
      </Button>
    </ButtonGroup>
  );
  return { name, code, id, disabled, action };
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
  const [addOpen, setAddOpen] = useState(false);
  const [rows, setRows] = React.useState([]);
  const [form, setForm] = React.useState({
    journalistId: '',
    name: '',
    age: '',
    gender: '',
    phonenumber: '',
    emailAddress: '',
    address: '',
    password: ''
  })

  useEffect(() => {
    api.get('Journalists').then(res => {
      setRows(res.data.map(v => createData(v.name, v.certId, v.journalistId, v.banished)))
    })
  }, []);

  const handleBanish = (id) => {
    api.put(`Journalists/ban/${id}`).then(res => {
      const r = rows.map(v => (v.id === id ? createData(v.name, v.code, v.id, res.data.banished) : v))
      setRows(r)

    })
  }
  const handleClickOpen = (id) => {
    api.get(`Journalists/${id}`).then(res => {
      setForm(res.data)
    })
    setOpen(true);
  };
  const handleClose = (e) => {
    switch (e.target.innerHTML) {
      case '确认修改':
        api.put(`Journalists/${form.journalistId}`, { journalist: form, password: form.password }).then(res => {
          setForm({});
          setOpen(false);
        })
        break;
      case '取消':

      default:
        setForm({});
        setOpen(false);
        break;
    }

  };
  const handleClickAdd = () => {
    setAddOpen(true);
  };
  const handleAddClose = (e) => {
    switch (e.target.innerHTML) {
      case '确认':
        api.post(`Journalists`, { journalist: form, password: form.password }).then(res => {
          setRows(rows.concat([createData(res.data.name, res.data.certId, res.data.journalistId, res.data.banished)]));
          setForm({});
          setAddOpen(false);
        })
        break;
      case '取消':

      default:
        setForm({});
        setAddOpen(false);
        break;
    }

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
          <Button onClick={setAddOpen} variant="contained">添加记者</Button>
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
                                  handleBanish
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
              <TextField value={form.name} onChange={(event) => { setForm({ ...form, name: event.target.value }) }} label="姓名" />
            </Grid>
            <Grid item xs={2}>
              <TextField value={form.age} onChange={event => { setForm({ ...form, age: event.target.value }) }} label="年龄" type="number" />
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <InputLabel id="sex">性别</InputLabel>
                <Select
                  labelId="sex"
                  id="sex"
                  value={form.gender}
                  onChange={(e) => { setForm({ ...form, gender: e.target.value }) }}
                  style={{ minWidth: 60 }}
                >
                  <MenuItem value={"Male"}>男</MenuItem>
                  <MenuItem value={"Female"}>女</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <TextField value={form.phonenumber} onChange={e => { setForm({ ...form, phonenumber: e.target.value }) }} type="phonenumber" label="电话" />
            </Grid>
            <Grid item xs={5}>
              <TextField
                value={form.emailAddress}
                onChange={e => { setForm({ ...form, emailAddress: e.target.value }) }}
                id="name"
                label="邮箱"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField value={form.address} onChange={e => { setForm({ ...form, address: e.target.value }) }} label="地址" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField value={form.password} onChange={e => { setForm({ ...form, password: e.target.value }) }} label="新密码" />
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
      <Dialog
        open={addOpen}
        onClose={handleAddClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">添加记者</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField value={form.name} onChange={(event) => { setForm({ ...form, name: event.target.value }) }} label="姓名" />
            </Grid>
            <Grid item xs={2}>
              <TextField value={form.age} onChange={event => { setForm({ ...form, age: event.target.value }) }} label="年龄" type="number" />
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <InputLabel id="sex">性别</InputLabel>
                <Select
                  labelId="sex"
                  id="sex"
                  value={form.gender}
                  onChange={(e) => { setForm({ ...form, gender: e.target.value }) }}
                  style={{ minWidth: 60 }}
                >
                  <MenuItem value={"Male"}>男</MenuItem>
                  <MenuItem value={"Female"}>女</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <TextField value={form.phonenumber} onChange={e => { setForm({ ...form, phonenumber: e.target.value }) }} type="phonenumber" label="电话" />
            </Grid>
            <Grid item xs={5}>
              <TextField
                value={form.emailAddress}
                onChange={e => { setForm({ ...form, emailAddress: e.target.value }) }}
                id="name"
                label="邮箱"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField value={form.address} onChange={e => { setForm({ ...form, address: e.target.value }) }} label="地址" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField value={form.password} onChange={e => { setForm({ ...form, password: e.target.value }) }} label="密码" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            取消
          </Button>
          <Button onClick={handleAddClose} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
