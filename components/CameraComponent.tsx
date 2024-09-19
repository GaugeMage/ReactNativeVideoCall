import React, {useCallback, useState, useRef} from "react";
import {View, Button, StyleSheet} from "react-native";
import {RNCamera} from "react-native-camera";

const CameraComponent: React.FC = () => {
    const [cameraFace, setCameraFace] = useState(RNCamera.Constants.Type.front);
    //The reason we use useRef is to store the camera reference for future use!
    const cameraRef = useRef<RNCamera>(null);

    const cameraControl = useCallback(() => { //This function will switch the camera type using our favorite ternary operator
        setCameraFace(cameraFace === RNCamera.Constants.Type.front
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front);
    }, [cameraFace]);

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={cameraFace}
                //We turn off flash mode because.... convenience for the user
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}
            />

            <View style={styles.controls}>
                <Button title="Switch Camera" onPress={cameraControl} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#F5FCFF",
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
});

export default CameraComponent;