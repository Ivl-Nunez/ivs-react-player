import React, { useEffect } from 'react';

import IVSBroadcastClient from 'amazon-ivs-web-broadcast';

const Broadcast = () => {
    useEffect(() => {
        async function initializeBroadcast () {
    
        // CREATE AN INSTANCE OF THE IVS BROADCAST CLIENT
        const client = IVSBroadcastClient.create({
            // Enter the desired stream configuration
            streamConfig: {
                maxResolution: {
                   width: 854,
                   height: 480,
               },
               maxFramerate: 10,
               /**
                * maxBitrate is measured in kbps
                */
               maxBitrate: 1000,
             },            // Enter the ingest endpoint from the AWS console or CreateChannel API
            ingestEndpoint: 'rtmps://d3608ec8df2e.global-contribute.live-video.net:443/app/',
        });

        // REQUEST PERMISSIONS
        async function handlePermissions() {
            let permissions = {
                audio: false,
                video: false,
            };
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                for (const track of stream.getTracks()) {
                    track.stop();
                }
                permissions = { video: true, audio: true };
            } catch (err) {
                permissions = { video: false, audio: false };
                console.error(err.message);
            }
            // If we still don't have permissions after requesting them display the error message
            if (!permissions.video) {
                console.error('Failed to get video permissions.');
            } else if (!permissions.audio) {
                console.error('Failed to get audio permissions.');
            }
        }
        handlePermissions();

        //LIST AVAILABLE DEVICES
        const devices = await navigator.mediaDevices.enumerateDevices();
        window.videoDevices = devices.filter((d) => d.kind === 'videoinput');
        window.audioDevices = devices.filter((d) => d.kind === 'audioinput');

        // RECEIVE A MEDIA STREAM FROM A DEVICE
        const streamConfig = IVSBroadcastClient.BASIC_LANDSCAPE;
        window.cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: window.videoDevices[0].deviceId,
            width: {
                ideal: streamConfig.maxResolution.width,
                max: streamConfig.maxResolution.width,
            },
            height: {
                ideal: streamConfig.maxResolution.height,
                max: streamConfig.maxResolution.height,
            },
        },
        });
        window.microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: window.audioDevices[0].deviceId },
        });


        // ADD A DEVICE TO THE STREAM
        client.addVideoInputDevice(window.cameraStream, 'camera1', { index: 0 }); // only 'index' is required for the position parameter
        client.addAudioInputDevice(window.microphoneStream, 'mic1');


        // START THE BROADCAST
        client
        .startBroadcast('sk_us-east-1_3ZusjiKh9pnr_V414k0gViYcN7OTIIsyQcdtvy0F4Ib')
        .then((result) => {
            console.log('I am successfully broadcasting!');
        })
        .catch((error) => {
            console.error('Something drastically failed while broadcasting!', error);
        });
        }
        initializeBroadcast();
    }, []);

    return (
        <></>
    )

}

export default Broadcast;