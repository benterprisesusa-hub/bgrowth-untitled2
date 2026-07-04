/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, Navigation, Share2, Clipboard, HelpCircle, Info,
  Map as MapIcon, RotateCcw, Play, Check, Send, AlertTriangle, HelpCircle as HelpIcon, Car, Clock
} from 'lucide-react';
import { Trip } from '../types';

// Default presets for fast testing (São Paulo, BR region)
const PRESETS = [
  { name: 'São Paulo - Centro (Se)', lat: -23.5505, lon: -46.6333, address: 'Praça da Sé, Centro, São Paulo' },
  { name: 'São Paulo - Av. Paulista', lat: -23.5614, lon: -46.6559, address: 'Avenida Paulista, Cerqueira César, São Paulo' },
  { name: 'São Paulo - Pinheiros', lat: -23.5670, lon: -46.7020, address: 'Pinheiros, São Paulo - SP' },
  { name: 'São Paulo - Santana', lat: -23.5020, lon: -46.6252, address: 'Santana, Zona Norte, São Paulo' },
  { name: 'Rio de Janeiro - Copacabana', lat: -22.9698, lon: -43.1864, address: 'Copacabana, Rio de Janeiro - RJ' },
  { name: 'Belo Horizonte - Savassi', lat: -19.9386, lon: -43.9361, address: 'Savassi, Belo Horizonte - MG' }
];

interface FreeMapTrackerProps {
  onAddSimulatedTrip: (trip: Partial<Trip>) => void;
}

