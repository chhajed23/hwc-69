import React from "react";
import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };

  handleBarcodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
  };

  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === "clicked" && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (

        <View style={styles.container}>
            <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
          }}
        />
          <Text style={styles.displayText}>
            {hasCameraPermission === true
              ? this.state.scannedData
              : "Request For Camera Permission"}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermission}
            title="Bar-Code Scanner"
          >
            <Text style={styles.buttonText}>Scan QR code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scanButton: {
    backgroundColor: "green",
    margin: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  displayText: {
    textDecorationLine: "underline",
    fontSize: 15,
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  }
});
