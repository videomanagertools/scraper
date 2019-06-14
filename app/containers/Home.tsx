import React, { useState } from 'react';

import { Layout, Button } from 'antd';
import FolderViewer from '../components/FolderViewer/index';
const { Header, Sider, Content } = Layout;
const { dialog } = require('electron').remote;
import * as R from 'ramda';
import { generateFileTree } from '../utils';

export default () => {
  const [tree, setTree] = useState([{}]);
  function handleSelect(paths) {
    dialog.showOpenDialog(
      {
        title: '122',
        properties: ['openDirectory', 'openFile', 'multiSelections']
      },
      filePaths => {
        if (!R.is(Array, filePaths) || R.isEmpty(filePaths)) return;
        let a = generateFileTree(filePaths);
        setTree([a]);
      }
    );
  }
  return (
    <div>
      <Layout>
        <Header>
          <Button onClick={handleSelect}>dddd</Button>
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
};
