import styled from "styled-components";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Detailed: React.FC = () => {
  const { id } = useParams(); // Correct syntax
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return; // Ensure id exists

      try {
        const docRef = doc(db, "movies", id); // Reference the document
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          setDetailData(docSnap.data()); // Set movie details
        } else {
          console.log("No such document in Firebase 🔥");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchMovieDetails();
  }, [id]); // Dependency array to refetch when `id` changes

   

  return (
    // <div> Welcome to detailed!</div>
    <Container>
      <Background>
        <img
          src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/49B92C046117E89BC9243A68EE277A3B30D551D4599F23C10BF0B8C1E90AEFB6/scale?width=1440&aspectRatio=1.78&format=jpeg"
          alt="Incrediable 2"
        />
      </Background>

      <ImageTitle>
        <img
          src="https://www.pngall.com/wp-content/uploads/16/Inside-Out-Logo-Transparent.png"
          alt="inside-out"
        />
      </ImageTitle>

      <ContainerMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="play" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <Addlist>
            <span />
            <span />
          </Addlist>
          <GroupWatch>
                <div>
                  <img src="/images/group-icon.png" alt="" />
                </div>
          </GroupWatch>

        </Controls>
        <SubTitle>
          SubTitle
        </SubTitle>
        <Description>
          Description
        </Description>
      </ContainerMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw+5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    // height:100%;
    // width:100%;
    // object-fit:cover;
    width: 100vw;
    height: 100vh;
    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContainerMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-item: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 20px;
  cursor: pointer;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  align-items: center;
  display: flex;
  align-item: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 22px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const Addlist = styled.div`
  margin-right: 16px;
  height: 56px;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50px;
  border: 2px solid white;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
   

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

   &:nth-child(2){
    height:16px;
    transform:translateX(-8px) rotate(0deg);
    width:2px

   }
  }
    
`;

const GroupWatch= styled.div`
  margin-right: 16px;
  height: 56px;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50px;
  border: 2px solid white;

  div{
    height:44px;
    width:44px;
    background:rgb(0,0,0);
    border-radius:50%;

img{

  width:100%;   
  

}

  }
`;
const SubTitle=styled.div`
  color:rgb(249,249,249);
  font-size:15px;
  min-height:20px;

  @media (max-width:768px){
  font-size:12px;

  }
`;

const Description=styled.div`
  line-height:1.4;
  font-size:20px;
  padding:16px 0px;
  color:rgb(249,249,249);

  @media(max-width:768px){
    font-size:14px;
  }

`;




export default Detailed;
