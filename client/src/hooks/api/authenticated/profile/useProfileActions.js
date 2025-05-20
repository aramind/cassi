import useHouseOccupantReq from "./useHouseOccupantReq";
import useConfirmActionDialog from "../../../useConfirmActionDialog";
import useHouseReq from "./useHouseReq";
import useApiGet from "../../useApiGet";
import useAuth from "../../../useAuth";
import useApiSendAsync from "../../useApiSendAsync";
import { useCallback } from "react";
import { Stack, Typography } from "@mui/material";

const useProfileActions = ({ handleCloseDialog }) => {
  const { auth } = useAuth();
  const {
    addNewHouseOccupant,
    getHouseOccupant,
    updateHouseOccupant,
    hardDelete,
  } = useHouseOccupantReq({ isPublic: false, showAck: false });

  const { getHouseProfile } = useHouseReq({ isPublic: false, showAck: false });
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const sendWithSuccessDialogClose = async (sendFn, args) => {
    try {
      const res = await sendFn(...args);
      if (res?.success) handleCloseDialog();
    } catch (error) {
      console.error(error);
    }
  };

  // apiSendAsyncMethods
  const { send: sendAddHouseOccupant, isLoadingInAddHouseOccupant } =
    useApiSendAsync(addNewHouseOccupant, ["houseProfile"]);

  const { send: sendUpdateHouseOccupant, isLoadingInUpdateHouseOccupant } =
    useApiSendAsync(updateHouseOccupant, ["houseProfile", "house"]);

  const { send: sendHardDelete, isLoadingInHardDelete } = useApiSendAsync(
    hardDelete,
    ["houseProfile"]
  );
  // fetching houseProfile
  const {
    data: houseProfileData,
    isLoading: isLoadingInHouseProfile,
    isError: isErrorInHouseProfile,
  } = useApiGet("houseProfile", () => getHouseProfile(auth?.houseInfo?._id), {
    refetchOnWindowFocus: true,
    retry: 3,
    enabled: !!auth?.houseInfo?._id,
  });

  //adding new house occupant
  const handleConfirmAddHouseOccupant = ({ occupant }) => {
    handleConfirm(
      "Confirm Submit",
      "Are you sure you want to add new house occupant?",
      () =>
        sendWithSuccessDialogClose(sendAddHouseOccupant, [
          { occupant },
          { showFeedbackMsg: true },
        ])
    );
  };

  //updating house occupant
  const handleConfirmUpdateHouseOccupant = ({ houseOccupantId, data }) => {
    handleConfirm("Confirm Submit", "Continue updating?", () =>
      sendWithSuccessDialogClose(sendUpdateHouseOccupant, [
        { houseOccupantId, data },
        { showFeedbackMsg: true },
      ])
    );
  };

  // hard delete
  const handleConfirmHardDelete = useCallback(
    (id) => {
      handleConfirm(
        "Delete",
        <Stack spacing={2}>
          <Typography component="span">
            Are you sure you want to{" "}
            <Typography
              textTransform="uppercase"
              color="error"
              component="span"
              fontWeight="bold"
            >
              permanently
            </Typography>{" "}
            remove this person from database?
          </Typography>
          <Typography textTransform="uppercase" color="error">
            NOTE: This is process is not reversible
          </Typography>
        </Stack>,
        async () => {
          try {
            await sendHardDelete(id, { showFeedbackMsg: true });
          } catch (error) {
            console.error(error);
          }
        }
      );
    },
    [handleConfirm, sendHardDelete]
  );
  // returns
  const isLoading =
    isLoadingInHouseProfile ||
    isLoadingInAddHouseOccupant ||
    isLoadingInUpdateHouseOccupant ||
    isLoadingInHardDelete;
  const isError = isErrorInHouseProfile;
  return {
    houseProfileData: houseProfileData?.data,
    handleConfirmAddHouseOccupant,
    handleConfirmUpdateHouseOccupant,
    handleConfirmHardDelete,
    isLoading,
    isError,
    renderConfirmActionDialog,
  };
};

export default useProfileActions;
