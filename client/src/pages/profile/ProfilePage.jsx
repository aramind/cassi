import React, { useCallback, useEffect, useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";

import useAuth from "../../hooks/useAuth";
import useApiGet from "../../hooks/api/useApiGet";
import useHouseReq from "../../hooks/api/authenticated/useHouseReq";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import { formatDate } from "../../utils/formatDate";
import AddHouseOccupantDialog from "./AddHouseOccupantDialog";
import UpdateHouseOccupantDialog from "./UpdateHouseOccupantDialog";
import useApiSend from "../../hooks/api/useApiSend";
import useHouseOccupantReq from "../../hooks/api/authenticated/useHouseOccupantReq";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import FullScreenDialog from "../../components/FullScreenDialog";
import OccupantByStatus from "./OccupantByStatus";

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
  const [openExOccupants, setOpenExOccupants] = useState(false);
  const { auth } = useAuth();
  const { getHouseProfile } = useHouseReq({ isPublic: false, showAck: false });

  const { updateHouseOccupant } = useHouseOccupantReq({
    isPublic: false,
    showAck: true,
  });

  const { data, isLoading, isError } = useApiGet(
    "houseProfile",
    () => getHouseProfile(auth?.houseInfo?._id),
    {
      refetchOnWindowFocus: true,
      retry: 3,
      enabled: !!auth?.houseInfo?._id,
    }
  );

  const { mutate: sendUpdateRequest, isLoadingInUpdate } = useApiSend(
    updateHouseOccupant,
    ["houseProfile"]
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

  console.log(occupants);
  const addOccupantHandler = () => {
    setOpenDialog((pv) => true);
  };

  const updateOccupantHandler = useCallback((occupantId) => {
    setSelectedOccupantId((pv) => occupantId);
    setOpenUpdateDialog((pv) => true);
  }, []);

  if (isLoading || isLoadingInUpdate) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  console.log(occupants);
  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack mt={2} alignItems="center" width={1} spacing={1} p={0.5}>
        <PageHeader text="profile" />
        <br />
        {Object.entries(houseProfile).map(([key, value]) => (
          <Stack
            key={value}
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            width={1}
            // p={1}
            // className="outlined"
          >
            <Typography>{key.toUpperCase()}</Typography>
            <Typography>:</Typography>
            <Value transform="uppercase">{value}</Value>
          </Stack>
        ))}
        <br />
        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          // pr={2}
          // className="outlined"
          alignItems="center"
        >
          <Typography variant="h6" textAlign="left" width={1} flex={1}>
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

        {/* {occupants.map((occupant, index) => {
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
              <Stack direction="row" pr={1} alignItems="center" spacing={0.5}>
                <Typography variant="h5">{index + 1}.</Typography>
                <Typography
                  variant="h6"
                  color={
                    occupant?.status === "active" ? "primary.dark" : "error"
                  }
                >
                  {occupant.occupant?.name?.lastName.toUpperCase()},{" "}
                  {occupant.occupant?.name?.firstName.toUpperCase()}
                </Typography>

                <Tooltip title={occupant?.status} placement="top-start">
                  {occupant?.status === "active" ? (
                    <VerifiedRoundedIcon color="primary" />
                  ) : (
                    <NewReleasesRoundedIcon color="error" />
                  )}
                </Tooltip>

                <Box flex={1}></Box>

                <IconButton
                  onClick={() => updateOccupantHandler(occupant?._id)}
                >
                  <EditRoundedIcon />
                </IconButton>
                <IconButton>
                  <DeleteRoundedIcon />
                </IconButton>
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
        })} */}
        {occupants && (
          <Stack spacing={1} width={1} mt={1}>
            <OccupantByStatus
              occupants={occupants}
              status="active"
              label="active"
              onUpdate={updateOccupantHandler}
            />
            <OccupantByStatus
              occupants={occupants}
              status="suspended"
              label="suspended"
              onUpdate={updateOccupantHandler}
            />
            {/* <OccupantByStatus
              occupants={occupants}
              status="evicted"
              label="evicted"
              onUpdate={updateOccupantHandler}
            />
            <OccupantByStatus
              occupants={occupants}
              status="banned"
              label="banned"
              onUpdate={updateOccupantHandler}
            /> */}
          </Stack>
        )}
        <br />
        <FullScreenDialog
          open={openExOccupants}
          setOpen={setOpenExOccupants}
          actionText="view former occupants"
          title="former occupant(s)"
        />
      </Stack>
      {openDialog && (
        <AddHouseOccupantDialog open={openDialog} setOpen={setOpenDialog} />
      )}
      {openUpdateDialog && (
        <UpdateHouseOccupantDialog
          open={openUpdateDialog}
          setOpen={setOpenUpdateDialog}
          houseOccupantId={selectedOccupantId}
          sendUpdateRequest={sendUpdateRequest}
        />
      )}
    </BodyContainer>
  );
};

export default ProfilePage;
