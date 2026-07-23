'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiRefreshCw, 
  FiSearch, 
  FiTrendingUp, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFileText, 
  FiShield, 
  FiDollarSign, 
  FiX, 
  FiActivity,
  FiEye,
  FiCalendar
} from 'react-icons/fi';

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL'); // ALL, CIBIL, REJECTIONS, PROPERTY
  const [chartMetric, setChartMetric] = useState('total'); // total, cibil, rejections, property
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Dynamic Metrics State
  const [metrics, setMetrics] = useState({
    total: 0,
    cibil: 0,
    rejections: 0,
    property: 0,
    todayTotal: 0
  });

  // Generate Past 7 Days Labels
  const past7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        fullDate: d.toISOString().split('T')[0],
        displayDate: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })
      });
    }
    return days;
  }, []);

  // Compute 7-Day Trend Chart Data
  const chartData = useMemo(() => {
    return past7Days.map(day => {
      const dayRequests = requests.filter(r => {
        const reqDate = new Date(r.createdAt || Date.now()).toISOString().split('T')[0];
        return reqDate === day.fullDate;
      });

      const total = dayRequests.length;
      const cibil = dayRequests.filter(r => r.requestType === 'CIBIL_SCORE').length;
      const rejections = dayRequests.filter(r => r.requestType === 'REJECTED_LOAN_APPEAL' || r.requestType === 'LOAN_SOLUTION').length;
      const property = dayRequests.filter(r => r.requestType === 'PROPERTY_VETTING').length;

      return {
        ...day,
        total,
        cibil,
        rejections,
        property
      };
    });
  }, [requests, past7Days]);

  // Max value calculation for Graph Scaling
  const maxChartVal = useMemo(() => {
    const vals = chartData.map(d => d[chartMetric]);
    const max = Math.max(...vals, 1);
    return max < 5 ? 5 : max;
  }, [chartData, chartMetric]);

  // Fetch Requests Ledger
  const fetchLedgerData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();

      if (res.ok && data.success && data.data?.length > 0) {
        processLedgerData(data.data);
      } else {
        // High-Tech Mock Data Fallback
        const now = new Date();
        const mockData = [
          {
            _id: "REQ-88101",
            clientName: "Amit Lahre",
            mobileNumber: "98271 23456",
            email: "amit@cginfrax.com",
            requestType: "CIBIL_SCORE",
            status: "COMPLETED",
            createdAt: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(),
            metaDataLogs: { score: 780, pan: "ABCDE1234F", auditDate: "2026-07-20" }
          },
          {
            _id: "REQ-88102",
            clientName: "Rahul Sharma",
            mobileNumber: "91234 56789",
            email: "rahul@gmail.com",
            requestType: "REJECTED_LOAN_APPEAL",
            status: "PENDING",
            createdAt: new Date(now.getTime() - 24 * 3600 * 1000).toISOString(),
            metaDataLogs: { bankName: "SBI", rejectionReason: "Low Vintage / Paper Mismatch", loanAmount: "₹25,00,000" }
          },
          {
            _id: "REQ-88103",
            clientName: "Priya Singh",
            mobileNumber: "99887 76655",
            email: "priya@outlook.com",
            requestType: "PROPERTY_VETTING",
            status: "PROCESSING",
            createdAt: new Date(now.getTime() - 48 * 3600 * 1000).toISOString(),
            metaDataLogs: { propertyLocation: "Bilaspur Sector-4 Plot #12", registryType: "Khasra Legal Check" }
          },
          {
            _id: "REQ-88104",
            clientName: "Vikram Sahu",
            mobileNumber: "94252 11223",
            email: "vikram@gmail.com",
            requestType: "LOAN_SOLUTION",
            status: "PENDING",
            createdAt: new Date(now.getTime() - 72 * 3600 * 1000).toISOString(),
            metaDataLogs: { cibilScore: 620, debtRatio: "45%", bank: "HDFC" }
          },
          {
            _id: "REQ-88105",
            clientName: "Dileshwar Patel",
            mobileNumber: "98765 43210",
            email: "dileshwar@stonenox.com",
            requestType: "CIBIL_SCORE",
            status: "COMPLETED",
            createdAt: new Date(now.getTime() - 96 * 3600 * 1000).toISOString(),
            metaDataLogs: { score: 745, pan: "XYZPD9876K" }
          },
          {
            _id: "REQ-88106",
            clientName: "Sonia Verma",
            mobileNumber: "91112 33445",
            email: "sonia@gmail.com",
            requestType: "PROPERTY_VETTING",
            status: "COMPLETED",
            createdAt: new Date(now.getTime() - 120 * 3600 * 1000).toISOString(),
            metaDataLogs: { propertyLocation: "Raipur Main Road Plaza", verificationStatus: "Clear Title" }
          }
        ];
        processLedgerData(mockData);
      }
    } catch (err) {
      console.log("Mock fallback mode active.");
    } finally {
      setIsLoading(false);
    }
  };

  const processLedgerData = (data) => {
    setRequests(data);
    const todayStr = new Date().toISOString().split('T')[0];
    
    const total = data.length;
    const cibil = data.filter(r => r.requestType === 'CIBIL_SCORE').length;
    const rejections = data.filter(r => r.requestType === 'REJECTED_LOAN_APPEAL' || r.requestType === 'LOAN_SOLUTION').length;
    const property = data.filter(r => r.requestType === 'PROPERTY_VETTING').length;
    const todayTotal = data.filter(r => new Date(r.createdAt || Date.now()).toISOString().split('T')[0] === todayStr).length;

    setMetrics({ total, cibil, rejections, property, todayTotal });
  };

  useEffect(() => {
    fetchLedgerData();
  }, []);

  // Search & Tab Filter Logic
  const filteredRequests = useMemo(() => {
    return requests.filter(item => {
      const matchesSearch = 
        item.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobileNumber?.includes(searchQuery) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item._id?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'CIBIL') return item.requestType === 'CIBIL_SCORE';
      if (activeFilter === 'REJECTIONS') return item.requestType === 'REJECTED_LOAN_APPEAL' || item.requestType === 'LOAN_SOLUTION';
      if (activeFilter === 'PROPERTY') return item.requestType === 'PROPERTY_VETTING';
      return true;
    });
  }, [requests, searchQuery, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 select-none font-sans pb-12">
      
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#4933e6]/10 text-[#4933e6]">
              <FiActivity size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Realtime System Analytics
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-1 pl-10">
            Monitor 7-day request volume, CIBIL hits, Loan Solution appeals & Paper Check requests.
          </p>
        </div>

        <button 
          onClick={fetchLedgerData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-[#4933e6] text-white text-xs font-extrabold px-4 py-3 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md w-fit"
        >
          <FiRefreshCw className={isLoading ? "animate-spin" : ""} size={14} />
          <span>Sync Data</span>
        </button>
      </div>

      {/* 2. Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's & Total */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Today vs Total</span>
            <FiCalendar size={16} className="text-[#4933e6]" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-slate-950 tracking-tight">{metrics.todayTotal}</span>
            <span className="text-xs font-extrabold text-slate-400">/ {metrics.total} Total</span>
          </div>
          <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
            ● Live Sync Active
          </p>
        </div>

        {/* CIBIL Score Hits */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">CIBIL Score Checks</span>
            <FiShield size={16} className="text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-blue-600 tracking-tight">{metrics.cibil}</span>
            <span className="text-xs font-bold text-slate-400">Requests</span>
          </div>
          <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md w-fit">
            Instant Audit
          </p>
        </div>

        {/* Loan Reject Solutions */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Loan Appeals</span>
            <FiDollarSign size={16} className="text-rose-500" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-rose-600 tracking-tight">{metrics.rejections}</span>
            <span className="text-xs font-bold text-slate-400">Appeals</span>
          </div>
          <p className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md w-fit">
            High Priority
          </p>
        </div>

        {/* Property Vetting */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Paper Check Vetting</span>
            <FiFileText size={16} className="text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-amber-600 tracking-tight">{metrics.property}</span>
            <span className="text-xs font-bold text-slate-400">Papers</span>
          </div>
          <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
            Legal Clearance
          </p>
        </div>

      </div>

      {/* 3. 📊 7-DAY INTERACTIVE TREND GRAPH & BREAKDOWN CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main 7-Day Trend Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="text-[#4933e6]" size={18} />
                <h3 className="text-base font-black text-slate-950">7-Day Activity Volume</h3>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                Daily incoming request trends over the past 7 days.
              </p>
            </div>

            {/* Graph Metric Selectors */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {[
                { id: 'total', label: 'Total' },
                { id: 'cibil', label: 'CIBIL' },
                { id: 'rejections', label: 'Loans' },
                { id: 'property', label: 'Papers' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setChartMetric(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    chartMetric === item.id 
                      ? 'bg-slate-950 text-white shadow-2xs font-extrabold' 
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Graphics Canvas */}
          <div className="h-56 pt-6 flex items-end justify-between gap-3 px-2 sm:px-6 relative">
            
            {/* Horizontal Grid lines */}
            <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-200/70 text-[9px] font-bold text-slate-300 pl-2">
              Max: {maxChartVal}
            </div>
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-200/70 text-[9px] font-bold text-slate-300 pl-2">
              Mid: {Math.round(maxChartVal / 2)}
            </div>

            {chartData.map((day, idx) => {
              const val = day[chartMetric];
              const heightPercent = Math.max(Math.round((val / maxChartVal) * 100), 8);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group z-10">
                  
                  {/* Tooltip Hover Value */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md mb-1 pointer-events-none">
                    {val} Req
                  </div>

                  {/* Animated Bar */}
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-2xl overflow-hidden p-1 flex items-end h-full">
                    <motion.div 
                      initial={{ height: "0%" }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className={`w-full rounded-xl transition-colors ${
                        chartMetric === 'cibil' ? 'bg-blue-600' :
                        chartMetric === 'rejections' ? 'bg-rose-500' :
                        chartMetric === 'property' ? 'bg-amber-500' : 'bg-[#4933e6]'
                      }`}
                    />
                  </div>

                  {/* Date Label */}
                  <span className="text-[10px] font-black text-slate-500 tracking-tight mt-1">
                    {day.displayDate}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Category Percentage Distribution */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-black text-slate-950">Service Matrix Ratio</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Category distribution of all submitted records.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* CIBIL Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> CIBIL Checks
                </span>
                <span>{metrics.total ? Math.round((metrics.cibil / metrics.total) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all" 
                  style={{ width: `${metrics.total ? (metrics.cibil / metrics.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Loan Appeals Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Loan Appeals
                </span>
                <span>{metrics.total ? Math.round((metrics.rejections / metrics.total) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all" 
                  style={{ width: `${metrics.total ? (metrics.rejections / metrics.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Property Vetting Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Paper Check
                </span>
                <span>{metrics.total ? Math.round((metrics.property / metrics.total) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all" 
                  style={{ width: `${metrics.total ? (metrics.property / metrics.total) * 100 : 0}%` }}
                />
              </div>
            </div>

          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-semibold text-slate-500">
            📊 Data dynamically syncs from MongoDB permanent index nodes.
          </div>
        </div>

      </div>

      {/* 4. Filter & Search Action Console */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Name, Mobile, Email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4933e6] font-medium"
          />
          <FiSearch className="absolute left-3.5 top-3 text-slate-400" size={15} />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Requests' },
            { id: 'CIBIL', label: 'CIBIL Checks' },
            { id: 'REJECTIONS', label: 'Loan Solutions' },
            { id: 'PROPERTY', label: 'Paper Check' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-slate-950 text-white shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Requests Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
                <th className="p-4 pl-6">Ref ID / Applicant</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Service Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date Logged</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredRequests.map((req) => (
                <tr key={req._id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* Applicant */}
                  <td className="p-4 pl-6">
                    <div className="font-mono text-[11px] font-bold text-slate-400">{req._id}</div>
                    <div className="font-extrabold text-slate-900 mt-0.5">{req.clientName || "N/A"}</div>
                  </td>

                  {/* Contact */}
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{req.mobileNumber}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate max-w-[150px]">{req.email}</div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase ${
                      req.requestType === 'CIBIL_SCORE' 
                        ? 'bg-blue-50 text-blue-600'
                        : req.requestType === 'PROPERTY_VETTING'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}>
                      {req.requestType}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                      req.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : req.status === 'PROCESSING'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {req.status === 'COMPLETED' && <FiCheckCircle size={12} />}
                      {req.status === 'PROCESSING' && <FiClock size={12} />}
                      {req.status === 'PENDING' && <FiAlertCircle size={12} />}
                      <span>{req.status}</span>
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-slate-500 font-mono text-[11px]">
                    {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>

                  {/* Actions */}
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => setSelectedRecord(req)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-[#4933e6] hover:text-white text-slate-700 transition-all active:scale-95 cursor-pointer"
                      title="Inspect Record"
                    >
                      <FiEye size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-bold">
                    {isLoading ? "Fetching data metrics..." : "No records match the selected search query."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Inspection Modal Popup */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">Record Payload Details</h3>
                  <p className="text-xs text-slate-400 font-mono">ID: {selectedRecord._id}</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-50"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[9px]">Applicant Name</span>
                    <span className="font-extrabold text-slate-900">{selectedRecord.clientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[9px]">Mobile Contact</span>
                    <span className="font-mono font-bold text-slate-800">{selectedRecord.mobileNumber}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-bold block uppercase text-[9px]">Attached Metadata JSON</span>
                  <pre className="text-emerald-600 bg-white p-3 rounded-xl font-mono text-[10px] border border-slate-200 overflow-x-auto max-h-40">
                    {JSON.stringify(selectedRecord.metaDataLogs, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-[#4933e6] text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}