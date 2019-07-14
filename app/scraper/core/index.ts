import douban from '../douban';

export default async (queryString: string) => {
  douban(queryString)
    .then(res => {
      console.log(res, queryString);
      return queryString;
    })
    .catch(err => {
      console.log(err);
    });
};
