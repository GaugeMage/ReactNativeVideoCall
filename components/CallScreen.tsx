import React, {useState, useEffect, useCallback} from "react";
import {StyleSheet, Text, View, Button, PermissionsAndroid, Platform} from "react-native";

//The package I imported for this
import Video from "react-native-video";

//The stylesheet for this component
import "./CallScreen.css";

import CameraComponent from "./CameraComponent";

//This is the call screen component
const VideoCallScreen: React.FC = () => {
    //Usestate Variables:
    const [transcript, setTranscript] = useState<string>("N/A");
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [callInProgress, setCallInProgress] = useState<boolean>(false);

    // Function to generate a transcript
    const generateTranscript = useCallback((text: string) => {
        //This is where the transcript would be generated
        let temp = text;

        //Interval during call to update the transcript
        const interval = setInterval(() => {
            //If call is in progress, update the transcript
            if(callInProgress){
                temp = temp + " " + Math.random().toString(36).substring(7);
                setTranscript(temp);
            } else {
                //If call is not in progress, clear the interval
                clearInterval(interval);
            }
        }, 1000);
    }, [callInProgress]);

    // Function to handle the beginning of a call
    // We are using useCallback to memoize the function and prevent unnecessary re-renders making the app more efficient
    const handleBeginCall = useCallback(() => {
        //This is where the call would be handled
        setCallInProgress(true);
        generateTranscript(transcript);
    }, [transcript, generateTranscript]);

    const joinGoogleMeet = useCallback(() => {
        //Placeholder for joining a google meet
        //This is where the user would join the google meet
        console.log("Joining Google Meet");
        handleBeginCall();
    }, [handleBeginCall]);

    // Function to handle the end of a call
    const handleEndCall = useCallback(() => {
        //This is where the call would be ended
        setCallInProgress(false);
    }, []);

    // Function to handle the muting of the call
    const handleMute = useCallback(() => {
        //This is where the call would be muted
        setIsMuted(!isMuted);
    }, [isMuted]); //It will use the value of isMuted from the first render rather than the updated value which makes this function not work as expected

    //This is the useEffect hook that will run when the component mounts
    useEffect(() => {
        //This is where the call would be started
        //Get camera permission for android
        async() => {
            if(Platform.OS === "android"){
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: "Permission for Camera",
                            message: "This app needs access to your camera",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "Ok",
                        }
                    );
                    if(granted === PermissionsAndroid.RESULTS.GRANTED){
                        console.log("Camera access granted");
                    } else {
                        console.log("Camera permission denied");
                    }
                } catch(e){
                    console.log(e);
                }
            }
        };
        joinGoogleMeet();
    }, [joinGoogleMeet]); //We put an empty dependency array to make sure this hook only runs once

    return (
        <View style={styles.container}>
            {callInProgress ? ( //Ternary operator to check if the call is in progress
                <>
                    <CameraComponent />
                    <Video //Placeholder for the call stream
                        style={styles.callStream}
                        //Placeholder video. we would put the google meet stream here
                        source={{uri: "https://www.w3schools.com/html/mov_bbb.mp4"}}
                        muted={isMuted}
                        resizeMode="cover"
                        repeat={true}
                    />
                    <Text style={styles.transcript}>{transcript}</Text>
                    <View style={styles.buttons}>
                        <Button
                            title={isMuted ? "Unmute" : "Mute"}
                            onPress={handleMute}
                        />
                        <Button
                            title="End Call"
                            onPress={handleEndCall}
                        />
                    </View>
                </>
            ) : ( //If the call is not in progress
                <Text style={styles.noCall}>Call has ended</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    callStream: {
        width: "100%",
        height: "100%",
    },
    transcript: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    noCall: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default VideoCallScreen;