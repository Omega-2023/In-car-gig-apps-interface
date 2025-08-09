import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { SafetyBanner } from './components/SafetyBanner';
import { Navigation } from './components/Navigation';
import { OrdersScreen } from './routes/OrdersScreen';
import { OrderDetailScreen } from './routes/OrderDetailScreen';
import { StatusScreen } from './routes/StatusScreen';
import { SettingsScreen } from './routes/SettingsScreen';
import { useAppStore } from './store/useAppStore';
import './styles/theme.css';
import styles from './App.module.css';

function App() {
  const { activeOrderId } = useAppStore();

  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <SafetyBanner />
        
        <div className={styles.layout}>
          <Navigation />
          
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<OrdersScreen />} />
              <Route path="/order/:orderId" element={<OrderDetailScreen />} />
              <Route path="/status" element={<StatusScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </main>
        </div>

        {/* Auto-navigate to active order */}
        {activeOrderId && (
          <Navigate to={`/order/${activeOrderId}`} replace />
        )}
      </div>
    </Router>
  );
}

export default App;