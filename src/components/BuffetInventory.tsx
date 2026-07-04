/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, Filter, Minus, ChevronUp, ChevronDown, Package, Edit, Trash2 } from 'lucide-react';

interface BuffetInventoryProps {
  lang: 'pt' | 'en' | 'es' | 'fr';
}

export default function BuffetInventory({ lang }: BuffetInventoryProps) {
  const isPt = lang === 'pt';

  const getLabel = (pt: string, en: string, es: string, fr: string) => {
    if (lang === 'pt') return pt;
    if (lang === 'es') return es;
    if (lang === 'fr') return fr;
    return en;
  };

  // Seeded inventory matching Screen 13 of the mockups perfectly!
  const [inventory, setInventory] = useState([
    { id: '1', name: getLabel('Prato Raso (Branco)', 'Dinner Plate (White)', 'Plato Llano (Blanco)', 'Assiette Plate (Blanche)'), category: getLabel('Louças', 'Tableware', 'Vajilla', 'Vaisselle'), stock: 120, unit: 'un', status: 'OK' },
    { id: '2', name: getLabel('Taça de Vinho Cristal', 'Crystal Wine Glasses', 'Copas de Cristal de Vino', 'Verres à Vin en Cristal'), category: getLabel('Taças', 'Glassware', 'Copas', 'Verres'), stock: 150, unit: 'un', status: 'OK' },
    { id: '3', name: getLabel('Guardanapo Linho Cru', 'Linen Napkins (Raw)', 'Servilletas de Lino Crudo', 'Serviettes en Lin Brut'), category: getLabel('Materiais', 'Materials', 'Materiales', 'Matériel'), stock: 200, unit: 'un', status: 'OK' },
    { id: '4', name: getLabel('Cadeira Tiffany Dourada', 'Gold Tiffany Chairs', 'Sillas Tiffany Doradas', 'Chaises Tiffany Dorées'), category: getLabel('Móveis', 'Furniture', 'Mobiliario', 'Mobilier'), stock: 80, unit: 'un', status: 'Baixo' },
    { id: '5', name: getLabel('Mesa Redonda 8 Lugares', 'Round Tables (8 Seats)', 'Mesas Redondas (8 Plazas)', 'Tables Rondes (8 Places)'), category: getLabel('Móveis', 'Furniture', 'Mobiliario', 'Mobilier'), stock: 20, unit: 'un', status: 'OK' },
    { id: '6', name: getLabel('Copo Long Drink Lapidado', 'Long Drink Glassware', 'Vasos de Trago Largo', 'Verres Long Drink'), category: getLabel('Copos', 'Cups', 'Vasos', 'Verres'), stock: 180, unit: 'un', status: 'OK' },
    { id: '7', name: getLabel('Talher Inox Clássico', 'Stainless Steel Cutlery', 'Cubiertos de Acero Inoxidable', 'Couverts en Acier Inoxydable'), category: getLabel('Talheres', 'Cutlery', 'Cubiertos', 'Couverts'), stock: 200, unit: 'un', status: 'OK' },
    { id: '8', name: getLabel('Bandeja Inox Garçom', 'Waiter Serving Trays', 'Bandejas de Mozo Inoxidables', 'Plateaux de Service Inox'), category: getLabel('Equipamentos', 'Equipment', 'Equipos', 'Équipement'), stock: 15, unit: 'un', status: 'Baixo' },
  ]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // New item form inputs
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState('Louças');
  const [newStock, setNewStock] = useState(100);
  const [newUnit, setNewUnit] = useState('un');

  const categories = ['All', 'Louças', 'Taças', 'Copos', 'Talheres', 'Móveis', 'Materiais', 'Equipamentos'];

  const getStatus = (stock: number, cat: string) => {
    if (stock <= 15) return 'Crítico';
    if (stock <= 85 && (cat === 'Louças' || cat === 'Móveis' || cat === 'Copos')) return 'Baixo';
    return 'OK';
  };

  const handleAdjustStock = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const nextStock = Math.max(0, item.stock + delta);
        return {
          ...item,
          stock: nextStock,
          status: getStatus(nextStock, item.category)
        };
      }
      return item;
    }));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: newName,
      category: newCat,
      stock: newStock,
      unit: newUnit,
      status: getStatus(newStock, newCat)
    };
    setInventory(prev => [newItem, ...prev]);
    setNewName('');
    setNewStock(100);
    setShowAddForm(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm(isPt ? 'Tem certeza que deseja remover este item do inventário?' : 'Are you sure you want to delete this inventory item?')) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const filteredItems = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 text-left" id="buffet-inventory-panel">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-600" /> 
            {isPt ? 'Controle de Inventário de Eventos' : 'Event Asset Inventory'}
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold">
            {isPt ? 'Gerenciamento de talheres, louças, taças e móveis disponíveis para despacho.' : 'Manage available dining sets, crystal glasses, table napkins, and luxury event chairs.'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> {isPt ? 'Adicionar Item' : 'Add Item'}
        </button>
      </div>

      {/* Add New Item Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleAddItem} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-3 animate-fade-in text-xs">
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{isPt ? 'Nome do Item' : 'Item Name'}</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Taça de Champagne Lapidada"
              className="w-full font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{isPt ? 'Categoria' : 'Category'}</label>
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="w-full font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
            >
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{isPt ? 'Estoque Inicial' : 'Initial Stock'}</label>
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                className="w-full font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-extrabold rounded-lg hover:bg-indigo-700"
            >
              ✓
            </button>
          </div>
        </form>
      )}

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 text-xs">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={isPt ? 'Buscar item do acervo...' : 'Search asset stock...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full font-semibold pl-9.5 pr-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:bg-white"
          />
        </div>

        {/* Category horizontal badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-3xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
              }`}
            >
              {cat === 'All' ? (isPt ? 'Todos' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Stock Table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-3xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-5 py-3.5">{isPt ? 'Item' : 'Item'}</th>
              <th className="px-5 py-3.5">{isPt ? 'Categoria' : 'Category'}</th>
              <th className="px-5 py-3.5 text-center">{isPt ? 'Quantidade' : 'In Stock'}</th>
              <th className="px-5 py-3.5 text-center">{isPt ? 'Status' : 'Status'}</th>
              <th className="px-5 py-3.5 text-center">{isPt ? 'Ações' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
            {filteredItems.map(item => {
              const isLow = item.status === 'Baixo' || item.status === 'Crítico';
              const statusColors = {
                'OK': 'bg-emerald-50 text-emerald-700 border-emerald-100/50',
                'Baixo': 'bg-amber-50 text-amber-700 border-amber-100/50',
                'Crítico': 'bg-rose-50 text-rose-700 border-rose-100/50'
              }[item.status] || 'bg-slate-50 text-slate-500';

              return (
                <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-5 py-4 font-black text-slate-800">{item.name}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2.5">
                      <button
                        onClick={() => handleAdjustStock(item.id, -10)}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                        title="-10"
                      >
                        -
                      </button>
                      <span className="font-mono font-black text-slate-800 text-xs min-w-[35px] text-center">
                        {item.stock} <span className="text-[10px] text-slate-400">{item.unit}</span>
                      </span>
                      <button
                        onClick={() => handleAdjustStock(item.id, 10)}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                        title="+10"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${statusColors}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          const val = prompt(isPt ? 'Digite a nova quantidade:' : 'Enter new stock quantity:', item.stock.toString());
                          if (val !== null) {
                            const num = parseInt(val) || 0;
                            setInventory(prev => prev.map(it => it.id === item.id ? { ...it, stock: num, status: getStatus(num, it.category) } : it));
                          }
                        }}
                        className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                        title={isPt ? 'Editar estoque' : 'Edit stock'}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                        title={isPt ? 'Excluir item' : 'Delete item'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-slate-400 font-semibold leading-normal">
            {isPt ? 'Nenhum item encontrado no estoque.' : 'No asset found in stock.'}
          </div>
        )}
      </div>

    </div>
  );
}
