import ImagePicker from 'react-native-image-crop-picker';

export const takePicture = async () => {
  try {
    const takenPicture = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
        includeBase64: true,
    });
    return takenPicture;
  } catch (error) {
    console.log(error);
    return false;
  }
};

