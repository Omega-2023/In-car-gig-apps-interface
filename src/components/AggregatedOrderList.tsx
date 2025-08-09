import { useState, useEffect } from 'react';
import { FaSync, FaFilter } from 'react-icons/fa';
import type { Order } from '../providers/Provider';
import { useAppStore } from '../store/useAppStore';
import { OrderCard } from './OrderCard';
import styles from './AggregatedOrderList.module.css';

type FilterType = 'all' | 'doordash' | 'ubereats' | 'instacart' | 'accepted';

export const AggregatedOrderList = () => {
  const { orders, actions, ui, vehicle } = useAppStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Initial load
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await actions.refreshAll();
    setIsRefreshing(false);
  };

  const filterOrders = (orders: Order[]): Order[] => {
    switch (filter) {
      case 'doordash':
      case 'ubereats':
      case 'instacart':
        return orders.filter(order => 
          order.provider === filter && order.status === 'available'
        );
      case 'accepted':
        return orders.filter(order => 
          order.status !== 'available' && order.status !== 'declined'
        );
      case 'all':
      default:
        return orders.filter(order => order.status === 'available');
    }
  };

  const sortedOrders = filterOrders(orders).sort((a, b) => {
    // Sort by score (payout per mile) descending
    const scoreA = a.payoutUsd / a.distanceMi;
    const scoreB = b.payoutUsd / b.distanceMi;
    return scoreB - scoreA;
  });

  const handleOrderClick = (order: Order) => {
    if (order.status === 'available' && !vehicle.isParked) {
      // In driving mode, clicking should show order details but disable actions
      actions.setActiveOrder(order.id);
    } else if (order.status !== 'available') {
      // Show active order details
      actions.setActiveOrder(order.id);
    }
  };

  const getFilterCount = (filterType: FilterType) => {
    const currentOrders = orders;
    const filteredOrders = (() => {
      switch (filterType) {
        case 'doordash':
        case 'ubereats':
        case 'instacart':
          return currentOrders.filter(order => 
            order.provider === filterType && order.status === 'available'
          );
        case 'accepted':
          return currentOrders.filter(order => 
            order.status !== 'available' && order.status !== 'declined'
          );
        case 'all':
        default:
          return currentOrders.filter(order => order.status === 'available');
      }
    })();
    return filteredOrders.length;
  };

  const isRefreshDisabled = !vehicle.isParked;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({getFilterCount('all')})
          </button>
          <button 
            className={`${styles.tab} ${filter === 'doordash' ? styles.active : ''}`}
            onClick={() => setFilter('doordash')}
          >
            DoorDash ({getFilterCount('doordash')})
          </button>
          <button 
            className={`${styles.tab} ${filter === 'ubereats' ? styles.active : ''}`}
            onClick={() => setFilter('ubereats')}
          >
            Uber Eats ({getFilterCount('ubereats')})
          </button>
          <button 
            className={`${styles.tab} ${filter === 'instacart' ? styles.active : ''}`}
            onClick={() => setFilter('instacart')}
          >
            Instacart ({getFilterCount('instacart')})
          </button>
          <button 
            className={`${styles.tab} ${filter === 'accepted' ? styles.active : ''}`}
            onClick={() => setFilter('accepted')}
          >
            Active ({getFilterCount('accepted')})
          </button>
        </div>
        
        <button 
          className={`btn btn-secondary ${styles.refreshBtn}`}
          onClick={handleRefresh}
          disabled={isRefreshing || isRefreshDisabled}
        >
          <FaSync className={isRefreshing ? styles.spinning : ''} />
          Refresh
        </button>
      </div>

      {ui.error && (
        <div className={styles.error}>
          {ui.error}
        </div>
      )}

      <div className={styles.orderList}>
        {sortedOrders.length === 0 ? (
          <div className={styles.empty}>
            <FaFilter className={styles.emptyIcon} />
            <h3>No orders available</h3>
            <p>
              {filter === 'all' 
                ? 'Check back soon for new delivery opportunities'
                : `No ${filter} orders available right now`
              }
            </p>
            {filter !== 'all' && (
              <button 
                className="btn btn-secondary"
                onClick={() => setFilter('all')}
              >
                View All Orders
              </button>
            )}
          </div>
        ) : (
          sortedOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => handleOrderClick(order)}
              showActions={order.status === 'available'}
            />
          ))
        )}
      </div>
    </div>
  );
};
