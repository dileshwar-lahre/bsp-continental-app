'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiSearch, 
  FiRefreshCw, 
  FiFileText, 
  FiShield, 
  FiDollarSign, 
  FiEye, 
  FiX, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiExternalLink,
  FiCalendar,
  FiMessageSquare
} from 'react-icons/fi';

export default function ApprovedRequestsPage() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // ALL, PAPER, LOAN, CIBIL
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Fetch Approved / Completed Requests from API
  const fetchApprovedRequests = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.data)) {
        // Filter only Approved/Completed records
        const approvedOnly = data.data.filter(
          (req) => req.status === 'COMPLETED' || req.status === 'APPROVED' || req.status === 'Approved'
        );
        setApprovedRequests(approvedOnly);
      } else {
        // Fallback Mock Data for UI Testing
        setApprovedRequests([
          {
            _id: "REQ-8801",
            userName: "Amit Lahre",
            userEmail: "amit.lahre@cginfrax.com",
            userPhone: "+91 98271 23456",
            serviceType: "Property Vetting",
            status: "APPROVED",
            approvedAt: "2026-07-20T11:30:00.000Z",
            createdAt: "2026-07-18T09:00:00.000Z",
            remarks: "Khasra #210 title verified with Raipur Registry office. Clear Title Granted.",
            details: {
              ownerName: "Amit Lahre",
              propertyLocation: "Sector-4 Raipur Plot #12",
              customMessage: "Full title verification done."
            },
            documentsList: [
              { name: "Verified_Registry_Clearance.pdf", url: "#", size: "2.8 MB" }
            ]
          },
          {
            _id: "REQ-8802",
            userName: "Dileshwar Patel",
            userEmail: "dileshwar@stonenox.com",
            userPhone: "+91 91112 33445",
            serviceType: "CIBIL Audit",
            status: "APPROVED",
            approvedAt: "2026-07-19T16:20:00.000Z",
            createdAt: "2026-07-19T10:15:00.000Z",
            remarks: "CIBIL Score verified at 780. Bureau report dispatched to user email.",
            details: {
              panNumber: "ABCDE1234F",
              dob: "1996-05-12",
              customMessage: "Credit score audit complete."
            },
            documentsList: [
              { name: "CIBIL_Audit_Report.pdf", url: "#", size: "1.2 MB" }
            ]
          },
          {
            _id: "REQ-8803",
            userName: "Sonia Verma",
            userEmail: "sonia.verma@gmail.com",
            userPhone: "+91 94252 11223",
            serviceType: "Home Loan",
            status: "APPROVED",
            approvedAt: "2026-07-17T14:45:00.000Z",
            createdAt: "2026-07-15T12:00:00.000Z",
            remarks: "Loan clearance approved via HDFC Tie-up. Loan amount sanctioned.",
            details: {
              loanAmount: 3500000,
              monthlyIncome: 75000,
              customMessage: "Rejection appeal cleared after fresh vintage submission."
            },
            documentsList: [
              { name: "Loan_Sanction_Letter.pdf", url: "#", size: "3.1 MB" }
            ]
          }
        ]);
      }
    } catch (err) {
      console.error("Error fetching approved requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  // Search & Category Filter Logic
  const filteredRequests = useMemo(() => {
    return approvedRequests.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        item.userName?.toLowerCase().includes(q) ||
        item.userEmail?.toLowerCase().includes(q) ||
        item.userPhone?.includes(searchQuery) ||
        item._id?.toLowerCase().includes(q) ||
        item.serviceType?.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (selectedCategory === 'ALL') return true;
      if (selectedCategory === 'PAPER') return item.serviceType === 'Property Vetting' || item.serviceType === 'Paper Check';
      if (selectedCategory === 'LOAN') return item.serviceType === 'Home Loan' || item.serviceType === 'Loan Solution';
      if (selectedCategory === 'CIBIL') return item.serviceType === 'CIBIL Audit' || item.serviceType === 'CIBIL Check';

      return true;
    });
  }, [approvedRequests, searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans select-none pb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold text-sm border border-emerald-100">
              <FiCheckCircle size={20} />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Approved User Requests
              </h1>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Archived records of successfully verified and approved user applications.
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={fetchApprovedRequests}
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-emerald-600 text-white text-xs font-extrabold px-4 py-3 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md w-fit"
        >
          <FiRefreshCw className={isLoading ? "animate-spin" : ""} size={14} />
          <span>Sync Approved ({approvedRequests.length})</span>
        </button>
      </div>

      {/* 2. Search Console & Category Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Name, Email, Phone, or Ref ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
          />
          <FiSearch className="absolute left-3.5 top-3 text-slate-400" size={15} />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'ALL', label: 'All Approved' },
            { id: 'PAPER', label: 'Paper Vetting' },
            { id: 'LOAN', label: 'Loan Appeals' },
            { id: 'CIBIL', label: 'CIBIL Audits' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Approved Requests Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
                <th className="p-4 pl-6">Ref ID & Applicant</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Service Category</th>
                <th className="p-4">Approval Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-400 font-bold">
                    Fetching approved records ledger...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-400 font-bold">
                    No approved requests found for "{searchQuery}".
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

                    {/* Date Approved */}
                    <td className="p-4 text-slate-500 font-mono text-[11px]">
                      {req.approvedAt 
                        ? new Date(req.approvedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                      }
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        <FiCheckCircle size={12} className="text-emerald-600" />
                        Approved
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => setSelectedRecord(req)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-950 hover:text-white text-slate-700 text-[11px] font-extrabold transition-all active:scale-95 cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                      >
                        <FiEye size={14} />
                        <span>Inspect Payload</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. INSPECTION MODAL POPUP */}
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

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    APPROVED RECORD
                  </span>
                  <h3 className="text-base font-black text-slate-950 mt-1">{selectedRecord.serviceType} Payload</h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-50"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Applicant Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <FiUser size={14} className="text-emerald-600" />
                  <span>{selectedRecord.userName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-mono">
                  <FiPhone size={14} className="text-slate-400" />
                  <span>{selectedRecord.userPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-mono">
                  <FiMail size={14} className="text-slate-400" />
                  <span>{selectedRecord.userEmail}</span>
                </div>
              </div>

              {/* Submitted Metadata Details */}
              <div className="space-y-2 text-xs">
                <span className="text-slate-400 font-extrabold uppercase text-[10px]">Submitted Form Details</span>
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

              {/* Admin Approval Remarks */}
              {selectedRecord.remarks && (
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-extrabold uppercase text-[10px] flex items-center gap-1">
                    <FiMessageSquare size={12} className="text-emerald-600" /> Admin Clearance Note
                  </span>
                  <div className="bg-emerald-50/70 border border-emerald-100 p-3 rounded-2xl text-emerald-950 font-bold">
                    "{selectedRecord.remarks}"
                  </div>
                </div>
              )}

              {/* Uploaded Attachments */}
              {selectedRecord.documentsList && selectedRecord.documentsList.length > 0 && (
                <div className="space-y-2 text-xs">
                  <span className="text-slate-400 font-extrabold uppercase text-[10px]">Approved Attachments</span>
                  <div className="space-y-1.5">
                    {selectedRecord.documentsList.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 truncate max-w-[240px]">
                          <FiFileText size={15} className="text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-800 truncate">{doc.name}</span>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                        >
                          <FiExternalLink size={10} /> View Document
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Action */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
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