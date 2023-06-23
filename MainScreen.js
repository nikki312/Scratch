import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  PanResponder,
  TextInput,
} from 'react-native';

const MainScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([
    require('./assets/sprite.png'),
    require('./assets/n.png'),
    require('./assets/z.png'),
    require('./assets/t.png'),
  ]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [inputX, setInputX] = useState('0');
  const [inputY, setInputY] = useState('0');
  const [inputText, setInputText] = useState('');

  const handleNewScreenPress = () => {
    navigation.navigate('NewScreen');
  };

  const reset = () => {
    setInputX('0');
    setInputY('0');
    setInputText('');
    setCoordinates({ x: 0, y: 0 });
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const handlePanResponderMove = (_, gestureState) => {
    const { dx, dy } = gestureState;
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x + dx,
      y: prevCoordinates.y + dy,
    }));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
    })
  ).current;

  const handleXChange = (text) => {
    setInputX(text);
    setCoordinates((prevCoordinates) => ({
      x: parseInt(text),
      y: prevCoordinates.y,
    }));
  };

  const handleYChange = (text) => {
    setInputY(text);
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x,
      y: parseInt(text),
    }));
  };

  const handleCoordinateAction = (actions) => {
    actions.forEach((action, index) => {
      setTimeout(() => {
        if (action.type === 'moveX') {
          moveByCoordinates(action.value, 0);
        } else if (action.type === 'moveY') {
          moveByCoordinates(0, action.value);
        } else if (action.type === 'moveXY') {
          moveByCoordinates(action.valueX, action.valueY);
        } else if (action.type === 'goToOrigin') {
          setCoordinates({ x: 0, y: 0 });
        }
      }, (index + 1) * 1000);
    });
  };

  const CoordinateButton = ({ actions }) => {
    const handleButtonPress = () => {
      handleCoordinateAction(actions);
    };

    return <Button title="Run" onPress={handleButtonPress} />;
  };

  const moveByCoordinates = (x, y) => {
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x + x,
      y: prevCoordinates.y + y,
    }));
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity style={styles.imageItem} onPress={() => handleImagePress(item)}>
      <Image source={item} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBox} {...panResponder.panHandlers}>
        <TouchableOpacity style={styles.runButton} onPress={() => handleCoordinateAction([
          { type: 'moveX', value: 50 },
          { type: 'moveY', value: 50 },
          { type: 'moveXY', valueX: 20, valueY: 20 },
        ])}>
          <Text style={styles.runButtonText}>Run</Text>
        </TouchableOpacity>
        {selectedImage ? (
          <View style={styles.selectedImageContainer}>
            <Image
              source={selectedImage}
              style={[
                styles.selectedImage,
                selectedImage.style,
                {
                  transform: [
                    { translateX: isNaN(coordinates.x) ? 0 : coordinates.x },
                    { translateY: isNaN(coordinates.y) ? 0 : coordinates.y },
                  ],
                },
              ]}
            />
            {inputText !== '' && (
              <Text style={styles.inputTextOverlay}>{inputText}</Text>
            )}
          </View>
        ) : (
          <Text style={styles.placeholderText}>Select Sprite</Text>
        )}
      </View>

      <View style={styles.middleBox}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>X:</Text>
          <TextInput
            style={styles.input}
            value={inputX}
            onChangeText={handleXChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Y:</Text>
          <TextInput
            style={styles.input}
            value={inputY}
            onChangeText={handleYChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Text:</Text>
          <TextInput style={styles.input} value={inputText} onChangeText={setInputText} />
        </View>
        <Button title="↺" onPress={reset} />
      </View>

      <View style={styles.bottomBox}>
        <View style={styles.imageBoxContainer}>
          {imageData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageBox}
              onPress={() => handleImagePress(item)}
            >
              <Image source={item} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Add Actions to Your Sprite"
          onPress={handleNewScreenPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  topBox: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  middleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 100,
    marginVertical: 10,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImageContainer: {
    width: '70%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 5,
    width: 40, 
  },
  buttonContainer: {
    marginBottom: 10,
  },
  imageBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageBox: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageItem: {
    marginHorizontal: 10,
  },
  runButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 60,
    height: 30,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  runButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  inputTextOverlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    fontSize: 12,
  },
});

export default MainScreen;