export default function FreeMapTracker({ onAddSimulatedTrip }: FreeMapTrackerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const routeGroupRef = useRef<any>(null);

  // Locations state [lat, lon]
  const [homeCoords, setHomeCoords] = useState<[number, number]>([-23.5505, -46.6333]); // default Praça da Sé
  const [homeName, setHomeName] = useState('Praça da Sé, Centro (Casa/Base)');

  const [job1Coords, setJob1Coords] = useState<[number, number]>([-23.5614, -46.6559]); // Paulista
  const [job1Name, setJob1Name] = useState('Avenida Paulista (Trabalho 1)');

  const [job2Coords, setJob2Coords] = useState<[number, number]>([-23.5670, -46.7020]); // Pinheiros
  const [job2Name, setJob2Name] = useState('Pinheiros (Trabalho 2)');

  // Routing calculations
  const [route1, setRoute1] = useState<{ distance: number; duration: number } | null>(null); // Home to Job 1
  const [route2, setRoute2] = useState<{ distance: number; duration: number } | null>(null); // Job 1 to Job 2
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Address search query & loading states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [targetSearchPoint, setTargetSearchPoint] = useState<'home' | 'job1' | 'job2'>('home');

  // Manual map click picker mode
  const [pickerMode, setPickerMode] = useState<'home' | 'job1' | 'job2' | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Leaflet instance loading indicator
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Dynamically load Leaflet from CDNs (100% free, avoids SSR/build bloat)
  useEffect(() => {
    let active = true;

    const loadLeafletAssets = async () => {
      if ((window as any).L) {
        if (active) setLeafletLoaded(true);
        return;
      }

      // Add CSS link
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Add Script tag
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        if (active) setLeafletLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadLeafletAssets();

    return () => {
      active = false;
    };
  }, []);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Create Map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: homeCoords,
        zoom: 12
      });

      // Standard OSM layer (100% Free)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);

      markersGroupRef.current = L.layerGroup().addTo(mapRef.current);
      routeGroupRef.current = L.layerGroup().addTo(mapRef.current);

      // Click listener for manual pin selection
      mapRef.current.on('click', (e: any) => {
        // Only trigger if a manual picker mode is active
        const { lat, lng } = e.latlng;
        
        setPickerMode(prevMode => {
          if (prevMode === 'home') {
            setHomeCoords([lat, lng]);
            setHomeName(`Marcado no mapa (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
            return null;
          } else if (prevMode === 'job1') {
            setJob1Coords([lat, lng]);
            setJob1Name(`Marcado no mapa (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
            return null;
          } else if (prevMode === 'job2') {
            setJob2Coords([lat, lng]);
            setJob2Name(`Marcado no mapa (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
            return null;
          }
          return prevMode;
        });
      });
    }

    // Refresh Markers
    const markersGroup = markersGroupRef.current;
    if (markersGroup) {
      markersGroup.clearLayers();

      // Home marker
      const homeIcon = L.divIcon({
        html: `<div class="bg-indigo-600 text-white font-extrabold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md text-xs">🏠</div>`,
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      L.marker(homeCoords, { icon: homeIcon })
        .bindPopup(`<b>Casa (Base)</b><br/>${homeName}`)
        .addTo(markersGroup);

      // Job 1 marker
      const job1Icon = L.divIcon({
        html: `<div class="bg-emerald-600 text-white font-extrabold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md text-xs">🧹</div>`,
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      L.marker(job1Coords, { icon: job1Icon })
        .bindPopup(`<b>Trabalho 1</b><br/>${job1Name}`)
        .addTo(markersGroup);

      // Job 2 marker
      const job2Icon = L.divIcon({
        html: `<div class="bg-rose-600 text-white font-extrabold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md text-xs">💼</div>`,
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      L.marker(job2Coords, { icon: job2Icon })
        .bindPopup(`<b>Trabalho 2</b><br/>${job2Name}`)
        .addTo(markersGroup);

      // Recenter or fit bounds when markers change
      try {
        const bounds = L.latLngBounds([homeCoords, job1Coords, job2Coords]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      } catch (err) {}
    }

  }, [leafletLoaded, homeCoords, job1Coords, job2Coords]);

  // Dynamic Routing Engine using free OSRM (Open Source Routing Machine API)
  const calculateRoutes = async () => {
    setErrorMsg(null);
    setIsCalculating(true);

    const L = (window as any).L;
    const routeGroup = routeGroupRef.current;
    if (routeGroup) {
      routeGroup.clearLayers();
    }

    try {
      // 1. Fetch Route 1 (Home to Job 1)
      const r1Url = `https://router.project-osrm.org/route/v1/driving/${homeCoords[1]},${homeCoords[0]};${job1Coords[1]},${job1Coords[0]}?overview=full&geometries=geojson`;
      const r1Res = await fetch(r1Url);
      if (!r1Res.ok) throw new Error("Falha ao consultar servidor OSRM.");
      const r1Data = await r1Res.json();

      if (r1Data.routes && r1Data.routes[0]) {
        const route = r1Data.routes[0];
        setRoute1({
          distance: Number((route.distance / 1000).toFixed(1)), // meters to km
          duration: Math.round(route.duration / 60) // seconds to minutes
        });

        // Draw path
        if (L && routeGroup && route.geometry?.coordinates) {
          const latLngs = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          L.polyline(latLngs, { color: '#4f46e5', weight: 5, opacity: 0.8 }).addTo(routeGroup);
        }
      }

      // 2. Fetch Route 2 (Job 1 to Job 2)
      const r2Url = `https://router.project-osrm.org/route/v1/driving/${job1Coords[1]},${job1Coords[0]};${job2Coords[1]},${job2Coords[0]}?overview=full&geometries=geojson`;
      const r2Res = await fetch(r2Url);
      if (!r2Res.ok) throw new Error("Falha ao consultar rota 2.");
      const r2Data = await r2Res.json();

      if (r2Data.routes && r2Data.routes[0]) {
        const route = r2Data.routes[0];
        setRoute2({
          distance: Number((route.distance / 1000).toFixed(1)),
          duration: Math.round(route.duration / 60)
        });

        // Draw path
        if (L && routeGroup && route.geometry?.coordinates) {
          const latLngs = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          L.polyline(latLngs, { color: '#e11d48', weight: 5, opacity: 0.8, dashArray: '5, 8' }).addTo(routeGroup);
        }
      }

    } catch (err: any) {
      console.error(err);
      setErrorMsg("Ocorreu um erro ao buscar rotas no servidor público gratuito do OpenStreetMap (OSRM).");
    } finally {
      setIsCalculating(false);
    }
  };

  // Perform route calculation automatically on mount or coordinate shift
  useEffect(() => {
    if (leafletLoaded) {
      calculateRoutes();
    }
  }, [leafletLoaded, homeCoords, job1Coords, job2Coords]);

  // Geocoding via Nominatim (100% Free)
  const handleAddressSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error("Geocoding failed", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Select searched coordinate
  const selectSearchResult = (item: any) => {
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    const label = item.display_name.split(',').slice(0, 3).join(',');

    if (targetSearchPoint === 'home') {
      setHomeCoords([lat, lon]);
      setHomeName(label);
    } else if (targetSearchPoint === 'job1') {
      setJob1Coords([lat, lon]);
      setJob1Name(label);
    } else if (targetSearchPoint === 'job2') {
      setJob2Coords([lat, lon]);
      setJob2Name(label);
    }

    setSearchResults([]);
    setSearchQuery('');
  };

  // Preset quick selector helper
  const applyPreset = (preset: typeof PRESETS[0], type: 'home' | 'job1' | 'job2') => {
    if (type === 'home') {
      setHomeCoords([preset.lat, preset.lon]);
      setHomeName(preset.name);
    } else if (type === 'job1') {
      setJob1Coords([preset.lat, preset.lon]);
      setJob1Name(preset.name);
    } else if (type === 'job2') {
      setJob2Coords([preset.lat, preset.lon]);
      setJob2Name(preset.name);
    }
  };

  // Dispatch details directly to WhatsApp (Click to Chat API)
  const handleSendToWhatsApp = () => {
    const text = `*BGrowth Ecosystem - Resumo de Percurso de Trabalho* 🚘\n\n` +
      `🏠 *Partida (Casa/Base):* ${homeName}\n` +
      `🧹 *Trabalho 1:* ${job1Name}\n` +
      `💼 *Trabalho 2:* ${job2Name}\n\n` +
      `---------------------------------\n` +
      `📈 *MÉTRICAS DO TRAJETO (100% Grátis)*\n` +
      `📍 *Rota 1 (Casa -> Trab 1):* ${route1 ? `${route1.distance} km (~${route1.duration} min)` : 'Calculando...'}\n` +
      `📍 *Rota 2 (Trab 1 -> Trab 2):* ${route2 ? `${route2.distance} km (~${route2.duration} min)` : 'Calculando...'}\n` +
      `📊 *Total de Deslocamento:* ${((route1?.distance || 0) + (route2?.distance || 0)).toFixed(1)} km\n` +
      `⏱️ *Tempo Estimado de Direção:* ${((route1?.duration || 0) + (route2?.duration || 0))} min\n` +
      `💰 *Dedução Estimada:* $${(((route1?.distance || 0) + (route2?.distance || 0)) * 0.725).toFixed(2)}\n\n` +
      `🗺️ Veja no mapa livre: https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${homeCoords[0]}%2C${homeCoords[1]}%3B${job1Coords[0]}%2C${job1Coords[1]}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Automatically save this path as a real logged trip in BGrowth Mileage
  const handleSaveToMileageDatabase = () => {
    const totalDistKm = (route1?.distance || 0) + (route2?.distance || 0);
    const totalDistMiles = Number((totalDistKm * 0.621371).toFixed(1)); // conversion to miles

    if (totalDistMiles <= 0) {
      alert("A distância precisa ser calculada antes de salvar!");
      return;
    }

    onAddSimulatedTrip({
      app: 'Cleaning Service',
      miles: totalDistMiles,
      purpose: `Home -> Job 1 (${route1?.distance} km) -> Job 2 (${route2?.distance} km)`
    });

    alert(`Sucesso! Trajeto de ${totalDistMiles} mi salvo no banco de dados do Mileage Log.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Informative Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              100% Gratuito & Integrado
            </span>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              OpenStreetMap + OSRM
            </span>
          </div>
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">Calculadora de Trajetos & Rotas Integrada</h2>
          <p className="text-xs text-slate-500">
            Calcule distâncias e durações de viagens entre sua casa e os locais dos trabalhos sem custos de API de mapas. Compartilhe diretamente com funcionários ou freelancers no WhatsApp!
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={calculateRoutes}
            disabled={isCalculating}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isCalculating ? 'animate-spin' : ''}`} /> Recalcular Rota
          </button>
          
          <button
            onClick={handleSendToWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm shadow-emerald-100"
          >
            <Send className="w-3.5 h-3.5" /> Enviar p/ WhatsApp
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Map Controls & Coordinates Selection (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Address search widget */}
          <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-3 shadow-xs">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" /> Geolocalização de Endereço Livre
            </h3>
            <p className="text-[11px] text-slate-500">Procure qualquer cidade, rua ou número do mundo para obter coordenadas exatas via OpenStreetMap.</p>
            
            <form onSubmit={handleAddressSearch} className="flex gap-2">
              <input 
                type="text"
                placeholder="Ex: Av. Paulista, 1000, Sao Paulo"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-indigo-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-colors shrink-0"
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </button>
            </form>

            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <span>Aplicar resultado ao ponto:</span>
              <div className="flex gap-1.5">
                <button 
                  type="button" 
                  onClick={() => setTargetSearchPoint('home')}
                  className={`px-2 py-0.5 rounded border transition-all ${targetSearchPoint === 'home' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  Casa 🏠
                </button>
                <button 
                  type="button" 
                  onClick={() => setTargetSearchPoint('job1')}
                  className={`px-2 py-0.5 rounded border transition-all ${targetSearchPoint === 'job1' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  Trab 1 🧹
                </button>
                <button 
                  type="button" 
                  onClick={() => setTargetSearchPoint('job2')}
                  className={`px-2 py-0.5 rounded border transition-all ${targetSearchPoint === 'job2' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  Trab 2 💼
                </button>
              </div>
            </div>

            {/* Geocode Results list */}
            {searchResults.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-200 space-y-1.5 max-h-[150px] overflow-y-auto">
                <p className="text-[9px] font-black uppercase text-slate-400 px-1.5 py-0.5">Clique para aplicar coordenadas:</p>
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectSearchResult(item)}
                    className="w-full text-left p-2 rounded hover:bg-white text-[10.5px] font-bold text-slate-700 transition-colors border border-transparent hover:border-slate-100 leading-tight"
                  >
                    🌍 {item.display_name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Locations detail cards with manual pin pickup and presets */}
          <div className="space-y-3">
            
            {/* Location 1: HOME */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-indigo-600 uppercase flex items-center gap-1">
                  🏠 Ponto de Partida (Sua Casa / Base)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">lat: {homeCoords[0].toFixed(4)}</span>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-700">Descrição:</p>
                <input 
                  type="text" 
                  value={homeName} 
                  onChange={e => setHomeName(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPickerMode(pickerMode === 'home' ? null : 'home')}
                  className={`flex-1 py-1 px-2.5 rounded-lg text-[10px] font-black border transition-all ${
                    pickerMode === 'home'
                      ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pickerMode === 'home' ? '🎯 Clique no Mapa para Salvar' : '📍 Definir clicando no Mapa'}
                </button>
                
                {/* Presets dropdown inline */}
                <select 
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx)) applyPreset(PRESETS[idx], 'home');
                  }}
                  className="bg-slate-50 border border-slate-200 text-[10px] font-black px-2 py-1 rounded-lg outline-none max-w-[120px]"
                >
                  <option value="">Presets Rápidos</option>
                  {PRESETS.map((p, i) => <option key={i} value={i}>{p.name.split(' - ')[1]}</option>)}
                </select>
              </div>
            </div>

            {/* Location 2: JOB 1 */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-emerald-600 uppercase flex items-center gap-1">
                  🧹 Trabalho 1 (Job 1)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">lat: {job1Coords[0].toFixed(4)}</span>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-700">Descrição:</p>
                <input 
                  type="text" 
                  value={job1Name} 
                  onChange={e => setJob1Name(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPickerMode(pickerMode === 'job1' ? null : 'job1')}
                  className={`flex-1 py-1 px-2.5 rounded-lg text-[10px] font-black border transition-all ${
                    pickerMode === 'job1'
                      ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pickerMode === 'job1' ? '🎯 Clique no Mapa para Salvar' : '📍 Definir clicando no Mapa'}
                </button>

                <select 
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx)) applyPreset(PRESETS[idx], 'job1');
                  }}
                  className="bg-slate-50 border border-slate-200 text-[10px] font-black px-2 py-1 rounded-lg outline-none max-w-[120px]"
                >
                  <option value="">Presets Rápidos</option>
                  {PRESETS.map((p, i) => <option key={i} value={i}>{p.name.split(' - ')[1]}</option>)}
                </select>
              </div>
            </div>

            {/* Location 3: JOB 2 */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-rose-600 uppercase flex items-center gap-1">
                  💼 Trabalho 2 (Job 2)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">lat: {job2Coords[0].toFixed(4)}</span>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-700">Descrição:</p>
                <input 
                  type="text" 
                  value={job2Name} 
                  onChange={e => setJob2Name(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPickerMode(pickerMode === 'job2' ? null : 'job2')}
                  className={`flex-1 py-1 px-2.5 rounded-lg text-[10px] font-black border transition-all ${
                    pickerMode === 'job2'
                      ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pickerMode === 'job2' ? '🎯 Clique no Mapa para Salvar' : '📍 Definir clicando no Mapa'}
                </button>

                <select 
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx)) applyPreset(PRESETS[idx], 'job2');
                  }}
                  className="bg-slate-50 border border-slate-200 text-[10px] font-black px-2 py-1 rounded-lg outline-none max-w-[120px]"
                >
                  <option value="">Presets Rápidos</option>
                  {PRESETS.map((p, i) => <option key={i} value={i}>{p.name.split(' - ')[1]}</option>)}
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Map & Route Stats Summary (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Real Leaflet Map Container */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden relative shadow-sm h-[320px]">
            {!leafletLoaded && (
              <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                <p className="text-xs font-bold text-slate-500 animate-pulse">Carregando mapa gratuito OpenStreetMap...</p>
              </div>
            )}

            {pickerMode && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-indigo-900/90 text-white text-[10.5px] font-black px-4 py-2 rounded-full z-10 shadow-lg text-center backdrop-blur-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                🎯 MODO PICKER ATIVO: Clique em qualquer lugar do mapa para reposicionar o ponto!
              </div>
            )}

            <div ref={mapContainerRef} className="w-full h-full z-0" />
          </div>

          {/* Dynamic route duration and distance indicators */}
          <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Cálculo de Distâncias e Tempos Reais (OSRM Driving API)</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Route segment 1 */}
              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl space-y-2">
                <p className="text-[10px] font-black text-indigo-700 uppercase flex items-center gap-1">
                  <span>🚗 Rota 1:</span> Casa &rarr; Trabalho 1
                </p>
                {route1 ? (
                  <div className="space-y-1">
                    <p className="text-xl font-black text-slate-800">{route1.distance} km</p>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" /> ~{route1.duration} minutos de direção
                    </p>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-slate-400 italic">Buscando rota...</p>
                )}
              </div>

              {/* Route segment 2 */}
              <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-xl space-y-2">
                <p className="text-[10px] font-black text-rose-700 uppercase flex items-center gap-1">
                  <span>🚗 Rota 2:</span> Trabalho 1 &rarr; Trabalho 2
                </p>
                {route2 ? (
                  <div className="space-y-1">
                    <p className="text-xl font-black text-slate-800">{route2.distance} km</p>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-500" /> ~{route2.duration} minutos de direção
                    </p>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-slate-400 italic">Buscando rota...</p>
                )}
              </div>

            </div>

            {/* Total Traveled and Deduction simulation */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Totais Combinados da Jornada:</p>
                <p className="text-lg font-black text-slate-800">
                  {((route1?.distance || 0) + (route2?.distance || 0)).toFixed(1)} km 
                  <span className="text-xs text-slate-400 font-bold ml-1">
                    (~{(((route1?.distance || 0) + (route2?.distance || 0)) * 0.621371).toFixed(1)} milhas)
                  </span>
                </p>
                <p className="text-[10.5px] text-slate-500 font-bold">
                  ⏱️ Tempo total de direção estimado: <span className="text-indigo-600 font-extrabold">{((route1?.duration || 0) + (route2?.duration || 0))} minutos</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveToMileageDatabase}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm shadow-indigo-100"
                >
                  <Check className="w-4 h-4" /> Registrar como Viagem
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs font-bold text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
