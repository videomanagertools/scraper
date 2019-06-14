import React, { useState } from 'react';

import { Layout, Button } from 'antd';
import FolderViewer from '../components/FolderViewer/index';
const { Header, Sider, Content } = Layout;
const { dialog } = require('electron').remote;
import * as R from 'ramda';
import { generateFileTree } from '../utils';

function Home(props) {
  const [tree, setTree] = useState([]);
  function handleSelect(paths) {
    dialog.showOpenDialog(
      {
        title: 'Select',
        properties: ['openDirectory', 'openFile', 'multiSelections']
      },
      filePaths => {
        if (!R.is(Array, filePaths) || R.isEmpty(filePaths)) return;
        let tree = generateFileTree(filePaths);
        setTree(tree);
      }
    );
  }
  return (
    <div>
      <Layout>
        <Header>
          <Button onClick={handleSelect}>选取文件</Button>
        </Header>
        <Layout>
          <Sider width={300} theme="light">
            <FolderViewer tree={tree} />
          </Sider>
          <Content />
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
