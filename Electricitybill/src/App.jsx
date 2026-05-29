import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Users, 
  TrendingDown, 
  Percent, 
  Zap, 
  Plus, 
  Trash2, 
  Edit3, 
  Calculator, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

// TNEB Billing Slabs Calculator
export function calculateTNEBBill(units, isAfter) {
  if (units <= 0) {
    return {
      totalBill: 0,
      slabs: [{ name: '0-100 Units', units: 0, rate: 0, cost: 0 }]
    };
  }
  
  const slabs = [];
  let totalBill = 0;
  
  if (units <= 500) {
    // Category A: up to 500 units bi-monthly
    if (isAfter) {
      // CM Vijay Scheme: 200 units free
      // Slab 1: 0-200 units free
      const slab1Units = Math.min(units, 200);
      slabs.push({ name: '0-200 Units (Free Scheme)', units: slab1Units, rate: 0, cost: 0 });
      
      // Slab 2: 201-400 units @ ₹4.70
      if (units > 200) {
        const slab2Units = Math.min(units - 200, 200);
        const cost = slab2Units * 4.70;
        totalBill += cost;
        slabs.push({ name: '201-400 Units', units: slab2Units, rate: 4.70, cost });
      }
      
      // Slab 3: 401-500 units @ ₹6.30
      if (units > 400) {
        const slab3Units = Math.min(units - 400, 100);
        const cost = slab3Units * 6.30;
        totalBill += cost;
        slabs.push({ name: '401-500 Units', units: slab3Units, rate: 6.30, cost });
      }
    } else {
      // Before Scheme: 100 units free
      // Slab 1: 0-100 units free
      const slab1Units = Math.min(units, 100);
      slabs.push({ name: '0-100 Units (Free)', units: slab1Units, rate: 0, cost: 0 });
      
      // Slab 2: 101-200 units @ ₹2.35
      if (units > 100) {
        const slab2Units = Math.min(units - 100, 100);
        const cost = slab2Units * 2.35;
        totalBill += cost;
        slabs.push({ name: '101-200 Units', units: slab2Units, rate: 2.35, cost });
      }
      
      // Slab 3: 201-400 units @ ₹4.70
      if (units > 200) {
        const slab3Units = Math.min(units - 200, 200);
        const cost = slab3Units * 4.70;
        totalBill += cost;
        slabs.push({ name: '201-400 Units', units: slab3Units, rate: 4.70, cost });
      }
      
      // Slab 4: 401-500 units @ ₹6.30
      if (units > 400) {
        const slab4Units = Math.min(units - 400, 100);
        const cost = slab4Units * 6.30;
        totalBill += cost;
        slabs.push({ name: '401-500 Units', units: slab4Units, rate: 6.30, cost });
      }
    }
  } else {
    // Category B: above 500 units bi-monthly (Both Before & After are identical)
    // Slab 1: 0-100 units free
    const slab1Units = Math.min(units, 100);
    slabs.push({ name: '0-100 Units (Free)', units: slab1Units, rate: 0, cost: 0 });
    
    // Slab 2: 101-400 units @ ₹4.70
    if (units > 100) {
      const slab2Units = Math.min(units - 100, 300);
      const cost = slab2Units * 4.70;
      totalBill += cost;
      slabs.push({ name: '101-400 Units', units: slab2Units, rate: 4.70, cost });
    }
    
    // Slab 3: 401-500 units @ ₹6.30
    if (units > 400) {
      const slab3Units = Math.min(units - 400, 100);
      const cost = slab3Units * 6.30;
      totalBill += cost;
      slabs.push({ name: '401-500 Units', units: slab3Units, rate: 6.30, cost });
    }
    
    // Slab 4: 501-600 units @ ₹8.40
    if (units > 500) {
      const slab4Units = Math.min(units - 500, 100);
      const cost = slab4Units * 8.40;
      totalBill += cost;
      slabs.push({ name: '501-600 Units', units: slab4Units, rate: 8.40, cost });
    }
    
    // Slab 5: 601-800 units @ ₹9.45
    if (units > 600) {
      const slab5Units = Math.min(units - 600, 200);
      const cost = slab5Units * 9.45;
      totalBill += cost;
      slabs.push({ name: '601-800 Units', units: slab5Units, rate: 9.45, cost });
    }
    
    // Slab 6: 801-1000 units @ ₹10.50
    if (units > 800) {
      const slab6Units = Math.min(units - 800, 200);
      const cost = slab6Units * 10.50;
      totalBill += cost;
      slabs.push({ name: '801-1000 Units', units: slab6Units, rate: 10.50, cost });
    }
    
    // Slab 7: Above 1000 units @ ₹11.55
    if (units > 1000) {
      const slab7Units = units - 1000;
      const cost = slab7Units * 11.55;
      totalBill += cost;
      slabs.push({ name: 'Above 1000 Units', units: slab7Units, rate: 11.55, cost });
    }
  }
  
  return {
    totalBill: Number(totalBill.toFixed(2)),
    slabs
  };
}

