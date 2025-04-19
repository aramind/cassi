import { useState } from 'react'

const useDialogManager = () => {
    const [dialogState, setDialogState] = useState({open: false, action: "", data: null})


    const handleOpenDialog = (action, data) => {
        setDialogState({open: true, action, data})
    }

    const handleCloseDialog = () => {
        setDialogState({open: false, action: "", data: null})
    }

    console.log(dialogState?.data)
  return {
    dialogState,
    handleOpenDialog,
    handleCloseDialog
  }
}

export default useDialogManager