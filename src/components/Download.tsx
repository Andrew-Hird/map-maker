import React, { RefObject, useCallback } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import html2canvas from "html2canvas";

const DownloadContainer = styled.div`
  margin-top: 20px;
`;

interface Props {
  mapRef: RefObject<HTMLDivElement>;
}

const Download = ({ mapRef }: Props) => {
  const onButtonClick = useCallback(() => {
    if (mapRef.current === null) {
      return;
    }

    html2canvas(mapRef.current, {
      useCORS: true,
      removeContainer: true,
      scale: 4,
    }).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "map.png";
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();
    });
  }, [mapRef]);

  return (
    <DownloadContainer>
      <Button variant="contained" onClick={onButtonClick}>
        Download Map
      </Button>
    </DownloadContainer>
  );
};

export default Download;
