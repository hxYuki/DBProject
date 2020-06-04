import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  FormControl,
  TextField,
  Grid,
  InputLabel,
  ButtonGroup,
  Button,
  Icon
} from "@material-ui/core";
import { CloudUpload, Save, Image as ImageIcon } from "@material-ui/icons";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { Upload } from 'antd'
import { useParams, useHistory } from "react-router-dom";

import Req from '../../requests/requests';
import TokenInfo from '../../store/LoginStore';
import Api from '../../requests/api';

// import "./NewDraft.css";
function NewDraft() {
  const history = useHistory();
  const { draftId } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [usePut, setUsePut] = useState(false);
  const setAndUpdate = (state) => {
    setEditorState(state)
    return editorState
  }
  let edtState;
  const memorizedState = useMemo(() => setAndUpdate(edtState), [edtState, setAndUpdate])
  useEffect(() => {
    if (draftId) {
      Api.get(`News/draft/${draftId}`).then(res => {
        edtState = (EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.raw))))
        setTitle(res.data.title)
        setUsePut(true);
      })
    }
  })

  const handleImageUpload = async (file) => {

    let formData = new FormData();
    formData.append('image', file, 'iamge.png');
    let res = await Req.postFile('Images/post', formData)

    return {
      data: {
        link: 'https://localhost:44365/api/Images/' + (await res.json()).pid
      }
    }
  }
  const handleSubmit = async () => {
    let raw = convertToRaw(editorState.getCurrentContent())
    if (!usePut) {
      await Req.post('News/submit', {
        "Title": title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    } else {
      await Api.put(`News/submit/${draftId}`, {
        "NewsId": draftId,
        "Title": title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    }

    history.push(`/publication`)
  }
  const handleSave = async () => {
    let raw = convertToRaw(editorState.getCurrentContent())
    if (!usePut) {
      await Req.post('News/adddraft', {
        "Title": title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    } else {
      await Api.put(`News/draft/${draftId}`, {
        "NewsId": draftId,
        "Title": title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    }

    history.push(`/drafts`)
  }
  const handleChange = (state) => {
    console.log(editorState == state)
    edtState = state;
  }
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xl={4} lg={5} md={6} sm={7} xs={8}>
          <TextField
            size="medium"
            label="标题"
            value={title}
            onChange={(event) => { setTitle(event.target.value) }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={8}
          lg={7}
          md={6}
          sm={5}
          xs={4}
          justify="flex-end"
          container
        >
          <Grid item>
            <ButtonGroup variant="contained">
              <Button onClick={() => { handleSave() }} startIcon={<Save />}>暂存</Button>
              <Button onClick={() => { handleSubmit() }} endIcon={<CloudUpload />} color="primary">
                发布
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item></Grid>
          <Grid item>
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={handleChange}
              localization={{
                locale: 'zh',
              }}
              toolbar={{
                options: ['inline', 'colorPicker', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                colorPicker: {
                  className: undefined,
                  component: undefined,
                  popupClassName: undefined,
                  colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                    'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                    'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                    'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                    'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                    'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                },
                image: {
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: handleImageUpload,
                  previewImage: true,
                  inputAccept: 'image/*',
                  alt: { present: true, mandatory: true }
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

class NewDraftClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
      usePut: false
    }
  }

  componentWillMount() {
    // console.log(this.props);
    
    const { draftId } = this.props.match.params
    if (draftId) {
      Api.get(`News/draft/${draftId}`).then(res => {
        this.setState({ ...this.state, editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.raw))) })
        this.setState({ ...this.state, title: res.data.title })
        this.setState({ ...this.state, usePut: true });
      })
    }
  }
  handleImageUpload = async (file) => {

    let formData = new FormData();
    formData.append('image', file, 'iamge.png');
    let res = await Req.postFile('Images/post', formData)

    return {
      data: {
        link: 'https://localhost:44365/api/Images/' + (await res.json()).pid
      }
    }
  }
  handleSave = async () => {
    // const history = useHistory();
    const { draftId } = this.props.match.params
    let raw = convertToRaw(this.state.editorState.getCurrentContent())
    if (!this.state.usePut) {
      await Req.post('News/adddraft', {
        "Title": this.state.title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    } else {
      await Api.put(`News/draft/${draftId}`, {
        "NewsId": draftId,
        "Title": this.state.title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    }

    this.props.history.push(`/drafts`)
  }

  handleSubmit = async () => {
    // const history = useHistory();
    const { draftId } = this.props.match.params
    let raw = convertToRaw(this.state.editorState.getCurrentContent())
    if (!this.state.usePut) {
      await Req.post('News/submit', {
        "Title": this.state.title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    } else {
      await Api.put(`News/submit/${draftId}`, {
        "NewsId": draftId,
        "Title": this.state.title,
        "Content": draftToHtml(raw),
        "Raw": JSON.stringify(raw)
      })
    }

    this.props.history.push(`/publication`)
  }

  handleChange = (state) => {
    this.setState({ ...this.state, editorState: state })
  }

  render() {
    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xl={4} lg={5} md={6} sm={7} xs={8}>
            <TextField
              size="medium"
              label="标题"
              value={this.state.title}
              onChange={(event) => { this.setState({ ...this.state, title: event.target.value }) }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xl={8}
            lg={7}
            md={6}
            sm={5}
            xs={4}
            justify="flex-end"
            container
          >
            <Grid item>
              <ButtonGroup variant="contained">
                <Button onClick={() => { this.handleSave() }} startIcon={<Save />}>暂存</Button>
                <Button onClick={() => { this.handleSubmit() }} endIcon={<CloudUpload />} color="primary">
                  发布
              </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item></Grid>
            <Grid item>
              <Editor
                editorState={this.state.editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={(state) => { this.handleChange(state) }}
                localization={{
                  locale: 'zh',
                }}
                toolbar={{
                  options: ['inline', 'colorPicker', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                  colorPicker: {
                    className: undefined,
                    component: undefined,
                    popupClassName: undefined,
                    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                  },
                  image: {
                    urlEnabled: true,
                    uploadEnabled: true,
                    alignmentEnabled: true,
                    uploadCallback: this.handleImageUpload,
                    previewImage: true,
                    inputAccept: 'image/*',
                    alt: { present: true, mandatory: true }
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default NewDraftClass;
