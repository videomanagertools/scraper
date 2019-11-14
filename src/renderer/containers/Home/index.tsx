import React from 'react';

import { Layout } from 'antd';
import HeaderContent from './HeaderContent';
import SiderContent from './SiderContent';
import MainContent from './MainContent';

import * as styles from './index.less';

const { Header, Sider, Content } = Layout;

function Home() {
  return (
    <div>
      <Layout>
        <Header>
          <HeaderContent />
        </Header>
        <Layout>
          <Sider width={300} className={styles.sider} theme="light">
            <SiderContent />
          </Sider>
          <Content>
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
