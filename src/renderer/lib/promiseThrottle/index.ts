import pLimit from 'p-limit';

export default promiseThrottle;
interface IOptions {
  concurrency?: number;
  onRes?: (limit: any) => void;
}
interface IPromiseTask {
  task: (...rest: any[]) => Promise<any>;
  arguments: any[];
}
function promiseThrottle(promises: IPromiseTask[], options: IOptions) {
  const { concurrency = 2, onRes } = options;
  const limit = pLimit(concurrency);
  return Promise.all(
    promises.map(promise =>
      limit(() => promise.task(...promise.arguments).then(res => res)).then(
        () => onRes(limit)
      )
    )
  );
}
