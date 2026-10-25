'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Fraunces } from 'next/font/google';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  Tag,
  Info,
  Edit3,
  Send,
  X,
} from 'lucide-react';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
});

interface DelegateRecord {
  regNumber: string;
  name: string;
  category: string;
  email: string;
  mobile: string;
  designation: string;
  stateCouncilNo: string;
  foodPreference: string;
  status: string;
}

export default function DelegateDataPage() {
  const [regNumber, setRegNumber] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [delegateData, setDelegateData] = useState<DelegateRecord | null>(null);

  // Modify Request Modal State
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [modifyField, setModifyField] = useState('Contact Information');
  const [modifyDetails, setModifyDetails] = useState('');
  const [modifySubmitted, setModifySubmitted] = useState(false);

  const handleFetchData = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!regNumber.trim()) {
      setError('Please enter your Registration Number.');
      return;
    }
    if (!contactInfo.trim()) {
      setError('Please enter your registered Email or Mobile number.');
      return;
    }

    setIsLoading(true);

    // Simulate API fetch delay
    setTimeout(() => {
      setIsLoading(false);
      // Return found record (using entered details or standard defaults)
      setDelegateData({
        regNumber: regNumber.trim().toUpperCase(),
        name: 'Dr. Delegate Member',
        category: 'ASI Member',
        email: contactInfo.includes('@') ? contactInfo.trim() : 'delegate@hospital.org',
        mobile: !contactInfo.includes('@') ? contactInfo.trim() : '+91 98765 43210',
        designation: 'Faculty / Consultant Surgeon',
        stateCouncilNo: 'APMC/2019/84920',
        foodPreference: 'Non-Veg',
        status: 'Confirmed & Paid',
      });
    }, 700);
  };

  const handleModifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modifyDetails.trim()) return;
    setModifySubmitted(true);
    setTimeout(() => {
      setModifySubmitted(false);
      setIsModifyModalOpen(false);
      setModifyDetails('');
    }, 2200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-zinc-900">
      <Header />

      <main className="flex-1 py-10 sm:py-14 lg:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#187A83] hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              APASICON 2027 &bull; Delegate Portal
            </span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200/90 shadow-xl">
            {/* Heading */}
            <div className="text-center pb-6 sm:pb-8 border-b border-zinc-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <FileText className="w-6 h-6" />
              </div>
              <h1
                className={`${fraunces.className} text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight`}
              >
                Check and Modify your registration details.
              </h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full" />
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Search Form */}
            <form onSubmit={handleFetchData} className="mt-6 sm:mt-8 space-y-5">
              {/* Registration Number Field */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Registration Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="Enter Registration Number (e.g. APASI-2027-123456)"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-2 focus:ring-[#187A83]/20 text-sm font-medium outline-none transition-all placeholder:text-zinc-400 uppercase"
                  />
                </div>
              </div>

              {/* Email or Mobile Field */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Email or Mobile <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Enter registered Email ID or 10-digit Mobile Number"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-2 focus:ring-[#187A83]/20 text-sm font-medium outline-none transition-all placeholder:text-zinc-400"
                  />
                </div>
              </div>

              {/* Enter Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#187A83] hover:bg-[#136067] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#187A83] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Fetching details...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Enter</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Fetched Delegate Data Card */}
            {delegateData && (
              <div className="mt-8 pt-6 border-t border-zinc-200 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3
                      className={`${fraunces.className} font-semibold text-base sm:text-lg text-[#111111]`}
                    >
                      Registration Record Found
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {delegateData.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-xs flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#D4AF37]" /> Registration ID
                    </span>
                    <p className="font-mono font-bold text-zinc-900">{delegateData.regNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-xs flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#187A83]" /> Delegate Name
                    </span>
                    <p className="font-bold text-zinc-900">{delegateData.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-xs flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#187A83]" /> Registered Email
                    </span>
                    <p className="font-medium text-zinc-800">{delegateData.email}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-xs flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#187A83]" /> Mobile Number
                    </span>
                    <p className="font-medium text-zinc-800">{delegateData.mobile}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-xs">Tariff Category</span>
                    <p className="font-semibold text-[#187A83]">{delegateData.category}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-xs">Food Preference</span>
                    <p className="font-semibold text-zinc-800">{delegateData.foodPreference}</p>
                  </div>
                </div>

                {/* Req to Modify Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModifyModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c59f2a] text-zinc-950 font-bold text-sm shadow-sm hover:shadow transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Req to Modify</span>
                  </button>
                </div>
              </div>
            )}

            {/* Note at Bottom */}
            <div className="mt-8 pt-6 border-t border-zinc-200">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/70 border border-[#D4AF37]/40 text-xs sm:text-sm text-zinc-800">
                <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="font-medium leading-relaxed">
                  <strong className="font-bold text-zinc-950">Note: </strong>
                  Once your enter your details. System will fetch the data. Then you can Req to Modify.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Request to Modify Modal */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-zinc-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <h3
                className={`${fraunces.className} font-semibold text-lg sm:text-xl text-zinc-950 flex items-center gap-2`}
              >
                <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                <span>Request to Modify Details</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModifyModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modifySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-zinc-900">
                  Modification Request Received!
                </h4>
                <p className="text-xs text-zinc-600">
                  Your request has been submitted to the APASICON 2027 Secretariat. Our registration desk will review and update your records.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModifySubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Select Detail to Modify
                  </label>
                  <select
                    value={modifyField}
                    onChange={(e) => setModifyField(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:border-[#187A83] outline-none"
                  >
                    <option value="Contact Information">Contact Information (Email / Mobile / Address)</option>
                    <option value="Delegate Name Correction">Delegate Name / Title Correction</option>
                    <option value="Food Preference">Food Preference (Veg / Non-Veg)</option>
                    <option value="Designation & State Council">Designation / State Council Number</option>
                    <option value="Accompanying Persons">Accompanying Persons</option>
                    <option value="Other">Other Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Explain Modification Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={modifyDetails}
                    onChange={(e) => setModifyDetails(e.target.value)}
                    placeholder="Please specify the updated information or correction needed..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:border-[#187A83] outline-none placeholder:text-zinc-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModifyModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm font-bold text-zinc-700 hover:bg-zinc-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#187A83] hover:bg-[#136067] text-white text-xs sm:text-sm font-bold shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}