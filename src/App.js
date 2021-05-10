import React from 'react'
import SnackbarProvider from 'react-simple-snackbar'
import Container from './components/Container';
import Section from './components/Section';
import Button from './components/Button'

function App() {
  return (
    <SnackbarProvider>
      <Container>
        <Section id="1">
          <p>1</p>
        </Section>
        <Section id="2">
          <p>2</p>
        </Section>
        <Section id="3" manual>
          <Button />
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
    </SnackbarProvider>
  );
}

export default App
