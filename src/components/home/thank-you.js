import { Typography, Button } from "@mui/material";

import { Modal } from "../modal"

export const ThankYou = ({ open, onClose, email, clearForm }) => {
    const onClick = () => {
        clearForm();
        onClose();
    }

    return (
        <>
            <Modal open={open} onClose={onClose} title="Info" size="sm">
                <Typography variant="h4" textAlign="center" mb={5}>
                    Thank You!
                </Typography>
                <Typography variant="body1" mb={1} textAlign="center">
                    Form will be sent to <b>{email}</b> &nbsp;
                    <Button variant="text" onClick={onClick} size="small">Click here</Button>
                &nbsp;to generate additional forms
                </Typography>
                
            </Modal>
        </>
    )
}