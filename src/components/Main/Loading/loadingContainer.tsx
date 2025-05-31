import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const DivLoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 2%;
`;

const DivLoadingContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    bottom: 37%;
    transform: translateX(-50%);
`;

const Spinner = styled.div`
    width: 200px;
    height: 200px;
    border: 30px solid var(--light-color);
    border-top: 30px solid var(--primary-color);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

const LoadingContainer = () => {
    return (
        <DivLoadingContainer>
            <DivLoadingContainerBody>
                <Spinner />
            </DivLoadingContainerBody>
        </DivLoadingContainer>
    );
};

export default LoadingContainer;
