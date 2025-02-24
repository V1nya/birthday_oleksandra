import { useState, useEffect } from "react";
import "./GiftScene.css";

const images = [
    { path: "/img/f06.jpeg", text: "Вітаємо зі святом і хочемо побажати" },
    { path: "/img/f05.jpeg", text: "Щоб кожна проблему зустрічала з посмішкою" },
    // { path: "/img/f05.jpeg", text: "Щоб кожна проблему зустрічала з посмішкою" },
    { path: "/img/f04.jpeg", text: "Кожен ранок був чудовий" },
    { path: "/img/f01.jpeg", text: "Легко вчилась сама" },
    { path: "/img/f6.jpeg", text: "І була прикладом для інших" },
    { path: "/img/f02.jpeg", text: "Завжди досягала своїх цілей" },
    { path: "/img/f2.jpeg", text: "Мала гарний аппетит " },
    { path: "/img/f3.jpeg", text: "Завжди була в гарній компанії " },
    { path: "/img/f03.jpeg", text: "Чудово виглядала" },
    { path: "/img/f5.jpeg", text: "Завжди могла знайти підтримку в нашій маленькій сімʼї" },
];

const ImageDisplay = ({ index, onClick }) => (
    <div
        style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
        }}
        onClick={onClick}
    >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{images[index].text}</p>
        <img
            src={images[index].path}
            alt="gift scene"
            style={{ maxWidth: "270px", maxHeight: "270px", borderRadius: "10px" }}
        />
    </div>
);

const GiftScene = ({ setIsEnd }) => {
    const [clickCount, setClickCount] = useState(0);
    const [isOpened, setIsOpened] = useState(false);
    const [canClickImage, setCanClickImage] = useState(false);

    useEffect(() => {
        if (isOpened) {
            setCanClickImage(false);
            const timer = setTimeout(() => setCanClickImage(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpened]);

    const handleGiftClick = () => {
        if (isOpened) return;
        if (clickCount < images.length - 1) {
            setClickCount(clickCount + 1);
        } else {
            setIsOpened(true);
            setClickCount(0);
        }
    };

    const handleImageClick = () => {
        if (!canClickImage) return;

        if (clickCount < images.length - 1) {
            setClickCount(clickCount + 1);
        } else {
            setIsEnd(true);
        }
    };
    const handlePrevClick = () => {
        console.log("TTT", clickCount)
        if (clickCount > 0) {
            setClickCount(clickCount - 1);
        }
    };

    return (
        <div className={`merrywrap ${isOpened ? "step-2" : clickCount > 0 ? "step-1 " : ""}`}>
            <canvas id="birthday"></canvas>
            <canvas id="canvas"></canvas>
            <div className="giftbox" onClick={handleGiftClick}>
                <div className="cover">
                    <div></div>
                </div>
                <div className="box"></div>
            </div>
            <div className="icons">
                <div className="row">
                    {[..."ВІТАЄМО!"].map((char, index) => (
                        <span key={index}>{char}</span>
                    ))}
                </div>
            </div>
            {isOpened && <ImageDisplay index={clickCount} onClick={handleImageClick} />}
            {isOpened && clickCount>0 && (
                <button
                    onClick={handlePrevClick}
                    disabled={clickCount === 0}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#ff4081",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        zIndex: 100
                    }}
                >
                    Назад
                </button>
            )}
        </div>
    );
};

export default GiftScene;
