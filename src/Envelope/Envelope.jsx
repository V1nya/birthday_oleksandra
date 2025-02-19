import { useState } from "react";
import "./Envelope.css";

const letter = {
    sender: "Відділ мобільних платформ",
    text: `
Від відділу мобільних платформ
`,
    link: "https://siluette.com.ua/uk/my-account/downloads/",
    email: process.env.REACT_APP_EMAIL,
    password: process.env.REACT_APP_PASSROD,
};

export default function Envelope() {
    const [isOpen, setIsOpen] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Скопійовано!");
    };

    return (
        <div className={`container ${isOpen ? "fullscreen" : ""}`} onClick={() => !isOpen && setIsOpen(false)}>
            {!isOpen && (
                <div className="envelope" onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}>
                    <div className="envelope-flap"></div>
                    <div className="envelope-paper"></div>
                    <div className="envelope-detail"></div>
                </div>
            )}

            {isOpen && (
                <div className="paper">
                    <p className="txt">{letter.text}</p>
                    <p>
                        <strong>Link:</strong> <a href={letter.link} target="_blank" rel="noopener noreferrer">{letter.link}</a>
                    </p>
                    <p>
                        <strong>Email:</strong> {letter.email}{" "}
                        <button onClick={() => copyToClipboard(letter.email)}> 📝</button>
                    </p>
                    <p>
                        <strong>Password:</strong> {letter.password}{" "}
                        <button onClick={() => copyToClipboard(letter.password)}> 📝</button>
                    </p>
                </div>
            )}
        </div>
    );
}
