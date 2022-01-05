import React, { Component } from "react";
import { connect } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Workspaces from "./Workspaces/";
import Layers from "./Layers";

class index extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="100%"
          disableGutters={true}
          sx={{ paddingTop: "64px" }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Box sx={{ width: "100%", padding: "0 15px" }}>
                <Typography variant="h4" component="div" gutterBottom>
                  Workspaces
                </Typography>
                <Typography variant="body2" component="div" mt={2} gutterBottom>
                  <Workspaces />
                </Typography>
              </Box>
            </Grid>

            {this.props.layers && this.props.layers.length > 0 && (
              <Grid item xs={6}>
                <Box sx={{ width: "100%", padding: "0 15px" }}>
                  <Typography variant="h4" component="div" gutterBottom>
                    Layers
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    mt={2}
                    gutterBottom
                  >
                    <Layers />
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  layers: state.geoserver.layers,
});

export default connect(mapState)(index);
