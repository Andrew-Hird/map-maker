import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const LocationCont = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px !important;
  width: 100%;
`;

export interface Props {
  handleLocationAdd: (location: Location) => void;
}

export interface Location {
  name: string;
  lat: string;
  lng: string;
}

const Locations = ({ handleLocationAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Location>();
  const onSubmit = (location: Location) => {
    handleLocationAdd(location);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <LocationCont className="location">
      <h1>Locations</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          className="nameClass"
          {...register("name", { required: true })}
          label="Name"
          autoComplete="off"
          error={!!errors.name}
        />
        <StyledTextField
          {...register("lat", { required: true })}
          label="Latitude"
          autoComplete="off"
          error={!!errors.lat}
        />
        <StyledTextField
          {...register("lng", { required: true })}
          label="Longitude"
          autoComplete="off"
          error={!!errors.lng}
        />
        <Button variant="contained" type="submit">
          Add location
        </Button>
      </form>
    </LocationCont>
  );
};

export default Locations;
