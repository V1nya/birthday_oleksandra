import BirthdayFireworks from "./Gift/BirthdayFireworks";
import Envelope from "./Envelope/Envelope";
import { useState, useEffect } from "react";

const VALID_TOKEN =  process.env.REACT_APP_TOKEN;

function App() {
    const [isEnd, setIsEnd] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        setIsValidToken(token === VALID_TOKEN);
    }, []);

    if (!isValidToken) {
        return <h1 style={{ color: "white", textAlign: "center" }}>404 Not Found</h1>;
    }

    return (
        <div style={{ backgroundColor: "black" }}>
            {!isEnd ? (<BirthdayFireworks setIsEnd={setIsEnd} />) : (<Envelope />)}
        </div>
    );
}

export default App;
