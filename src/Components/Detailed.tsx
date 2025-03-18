import styled from "styled-components";
import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

interface MovieDetail {
  title?: string;
  titleImg?: string;
  backgroundImg?: string;
  trailerId?: string;
  subTitle?: string;
  description?: string;
}

const Detailed = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is string
  const [detailData, setDetailData] = useState<MovieDetail | null>(null); // Use a proper type
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetailData(docSnap.data() as MovieDetail); // Type assertion
        } else {
          console.log("No such document in Firestore!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <Container>
    <Background showTrailer={showTrailer}>
      {showTrailer ? (
        <TrailerWrapper>
          <CloseButton onClick={handleCloseTrailer}>×</CloseButton>
          {detailData?.trailerId && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${detailData.trailerId}?autoplay=1&controls=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </TrailerWrapper>
      ) : (
        detailData?.backgroundImg && <img src={detailData.backgroundImg} alt={detailData.title || "Background"} />
      )}
    </Background>

    {!showTrailer && detailData && (
      <>
        <ImageTitle>
          {detailData.titleImg && <img src={detailData.titleImg} alt={detailData.title || "Title"} />}
        </ImageTitle>

        <ContentWrapper>
          <Controls>
            <Player>
              <img src="/images/play-icon-black.png" alt="play" />
              <span>Play</span>
            </Player>
            <Trailer onClick={() => setShowTrailer(true)}>
              <img src="/images/play-icon-white.png" alt="trailer" />
              <span>Trailer</span>
            </Trailer>
            <Addlist>
              <span />
              <span />
            </Addlist>
            <GroupWatch>
              <div>
                <img src="/images/group-icon.png" alt="group watch" />
              </div>
            </GroupWatch>
          </Controls>

          <SubTitle>{detailData.subTitle}</SubTitle>
          <Description>{detailData.description}</Description>
        </ContentWrapper>
      </>
    )}
  </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0;
  opacity: 0.8;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  
  ${props => props.showTrailer && `
    z-index: 10;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  `}

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const TrailerWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: 2px solid white;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  
  &:hover {
    background: rgba(255, 0, 0, 0.7);
  }
  
  @media (max-width: 768px) {
    top: -30px;
    right: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 874px;
  position: relative;
  z-index: 1;
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
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

const Controls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 24px 0;
  min-height: 56px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Player = styled.button`
  font-size: 20px;
  cursor: pointer;
  margin: 0 22px 0 0;
  padding: 0 24px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
    margin-right: 8px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 22px;
    font-size: 12px;
    margin: 0 10px 10px 0;

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
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50px;
  border: 2px solid white;
  position: relative;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    position: absolute;

    &:first-child {
      height: 2px;
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      width: 2px;
    }
  }
  
  @media (max-width: 768px) {
    height: 45px;
    width: 45px;
  }
`;

const GroupWatch = styled.div`
  margin-right: 16px;
  height: 56px;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50px;
  border: 2px solid white;

  div {
    height: 44px;
    width: 44px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    height: 45px;
    width: 45px;
    
    div {
      height: 35px;
      width: 35px;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detailed;