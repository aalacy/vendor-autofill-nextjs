import { Backdrop, CircularProgress, Button } from '@mui/material';

export default function LoadingOverlay({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}