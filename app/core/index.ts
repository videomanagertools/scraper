// import generateNFO from './fileGenerator';
import douban from '../scraper/douban';

// const fs = require('fs-extra');
// const path = require('path');

export default async (queryString: string) => {
  douban('sss')
    .then(res => {
      console.log(res, queryString);
      return queryString;
    })
    .catch(err => {
      console.log(err);
    });
};
