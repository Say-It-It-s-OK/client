import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import orderPay from "../../api/request/payment";
import { CartItem } from "../../context/MainContext";
import styled, { keyframes } from "styled-components";
import Vector from "../../assets/images/Vector.png";
import { PaymentNav } from "../../components/NavBar/navBar";
import { ItemCard } from "../../components/Card/Card";
import Logo from "../../assets/icons/logo_small_icon.png";

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
    border-radius: 15px 15px 0 0;
    border: none;
    position: absolute;
    bottom: 0;
`;

const DivPaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 15px 15px 0 0;
    height: 100%;
    position: relative;
    padding: 1%;
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
    max-height: 50%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 15px;
        background: var(--accent-color);
    }
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
    border-bottom: none;
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
`;

const DivUnderlineBar = styled.div`
    width: 80%;
    height: 0.7%;
    background: linear-gradient(
        to right,
        var(--light-color),
        var(--secondary-color)
    );
    margin: 0 auto;
    border-radius: 20px;
    transition: height 0.05s ease;
    box-shadow: 0px 0px 10px var(--secondary-color);
    clip-path: polygon(0% 0%, 100% 0%, 100% 40%, 50% 100%, 0% 40%);
`;

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
    width: 100px;
    height: 100px;
    border: 30px solid var(--light-color);
    border-top: 30px solid var(--primary-color);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-top: 3%;
`;

const ImgIndexLogo = styled.img`
    width: 50%;
    margin: 3%;
`;

const InputText = () => {
    return <DivInputTextBar>결제를 진행 하고 있습니다...</DivInputTextBar>;
};

const InputTextComplete = () => {
    return <DivInputTextBar>주문이 완료 되었습니다!</DivInputTextBar>;
};

const PaymentComplete = () => {
    return (
        <>
            <PaymentNav />
            <ImgIndexLogo src={Logo} />
            <InputTextComplete />
            <DivUnderlineBar />
            <ImgBackGroundVector src={Vector} />
        </>
    );
};

const PaymentFail = () => {
    return (
        <>
            <PaymentNav />
            <DivInputTextBar>주문 요청이 실패했습니다.</DivInputTextBar>
        </>
    );
};

const PaymentInit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sessionId, cartItems, totalPrice, nlp } = location.state || {};
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [paymentFail, setPaymentFail] = useState(false);

    useEffect(() => {
        const orderPayment = async () => {
            if (!nlp) {
                try {
                    console.log("주문 요청을 보냈습니다...");
                    const responseData = await orderPay(sessionId, cartItems);
                    if (responseData.response === "cart.pay") {
                        console.log("주문 요청이 완료되었습니다!");
                        const timer = setTimeout(() => {
                            setPaymentComplete(true);
                        }, 3000);
                        return () => clearTimeout(timer);
                    }
                } catch (error) {
                    console.error("주문 처리 중 오류 발생:", error);
                    const timer = setTimeout(() => {
                        setPaymentFail(true);
                    }, 3000);
                    return () => clearTimeout(timer);
                }
            } else {
                console.log("주문 요청이 완료되었습니다!");
                const timer = setTimeout(() => {
                    setPaymentComplete(true);
                }, 3000);
                return () => clearTimeout(timer);
            }
        };
        orderPayment();
    }, []);

    useEffect(() => {
        if (paymentComplete || paymentFail) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [paymentComplete, paymentFail]);

    return (
        <div className="container">
            {paymentComplete ? (
                <PaymentComplete />
            ) : paymentFail ? (
                <PaymentFail />
            ) : (
                <>
                    <PaymentNav />
                    <ImgIndexLogo src={Logo} />
                    <InputText />
                    <DivUnderlineBar />
                    <Spinner />
                    <DivMainContainerBody>
                        <DivPaymentContainer>
                            <DivPaymentTitle>주문 내역</DivPaymentTitle>
                            <DivPaymentContainerBody>
                                {cartItems.map(
                                    (item: CartItem, index: number) => (
                                        <ItemCard
                                            key={index}
                                            item={{ ...item }}
                                        />
                                    )
                                )}
                            </DivPaymentContainerBody>
                            <DivDetailsWholeContainer>
                                <DivDetailsText>결제비용</DivDetailsText>
                                <DivDetailsContainer>
                                    <DivDetailsPayAmount>
                                        {totalPrice}원
                                    </DivDetailsPayAmount>
                                </DivDetailsContainer>
                            </DivDetailsWholeContainer>
                        </DivPaymentContainer>
                    </DivMainContainerBody>
                </>
            )}
        </div>
    );
};

export default PaymentInit;
