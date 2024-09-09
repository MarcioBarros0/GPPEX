import styled from "styled-components/native";

export const Background = styled.View`
   flex:1;
   background-color: #FFF;
`;

export const Container = styled.KeyboardAvoidingView`
   flex:1;
   align-items: center;
   justify-content: center;
`;

export const Logo = styled.Image`
   margin-bottom: 25px;
`;

export const TouchableOpacity = styled.ImageBackground`
`;

export const ImageBackground = styled.Image`
flex-direction: 'row';
`;

export const Image = styled.TouchableOpacity`
   width: 50%;
   height: 45px;
   font-size: 17px;
   border-radius: 8px;
   background-color: #008000;
   margin-top: 10px;
   align-items: center;
   justify-content: center;
`;

export const AreaInput = styled.View`
   flex-direction: row;
   width: 90%;
   align-items: center;
   justify-content: center;
`;

export const Text = styled.Text`
   flex-direction: row;
   font-size: 17px;
   padding: 10px;
`;

export const Input = styled.TextInput`
   flex:1;
   background-color: #F0FFF0;
   font-size: 17px;
   padding: 10px;
   border-radius: 8px;
   color: #121212;
   margin-bottom: 10px;
   width: 200px;
   justify-content: center;
`;

export const SubmitButton = styled.TouchableOpacity`
   width: 50%;
   height: 60px;
   font-size: 17px;
   border-radius: 8px;
   background-color: #008000;
   margin-top: 10px;
   align-items: center;
   justify-content: center;
`;

export const SubmitText = styled.Text`
   font-size: 20px;
   color: #FFF;
   text-align: center;
`;

export const Link = styled.TouchableOpacity`
   margin-top: 10px;
   margin-bottom: 10px;
   justify-content: center;
   align-items: center;
   flex-direction: column;
`;

export const LinkText = styled.Text`
   justify-content: center;
   align-items: center;
`;

export const View = styled.View`
  justify-content: center;
   align-items: center;
`;
