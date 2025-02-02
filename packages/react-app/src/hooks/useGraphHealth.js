import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';

import { Web3Context } from '../contexts/Web3Context';
import { HOME_NETWORK } from '../lib/constants';
import { getHealthStatus } from '../lib/graphHealth';
import { getBridgeNetwork, logDebug, logError } from '../lib/helpers';
import { getEthersProvider } from '../lib/providers';

const FOREIGN_NETWORK = getBridgeNetwork(HOME_NETWORK);

const {
  REACT_APP_GRAPH_HEALTH_UPDATE_INTERVAL,
  REACT_APP_GRAPH_HEALTH_THRESHOLD_BLOCKS,
} = process.env;

const DEFAULT_GRAPH_HEALTH_UPDATE_INTERVAL = 15000;

const DEFAULT_GRAPH_HEALTH_THRESHOLD_BLOCKS = 10;

const UPDATE_INTERVAL =
  REACT_APP_GRAPH_HEALTH_UPDATE_INTERVAL ||
  DEFAULT_GRAPH_HEALTH_UPDATE_INTERVAL;

const THRESHOLD_BLOCKS =
  REACT_APP_GRAPH_HEALTH_THRESHOLD_BLOCKS ||
  DEFAULT_GRAPH_HEALTH_THRESHOLD_BLOCKS;

export const useGraphHealth = (description, onlyHome = false) => {
  // We can't use the graph health api for self-hosted graph nodes

  const [foreignHealthy, setForeignHealthy] = useState(true);
  if(!foreignHealthy){
    setForeignHealthy(true);
  }
  
  const [loading, setLoading] = useState(false);
  if(loading){
    setLoading(false);
  }
    
  /*

  const { providerChainId } = useContext(Web3Context);

  const isHome = providerChainId === HOME_NETWORK;

  const [foreignHealthy, setForeignHealthy] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriptions = [];
    const unsubscribe = () => {
      subscriptions.forEach(s => {
        clearTimeout(s);
      });
    };

    const load = async () => {
      try {
        setLoading(true);
        const [
          { foreignHealth },
          homeBlockNumber,
          foreignBlockNumber,
        ] = await Promise.all([
          getHealthStatus(),
          getEthersProvider(HOME_NETWORK).getBlockNumber(),
          getEthersProvider(FOREIGN_NETWORK).getBlockNumber(),
        ]);
        logDebug({
          foreignHealth,
          homeBlockNumber,
          foreignBlockNumber,
          message: 'updated graph health data',
        });

        setForeignHealthy(
          foreignHealth &&
            foreignHealth.isReachable &&
            !foreignHealth.isFailed &&
            foreignHealth.isSynced &&
            Math.abs(foreignHealth.latestBlockNumber - foreignBlockNumber) <
              THRESHOLD_BLOCKS,
        );

        const timeoutId = setTimeout(() => load(), UPDATE_INTERVAL);
        subscriptions.push(timeoutId);
      } catch (graphHealthError) {
        logError({ graphHealthError });
      } finally {
        setLoading(false);
      }
    };

    // unsubscribe from previous polls
    unsubscribe();

    load();
    // unsubscribe when unmount component
    return unsubscribe;
  }, []);

  const toast = useToast();
  const toastIdRef = useRef();

  useEffect(() => {
    if (!loading) {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
      if (!foreignHealthy) {
        if (onlyHome && !isHome) return;
        toastIdRef.current = toast({
          title: 'Subgraph Error',
          description,
          status: 'error',
          duration: null,
          isClosable: false,
        });
      }
    }
  }, [foreignHealthy, loading, toast, onlyHome, isHome, description]);
*/
};
