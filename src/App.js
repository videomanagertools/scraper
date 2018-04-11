import React, {Component} from 'react';
import logo from './logo.svg';
import styles from './App.module.less';
import {Button} from 'antd';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles["App-header"]}>
          <img src={logo} className={styles["App-logo"]} alt="logo"/>
          <h1 className={styles["App-title"]}>Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
