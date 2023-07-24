import Box from '@mui/material/Box';
import styled from '@emotion/styled';

export const StyledBox = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 16px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    & > * {
        flex: 1;
        min-width: 0;
    }
    .MuiOutlinedInput-notchedOutline {
        border: none;
    }
    .MuiInputBase-input {
        padding: 0;
    }
`;

export const StyledModal = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    width: 100%;
    outline: none;
    z-index: 1301;
    padding: 95px;
`;

export const StyledButtonDiv = styled(Box)`
    text-align: center;
    display: flex;
    align-self: center;
    justify-content: center;
`;
