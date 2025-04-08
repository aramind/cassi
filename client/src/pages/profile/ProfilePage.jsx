import React, { useCallback, useEffect, useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Button, Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import useAuth from "../../hooks/useAuth";
import useApiGet from "../../hooks/api/useApiGet";
import useHouseReq from "../../hooks/api/authenticated/useHouseReq";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import AddHouseOccupantDialog from "./AddHouseOccupantDialog";
import UpdateHouseOccupantDialog from "./UpdateHouseOccupantDialog";
import useApiSend from "../../hooks/api/useApiSend";
import useHouseOccupantReq from "../../hooks/api/authenticated/useHouseOccupantReq";

import OccupantByStatus from "./OccupantByStatus";

const UNIQUESTATUSES = ["active", "suspended", "evicted", "banned"];
const Value = ({ transform, children }) => (
  <Typography fontWeight="bold" textTransform={transform}>
    {children}
  </Typography>
);

const ProfilePage = () => {
  const [openedCategories, setOpenedCategories] = useState(["active"]);
  const [selectedOccupantId, setSelectedOccupantId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [houseProfile, setHouseProfile] = useState([]);
  const [occupants, setOccupants] = useState([]);
  const { auth } = useAuth();
  const { getHouseProfile } = useHouseReq({ isPublic: false, showAck: false });

  const { updateHouseOccupant, addNewHouseOccupant } = useHouseOccupantReq({
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

  const { mutate: sendAddNewHouseOccupantReq, isLoadingInAdd } = useApiSend(
    addNewHouseOccupant,
    ["houseProfile"]
  );

  useEffect(() => {
    if (data) {
      const { occupants, _id, ...houseInfo } = data?.data;
      const prepHouseProfile = {
        ...houseInfo,
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

  if (isLoading || isLoadingInUpdate || isLoadingInAdd) return <LoadingPage />;
  if (isError) return <ErrorPage />;

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

        {occupants && (
          <Stack spacing={1} width={1} mt={1}>
            {UNIQUESTATUSES?.map((status) => (
              <OccupantByStatus
                key={status}
                open={openedCategories}
                setOpen={setOpenedCategories}
                occupants={occupants}
                status={status}
                label={status}
                onUpdate={updateOccupantHandler}
              />
            ))}
          </Stack>
        )}
        <br />
      </Stack>
      {openDialog && (
        <AddHouseOccupantDialog
          open={openDialog}
          setOpen={setOpenDialog}
          sendAddNewHouseOccupantReq={sendAddNewHouseOccupantReq}
        />
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
