import React, {useState, useEffect, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';

const SecurePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [intervalImage, setThisIntervalImage] = useState();
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const options = { frequency: 60, referenceFrame: 'device' };
        let sensor = new window.AbsoluteOrientationSensor(options);
        sensor.onreading = () => {
            alert(sensor.quaternion[0].toString(),
                sensor.quarternion[1].toString(),
                sensor.quarternion[2].toString(),
                sensor.quarternion[3].toString()
            );
            // let absObject = JSON.stringify({
            //     x_position: sensor.quarternion[0].toString(),
            //     y_position: sensor.quarternion[1].toString(),
            //     z_position: sensor.quarternion[2].toString(),
            //     w_position: sensor.quarternion[3].toString() 
            // })
            // alert(absObject);
            axios.post("/api/v1/absorientation", {
                user_email: user,
                x_position: sensor.quarternion[0].toString(),
                y_position: sensor.quarternion[1].toString(),
                z_position: sensor.quarternion[2].toString(),
                w_position: sensor.quarternion[3].toString() 
            }, {
                headers: {'Authorization': 'Bearer ' + token },
            })
        }
        sensor.start();
        sensor.onerror = event => {
          if (event.error.name === 'SecurityError')
            alert("No permissions to use AbsoluteOrientationSensor.");
        };

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
        // axios.post("/api/v1/image/", {
        //     user_email: user,
        //     data: imageSrc
        // }, {
        //     headers: {'Authorization': 'Bearer ' + token },
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
        </div>
    )
}

export default SecurePage;
