import React, {useState, useEffect, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';

const SecurePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [interval, setThisInterval] = useState();
    
    
    useEffect(() => {
	let accelerometer = new Accelerometer({frequency: 60});
	accelerometer.addEventListener('reading', e => {
		axios.post("/api/v1/accelerometer", {
            user_email: localStorage.getItem('user'),
            x_acceleration: accelerometer.x,                        
            y_acceleration: accelerometer.y,    
            z_acceleration: accelerometer.z,    
		}, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token') },
	})

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
        setThisInterval(setInterval(() => captureImage(), 1000));
        return clearInterval(interval);
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
