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

export const TouchableOpacity = styled.View`
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
align-self: flex-start;
`;

export const SubmitButton = styled.TouchableOpacity`
   width: 140px;
   height: 80px;
   font-size: 17px;
   border-radius: 8px;
   background-color: #008000;
   margin-top: 20px;
   align-items: center;
   justify-content: center;
`;

export const SubmitText = styled.Text`
   font-size: 20px;
   color: #FFF;
   text-align: center;
`;



