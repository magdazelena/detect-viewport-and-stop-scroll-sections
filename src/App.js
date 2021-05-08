import React from 'react'
import Container from './components/Container';
import Section from './components/Section';

function App() {
  return (
    <Container>
      <Section id="1">
        <p>1</p>
      </Section>
      <Section id="2">
        <p>2</p>
      </Section>
      <Section id="3" manual>
        <Button />
        <p>3</p>
      </Section>
      <Section id="4">
        <p>4</p>
      </Section>
      <Section id="5">
        <p>5</p>
      </Section>
      <Section id="6">
        <p>6</p>
      </Section>
    </Container>
  );
}

export default App

const Button = (props) => (<button onClick={props.resumeScroll}>Trigger</button>)