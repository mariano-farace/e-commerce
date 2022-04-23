import styled from "styled-components";

const Announcement = () => {
  const Container = styled.div`
    height: 30px;
    background-color: teal;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: white;
  `;

  return (
    <div>
      <Container>Super Deal: Free Shippin to Spain!</Container>
    </div>
  );
};

export default Announcement;
