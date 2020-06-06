import React from 'react';
import AppBar from '../AppBar';
import NavigationDrawer from '../NavigationDrawer';
import Content from './Content';

function Template(props) {
  return (
    <>
      <AppBar />
      <NavigationDrawer />
      <Content>{props.children}</Content>
    </>
  );
}

export default Template;
