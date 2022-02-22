import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function({ message }) {
  return (
    <Paper
      style={{
        padding: "30px 20px",
        textAlign: "center",
        boxShadow: "none",
      }}
    >
      <Typography
        variant="display1"
        style={{
          margin: 0,
          fontSize: "14px",
          fontWeight: 600
        }}
        gutterBottom
      >
        {message}
      </Typography>
    </Paper>
  );
}
