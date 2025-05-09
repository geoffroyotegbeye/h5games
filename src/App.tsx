import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SoloGamesPage from './pages/SoloGamesPage';
import ArcadeGamesPage from './pages/ArcadeGamesPage';
import GamePage from './pages/GamePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="solo" element={<SoloGamesPage />} />
          <Route path="arcade" element={<ArcadeGamesPage />} />
          <Route path="games/:category/:gameId" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
