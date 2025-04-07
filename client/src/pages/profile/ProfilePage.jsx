import React, { useCallback, useEffect, useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

import useAuth from "../../hooks/useAuth";
import useApiGet from "../../hooks/api/useApiGet";
import useHouseReq from "../../hooks/api/authenticated/useHouseReq";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import { formatDate } from "../../utils/formatDate";
import AddHouseOccupantDialog from "./AddHouseOccupantDialog";
import UpdateHouseOccupantDialog from "./UpdateHouseOccupantDialog";

const Value = ({ transform, children }) => (
  <Typography fontWeight="bold" textTransform={transform}>
    {children}
  </Typography>
);
const OccupantDetail = ({ label, value }) => (
  <Stack direction="row" spacing={1}>
    <Typography>{label.toUpperCase()}</Typography>
    <Typography>:</Typography>
    <Value>{value}</Value>
  </Stack>
);
const ProfilePage = () => {
  const [selectedOccupantId, setSelectedOccupantId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [houseProfile, setHouseProfile] = useState([]);
  const [occupants, setOccupants] = useState([]);
  const { auth } = useAuth();
  const { getHouseProfile } = useHouseReq({ isPublic: false, showAck: false });

  const { data, isLoading, isError } = useApiGet(
    "houseProfile",
    () => getHouseProfile(auth?.houseInfo?._id),
    {
      refetchOnWindowFocus: true,
      retry: 3,
      enabled: !!auth?.houseInfo?._id,
    }
  );

  useEffect(() => {
    if (data) {
      const { occupants, _id, ...houseInfo } = data?.data;
      const prepHouseProfile = {
        ...houseInfo,
        "no. of occupants": occupants.length || 0,
      };
      setHouseProfile((pv) => prepHouseProfile);
      setOccupants((pv) => occupants);
    }
  }, [data]);

  // callbacks

  const addOccupantHandler = () => {
    setOpenDialog((pv) => true);
  };

  const updateOccupantHandler = useCallback((occupantId) => {
    setSelectedOccupantId((pv) => occupantId);
    setOpenUpdateDialog((pv) => true);
  }, []);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;
  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack mt={2} alignItems="center" width={1}>
        <PageHeader text="profile" />
        <br />
        {Object.entries(houseProfile).map(([key, value]) => (
          <Stack
            key={value}
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            width={1}
            p={1}
            // className="outlined"
          >
            <Typography>{key.toUpperCase()}</Typography>
            <Typography>:</Typography>
            <Value transform="uppercase">{value}</Value>
          </Stack>
        ))}
        <br />
        <Stack direction="row" width={1} justifyContent="space-between" pr={2}>
          <Typography textAlign="left" width={1} p={1} flex={1}>
            OCCUPANTS:
          </Typography>
          <Button
            variant="contained"
            width={1}
            flex={2}
            onClick={addOccupantHandler}
          >
            Add Occupant
          </Button>
        </Stack>
        <br />
        {occupants.map((occupant, index) => {
          return (
            <Stack
              key={index}
              // direction="row"
              spacing={1}
              width={1}
              px={1}
              mb={2}
              justifyContent="flex-start"
            >
              <Stack direction="row" pr={1} alignItems="center" spacing={1}>
                <Typography variant="h5">{index + 1}.</Typography>
                <Typography variant="h6">
                  {occupant.occupant?.name?.lastName.toUpperCase()},{" "}
                  {occupant.occupant?.name?.firstName.toUpperCase()}
                </Typography>
                <Box flex={1}></Box>
                <Button
                  variant="outlined"
                  onClick={() => updateOccupantHandler(occupant?._id)}
                >
                  Update Info
                </Button>
              </Stack>
              <Stack spacing={1} pl={2}>
                <OccupantDetail
                  label="nick name"
                  value={occupant.occupant?.name?.nickName}
                />
                <OccupantDetail
                  label="gender"
                  value={occupant.occupant?.gender}
                />
                <OccupantDetail
                  label="birthday"
                  value={formatDate(occupant.occupant?.dateOfBirth)}
                />
                <OccupantDetail
                  label="email"
                  value={occupant.occupant?.email}
                />
                <OccupantDetail
                  label="occupation"
                  value={occupant.occupant?.occupation}
                />
                <OccupantDetail
                  label="contact details"
                  value={occupant.occupant?.contactNumbers.join(",")}
                />
                <OccupantDetail
                  label="emergency contact"
                  value={occupant.occupant?.emergencyContact}
                />
                <OccupantDetail
                  label="preferences"
                  value={occupant.occupant?.preferences.join(",")}
                />
                <OccupantDetail
                  label="move in date"
                  value={formatDate(occupant.moveInDate)}
                />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      {openDialog && (
        <AddHouseOccupantDialog open={openDialog} setOpen={setOpenDialog} />
      )}
      {openUpdateDialog && (
        <UpdateHouseOccupantDialog
          open={openUpdateDialog}
          setOpen={setOpenUpdateDialog}
          houseOccupantId={selectedOccupantId}
        />
      )}
    </BodyContainer>
  );
};

export default ProfilePage;
