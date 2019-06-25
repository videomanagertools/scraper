import React, { useState } from 'react';

import { Layout } from 'antd';
import FolderViewer from '../../components/FolderViewer/index';
const { Header, Sider, Content } = Layout;
import HeaderContent from './Header';

import * as styles from './index.less';

function Home() {
  const [tree, setTree] = useState([]);
  return (
    <div>
      <Layout>
        <Header>
          <HeaderContent setTree={setTree} />
        </Header>
        <Layout>
          <Sider width={300} className={styles.sider} theme="light">
            <FolderViewer tree={tree} />
          </Sider>
          <Content />
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
