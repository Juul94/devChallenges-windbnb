import { Modal, Fade, Container } from '@mui/material';
import styled from '@emotion/styled';

interface SearchHeaderProps {
    open: boolean;
    onClose: () => void;
}

const StyledModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    width: 100%;
    outline: none;
    z-index: 1301;
    padding: 95px;
`;

const SearchHeader = ({ open, onClose }: SearchHeaderProps) => {
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
                        <h1>This is the custom modal</h1>
                    </Container>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

export default SearchHeader;