const defaultFamilies = [
  { id: 1, name: "Raju & Family", description: "Daily Wage Worker", units: 85 },
  { id: 2, name: "Kavitha", description: "Weaver / Handloom Worker", units: 150 },
  { id: 3, name: "Mani & Family", description: "Auto Driver", units: 220 },
  { id: 4, name: "Devi & Daughter", description: "Single Mother / Tailoring Clerk", units: 280 },
  { id: 5, name: "Senthamil", description: "Retired Government Clerk", units: 320 },
  { id: 6, name: "Selvi", description: "Tailoring Shop & Home", units: 410 },
  { id: 7, name: "Subramani", description: "Middle Class Family (1 AC used sparingly)", units: 490 },
  { id: 8, name: "Karthik", description: "IT Employee (Work From Home & AC)", units: 520 },
  { id: 9, name: "Anand", description: "Large Joint Family (2 ACs & Water Pump)", units: 680 },
  { id: 10, name: "Ganesh", description: "Shop Owner (Living Upstairs)", units: 780 }
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [families, setFamilies] = useState(() => {
    const saved = localStorage.getItem('families');
    return saved ? JSON.parse(saved) : defaultFamilies;
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Custom Slider Calculator State
  const [sliderUnits, setSliderUnits] = useState(350);
  
  // Family CRUD Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFamily, setCurrentFamily] = useState({ name: '', description: '', units: 100 });
  const [editId, setEditId] = useState(null);
  
  // Detail Modal state (for showing a specific family's slab breakdown)
  const [selectedFamilyDetail, setSelectedFamilyDetail] = useState(null);

  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('colorTheme') || 'purple';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color', colorTheme);
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    localStorage.setItem('families', JSON.stringify(families));
  }, [families]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Helper: enrich family records with bill calculations
  const enrichFamilies = () => {
    return families.map(f => {
      const billBefore = calculateTNEBBill(f.units, false).totalBill;
      const billAfter = calculateTNEBBill(f.units, true).totalBill;
      const savings = Number((billBefore - billAfter).toFixed(2));
      const pctSaved = billBefore > 0 ? Number(((savings / billBefore) * 100).toFixed(1)) : 0;
      return {
        ...f,
        billBefore,
        billAfter,
        savings,
        pctSaved,
        isBeneficiary: f.units <= 500 && savings > 0,
        eligibleForScheme: f.units <= 500
      };
    });
  };

  const enrichedData = enrichFamilies();

  // Summary Metrics calculations
  const totalFamilies = enrichedData.length;
  const beneficiariesCount = enrichedData.filter(f => f.eligibleForScheme && f.units > 100).length;
  // Note: Raju (85 units) gets free bill in both, so he is eligible, but has no additional cash savings since his bill was already 0.
  const totalSavingsCombined = enrichedData.reduce((acc, f) => acc + f.savings, 0);
  const totalBillBeforeCombined = enrichedData.reduce((acc, f) => acc + f.billBefore, 0);
  const totalBillAfterCombined = enrichedData.reduce((acc, f) => acc + f.billAfter, 0);
  const avgBillReductionPercent = totalBillBeforeCombined > 0 
    ? Number(((totalSavingsCombined / totalBillBeforeCombined) * 100).toFixed(1)) 
    : 0;

  // Add Family handler
  const handleAddFamily = (e) => {
    e.preventDefault();
    if (!currentFamily.name) return;
    const newFamily = {
      id: Date.now(),
      name: currentFamily.name,
      description: currentFamily.description || 'Domestic Consumer',
      units: Number(currentFamily.units) || 0
    };
    setFamilies(prev => [...prev, newFamily]);
    setIsAddModalOpen(false);
    setCurrentFamily({ name: '', description: '', units: 100 });
  };

  // Edit Family handlers
  const openEditModal = (family) => {
    setEditId(family.id);
    setCurrentFamily({ name: family.name, description: family.description, units: family.units });
    setIsEditModalOpen(true);
  };

  const handleEditFamily = (e) => {
    e.preventDefault();
    setFamilies(prev => prev.map(f => f.id === editId ? { 
      ...f, 
      name: currentFamily.name, 
      description: currentFamily.description, 
      units: Number(currentFamily.units) 
    } : f));
    setIsEditModalOpen(false);
    setEditId(null);
    setCurrentFamily({ name: '', description: '', units: 100 });
  };

  const handleDeleteFamily = (id) => {
    if (window.confirm("Are you sure you want to remove this family from the database?")) {
      setFamilies(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all family list to the default 10 families?")) {
      setFamilies(defaultFamilies);
    }
  };

  // Recharts: Prep data for charts
  const barChartData = enrichedData.map(f => ({
    name: f.name.split(' ')[0], // short name
    units: f.units,
    'Bill Before Scheme (₹)': f.billBefore,
    'Bill After Scheme (₹)': f.billAfter,
    'Savings (₹)': f.savings
  }));

  const pieChartData = [
    { name: 'Major Beneficiary (101 - 500 units)', value: enrichedData.filter(f => f.units > 100 && f.units <= 500).length, color: '#10b981' },
    { name: 'Fully Subsidy Already (0 - 100 units)', value: enrichedData.filter(f => f.units <= 100).length, color: '#0ea5e9' },
    { name: 'Exceeded Limits (> 500 units)', value: enrichedData.filter(f => f.units > 500).length, color: '#f43f5e' }
  ];

  // Prep data for dynamic curve (0 to 800 units)
  const curveData = [];
  for (let u = 0; u <= 750; u += 25) {
    const billB = calculateTNEBBill(u, false).totalBill;
    const billA = calculateTNEBBill(u, true).totalBill;
    curveData.push({
      units: u,
      'Bill Before': billB,
      'Bill After': billA,
      'Savings': Number((billB - billA).toFixed(2))
    });
  }

  // Calculator states
  const calcBefore = calculateTNEBBill(sliderUnits, false);
  const calcAfter = calculateTNEBBill(sliderUnits, true);
  const calcSavings = Number((calcBefore.totalBill - calcAfter.totalBill).toFixed(2));
  const calcPercent = calcBefore.totalBill > 0 ? Number(((calcSavings / calcBefore.totalBill) * 100).toFixed(1)) : 0;

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo-section">
            <Zap size={28} className="icon" style={{ color: 'var(--primary)' }} />
            <div>
              <h1>Minsara Thittam Analyzer</h1>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                <span className="scheme-badge">CM Vijay Free Electricity Scheme 2026</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <div className="color-selector" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginRight: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Theme:</span>
              {[
                { name: 'purple', value: '#8b5cf6', label: 'Violet' },
                { name: 'blue', value: '#3b82f6', label: 'Classic Blue' },
                { name: 'green', value: '#10b981', label: 'Emerald' },
                { name: 'amber', value: '#f59e0b', label: 'Amber' }
              ].map((color) => (
                <button
                  key={color.name}
                  onClick={() => setColorTheme(color.name)}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: color.value,
                    border: colorTheme === color.name ? '2px solid var(--text-primary)' : '1px solid var(--card-border)',
                    cursor: 'pointer',
                    padding: 0,
                    boxShadow: colorTheme === color.name ? '0 0 6px var(--primary)' : 'none',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  title={color.label}
                />
              ))}
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={toggleTheme}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Intro Section banner */}
        <section className="intro-banner">
          <div className="intro-content">
            <h2 className="intro-title">Understanding CM Vijay's Electricity Reform</h2>
            <p className="intro-desc">
              On <strong>May 10, 2026</strong>, newly sworn-in CM C. Joseph Vijay introduced a pivotal scheme granting 
              <strong> 200 units of free electricity</strong> bi-monthly to domestic consumers. However, this subsidy is restricted 
              to households whose bi-monthly consumption remains <strong>up to 500 units</strong>. For households exceeding 500 units, 
              the standard billing structure remains in place, where they continue to get only the basic 100 free units. This project 
              analyzes the financial impact on Tamil Nadu families, highlighting the "500-unit threshold cliff".
            </p>
            <div className="intro-badges">
              <span className="badge-item"><Zap size={14} style={{ color: 'var(--primary)' }} /> First 200 Units Free (if usage &le; 500 units)</span>
              <span className="badge-item"><CheckCircle2 size={14} style={{ color: 'var(--secondary)' }} /> Standard 100 Units Free (if usage &gt; 500 units)</span>
              <span className="badge-item"><AlertTriangle size={14} style={{ color: 'var(--accent)' }} /> High Tariff cliff at 501+ Units</span>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--card-border)', marginBottom: '24px', paddingBottom: '8px' }}>
          <button 
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard Overview
          </button>
          <button 
            className={`btn ${activeTab === 'families' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('families')}
          >
            Family Comparison ({totalFamilies} Families)
          </button>
          <button 
            className={`btn ${activeTab === 'calculator' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('calculator')}
          >
            Interactive Tariff Simulator
          </button>
          <button 
            className={`btn ${activeTab === 'info' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('info')}
          >
            Tariff Structure & Rules
          </button>
        </div>

        {/* ==================== DASHBOARD TAB ==================== */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Metric Grid */}
            <div className="grid-cols-4">
              <div className="card metric-card">
                <span className="metric-label">Total Families Analyzed</span>
                <span className="metric-value">{totalFamilies}</span>
                <span className="metric-change" style={{ color: 'var(--text-muted)' }}>
                  <Users size={14} /> Representative sample
                </span>
              </div>
              <div className="card metric-card secondary">
                <span className="metric-label">Benefitting Families</span>
                <span className="metric-value">
                  {beneficiariesCount} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ {totalFamilies}</span>
                </span>
                <span className="metric-change positive">
                  <Percent size={14} /> {Number(((beneficiariesCount / totalFamilies) * 100).toFixed(0))}% of households saving cash
                </span>
              </div>
              <div className="card metric-card">
                <span className="metric-label">Combined Bi-monthly Savings</span>
                <span className="metric-value">₹{totalSavingsCombined.toLocaleString('en-IN')}</span>
                <span className="metric-change positive">
                  <TrendingDown size={14} /> ₹{(totalSavingsCombined / totalFamilies).toFixed(0)} avg saving per family
                </span>
              </div>
              <div className="card metric-card danger">
                <span className="metric-label">Total Combined Bill (Before vs After)</span>
                <span className="metric-value" style={{ fontSize: '1.5rem', marginTop: '16px' }}>
                  ₹{totalBillBeforeCombined.toLocaleString('en-IN')} &rarr; ₹{totalBillAfterCombined.toLocaleString('en-IN')}
                </span>
                <span className="metric-change positive">
                  <TrendingDown size={14} /> {avgBillReductionPercent}% combined bill reduction
                </span>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid-cols-2">
              {/* Bar Chart Before vs After Bills */}
              <div className="card">
                <h3 className="card-title">
                  <Zap size={18} style={{ color: 'var(--primary)' }} /> Before vs. After Bill Comparison (By Family)
                </h3>
                <div style={{ width: '100%', height: '350px', marginTop: '15px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                      <XAxis dataKey="name" stroke="var(--text-secondary)" />
                      <YAxis stroke="var(--text-secondary)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--bg-secondary)', 
                          borderColor: 'var(--card-border)', 
                          color: 'var(--text-primary)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="Bill Before Scheme (₹)" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Bill After Scheme (₹)" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>
                  Notice that families using &le; 500 units see their bill drop, while families with usage &gt; 500 units (Karthik, Anand, Ganesh) experience no change.
                </p>
              </div>

              {/* Pie Chart Benefit Breakdown */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h3 className="card-title">
                  <Percent size={18} style={{ color: 'var(--secondary)' }} /> Households Subsidy Status Distribution
                </h3>
                <div style={{ width: '100%', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--card-border)',
                          color: 'var(--text-primary)',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {pieChartData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }}></span>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.value} family ({((item.value / totalFamilies) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Savings Curve Area Chart */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <h3 className="card-title">
                <TrendingDown size={18} style={{ color: 'var(--primary)' }} /> Visualizing the "500-Unit Threshold Cliff" (TNEB Tariff Curve)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>
                This graph shows the bill progression under TNEB slabs from 0 to 750 units. The steep increase and loss of savings at 501 units is a critical threshold.
              </p>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                    <XAxis dataKey="units" label={{ value: 'Bi-monthly Unit Consumption', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)' }} stroke="var(--text-secondary)" />
                    <YAxis label={{ value: 'Bill Amount (₹)', angle: -90, position: 'insideLeft', offset: 10, fill: 'var(--text-muted)' }} stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--card-border)', 
                        color: 'var(--text-primary)',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area type="monotone" name="Bill Before (₹)" dataKey="Bill Before" stroke="var(--secondary)" fillOpacity={1} fill="url(#colorBefore)" strokeWidth={2} />
                    <Area type="monotone" name="Bill After (₹)" dataKey="Bill After" stroke="var(--primary)" fillOpacity={1} fill="url(#colorAfter)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="alert-box warning" style={{ marginTop: '20px', marginBottom: '0' }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>The 500-Unit Threshold Trap:</strong> Consuming exactly <strong>500 units</strong> costs a family <strong>₹1,255</strong> under CM Vijay's scheme. 
                  However, consuming just <strong>501 units</strong> (1 single unit more!) throws the family out of the scheme, raising the bill instantly to <strong>₹2,048</strong>! 
                  That is a <strong>₹793 bill spike for a single unit</strong>. Consumers must monitor their meters diligently to stay below 500 units.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== FAMILY COMPARISON TAB ==================== */}
        {activeTab === 'families' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="card-title" style={{ marginBottom: '4px' }}>
                  <Users size={18} style={{ color: 'var(--primary)' }} /> Family Database & Billing Registry
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Click on any family row to view their detailed slab-by-slab billing breakdown.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary btn-sm" onClick={handleResetDefaults}>
                  <RefreshCw size={14} /> Reset Defaults
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
                  <Plus size={14} /> Add Household
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Family Name & Type</th>
                    <th>Bi-Monthly Units</th>
                    <th>Bill Before (₹)</th>
                    <th>Bill After (₹)</th>
                    <th>Cash Savings (₹)</th>
                    <th>% Saved</th>
                    <th>Scheme Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrichedData.map((f) => (
                    <tr 
                      key={f.id} 
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedFamilyDetail(f)}
                    >
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.description}</div>
                      </td>
                      <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{f.units} units</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>₹{f.billBefore.toFixed(2)}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: f.eligibleForScheme ? 'var(--primary)' : 'var(--text-primary)' }}>
                        ₹{f.billAfter.toFixed(2)}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: f.savings > 0 ? 'var(--primary)' : 'var(--text-muted)' }}>
                        {f.savings > 0 ? `₹${f.savings.toFixed(2)}` : '₹0.00'}
                      </td>
                      <td>
                        {f.savings > 0 ? (
                          <span style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                            <TrendingDown size={12} /> {f.pctSaved}%
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>0%</span>
                        )}
                      </td>
                      <td>
                        {f.units <= 100 ? (
                          <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', background: 'var(--secondary-glow)', color: 'var(--secondary)', fontWeight: 600 }}>
                            Fully Free Basic
                          </span>
                        ) : f.units <= 500 ? (
                          <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', background: 'var(--primary-glow)', color: 'var(--primary)', fontWeight: 600 }}>
                            Scheme Beneficiary
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', background: 'var(--danger-glow)', color: 'var(--danger)', fontWeight: 600 }}>
                            Exceeded Limits (&gt;500)
                          </span>
                        )}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="icon-btn" onClick={() => openEditModal(f)} title="Edit Units">
                            <Edit3 size={12} />
                          </button>
                          <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleDeleteFamily(f.id)} title="Delete Household">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TARIFF SIMULATOR TAB ==================== */}
        {activeTab === 'calculator' && (
          <div className="grid-cols-2">
            {/* Live Slider Input */}
            <div className="card">
              <h3 className="card-title">
                <Calculator size={18} style={{ color: 'var(--primary)' }} /> Live Units Bill Simulator
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
                Drag the slider to adjust bi-monthly units and see how the bill changes instantly.
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Bi-Monthly Consumption</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  {sliderUnits} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>Units</span>
                </span>
              </div>

              <div className="slider-container">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={sliderUnits} 
                  onChange={(e) => setSliderUnits(Number(e.target.value))}
                  className="unit-slider"
                />
                
                {/* Quick Unit Presets */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  {[75, 150, 250, 350, 480, 500, 501, 650, 800].map((preset) => (
                    <button 
                      key={preset} 
                      className={`btn btn-sm ${sliderUnits === preset ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setSliderUnits(preset)}
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      {preset} U
                    </button>
                  ))}
                </div>
              </div>

              {/* Cliff Graphic */}
              <div className="cliff-visual">
                <div className="cliff-side left">Scheme Active</div>
                <div className="cliff-marker" style={{ left: `${Math.min((sliderUnits / 1000) * 100, 100)}%` }}>
                  {sliderUnits} U
                </div>
                <div className="cliff-marker-label">500 Units Limit</div>
                <div className="cliff-side right">Scheme Disabled</div>
              </div>

              {/* Dynamic Alerts */}
              {sliderUnits <= 100 ? (
                <div className="alert-box success">
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Fully Free Electricity!</strong> At {sliderUnits} units, the household is within the basic 100 units limit. The bill is **₹0.00** both before and after the scheme.
                  </div>
                </div>
              ) : sliderUnits <= 500 ? (
                <div className="alert-box success" style={{ background: 'var(--primary-glow)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <Zap size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary)' }} />
                  <div>
                    <strong style={{ color: 'var(--primary)' }}>Eligible for CM Vijay Scheme!</strong> Because consumption is up to 500 units, the first **200 units are completely free** (saving ₹235.00). 
                    The bill is reduced by **{calcPercent}%**.
                  </div>
                </div>
              ) : (
                <div className="alert-box danger">
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Exceeded Scheme Limit!</strong> At {sliderUnits} units, the household exceeds the 500 units cap. 
                    They do <strong>not</strong> get the 200 free units scheme (only the basic 100 units). 
                    No savings are achieved (₹0 savings). Reduce usage to &le; 500 units to save instantly!
                  </div>
                </div>
              )}

              {/* Live Before vs After side-by-side card */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                <div className="card" style={{ flex: 1, padding: '16px', textAlign: 'center', background: 'var(--bg-secondary)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>BILL BEFORE SCHEME</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '6px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    ₹{calcBefore.totalBill.toFixed(2)}
                  </div>
                </div>
                <div className="card" style={{ flex: 1, padding: '16px', textAlign: 'center', background: 'var(--primary-glow)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>BILL AFTER SCHEME</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '6px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                    ₹{calcAfter.totalBill.toFixed(2)}
                  </div>
                </div>
              </div>

              {calcSavings > 0 && (
                <div className="card" style={{ marginTop: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px dashed var(--primary)' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Net Bi-Monthly Savings:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>₹{calcSavings.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Detailed Slab Breakdown for Live Input */}
            <div className="card">
              <h3 className="card-title">
                <Info size={18} style={{ color: 'var(--secondary)' }} /> Slab-by-Slab Calculation Breakdown
              </h3>
              
              <div style={{ marginTop: '15px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>BEFORE SCHEME SLABS:</h4>
                <div className="slab-breakdown" style={{ marginBottom: '20px' }}>
                  {calcBefore.slabs.map((s, idx) => (
                    <div key={idx} className={`slab-row ${s.rate === 0 ? 'active-free' : ''}`}>
                      <span className="slab-label">{s.name}</span>
                      <span className="slab-math">{s.units} units &times; ₹{s.rate.toFixed(2)}</span>
                      <span className="slab-amount">₹{s.cost.toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', fontWeight: 700 }}>
                    <span>Calculated Bill Before:</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>₹{calcBefore.totalBill.toFixed(2)}</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>AFTER SCHEME SLABS:</h4>
                <div className="slab-breakdown">
                  {calcAfter.slabs.map((s, idx) => (
                    <div key={idx} className={`slab-row ${s.rate === 0 ? 'active-free' : 'active-paid'}`}>
                      <span className="slab-label">{s.name}</span>
                      <span className="slab-math">{s.units} units &times; ₹{s.rate.toFixed(2)}</span>
                      <span className="slab-amount">₹{s.cost.toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', fontWeight: 700, borderTop: '1px solid var(--card-border)', paddingTop: '12px' }}>
                    <span style={{ color: 'var(--primary)' }}>Calculated Bill After:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '1.1rem' }}>₹{calcAfter.totalBill.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== INFO & RULES TAB ==================== */}
        {activeTab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card">
              <h3 className="card-title"><Info size={18} style={{ color: 'var(--primary)' }} /> Official TNEB Domestic Tariff Structure</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Tamil Nadu generation and distribution corporation (TANGEDCO) calculates domestic electric bills on a <strong>bi-monthly cycle (once every two months)</strong>. 
                The bill follows a <strong>telescopic system</strong>. If total units cross the 500-unit threshold, the pricing system changes entirely, which increases the bill disproportionately.
              </p>

              <div className="grid-cols-2" style={{ marginBottom: '0', gap: '20px' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '12px', fontWeight: 600 }}>1. For Consumption Up to 500 Units</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Eligible for CM Vijay's 200 units free scheme. Subsidized tariff applies.
                  </p>
                  <table style={{ fontSize: '0.8rem' }}>
                    <thead>
                      <tr>
                        <th>Slab Range</th>
                        <th>Before Scheme Rate</th>
                        <th>After Scheme Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0 - 100 Units</td>
                        <td style={{ color: 'var(--primary)', fontWeight: 600 }}>Free (₹0.00)</td>
                        <td style={{ color: 'var(--primary)', fontWeight: 600 }} rowSpan="2">Free (0-200 Units Free)</td>
                      </tr>
                      <tr>
                        <td>101 - 200 Units</td>
                        <td>₹2.35 per unit</td>
                      </tr>
                      <tr>
                        <td>201 - 400 Units</td>
                        <td>₹4.70 per unit</td>
                        <td>₹4.70 per unit</td>
                      </tr>
                      <tr>
                        <td>401 - 500 Units</td>
                        <td>₹6.30 per unit</td>
                        <td>₹6.30 per unit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 style={{ color: 'var(--danger)', marginBottom: '12px', fontWeight: 600 }}>2. For Consumption Above 500 Units</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Not eligible for CM Vijay's scheme. Standard 100 units free continues, higher telescopic rates apply.
                  </p>
                  <table style={{ fontSize: '0.8rem' }}>
                    <thead>
                      <tr>
                        <th>Slab Range</th>
                        <th>Rate per Unit</th>
                        <th>Calculation Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0 - 100 Units</td>
                        <td style={{ color: 'var(--primary)', fontWeight: 600 }}>Free (₹0.00)</td>
                        <td>Standard basic free allowance</td>
                      </tr>
                      <tr>
                        <td>101 - 400 Units</td>
                        <td>₹4.70 per unit</td>
                        <td>Rate doubles compared to lower slab</td>
                      </tr>
                      <tr>
                        <td>401 - 500 Units</td>
                        <td>₹6.30 per unit</td>
                        <td>Higher middle tier</td>
                      </tr>
                      <tr>
                        <td>501 - 600 Units</td>
                        <td>₹8.40 per unit</td>
                        <td>Standard high tier</td>
                      </tr>
                      <tr>
                        <td>601 - 800 Units</td>
                        <td>₹9.45 per unit</td>
                        <td>Heavy consumption tier</td>
                      </tr>
                      <tr>
                        <td>801 - 1000 Units</td>
                        <td>₹10.50 per unit</td>
                        <td>Air conditioning and large appliance tier</td>
                      </tr>
                      <tr>
                        <td>Above 1000 Units</td>
                        <td>₹11.55 per unit</td>
                        <td>Commercial scale domestic tier</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title"><HelpCircle size={18} style={{ color: 'var(--secondary)' }} /> Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '15px' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Q: How much does a normal family save under the scheme?</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    A: Any family using between 200 and 500 units bi-monthly saves exactly <strong>₹235.00</strong> per billing cycle. 
                    This represents the cost of 100 units (from 101 to 200) at the pre-scheme rate of ₹2.35 per unit, which has now become free.
                  </p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Q: If I use 180 units, how much do I save?</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    A: If you use 180 units, your bill under the old scheme was ₹188.00 (80 units &times; ₹2.35). 
                    Under the new scheme, your bill is ₹0.00. So you save exactly <strong>₹188.00</strong> and pay absolutely nothing!
                  </p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Q: Why does the savings drop to ₹0 at 501 units?</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    A: The scheme is designed as a targeted welfare measure. CM Vijay's policy limits the benefit to low and medium energy consumers 
                    to encourage conservation and manage the state's subsidy burden. Therefore, heavy consumers (&gt;500 units) do not qualify.
                  </p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Q: How can families avoid crossing the 500-unit threshold?</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    A: Simple conservation methods like setting air conditioners to 26&deg;C, unplugging idle appliances, switching to energy-efficient LED bulbs, 
                    and avoiding running heavy appliances like washing machines or geysers during peak hours can keep bi-monthly usage safely below 500 units.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================== ADD FAMILY MODAL ==================== */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>✕</button>
            <h3 className="card-title" style={{ marginBottom: '20px' }}>
              <Plus size={20} style={{ color: 'var(--primary)' }} /> Add New Family Connection
            </h3>
            <form onSubmit={handleAddFamily}>
              <div className="form-group">
                <label>Family Name / Identifier</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Ramesh & Family" 
                  value={currentFamily.name}
                  onChange={(e) => setCurrentFamily({...currentFamily, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Household Type / Description</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Small house with refrigerator" 
                  value={currentFamily.description}
                  onChange={(e) => setCurrentFamily({...currentFamily, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Bi-Monthly Unit Consumption</label>
                <input 
                  type="number" 
                  min="0" 
                  max="5000"
                  className="form-input" 
                  placeholder="e.g. 320" 
                  value={currentFamily.units}
                  onChange={(e) => setCurrentFamily({...currentFamily, units: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Household</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== EDIT FAMILY MODAL ==================== */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>✕</button>
            <h3 className="card-title" style={{ marginBottom: '20px' }}>
              <Edit3 size={20} style={{ color: 'var(--secondary)' }} /> Edit Household Units
            </h3>
            <form onSubmit={handleEditFamily}>
              <div className="form-group">
                <label>Family Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={currentFamily.name}
                  onChange={(e) => setCurrentFamily({...currentFamily, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={currentFamily.description}
                  onChange={(e) => setCurrentFamily({...currentFamily, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Bi-Monthly Unit Consumption</label>
                <input 
                  type="number" 
                  min="0" 
                  max="5000"
                  className="form-input" 
                  value={currentFamily.units}
                  onChange={(e) => setCurrentFamily({...currentFamily, units: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update Household</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== FAMILY DETAILED BREAKDOWN MODAL ==================== */}
      {selectedFamilyDetail && (
        <div className="modal-overlay" onClick={() => setSelectedFamilyDetail(null)}>
          <div className="modal-content" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedFamilyDetail(null)}>✕</button>
            <h3 className="card-title" style={{ marginBottom: '6px' }}>
              <Zap size={20} style={{ color: 'var(--primary)' }} /> Detailed Bill Calculations: {selectedFamilyDetail.name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              {selectedFamilyDetail.description} (Consumption: <strong>{selectedFamilyDetail.units} Units</strong>)
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div className="card" style={{ flex: 1, padding: '12px', textAlign: 'center', background: 'var(--bg-secondary)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>BILL BEFORE</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  ₹{selectedFamilyDetail.billBefore.toFixed(2)}
                </div>
              </div>
              <div className="card" style={{ flex: 1, padding: '12px', textAlign: 'center', background: 'var(--primary-glow)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>BILL AFTER</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  ₹{selectedFamilyDetail.billAfter.toFixed(2)}
                </div>
              </div>
              <div className="card" style={{ flex: 1, padding: '12px', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px dashed var(--primary)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>SAVINGS</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  ₹{selectedFamilyDetail.savings.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                  Before CM Vijay's Reform:
                </h4>
                <div className="slab-breakdown">
                  {calculateTNEBBill(selectedFamilyDetail.units, false).slabs.map((s, idx) => (
                    <div key={idx} className={`slab-row ${s.rate === 0 ? 'active-free' : ''}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      <span className="slab-label">{s.name}</span>
                      <span className="slab-math">{s.units} U &times; ₹{s.rate.toFixed(2)}</span>
                      <span className="slab-amount">₹{s.cost.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 600 }}>
                  Under the New Scheme (CM Vijay):
                </h4>
                <div className="slab-breakdown">
                  {calculateTNEBBill(selectedFamilyDetail.units, true).slabs.map((s, idx) => (
                    <div key={idx} className={`slab-row ${s.rate === 0 ? 'active-free' : 'active-paid'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      <span className="slab-label">{s.name}</span>
                      <span className="slab-math">{s.units} U &times; ₹{s.rate.toFixed(2)}</span>
                      <span className="slab-amount">₹{s.cost.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedFamilyDetail.savings > 0 ? (
                <div className="alert-box success" style={{ marginBottom: '0', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={16} />
                  <div>
                    This household benefits from CM Vijay's 200 units free scheme! They achieve a monthly savings of <strong>₹{selectedFamilyDetail.savings}</strong> (<strong>{selectedFamilyDetail.pctSaved}%</strong> bill reduction).
                  </div>
                </div>
              ) : selectedFamilyDetail.units <= 100 ? (
                <div className="alert-box success" style={{ background: 'var(--secondary-glow)', border: '1px solid rgba(2, 132, 199, 0.3)', color: 'var(--secondary)', marginBottom: '0', fontSize: '0.8rem' }}>
                  <Info size={16} />
                  <div>
                    This household already has 100% free electricity since they consume &le; 100 units. Their net bill is ₹0.00 in both structures.
                  </div>
                </div>
              ) : (
                <div className="alert-box danger" style={{ marginBottom: '0', fontSize: '0.8rem' }}>
                  <AlertTriangle size={16} />
                  <div>
                    This household consumes <strong>{selectedFamilyDetail.units} units</strong> (exceeding the 500-unit cap). Therefore, they are not eligible for the 200 units free benefit and receive ₹0 savings.
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedFamilyDetail(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} Minsara Thittam Analyzer. Developed in React & Tailwind-inspired custom styles for educational policy research.</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Tariff rates are reflective of Tamil Nadu TANGEDCO Domestic Tariff Slabs for the year 2025-2026.</p>
      </footer>
    </>
  );
}

export default App;
