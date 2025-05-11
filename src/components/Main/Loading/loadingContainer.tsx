import styled from "styled-components";
import Loading from "../../../assets/images/loading.gif";

const DivLoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 2%;
`;

const DivLoadingContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    align-content: center;
    justify-content: center;
    border: none;
    flex-wrap: wrap;
    position: absolute;
    left: 50%;
    bottom: 37%;
    transform: translateX(-50%);
`;

const ImgLoading = styled.img`
    width: 20%;
`;

const LoadingContainer = () => {
    return (
        <DivLoadingContainer>
            <DivLoadingContainerBody>
                <ImgLoading src={Loading} />
            </DivLoadingContainerBody>
        </DivLoadingContainer>
    );
};

export default LoadingContainer;
