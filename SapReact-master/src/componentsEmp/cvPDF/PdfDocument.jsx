import React, { useState, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import {
  Dialog,
  Button,
  makeStyles,
  LinearProgress,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    padding: "10px 30px ",
  },
  iconButton: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 35,
    height: 35,
  },
});

const PdfDocument = ({ title, document }) => {
  const classes = useStyles();
  const [ready, setReady] = useState(false);

  // this is hacky but helps set the render to the back of event queue https://github.com/diegomura/react-pdf/issues/420
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);
  // end of hacky stuff

  if (!ready) {
    return null;
  } else {
    return (
      <BlobProvider document={document}>
        {({ url, loading, error }) => {
          if (loading) {
            return (
              <div className="item-1">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Generando curriculum
                </Button>
              </div>
            );
          }
          if (!loading && url) {
            return (
              <a href={url} download>
                - Descargar '{title}' (PDF)
              </a>
            );
          }
          if (error) {
            console.error(error);
            return <p>Ha ocurrido un error</p>;
          }
          return null;
        }}
      </BlobProvider>
    );
  }
};

export default PdfDocument;
