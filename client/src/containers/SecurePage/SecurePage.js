import React, {useState, useEffect, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';

const SecurePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [intervalImage, setThisIntervalImage] = useState();
    const [intervalImageAbsoluteOrientation, setThisIntervalAbsoluteOrientation] = useState();
    
    
    useEffect(() => {
        const options = { frequency: 60, referenceFrame: 'device' };
        const sensor = new window.AbsoluteOrientationSensor(options);
        sensor.start();
        setThisIntervalAbsoluteOrientation(setInterval(() => 
            console.log(sensor), 1000));
        sensor.onerror = event => {
          if (event.error.name === 'SecurityError')
            console.log("No permissions to use AbsoluteOrientationSensor.");
        };        

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
        setThisIntervalImage(setInterval(() => captureImage(), 1000));
        return (() => {
            clearInterval(intervalImage);
        }
    );
    },[])

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcam = useRef();

    const captureImage = () => {
        const imageSrc = webcam.current.getScreenshot();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.post("/api/v1/image/", {
            user_email: user,
            data: imageSrc
        }, {
            headers: {'Authorization': 'Bearer ' + token },
        })
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
        </div>
    )
}

export default SecurePage;
