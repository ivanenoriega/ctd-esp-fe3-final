import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

interface paginationProps {
  handleChange: any;
  count: number;
}

export default function ComicPagination({
  handleChange,
  count,
}: paginationProps) {
  const matches = useMediaQuery("(min-width:769px)");

  return (
    <Box mb={2} display="flex" alignItems="center" justifyContent="center">
      <Stack spacing={2}>
        <Pagination
          count={count}
          size={matches ? "large" : "small"}
          onChange={handleChange}
          color="secondary"
        />
      </Stack>
    </Box>
  );
}