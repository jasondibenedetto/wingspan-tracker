import React, { useReducer, useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../layout';

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii};
  padding: 32px;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  margin-top: 0;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Button = styled.button.attrs({
  type: 'button'
})`
  border-radius: 32px;
  border: 0;
  font-size: 18px;
  display: inline-block;
  cursor: pointer;
  width: 32px;
  height: 32px;
  text-align: center;
  flex: 0;
  transition: all 0.3s ease-in-out;
`;

const IncrementButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  margin-left: 8px;
`;

const DecrementButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.black};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const ItemText = styled.h2`
  margin-bottom: 0;
  margin-top: 0;
  font-size: 16px;
  font-weight: normal;
`;

const ItemValue = styled(ItemText)`
  display: inline-block;
  margin-left: 32px;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 18px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalHeading = styled.h3`
  font-weight: bold;
  margin-bottom: 0;
  font-size: 24px;
`;

const TotalValue = styled(TotalHeading)`
  color: ${({ theme }) => theme.colors.blue};
`;

const ResetButton = styled.button.attrs({ type: 'button' })`
  border: 1px dotted ${({ theme }) => theme.colors.darkGray};
  border-radius: ${({ theme }) => theme.radii};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  margin-top: 16px;
  padding: 8px 16px;
  cursor: pointer;
`;

const initialState = {
  birds: 0,
  bonusCards: 0,
  endOfRoundGoals: 0,
  eggs: 0,
  foodOnCards: 0,
  tuckedCards: 0
};

const increment = value => value + 1;

const decrement = value => (value > 0 ? value - 1 : 0);

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': {
      return { ...state, [action.value]: increment(state[action.value]) };
    }

    case 'decrement': {
      return { ...state, [action.value]: decrement(state[action.value]) };
    }

    default: {
      return initialState;
    }
  }
};

const Line = ({ title, value, state, dispatch }) => (
  <Item>
    <ItemText>{title}</ItemText>
    <div>
      <DecrementButton
        onClick={() => dispatch({ type: 'decrement', value })}
        borderColor="blue"
        borderWidth="1px"
        borderStyle="solid"
      >
        -
      </DecrementButton>
      <IncrementButton onClick={() => dispatch({ type: 'increment', value })}>
        +
      </IncrementButton>
      <ItemValue>{state[value]}</ItemValue>
    </div>
  </Item>
);

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calculateTotal = useMemo(() => {
    let total = 0;

    Object.keys(state).forEach(key => {
      total += state[key];
    });

    return total;
  }, [state]);

  return (
    <Layout>
      <Wrapper>
        <Container>
          <Heading>Wingspan Tracker</Heading>
          <Line title="Birds" value="birds" {...{ state, dispatch }} />
          <Line
            title="Bonus Cards"
            value="bonusCards"
            {...{ state, dispatch }}
          />
          <Line
            title="End-of-round Goals"
            value="endOfRoundGoals"
            {...{ state, dispatch }}
          />
          <Line title="Eggs" value="eggs" {...{ state, dispatch }} />
          <Line
            title="Food on cards"
            value="foodOnCards"
            {...{ state, dispatch }}
          />
          <Line
            title="Tucked cards"
            value="tuckedCards"
            {...{ state, dispatch }}
          />
          <Total>
            <TotalHeading>Total: </TotalHeading>
            <TotalValue>{calculateTotal}</TotalValue>
          </Total>
        </Container>
        <ResetButton onClick={() => dispatch({ type: 'reset' })}>
          Reset
        </ResetButton>
      </Wrapper>
    </Layout>
  );
};

export default Home;
