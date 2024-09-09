import styled from "styled-components/native";

export const Background = styled.View`
   flex:1;
   background-color: #FFF;
   justify-content: center;
`;

export const Container = styled.View`
   flex: 1;
  width: 100%;
  background-color: #FFF;
  align-items: center;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  background-color: #FFF;
`;

export const ScrollViewContent = styled.View`
  align-items: center;
`;

export const TouchableOpacity = styled.View`
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-evenly;
   align-self: flex-start;
`;


export const SubmitButton = styled.TouchableOpacity`
   flex:1;
   width: 140px;
   height: 65px;
   font-size: 17px;
   border-radius: 8px;
   background-color: #008000;
   margin-top: 10px;
   margin-bottom: 10px;
   align-items: center;
   justify-content: center;
`;

export const SubmitText = styled.Text`
   font-size: 20px;
   color: #FFF;
   text-align: center;
`;


export const AreaInput = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: center;
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

export const Text = styled.Text`
   flex-direction: row;
   font-size: 17px;
   padding: 10px;
   
`;
