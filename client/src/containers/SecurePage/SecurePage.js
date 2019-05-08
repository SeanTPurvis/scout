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
        setThisIntervalAbsoluteOrientation(setInterval(() => {
            captureAbsoluteOrientation(sensor.quarternion)
        }, 1000));
        sensor.onerror = event => {
          if (event.error.name === 'SecurityError')
            console.log("No permissions to use AbsoluteOrientationSensor.");
        };        
        // let accelerometer = new Accelerometer({frequency: 60});
        // accelerometer.start
	    // accelerometer.addEventListener('reading', e => {
		// axios.post("/api/v1/accelerometer", {
        //     user_email: localStorage.getItem('user'),
        //     x_acceleration: accelerometer.x,                        
        //     y_acceleration: accelerometer.y,    
        //     z_acceleration: accelerometer.z,    
		// }, {
        // headers: {'Authorization': 'Bearer ' + localStorage.getItem('token') },
        //     })
        // });

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

    const captureAbsoluteOrientation = (quarternion) => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.post("/api/v1/absorientation", {
            user_email: user,
            x_position: quarternion[0],
            y_position: quarternion[1],
            z_position: quarternion[2],
            w_position: quarternion[3]
        })
    }

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
