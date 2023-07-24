import { Modal, Fade, Container, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputLabelBorder from '../inputLabelBorder/inputLabelBorder';
import { StyledBox, StyledModal, StyledButtonDiv } from './searchModalStyles';
import { useTheme } from '@mui/material/styles';

interface SearchHeaderProps {
    open: boolean;
    onClose: () => void;
}

const SearchHeader = ({ open, onClose }: SearchHeaderProps) => {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    style: {
                        zIndex: 1300,
                        backgroundColor: 'rgba(79, 79, 79, 0.4)',
                    },
                },
            }}>
            <Fade in={open}>
                <StyledModal>
                    <Container>
                        <StyledBox
                            sx={{
                                border: `1px solid ${theme.palette.grey[50]}`,
                            }}>
                            <InputLabelBorder title='Location' placeholder='Find location' />

                            <InputLabelBorder title='Guests' placeholder='Add guests' />

                            <StyledButtonDiv>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    sx={{
                                        borderRadius: 3,
                                        textTransform: 'capitalize',
                                    }}>
                                    <SearchIcon sx={{ mr: 0.5 }} />
                                    Search
                                </Button>
                            </StyledButtonDiv>
                        </StyledBox>
                    </Container>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

export default SearchHeader;
