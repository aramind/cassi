import useConfirmActionDialog from "./useConfirmActionDialog";

const useFormActions = () => {
  const {
    handleOpen: handleConfirm,
    renderConfirmActionDialog: renderConfirmDialog,
  } = useConfirmActionDialog();

  const handleConfirmReset = (reset, values = {}) => {
    handleConfirm(
      "Confirm Reset",
      "Are you sure you want to reset all fields?",
      () => reset(values)
    );
  };

  const handleClear = (reset, values) => {
    reset(values);
  };

  return { handleConfirmReset, handleClear, renderConfirmDialog };
};

export default useFormActions;
