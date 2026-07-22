import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { mockScenarios } from '../data/mockScenarios';
import type { Scenario, TargetLanguage } from '../types/scenario';
import { PageTransition } from '../components/layout/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Globe, 
  Activity, 
  Play, 
  MessageSquare,
  Coffee,
  ShoppingBag,
  Briefcase,
  Car,
  UserCheck,
  Sparkles,
  MapPin,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  BarChart3,
  Languages,
  Mic,
  Sliders,
  Menu
} from 'lucide-react';

export const ScenarioSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectScenario } = useSession();
  
  // Default selected scenario: Bengaluru Tech Interview
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    mockScenarios.find(s => s.id === 'job-interview') || mockScenarios[0]
  );
  const [activeLanguage, setActiveLanguage] = useState<TargetLanguage>('English');
  const [activeProficiency, setActiveProficiency] = useState<string>('Intermediate');

  // Sidebar Feature Dropdown Toggle States
  const [openLanguagesDropdown, setOpenLanguagesDropdown] = useState(true);
  const [openPersonasDropdown, setOpenPersonasDropdown] = useState(false);
  const [openToolsDropdown, setOpenToolsDropdown] = useState(false);

  // Mobile Sidebar Drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleCardClick = (sc: Scenario) => {
    if (!sc) return;
    setSelectedScenario(sc);
    if (sc.targetLanguage && sc.targetLanguage.length > 0) {
      setActiveLanguage(sc.targetLanguage[0]);
    }
  };

  const handleStartSession = () => {
    if (!selectedScenario) return;
    selectScenario(selectedScenario, activeLanguage, activeProficiency);
    navigate('/chat');
  };

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'chai-stall':
        return <Coffee className="w-5 h-5 text-blue-600" />;
      case 'market-haggling':
        return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case 'job-interview':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'rickshaw-ride':
        return <Car className="w-5 h-5 text-blue-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
    }
  };

  const renderDifficultyTag = (diff?: string) => {
    switch (diff) {
      case 'Easy':
        return (
          <span className="text-emerald-800 text-xs font-semibold bg-emerald-50/90 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="text-amber-800 text-xs font-semibold bg-amber-50/90 border border-amber-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Medium
          </span>
        );
      case 'Hard':
        return (
          <span className="text-rose-800 text-xs font-semibold bg-rose-50/90 border border-rose-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  // Reusable Sidebar Component
  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-4 selection:bg-blue-600 selection:text-white">
      <div className="flex flex-col gap-6">
        
        {/* Sidebar Brand Header */}
        <div className="flex items-center gap-3 px-2 pt-2 select-none">
          <img
            src="/logo.png"
            alt="Conversa Logo"
            className="w-8 h-8 object-contain drop-shadow-xs"
          />
          <div className="flex flex-col">
            <span className="font-brand font-black text-xl tracking-tight text-slate-900 leading-none">
              Conversa
            </span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 mt-0.5">
              Immersion Studio
            </span>
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Navigation
          </span>

          <button
            onClick={() => { navigate('/select'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span>Immersion Arenas</span>
          </button>

          <button
            onClick={() => { navigate('/history'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-all cursor-pointer"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Session History Log</span>
          </button>

          <button
            onClick={() => { navigate('/debrief'); setMobileSidebarOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Performance Analytics</span>
          </button>
        </div>

        {/* Feature Dropdowns / Accordions */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/80">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Studio Features
          </span>

          {/* 1. Languages Dropdown */}
          <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenLanguagesDropdown(!openLanguagesDropdown)}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-blue-600" />
                <span>Indian Languages</span>
              </div>
              {openLanguagesDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openLanguagesDropdown && (
              <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-600">
                <span className="flex items-center justify-between font-medium hover:text-blue-600 cursor-pointer">
                  <span>🇮🇳 Hindi (Standard & Dialect)</span>
                  <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">10 Scenarios</span>
                </span>
                <span className="flex items-center justify-between font-medium hover:text-blue-600 cursor-pointer">
                  <span>🦁 Gujarati (Ahmedabad)</span>
                  <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">Active</span>
                </span>
                <span className="flex items-center justify-between font-medium hover:text-blue-600 cursor-pointer">
                  <span>🚩 Marathi (Mumbai)</span>
                  <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">Active</span>
                </span>
                <span className="flex items-center justify-between font-medium hover:text-blue-600 cursor-pointer">
                  <span>🎨 Bengali & Tamil</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Live STT</span>
                </span>
              </div>
            )}
          </div>

          {/* 2. Personas Dropdown */}
          <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenPersonasDropdown(!openPersonasDropdown)}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>AI Personas & Roles</span>
              </div>
              {openPersonasDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openPersonasDropdown && (
              <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-600">
                <span className="font-medium">☕ Karan Bhai (Chai Vendor)</span>
                <span className="font-medium">🛍️ Ramesh Lal (Shopkeeper)</span>
                <span className="font-medium">💼 Shruti Hegde (Technical Lead)</span>
                <span className="font-medium">🛺 Babubhai (Auto Driver)</span>
              </div>
            )}
          </div>

          {/* 3. AI Tools Dropdown */}
          <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenToolsDropdown(!openToolsDropdown)}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Sarvam AI Tools</span>
              </div>
              {openToolsDropdown ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {openToolsDropdown && (
              <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Mic className="w-3 h-3 text-blue-600" />
                  <span>Sarvam Voice STT Monitor</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3 h-3 text-indigo-600" />
                  <span>Real-Time Fluency Metric</span>
                </span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sidebar Footer User Profile */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 leading-none">Learner Account</span>
            <span className="text-[10px] text-slate-400 truncate max-w-[110px]">user@conversa.ai</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
          title="Sign Out to Login Page"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <PageTransition>
      {/* Off-white canvas matching Login Page Aesthetics */}
      <div className="w-full min-h-screen bg-[#F0F2F5] text-slate-900 flex selection:bg-blue-600 selection:text-white font-sans relative">
        
        {/* ========================================================================= */}
        {/* DESKTOP LEFT SIDEBAR */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 h-screen sticky top-0 shrink-0 shadow-xs z-20">
          <SidebarContent />
        </aside>

        {/* ========================================================================= */}
        {/* MOBILE SIDEBAR DRAWER */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-2xl flex flex-col"
              >
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* MAIN DASHBOARD CONTENT AREA */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full min-h-screen">
          
          {/* Header Bar */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-blue-100 text-blue-700 border border-blue-200 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    SARVAM AI ENGINE
                  </span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-slate-500 text-xs font-semibold">10+ Indian Dialects</span>
                </div>
                
                <h1 className="font-brand font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
                  Immersion Arenas
                </h1>
              </div>
            </div>

            <button
              onClick={() => navigate('/history')}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <History className="w-4 h-4 text-blue-600" />
              <span>Session History Log</span>
            </button>
          </header>

          {/* Workspace Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Scenario Cards List (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Select Scenario ({mockScenarios.length})
                </h2>
                <span className="text-xs text-slate-400 font-mono">Sarvam Speech Neural Voice</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {mockScenarios.map((sc) => {
                  const isSelected = selectedScenario?.id === sc.id;
                  
                  return (
                    <div
                      key={sc.id}
                      onClick={() => handleCardClick(sc)}
                      className={`rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col gap-3 relative overflow-hidden ${
                        isSelected
                          ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md transform scale-[1.01]'
                          : 'bg-white/90 border-slate-200/80 hover:border-blue-300 hover:bg-white shadow-2xs'
                      }`}
                    >
                      {/* Top Row: Icon + Title + Difficulty Tag */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-2xs ${
                            isSelected ? 'bg-blue-50 border-blue-200' : 'bg-slate-100 border-slate-200'
                          }`}>
                            {getScenarioIcon(sc.id)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-extrabold text-slate-900 tracking-tight m-0">
                                {sc.name}
                              </h3>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                              )}
                            </div>
                            <span className="text-xs text-slate-500 font-medium block mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                              {sc.description ? sc.description.split('.')[0] : ''}
                            </span>
                          </div>
                        </div>

                        {renderDifficultyTag(sc.difficulty)}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                          {sc.persona?.name || 'Persona'} ({sc.persona?.role || 'Role'})
                        </span>
                        <span>•</span>
                        <span className="font-mono text-[11px] text-slate-400 font-medium">
                          {sc.targetLanguage ? sc.targetLanguage.join(', ') : ''}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Configuration & Start Studio Box (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-7 flex flex-col gap-5 shadow-sm sticky top-6">
              
              <div className="border-b border-slate-200/80 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-1">
                  <Activity className="w-4 h-4" />
                  Active Configuration
                </div>
                <h3 className="font-brand text-xl font-extrabold text-slate-900 tracking-tight">
                  {selectedScenario?.name || 'Scenario'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {selectedScenario?.description || ''}
                </p>
              </div>

              {/* Target Persona Detail Card */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                    {selectedScenario?.persona?.name ? selectedScenario.persona.name.charAt(0) : 'P'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-none">
                      {selectedScenario?.persona?.name || 'Persona'}
                    </h4>
                    <span className="text-xs text-slate-500 mt-1 block">
                      {selectedScenario?.persona?.role || 'Role'}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80 italic font-normal">
                  "{selectedScenario?.promptGuideline ? selectedScenario.promptGuideline.slice(0, 110) : ''}..."
                </div>
              </div>

              {/* Language Selector */}
              {selectedScenario?.targetLanguage && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                    <span>Select Immersion Language</span>
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {selectedScenario.targetLanguage.map((lang) => {
                      const isActive = activeLanguage === lang;
                      return (
                        <button
                          key={lang}
                          onClick={() => setActiveLanguage(lang)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Proficiency Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Proficiency Level
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                    const isActive = activeProficiency === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setActiveProficiency(lvl)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                          isActive
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* START IMMERSION STUDIO BUTTON */}
              <button
                onClick={handleStartSession}
                className="w-full bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] hover:from-blue-600 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2 group"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                Start Immersion Studio
              </button>
            </div>

          </div>
        </main>

      </div>
    </PageTransition>
  );
};
