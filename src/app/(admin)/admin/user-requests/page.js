'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiRefreshCw, 
  FiSearch, 
  FiCheckCircle, 
  FiXCircle, 
  FiEye, 
  FiFileText, 
  FiShield, 
  FiDollarSign, 
  FiClock, 
  FiX, 
  FiUser, 
  FiPhone, 
  FiMail,
  FiDownload,
  FiExternalLink,
  FiAlertCircle
} from 'react-icons/fi';

export default function UserRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // ALL, PAPER, LOAN, CIBIL
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminRemarks, setAdminRemarks] = useState('');

  // Fetch Pending Requests from Database API
  const fetchActiveRequests = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.data)) {
        // Sirf PENDING aur PROCESSING requests filter karke dikhayenge
        const pendingOnly = data.data.filter(
          (req) => req.status === 'PENDING' || req.status === 'PROCESSING' || req.status === 'Pending' || req.status === 'In Review'
        );
        setRequests(pendingOnly);
      } else {
        // Fallback Mock Data Testing ke liye
        setRequests([
          {
            _id: "REQ-9901",
            userName: "Amit Sharma",
            userEmail: "amit.sharma@gmail.com",
            userPhone: "+91 98271 88990",
            serviceType: "Property Vetting",
            status: "PENDING",
            createdAt: new Date().toISOString(),
            details: {
              ownerName: "Amit Sharma",
              propertyLocation: "Sector-4, Near City Center, Raipur",
              customMessage: "Khasra #210/4 registry legal verification required urgently."
            },
            documentsList: [
              { name: "Registry_Draft.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", size: "2.4 MB" }
            ]
          },
          {
            _id: "REQ-9902",
            userName: "Rahul Verma",
            userEmail: "rahul.v@cginfrax.com",
            userPhone: "+91 91112 33445",
            serviceType: "Home Loan",
            status: "PROCESSING",
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
            details: {
              loanAmount: 4500000,
              monthlyIncome: 85000,
              customMessage: "Loan rejected from SBI due to low vintage proof."
            },
            documentsList: [
              { name: "Salary_Slip_3Months.pdf", url: "#", size: "1.8 MB" },
              { name: "Bank_Statement_1Yr.pdf", url: "#", size: "4.2 MB" }
            ]
          },
          {
            _id: "REQ-9903",
            userName: "Priya Sahu",
            userEmail: "priya.sahu@outlook.com",
            userPhone: "+91 94252 66778",
            serviceType: "CIBIL Audit",
            status: "PENDING",
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            details: {
              panNumber: "ABCPS9910K",
              dob: "1994-08-15",
              customMessage: "CIBIL score dropped by 60 points last month, need detailed audit."
            },
            documentsList: [
              { name: "Pan_Card_Scan.pdf", url: "#", size: "0.9 MB" }
            ]
          }
        ]);
      }
    } catch (err) {
      console.error("Error fetching user requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveRequests();
  }, []);

  // Handle Approve / Reject Actions (Database Sync & Auto-Remove from View)
  const handleAction = async (requestId, newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status: newStatus, // "COMPLETED" / "Approved" OR "REJECTED" / "Rejected"
          remarks: adminRemarks
        })
      });

      // Local state se instant remove karenge taaki UI se turant hat jaye
      setRequests((prev) => prev.filter((item) => item._id !== requestId));
      setSelectedRecord(null);
      setAdminRemarks('');

    } catch (err) {
      console.error("Failed to update status:", err);
      // Fallback state update
      setRequests((prev) => prev.filter((item) => item._id !== requestId));
      setSelectedRecord(null);
      setAdminRemarks('');
    } finally {
      setActionLoading(false);
    }
  };

  // Search & Category Filter Logic
  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      const matchesSearch = 
        item.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userPhone?.includes(searchQuery) ||
        item._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serviceType?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'ALL') return true;
      if (selectedCategory === 'PAPER') return item.serviceType === 'Property Vetting' || item.serviceType === 'Paper Check';
      if (selectedCategory === 'LOAN') return item.serviceType === 'Home Loan' || item.serviceType === 'Loan Solution';
      if (selectedCategory === 'CIBIL') return item.serviceType === 'CIBIL Audit' || item.serviceType === 'CIBIL Check';

      return true;
    });
  }, [requests, searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans select-none pb-12">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 font-extrabold text-sm">
              <FiClock size={20} />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Pending User Requests
              </h1>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Review active submissions. Approved or Rejected items will be archived automatically.
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={fetchActiveRequests}
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-blue-600 text-white text-xs font-extrabold px-4 py-3 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md w-fit"
        >
          <FiRefreshCw className={isLoading ? "animate-spin" : ""} size={14} />
          <span>Refresh Queue ({requests.length})</span>
        </button>
      </div>

      {/* 2. Search Console & Category Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Name, Email, Phone, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 font-medium"
          />
          <FiSearch className="absolute left-3.5 top-3 text-slate-400" size={15} />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'ALL', label: 'All Active' },
            { id: 'PAPER', label: 'Paper Vetting' },
            { id: 'LOAN', label: 'Loan Appeals' },
            { id: 'CIBIL', label: 'CIBIL Audits' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Requests Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
                <th className="p-4 pl-6">Ref ID & Applicant</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Requested Service</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4 text-center">Status Badge</th>
                <th className="p-4 pr-6 text-right">Action Console</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-400 font-bold">
                    Fetching incoming request stream...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-400 font-bold">
                    <FiCheckCircle size={32} className="mx-auto text-emerald-500 mb-2" />
                    <span>No pending requests in queue! All caught up.</span>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Ref ID & Name */}
                    <td className="p-4 pl-6">
                      <div className="font-mono text-[10px] font-bold text-slate-400">{req._id}</div>
                      <div className="font-extrabold text-slate-900 mt-0.5 text-sm">{req.userName}</div>
                    </td>

                    {/* Contact */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{req.userPhone}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-[160px]">{req.userEmail}</div>
                    </td>

                    {/* Service Type */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-lg ${
                        req.serviceType?.includes('Property') || req.serviceType?.includes('Paper')
                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
                          : req.serviceType?.includes('Loan')
                          ? 'bg-rose-50 text-rose-600 border border-rose-100'
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        {req.serviceType?.includes('Property') && <FiFileText size={12} />}
                        {req.serviceType?.includes('Loan') && <FiDollarSign size={12} />}
                        {req.serviceType?.includes('CIBIL') && <FiShield size={12} />}
                        <span>{req.serviceType}</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-slate-500 font-mono text-[11px]">
                      {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        Pending Action
                      </span>
                    </td>

                    {/* Inspection & Direct Quick Actions */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRecord(req)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 transition-all active:scale-95 cursor-pointer"
                          title="Inspect Application Details"
                        >
                          <FiEye size={15} />
                        </button>
                        
                        <button
                          disabled={actionLoading}
                          onClick={() => handleAction(req._id, 'APPROVED')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] transition-all active:scale-95 cursor-pointer shadow-2xs flex items-center gap-1"
                        >
                          <FiCheckCircle size={13} />
                          <span>Approve</span>
                        </button>

                        <button
                          disabled={actionLoading}
                          onClick={() => handleAction(req._id, 'REJECTED')}
                          className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-[11px] transition-all active:scale-95 cursor-pointer flex items-center gap-1 border border-rose-100"
                        >
                          <FiXCircle size={13} />
                          <span>Reject</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. INSPECTION & ACTION MODAL POPUP */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-md">
                    {selectedRecord.serviceType}
                  </span>
                  <h3 className="text-base font-black text-slate-950 mt-1">Application Inspection</h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-50"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Applicant Profile */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <FiUser size={14} className="text-blue-600" />
                  <span>{selectedRecord.userName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <FiPhone size={14} className="text-slate-400" />
                  <span>{selectedRecord.userPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <FiMail size={14} className="text-slate-400" />
                  <span>{selectedRecord.userEmail}</span>
                </div>
              </div>

              {/* Dynamic Details Parameters */}
              <div className="space-y-2 text-xs">
                <span className="text-slate-400 font-extrabold uppercase text-[10px]">Submitted Form Data</span>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                  {selectedRecord.details?.ownerName && (
                    <div><span className="text-slate-400 font-bold">Property Owner:</span> <span className="font-extrabold text-slate-900">{selectedRecord.details.ownerName}</span></div>
                  )}
                  {selectedRecord.details?.propertyLocation && (
                    <div><span className="text-slate-400 font-bold">Location:</span> <span className="font-bold text-slate-800">{selectedRecord.details.propertyLocation}</span></div>
                  )}
                  {selectedRecord.details?.loanAmount && (
                    <div><span className="text-slate-400 font-bold">Loan Amount:</span> <span className="font-extrabold text-blue-600">₹{selectedRecord.details.loanAmount.toLocaleString("en-IN")}</span></div>
                  )}
                  {selectedRecord.details?.panNumber && (
                    <div><span className="text-slate-400 font-bold">PAN Card:</span> <span className="font-mono font-bold text-slate-900">{selectedRecord.details.panNumber}</span></div>
                  )}
                  {selectedRecord.details?.customMessage && (
                    <div className="pt-1 border-t border-slate-200/60 text-slate-700 font-medium">
                      "{selectedRecord.details.customMessage}"
                    </div>
                  )}
                </div>
              </div>

              {/* Attached Documents List */}
              {selectedRecord.documentsList && selectedRecord.documentsList.length > 0 && (
                <div className="space-y-2 text-xs">
                  <span className="text-slate-400 font-extrabold uppercase text-[10px]">Uploaded Attachments</span>
                  <div className="space-y-1.5">
                    {selectedRecord.documentsList.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 truncate max-w-[240px]">
                          <FiFileText size={15} className="text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-800 truncate">{doc.name}</span>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                        >
                          <FiExternalLink size={10} /> View Doc
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Remarks Input */}
              <div className="space-y-1.5">
                <label className="text-slate-400 font-extrabold uppercase text-[10px] block">Admin Remarks / Rejection Note</label>
                <input
                  type="text"
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  placeholder="Optional note for approval or reason for rejection..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={actionLoading}
                  onClick={() => handleAction(selectedRecord._id, 'APPROVED')}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <FiCheckCircle size={15} /> Approve Application
                </button>

                <button
                  disabled={actionLoading}
                  onClick={() => handleAction(selectedRecord._id, 'REJECTED')}
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <FiXCircle size={15} /> Reject Application
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}