import styled from "styled-components";

const ButtonLongButton = styled.button`
    position: absolute;
    width: 50%;
    height: 4%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 15px;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }
`;

const LongButton = ({ children, top, left }) => {
    return (
        <ButtonLongButton style={{ top: top, left: left }}>
            {children}
        </ButtonLongButton>
    );
};

export default LongButton;
