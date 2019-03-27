import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Container } from './styles';

interface SafeAreaViewContentProps {
  children: React.ReactNode
}

const SafeAreaViewContent: React.FC<SafeAreaViewContentProps>=(props) => (
  <SafeAreaView
    style={Container}
    forceInset={{
      top: 'always',
      bottom: 'always',
      horizontal: 'never'
    }}>
    { props.children }
  </SafeAreaView>
);

export default SafeAreaViewContent;
