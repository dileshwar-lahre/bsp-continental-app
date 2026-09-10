'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
  FiCalendar,
  FiExternalLink,
  FiUsers,
  FiArrowUpRight
} from 'react-icons/fi';

export default function AdminDashboardAnalytics() {
  const router = useRouter();

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

  // Rolling Past 7 Days Window
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
      const cibil = dayRequests.filter(r => r.serviceType === 'CIBIL Audit' || r.serviceType === 'CIBIL_SCORE').length;
      const rejections = dayRequests.filter(r => r.serviceType === 'Loan Rejection Solution' || r.serviceType === 'LOAN_SOLUTION').length;
      const property = dayRequests.filter(r => r.serviceType === 'Property Vetting' || r.serviceType === 'PROPERTY_VETTING').length;

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

  // Fetch Requests Data
  const fetchLedgerData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();

      if (res.ok && data.success) {
        processLedgerData(data.data || []);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error("Fetch Live Ledger Error:", err);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const processLedgerData = (data) => {
    setRequests(data);
    const todayStr = new Date().toISOString().split('T')[0];

    const total = data.length;
    const cibil = data.filter(r => r.serviceType === 'CIBIL Audit' || r.serviceType === 'CIBIL_SCORE').length;
    const rejections = data.filter(r => r.serviceType === 'Loan Rejection Solution' || r.serviceType === 'LOAN_SOLUTION').length;
    const property = data.filter(r => r.serviceType === 'Property Vetting' || r.serviceType === 'PROPERTY_VETTING').length;
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
        (item.userName || item.clientName)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.userPhone || item.mobileNumber)?.includes(searchQuery) ||
        (item.userEmail || item.email)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item._id?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'CIBIL') return item.serviceType === 'CIBIL Audit' || item.serviceType === 'CIBIL_SCORE';
      if (activeFilter === 'REJECTIONS') return item.serviceType === 'Loan Rejection Solution' || item.serviceType === 'LOAN_SOLUTION';
      if (activeFilter === 'PROPERTY') return item.serviceType === 'Property Vetting' || item.serviceType === 'PROPERTY_VETTING';
      return true;
    });
  }, [requests, searchQuery, activeFilter]);

  const handleBarClick = (dateStr) => {
    router.push(`/admin/dashboard/requests?date=${dateStr}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 select-none font-sans pb-12 antialiased text-slate-900">

      {/* ─── 1. Header Bar with Direct Leads Button & Today New Badge ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-emerald-50 text-[#217044] border border-emerald-100">
              <FiActivity size={22} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#052516] tracking-tight uppercase">
              System Analytics &amp; Control
            </h1>

            {/* Today New Inquiries Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {metrics.todayTotal} New Today
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium pl-0 sm:pl-12 max-w-xl">
            Live monitoring for daily client inquiries, CIBIL diagnostics, loan proposals, and property vetting records.
          </p>
        </div>

        {/* Action Buttons: Leads Manager + Sync */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard/leads')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#217044] hover:bg-[#164e2e] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <FiUsers size={16} />
            <span>Leads Manager</span>
            <FiArrowUpRight size={15} className="text-[#f3c251]" />
          </button>

          <button 
            type="button"
            onClick={fetchLedgerData}
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider px-4 py-3 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-sm disabled:opacity-60"
            title="Refresh database records"
          >
            <FiRefreshCw className={isLoading ? "animate-spin" : ""} size={14} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>
        </div>
      </div>

      {/* ─── 2. Stat Summary Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Today vs Total Inquiries */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">Today vs Total</span>
            <FiCalendar size={18} className="text-[#217044]" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">{metrics.todayTotal}</span>
            <span className="text-xs font-bold text-slate-400 font-mono">/ {metrics.total} Total</span>
          </div>
          <p className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit font-mono">
            ● Live Sync Active
          </p>
        </div>

        {/* CIBIL Score Checks */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">CIBIL Checks</span>
            <FiShield size={18} className="text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-blue-600 tracking-tight font-mono">{metrics.cibil}</span>
            <span className="text-xs font-bold text-slate-400">Audits</span>
          </div>
          <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md w-fit">
            Credit Audit
          </p>
        </div>

        {/* Financial & Loan Inquiries */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">Loan Proposals</span>
            <FiDollarSign size={18} className="text-rose-500" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-rose-600 tracking-tight font-mono">{metrics.rejections}</span>
            <span className="text-xs font-bold text-slate-400">Appeals</span>
          </div>
          <p className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md w-fit">
            Capital Review
          </p>
        </div>

        {/* Property Compliance Vetting */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">Property Vetting</span>
            <FiFileText size={18} className="text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-amber-600 tracking-tight font-mono">{metrics.property}</span>
            <span className="text-xs font-bold text-slate-400">Files</span>
          </div>
          <p className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
            Legal Title Scrutiny
          </p>
        </div>

      </div>

      {/* ─── 3. 7-Day Interactive Trend Graph & Ratio Breakdown ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Main Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="text-[#217044]" size={18} />
                <h3 className="text-base font-black text-[#052516] uppercase">7-Day Activity Trend</h3>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                Daily incoming request trends over rolling 7 days. Click bar to inspect requests.
              </p>
            </div>

            {/* Metric Selector Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {[
                { id: 'total', label: 'Total' },
                { id: 'cibil', label: 'CIBIL' },
                { id: 'rejections', label: 'Loans' },
                { id: 'property', label: 'Property' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setChartMetric(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px] font-bold uppercase tracking-wider ${
                    chartMetric === item.id 
                      ? 'bg-[#217044] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="h-56 pt-6 flex items-end justify-between gap-3 px-2 sm:px-6 relative">
            <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-200 text-[9px] font-mono font-bold text-slate-300 pl-2">
              Max: {maxChartVal}
            </div>
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-200 text-[9px] font-mono font-bold text-slate-300 pl-2">
              Mid: {Math.round(maxChartVal / 2)}
            </div>

            {chartData.map((day, idx) => {
              const val = day[chartMetric];
              const heightPercent = Math.max(Math.round((val / maxChartVal) * 100), 8);

              return (
                <div 
                  key={idx} 
                  onClick={() => handleBarClick(day.fullDate)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group z-10 cursor-pointer"
                  title={`Click to inspect requests for ${day.displayDate}`}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-1 rounded-md shadow-md mb-1 pointer-events-none flex items-center gap-1">
                    <span>{val} Req</span>
                    <FiExternalLink size={9} />
                  </div>

                  <div className="w-full max-w-[36px] bg-slate-100 rounded-2xl overflow-hidden p-1 flex items-end h-full group-hover:ring-2 group-hover:ring-[#217044] transition-all">
                    <motion.div 
                      initial={{ height: "0%" }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className={`w-full rounded-xl transition-colors ${
                        chartMetric === 'cibil' ? 'bg-blue-600' :
                        chartMetric === 'rejections' ? 'bg-rose-500' :
                        chartMetric === 'property' ? 'bg-amber-500' : 'bg-[#217044]'
                      }`}
                    />
                  </div>

                  <span className="text-[10px] font-bold text-slate-500 tracking-tight mt-1 group-hover:text-[#217044]">
                    {day.displayDate}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ratio Breakdown */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-black text-[#052516] uppercase">Service Matrix Ratio</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Category distribution of all incoming system records.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> CIBIL Checks
                </span>
                <span className="font-mono">{metrics.total ? Math.round((metrics.cibil / metrics.total) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all" 
                  style={{ width: `${metrics.total ? (metrics.cibil / metrics.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Loan Proposals
                </span>
                <span className="font-mono">{metrics.total ? Math.round((metrics.rejections / metrics.total) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all" 
                  style={{ width: `${metrics.total ? (metrics.rejections / metrics.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Property Vetting
                </span>
                <span className="font-mono">{metrics.total ? Math.round((metrics.property / metrics.total) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all" 
                  style={{ width: `${metrics.total ? (metrics.property / metrics.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-[11px] font-semibold text-[#217044]">
            Data synchronized live from central database.
          </div>
        </div>

      </div>

      {/* ─── 4. Filter & Search Console ─── */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Name, Mobile, Email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#217044] font-medium"
          />
          <FiSearch className="absolute left-3.5 top-3 text-slate-400" size={15} />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Requests' },
            { id: 'CIBIL', label: 'CIBIL Checks' },
            { id: 'REJECTIONS', label: 'Loan Solutions' },
            { id: 'PROPERTY', label: 'Property Vetting' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-[#217044] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── 5. Data Table ─── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-[#FAFBFD] text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                <th className="p-4 pl-6">Ref ID / Applicant</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Service Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date Logged</th>
                <th className="p-4 pr-6 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredRequests.map((req) => (
                <tr key={req._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-mono text-[11px] font-bold text-slate-400">#{req._id.substring(18)}</div>
                    <div className="font-black text-slate-900 mt-0.5">{req.userName || req.clientName || "Anonymous"}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-800 font-mono">{req.userPhone || req.mobileNumber || 'N/A'}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate max-w-[150px]">{req.userEmail || req.email}</div>
                  </td>

                  <td className="p-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase font-mono ${
                      req.serviceType === 'CIBIL Audit' || req.serviceType === 'CIBIL_SCORE'
                        ? 'bg-blue-50 text-blue-700'
                        : req.serviceType === 'Property Vetting' || req.serviceType === 'PROPERTY_VETTING'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      {req.serviceType || 'Property Vetting'}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                      req.status === 'Approved' || req.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-[#217044] border border-emerald-200/60'
                        : req.status === 'In Review' || req.status === 'PROCESSING'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}>
                      {(req.status === 'Approved' || req.status === 'COMPLETED') && <FiCheckCircle size={12} />}
                      {(req.status === 'In Review' || req.status === 'PROCESSING') && <FiClock size={12} />}
                      {(req.status === 'Pending' || req.status === 'PENDING') && <FiAlertCircle size={12} />}
                      <span>{req.status || 'Pending'}</span>
                    </span>
                  </td>

                  <td className="p-4 text-slate-500 font-mono text-[11px]">
                    {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => setSelectedRecord(req)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#217044] hover:text-white text-slate-600 transition-all active:scale-95 cursor-pointer"
                      title="Inspect Record Details"
                    >
                      <FiEye size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-bold">
                    {isLoading ? "Fetching data metrics..." : "No records match the selected query."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── 6. Inspection Modal ─── */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900 uppercase">Record Payload</h3>
                  <p className="text-xs text-slate-400 font-mono">ID: {selectedRecord._id}</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-50 cursor-pointer"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[9px]">Applicant Name</span>
                    <span className="font-extrabold text-slate-900">{selectedRecord.userName || selectedRecord.clientName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[9px]">Mobile / Email</span>
                    <span className="font-mono font-bold text-slate-800 truncate block">{selectedRecord.userPhone || selectedRecord.mobileNumber || selectedRecord.userEmail}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-bold block uppercase text-[9px]">Payload Meta Object</span>
                  <pre className="text-[#217044] bg-white p-3 rounded-xl font-mono text-[10px] border border-slate-200 overflow-x-auto max-h-40">
                    {JSON.stringify(selectedRecord.details || selectedRecord.metaDataLogs || {}, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-full py-3.5 rounded-xl bg-[#217044] hover:bg-[#164e2e] text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
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