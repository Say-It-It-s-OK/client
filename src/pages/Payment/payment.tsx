import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Vector from "../../assets/images/Vector.png";
import { PaymentNav } from "../../components/NavBar/navBar";
import { CartCard } from "../../components/Card/Card";

const DivMainContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 46%;
    background: line;
    background: linear-gradient(
        180deg,
        var(--light-color) 0%,
        var(--secondary-color) 100%
    );
    border: none;
    position: absolute;
    bottom: 0;
`;

const DivPaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 2%;
`;

const DivPaymentContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    align-content: flex-start;
    border: none;
    flex-wrap: wrap;
    position: absolute;
    left: 50%;
    bottom: 37%;
    transform: translateX(-50%);
`;

const DivPaymentTitle = styled.div`
    display: flex;
    width: 60%;
    height: 8%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const DivDetailsWholeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    height: 25%;
    position: absolute;
    bottom: 6%;
    left: 78%;
    transform: translateX(-50%);
`;

const DivDetailsText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 25%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 150%;
    border: 4px solid var(--border-color);
    border-bottom: none; /* 하단 보더 제외 */
    border-radius: 15px 15px 0 0;
    margin-left: 5%;
`;

const DivDetailsContainer = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85%;
    background-color: var(--light-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
`;

const DivDetailsPayAmount = styled.div`
    color: var(--accent-color);
    font-family: var(--font-main);
    font-size: 250%;
    margin-bottom: 5%;
    text-align: center;
`;

const ImgBackGroundVector = styled.img`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
`;

const DivInputTextBar = styled.div`
    width: 100%;
    text-align: center;
    font-family: var(--font-main);
    font-size: 300%;
    margin-top: 20%;
`;

const InputText = () => {
    return <DivInputTextBar>결제를 진행 하고 있습니다...</DivInputTextBar>;
};

const InputTextFin = () => {
    return <DivInputTextBar>주문이 완료 되었습니다!</DivInputTextBar>;
};

const PaymentFin = () => {
    return (
        <>
            <PaymentNav />
            <InputTextFin />
            <ImgBackGroundVector src={Vector} />
        </>
    );
};

const PaymentInit = () => {
    return (
        <>
            <PaymentNav />
            <InputText />
            <DivMainContainerBody>
                <DivPaymentContainer>
                    <DivPaymentTitle>주문 내역</DivPaymentTitle>
                    <DivPaymentContainerBody>
                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />
                    </DivPaymentContainerBody>
                    <DivDetailsWholeContainer>
                        <DivDetailsText>결제비용</DivDetailsText>
                        <DivDetailsContainer>
                            <DivDetailsPayAmount>\ 0</DivDetailsPayAmount>
                        </DivDetailsContainer>
                    </DivDetailsWholeContainer>
                </DivPaymentContainer>
            </DivMainContainerBody>
        </>
    );
};

const Payment = () => {
    const [showPaymentFin, setShowPaymentFin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowPaymentFin(true);
        }, 3000);
        return () => clearTimeout(timer1);
    }, []);

    useEffect(() => {
        if (showPaymentFin) {
            const timer2 = setTimeout(() => {
                navigate("/");
            }, 3000);

            return () => clearTimeout(timer2);
        }
    }, [showPaymentFin, history]);

    return (
        <div className="container">
            {showPaymentFin ? <PaymentFin /> : <PaymentInit />}
        </div>
    );
};

export default Payment;
