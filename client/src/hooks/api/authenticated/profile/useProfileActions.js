import useHouseOccupantReq from "./useHouseOccupantReq";
import useConfirmActionDialog from "../../../useConfirmActionDialog";
import useHouseReq from "./useHouseReq";
import useApiGet from "../../useApiGet";
import useAuth from "../../../useAuth";
import useApiSendAsync from "../../useApiSendAsync";

const useProfileActions = ({ handleCloseDialog }) => {
  const { auth } = useAuth();
  const { addNewHouseOccupant, getHouseOccupant, updateHouseOccupant } =
    useHouseOccupantReq({ isPublic: false, showAck: false });

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

  //adding new house occupant
  const handleConfirmUpadateHouseOccupant = ({ houseOccupantId, data }) => {
    handleConfirm("Confirm Submit", "Continue updating?", () =>
      sendWithSuccessDialogClose(sendUpdateHouseOccupant, [
        { houseOccupantId, data },
        { showFeedbackMsg: true },
      ])
    );
  };

  // updating house occupant
  // returns
  const isLoading =
    isLoadingInHouseProfile ||
    isLoadingInAddHouseOccupant ||
    isLoadingInUpdateHouseOccupant;
  const isError = isErrorInHouseProfile;
  return {
    houseProfileData: houseProfileData?.data,
    handleConfirmAddHouseOccupant,
    isLoading,
    isError,
    renderConfirmActionDialog,
  };
};

export default useProfileActions;
