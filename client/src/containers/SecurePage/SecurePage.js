import React, {useState, useEffect, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';

const SecurePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (!token) {
            setIsLoggedIn(false);
            return;
        }
        if (expirationDate <= new Date()) {
            setIsLoggedIn(false);
            return;
        }
        setIsLoggedIn(true);
    },[])

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcam = useRef();

    const capture = () => {
        const imageSrc = webcam.current.getScreenshot();
        console.log(imageSrc);
        // axios.post("http://localhost:3001/api/v1/files/upload", {
        //     file: imageSrc
        // })
        // .then(res => {
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.log(err);
        // })

    }

    return (
        <div>
        {!isLoggedIn && <div>
            <Redirect to="/"/>
        </div>}

        <Webcam
        audio={true}
        height={350}
        width={350}
        ref={webcam}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        />
        <button onClick={() => capture()}>Click Me!</button>
        </div>
    )
}

export default SecurePage;
