import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub"
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography, Box, Grid } from "@material-ui/core";
import "./Footer.css";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function Footer() {
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  var footerComponente

  if(token != ''){
    footerComponente = 
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={12}>
          <Box className="box">
            <Box
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                className="textos"
              >
                Me siga nas redes sociais
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <a
                href="https://github.com/FelipeJobs"
                target="_blank"
              >
                <GitHubIcon className="sociais" />
              </a>
              <a
                href="https://www.linkedin.com/in/lipe-santos/"
                target="_blank"
              >
                <LinkedInIcon className="sociais" />
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
  }
  return (
    <>
      {footerComponente}
    </>
  );
}

export default Footer;
