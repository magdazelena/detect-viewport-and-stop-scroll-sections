import React from 'react'
import Container from './components/Container';
import Section from './components/Section';

function App() {
  return (
    <Container>
      <Section id="1">
        1
      </Section>
      <Section id="2">
        2
      </Section>
      <Section id="3" manual>
        <Button />
      </Section>
      <Section id="4">
        4
      </Section>
      <Section id="5">
        5
      </Section>
      <Section id="6">
        6
      </Section>
    </Container>
  );
}

export default App

const Button = (props) => (<button onClick={props.resumeScroll}>Trigger</button>)