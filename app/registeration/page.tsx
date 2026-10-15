'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  User,
  GraduationCap,
  Mail,
  Utensils,
  Users,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  Printer,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface TariffOption {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  description: string;
}

const TARIFF_OPTIONS: TariffOption[] = [
  {
    id: 'asi-member',
    name: 'ASI Member',
    price: '₹7,670',
    numericPrice: 7670,
    description: 'Current Slab 2 Rate • 18% GST Included • Full Conference Access',
  },
  {
    id: 'asi-non-member',
    name: 'ASI Non-Member',
    price: '₹8,260',
    numericPrice: 8260,
    description: 'Current Slab 2 Rate • 18% GST Included • Full Conference Access',
  },
  {
    id: 'pg-student',
    name: 'PG Student',
    price: '₹7,080',
    numericPrice: 7080,
    description: 'Current Slab 2 Rate • 18% GST Included • HOD Bonafide Required',
  },
  {
    id: 'accompanying-person',
    name: 'Accompanying Person',
    price: '₹6,490',
    numericPrice: 6490,
    description: 'Current Slab 2 Rate • 18% GST Included • Meals & Gala Dinner',
  },
];

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const initialMatchedTariff = initialCategoryParam
    ? TARIFF_OPTIONS.find((t) => t.name.toLowerCase() === initialCategoryParam.toLowerCase())
    : null;

  // Form States
  const [selectedTariff, setSelectedTariff] = useState<string>(
    initialMatchedTariff ? initialMatchedTariff.id : 'asi-member'
  );

  // Registration Details
  const [delegateName, setDelegateName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
  const [dob, setDob] = useState('');
  const [designation, setDesignation] = useState<'Faculty' | 'PG' | ''>('');

  // Professional Details
  const [stateCouncilNumber, setStateCouncilNumber] = useState('');
  const [ugCollege, setUgCollege] = useState('');
  const [yearPassedOut, setYearPassedOut] = useState('');

  // Qualification Table
  const [ugQualification, setUgQualification] = useState({
    college: '',
    yearPassedOut: '',
    currentYear: 'Completed',
  });
  const [pgQualification, setPgQualification] = useState({
    college: '',
    yearPassedOut: '',
    currentYear: '',
  });

  const [pgYear, setPgYear] = useState<string>('');
  const [asiMembershipNumber, setAsiMembershipNumber] = useState('');

  // Contact Details
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Andhra Pradesh');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');

  // Additional Details
  const [food, setFood] = useState<'Veg' | 'Non-Veg' | ''>('Non-Veg');

  // Accompanying Persons
  const [accPerson1, setAccPerson1] = useState('');
  const [accPerson2, setAccPerson2] = useState('');
  const [accPerson3, setAccPerson3] = useState('');

  // Remarks
  const [remarks, setRemarks] = useState('');

  // Payment
  const [paymentAmount, setPaymentAmount] = useState<string>(
    initialMatchedTariff ? initialMatchedTariff.price : '₹7,670'
  );
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [transactionRef, setTransactionRef] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  // UI status
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [formError, setFormError] = useState('');

  // Handle Tariff Change
  const handleTariffChange = (tariffId: string) => {
    setSelectedTariff(tariffId);
    const chosen = TARIFF_OPTIONS.find((t) => t.id === tariffId);
    if (chosen) {
      setPaymentAmount(chosen.price);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegateName.trim()) {
      setFormError('Please enter the Delegate Name.');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }
    if (!email.trim() || !phone1.trim()) {
      setFormError('Please provide Email and Primary Phone Number.');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setFormError('');
    // Generate random confirmation ID
    const randomId = 'APASI-2027-' + Math.floor(100000 + Math.random() * 900000);
    setRegistrationId(randomId);
    setSubmitted(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-zinc-900">
      <Header />

      <main className="flex-1 py-10 sm:py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation & Breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#187A83] hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              APASICON 2027 &bull; Rajamahendravaram
            </span>
          </div>

          {/* SUCCESS RECEIPT VIEW */}
          {submitted ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xl print:shadow-none print:border-none">
              <div className="text-center pb-6 border-b border-zinc-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-950">
                  Registration Submitted Successfully!
                </h1>
                <p className="text-sm text-zinc-600 mt-2">
                  Thank you for registering for the 50th Annual Conference of ASI AP Chapter.
                </p>
                <div className="mt-4 inline-block px-4 py-2 bg-amber-50 border border-[#D4AF37] rounded-xl text-xs sm:text-sm font-bold text-zinc-900">
                  Registration ID: <span className="text-[#187A83] font-mono text-base">{registrationId}</span>
                </div>
              </div>

              {/* Summary Details */}
              <div className="py-6 space-y-6 text-sm">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-1 mb-3">
                    Delegate Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-800">
                    <div>
                      <span className="text-zinc-500 text-xs block">Delegate Name</span>
                      <span className="font-bold">{delegateName}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Tariff Category</span>
                      <span className="font-bold text-[#187A83]">
                        {TARIFF_OPTIONS.find((t) => t.id === selectedTariff)?.name} ({paymentAmount})
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Gender & DOB</span>
                      <span>{gender || 'Not specified'} {dob ? `• DOB: ${dob}` : ''}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Designation</span>
                      <span>{designation || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-1 mb-3">
                    Contact & Professional
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-800">
                    <div>
                      <span className="text-zinc-500 text-xs block">Email</span>
                      <span className="font-semibold">{email}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Phone</span>
                      <span className="font-semibold">{phone1} {phone2 ? `/ ${phone2}` : ''}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">ASI Membership No.</span>
                      <span>{asiMembershipNumber || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">State Council No.</span>
                      <span>{stateCouncilNumber || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Address</span>
                      <span>{address ? `${address}, ${district}, ${state} - ${pincode}` : `${district}, ${state}`}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Food Preference</span>
                      <span className="font-semibold">{food}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-1 mb-3">
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-800">
                    <div>
                      <span className="text-zinc-500 text-xs block">Amount</span>
                      <span className="font-black text-lg text-emerald-700">{paymentAmount}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Payment Mode</span>
                      <span className="font-semibold">{paymentMode}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Transaction / Ref No.</span>
                      <span className="font-mono">{transactionRef || 'Pending verification'}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block">Payment Date</span>
                      <span>{paymentDate || new Date().toISOString().split('T')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setRegistrationId('');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-800 font-bold text-xs transition-colors"
                >
                  <span>Submit Another Registration</span>
                </button>
              </div>
            </div>
          ) : (
            /* REGISTRATION FORM */
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-xl space-y-10"
            >
              {/* Header Title */}
              <div className="text-center pb-6 border-b border-zinc-200">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Official Delegate Registration</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight">
                  APASICON 2027 Registration
                </h1>
                <p className="mt-2 text-xs sm:text-sm font-medium text-zinc-600 max-w-xl mx-auto">
                  50th Annual Conference of ASI AP Chapter &bull; 26 to 28 August 2027 at GSL Educational Institutions, Rajamahendravaram.
                </p>
              </div>

              {formError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. TARIFF CATEGORY SELECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-black text-[#111111] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-zinc-950 text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    Select Tariff Category
                  </h2>
                  <span className="text-xs font-bold text-[#187A83]">18% GST Included</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TARIFF_OPTIONS.map((tariff) => (
                    <label
                      key={tariff.id}
                      onClick={() => handleTariffChange(tariff.id)}
                      className={`relative flex flex-col justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedTariff === tariff.id
                          ? 'border-[#D4AF37] bg-amber-50/40 ring-1 ring-[#D4AF37]'
                          : 'border-zinc-200 hover:border-zinc-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="tariffCategory"
                            value={tariff.id}
                            checked={selectedTariff === tariff.id}
                            onChange={() => handleTariffChange(tariff.id)}
                            className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          <span className="font-bold text-sm text-[#111111]">
                            {tariff.name}
                          </span>
                        </div>
                        <span className="text-base font-black text-zinc-950">
                          {tariff.price}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-zinc-500 pl-6">
                        {tariff.description}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. REGISTRATION DETAILS */}
              <div className="pt-6 border-t border-zinc-200 space-y-5">
                <h2 className="text-base sm:text-lg font-black text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#187A83] text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Registration Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Delegate Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Delegate Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={delegateName}
                        onChange={(e) => setDelegateName(e.target.value)}
                        placeholder="Dr. / Prof. / Mr. / Ms. Full Name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Gender
                    </label>
                    <div className="flex items-center gap-6 pt-1">
                      <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={gender === 'Male'}
                          onChange={() => setGender('Male')}
                          className="w-4 h-4 text-[#187A83] focus:ring-[#187A83]"
                        />
                        <span>Male</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={gender === 'Female'}
                          onChange={() => setGender('Female')}
                          className="w-4 h-4 text-[#187A83] focus:ring-[#187A83]"
                        />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Designation */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Designation
                    </label>
                    <div className="flex items-center gap-6 pt-1">
                      <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800">
                        <input
                          type="radio"
                          name="designation"
                          value="Faculty"
                          checked={designation === 'Faculty'}
                          onChange={() => setDesignation('Faculty')}
                          className="w-4 h-4 text-[#187A83] focus:ring-[#187A83]"
                        />
                        <span>Faculty</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800">
                        <input
                          type="radio"
                          name="designation"
                          value="PG"
                          checked={designation === 'PG'}
                          onChange={() => setDesignation('PG')}
                          className="w-4 h-4 text-[#187A83] focus:ring-[#187A83]"
                        />
                        <span>PG (Post Graduate)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. PROFESSIONAL DETAILS */}
              <div className="pt-6 border-t border-zinc-200 space-y-5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#187A83]" />
                  <h2 className="text-base sm:text-lg font-black text-[#111111] uppercase tracking-wide">
                    PROFESSIONAL DETAILS
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* State Council Number */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      State Council Number
                    </label>
                    <input
                      type="text"
                      value={stateCouncilNumber}
                      onChange={(e) => setStateCouncilNumber(e.target.value)}
                      placeholder="e.g. APMC / 12345"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* ASI Membership Number */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      ASI Membership Number
                    </label>
                    <input
                      type="text"
                      value={asiMembershipNumber}
                      onChange={(e) => setAsiMembershipNumber(e.target.value)}
                      placeholder="e.g. FL12345"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* UG College */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      UG College
                    </label>
                    <input
                      type="text"
                      value={ugCollege}
                      onChange={(e) => setUgCollege(e.target.value)}
                      placeholder="Name of MBBS College"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Year Passed Out */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Year Passed Out
                    </label>
                    <input
                      type="text"
                      value={yearPassedOut}
                      onChange={(e) => setYearPassedOut(e.target.value)}
                      placeholder="e.g. 2018"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Qualification Table */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Qualification
                  </label>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200">
                    <table className="min-w-full divide-y divide-zinc-200 text-left text-xs sm:text-sm">
                      <thead className="bg-zinc-100 text-zinc-700 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Level</th>
                          <th className="px-4 py-3">College</th>
                          <th className="px-4 py-3">Year Passed Out</th>
                          <th className="px-4 py-3">Current Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white">
                        <tr>
                          <td className="px-4 py-3 font-bold text-zinc-900">UG</td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={ugQualification.college}
                              onChange={(e) =>
                                setUgQualification({ ...ugQualification, college: e.target.value })
                              }
                              placeholder="UG College Name"
                              className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs sm:text-sm focus:border-[#187A83] outline-none"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={ugQualification.yearPassedOut}
                              onChange={(e) =>
                                setUgQualification({
                                  ...ugQualification,
                                  yearPassedOut: e.target.value,
                                })
                              }
                              placeholder="e.g. 2018"
                              className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs sm:text-sm focus:border-[#187A83] outline-none"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={ugQualification.currentYear}
                              onChange={(e) =>
                                setUgQualification({
                                  ...ugQualification,
                                  currentYear: e.target.value,
                                })
                              }
                              placeholder="e.g. Completed"
                              className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs sm:text-sm focus:border-[#187A83] outline-none"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-bold text-zinc-900">PG</td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={pgQualification.college}
                              onChange={(e) =>
                                setPgQualification({ ...pgQualification, college: e.target.value })
                              }
                              placeholder="PG College / Institute"
                              className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs sm:text-sm focus:border-[#187A83] outline-none"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={pgQualification.yearPassedOut}
                              onChange={(e) =>
                                setPgQualification({
                                  ...pgQualification,
                                  yearPassedOut: e.target.value,
                                })
                              }
                              placeholder="Passing Year or Expected"
                              className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs sm:text-sm focus:border-[#187A83] outline-none"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={pgQualification.currentYear}
                              onChange={(e) =>
                                setPgQualification({
                                  ...pgQualification,
                                  currentYear: e.target.value,
                                })
                              }
                              placeholder="e.g. 2nd Year / Completed"
                              className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs sm:text-sm focus:border-[#187A83] outline-none"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PG Year (if applicable) */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    PG Year (if applicable):
                  </label>
                  <div className="flex flex-wrap items-center gap-6 pt-1">
                    {['1st Year', '2nd Year', '3rd Year'].map((year) => (
                      <label
                        key={year}
                        className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800"
                      >
                        <input
                          type="radio"
                          name="pgYear"
                          value={year}
                          checked={pgYear === year}
                          onChange={() => setPgYear(year)}
                          className="w-4 h-4 text-[#187A83] focus:ring-[#187A83]"
                        />
                        <span>{year}</span>
                      </label>
                    ))}
                    {pgYear && (
                      <button
                        type="button"
                        onClick={() => setPgYear('')}
                        className="text-xs text-zinc-400 hover:text-rose-500 underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. CONTACT DETAILS */}
              <div className="pt-6 border-t border-zinc-200 space-y-5">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#187A83]" />
                  <h2 className="text-base sm:text-lg font-black text-[#111111] uppercase tracking-wide">
                    CONTACT DETAILS
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number 1 */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Phone Number 1 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number 2 */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Phone Number 2 (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value)}
                      placeholder="Alternate Contact Number"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Address
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Hospital / Clinic / Residential Address"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Andhra Pradesh"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      District
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="e.g. East Godavari"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 533296"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 5. ADDITIONAL DETAILS */}
              <div className="pt-6 border-t border-zinc-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#187A83]" />
                  <h2 className="text-base sm:text-lg font-black text-[#111111] uppercase tracking-wide">
                    ADDITIONAL DETAILS
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Food:
                  </label>
                  <div className="flex items-center gap-6 pt-1">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800">
                      <input
                        type="radio"
                        name="food"
                        value="Veg"
                        checked={food === 'Veg'}
                        onChange={() => setFood('Veg')}
                        className="w-4 h-4 text-[#187A83] focus:ring-[#187A83]"
                      />
                      <span>Veg</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800">
                      <input
                        type="radio"
                        name="food"
                        value="Non-Veg"
                        checked={food === 'Non-Veg'}
                        onChange={() => setFood('Non-Veg')}
                        className="w-4 h-4 text-[#187A83] focus:ring-[#187A83]"
                      />
                      <span>Non-Veg</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 6. ACCOMPANYING PERSONS */}
              <div className="pt-6 border-t border-zinc-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#187A83]" />
                  <h2 className="text-base sm:text-lg font-black text-[#111111] uppercase tracking-wide">
                    ACCOMPANYING PERSONS
                  </h2>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Accompanying Person 1:
                    </label>
                    <input
                      type="text"
                      value={accPerson1}
                      onChange={(e) => setAccPerson1(e.target.value)}
                      placeholder="Name of Accompanying Person 1 (Optional)"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Accompanying Person 2:
                    </label>
                    <input
                      type="text"
                      value={accPerson2}
                      onChange={(e) => setAccPerson2(e.target.value)}
                      placeholder="Name of Accompanying Person 2 (Optional)"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Accompanying Person 3:
                    </label>
                    <input
                      type="text"
                      value={accPerson3}
                      onChange={(e) => setAccPerson3(e.target.value)}
                      placeholder="Name of Accompanying Person 3 (Optional)"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 7. REMARKS */}
              <div className="pt-6 border-t border-zinc-200 space-y-4">
                <h2 className="text-base sm:text-lg font-black text-[#111111] uppercase tracking-wide">
                  REMARKS
                </h2>
                <div>
                  <textarea
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Any special accommodations, dietary notes, or comments..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* 8. PAYMENT */}
              <div className="pt-6 border-t border-zinc-200 space-y-5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  <h2 className="text-base sm:text-lg font-black text-[#111111] uppercase tracking-wide">
                    PAYMENT
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Amount
                    </label>
                    <input
                      type="text"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 font-black text-base text-zinc-900 bg-amber-50/50 focus:border-[#D4AF37] outline-none"
                    />
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Payment Mode
                    </label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all bg-white"
                    >
                      <option value="UPI">UPI / Google Pay / PhonePe / Paytm</option>
                      <option value="Net Banking">Net Banking / NEFT / IMPS</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Demand Draft">Demand Draft (DD)</option>
                    </select>
                  </div>

                  {/* Transaction / Reference No */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Transaction / Reference No.
                    </label>
                    <input
                      type="text"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder="UTR / Ref / Transaction ID"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Payment Date */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Payment Date
                    </label>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#187A83] focus:ring-1 focus:ring-[#187A83] text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-zinc-200">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#D4AF37] hover:bg-[#c59f2a] text-zinc-950 font-black text-base uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <span>Submit Registration</span>
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-zinc-500 mt-3">
                  Upon submission, you will receive an acknowledgment receipt and registration summary.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-zinc-600">
          Loading registration form...
        </div>
      }
    >
      <RegistrationFormContent />
    </Suspense>
  );
}
