import React, { useState, useMemo } from "react";
import {
  Box,
  FormControl,
  TextField,
  Grid,
  InputLabel,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { CloudUpload, Save } from "@material-ui/icons";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { useParams } from "react-router-dom";

// import "./NewDraft.css";
function NewDraft() {
  const {draftId} = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xl={4} lg={5} md={6} sm={7} xs={8}>
          <TextField
            size="medium"
            label="标题"
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
              <Button startIcon={<Save />}>暂存</Button>
              <Button endIcon={<CloudUpload />} color="primary">
                发布
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item></Grid>
          <Grid item>
            <BraftEditor
              value={editorState}
              onChange={setEditorState}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewDraft;
