import { useEffect, useState } from 'react';
import { githubService } from '../services/githubService';

export const useRepoInfo = () => {
  const [repoInfo, setRepoInfo] = useState({ owner: '', name: '' });
  const [init, setInit] = useState(false);

  useEffect(() => {
    (async () => {
      await githubService.initialize();
      setInit(true);
    })();
  }, []);

  useEffect(() => {
    const repo = githubService.getRepository();

    if (repo) {
      setRepoInfo(repo);
    }
  }, [init]);

  return repoInfo;
};
