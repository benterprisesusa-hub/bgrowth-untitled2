/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NotaryCustomer, JournalEntry, NotaryAppointment, NotaryExpense, CertificateTemplate } from '../types';

export const initialCustomers: NotaryCustomer[] = [
  {
    id: 'JS-4011',
    name: 'John Smith',
    email: 'john.smith@gmail.com',
    phone: '(407) 555-1234',
    address: '123 Main St, Orlando, FL 32801',
    county: 'Orange',
    state: 'FL',
    idType: 'Driver License',
    idNum: 'DL-123-456-789-0',
    idExpiration: '2028-08-15',
    dateAdded: '2026-01-10',
    signatureUrl: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'MJ-5378',
    name: 'Mary Jones',
    email: 'mary.jones@yahoo.com',
    phone: '(321) 555-9876',
    address: '456 Oak Ave, Kissimmee, FL 34741',
    county: 'Osceola',
    state: 'FL',
    idType: 'Passport',
    idNum: 'US-PP-9876543',
    idExpiration: '2031-11-22',
    dateAdded: '2026-02-14',
    signatureUrl: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'RB-1082',
    name: 'Robert Brown',
    email: 'robert.brown@hotmail.com',
    phone: '(407) 555-2233',
    address: '789 Pine Rd, Winter Park, FL 32789',
    county: 'Orange',
    state: 'FL',
    idType: 'State ID',
    idNum: 'FL-ID-5555-888',
    idExpiration: '2029-04-05',
    dateAdded: '2026-03-01'
  },
  {
    id: 'SM-8120',
    name: 'Susan Miller',
    email: 'susan.miller@outlook.com',
    phone: '(321) 555-4411',
    address: '101 Lake Dr, St. Cloud, FL 34769',
    county: 'Osceola',
    state: 'FL',
    idType: 'Driver License',
    idNum: 'DL-888-999-000-0',
    idExpiration: '2030-01-30',
    dateAdded: '2026-04-18'
  },
  {
    id: 'DW-3104',
    name: 'David Wilson',
    email: 'david.wilson@gmail.com',
    phone: '(407) 555-7766',
    address: '202 Elm St, Windermere, FL 34786',
    county: 'Orange',
    state: 'FL',
    idType: 'Military ID',
    idNum: 'US-MIL-444-111',
    idExpiration: '2027-12-31',
    dateAdded: '2026-05-12'
  }
];

export const initialJournalEntries: JournalEntry[] = [
  {
    id: 'JRN-2026-001245',
    date: '2026-06-25',
    time: '10:30 AM',
    book: 1,
    page: 23,
    line: 1,
    customerId: 'JS-4011',
    customerName: 'John Smith',
    actType: 'Acknowledgment',
    docType: 'Power of Attorney',
    docDate: '2026-06-25',
    fee: 10.00,
    location: '123 Main St, Orlando, FL 32801',
    notes: 'Signer appeared in person with valid FL Driver License. Sound mind.',
    status: 'Complete'
  },
  {
    id: 'JRN-2026-001246',
    date: '2026-06-25',
    time: '11:15 AM',
    book: 1,
    page: 23,
    line: 2,
    customerId: 'MJ-5378',
    customerName: 'Mary Jones',
    actType: 'Jurat',
    docType: 'Affidavit of Residency',
    docDate: '2026-06-24',
    fee: 10.00,
    location: '456 Oak Ave, Kissimmee, FL 34741',
    notes: 'Sworn before me. Document signed in my presence.',
    status: 'Complete'
  },
  {
    id: 'JRN-2026-001247',
    date: '2026-06-26',
    time: '02:00 PM',
    book: 1,
    page: 23,
    line: 3,
    customerId: 'RB-1082',
    customerName: 'Robert Brown',
    actType: 'Oath / Affirmation',
    docType: 'Oath of Office',
    docDate: '2026-06-26',
    fee: 15.00,
    location: '789 Pine Rd, Winter Park, FL 32789',
    notes: 'Verbal oath administered. No document signed.',
    status: 'Complete'
  },
  {
    id: 'JRN-2026-001248',
    date: '2026-06-27',
    time: '01:30 PM',
    book: 1,
    page: 23,
    line: 4,
    customerId: 'SM-8120',
    customerName: 'Susan Miller',
    actType: 'Acknowledgment',
    docType: 'Deed of Trust',
    docDate: '2026-06-20',
    fee: 10.00,
    location: '101 Lake Dr, St. Cloud, FL 34769',
    notes: 'Refinance closing package document.',
    status: 'Complete'
  },
  {
    id: 'JRN-2026-001249',
    date: '2026-06-28',
    time: '04:00 PM',
    book: 1,
    page: 23,
    line: 5,
    customerId: 'DW-3104',
    customerName: 'David Wilson',
    actType: 'Jurat',
    docType: 'Financial Affidavit',
    docDate: '2026-06-28',
    fee: 10.00,
    location: '202 Elm St, Windermere, FL 34786',
    notes: 'Required for divorce proceedings.',
    status: 'Complete'
  }
];

export const initialAppointments: NotaryAppointment[] = [
  {
    id: 'APT-1005',
    date: '2026-06-29',
    time: '10:00 AM',
    clientName: 'John Smith',
    clientPhone: '(407) 555-1234',
    clientEmail: 'john.smith@gmail.com',
    address: '123 Main St, Orlando, FL 32801',
    signingType: 'Loan Signing',
    fee: 150.00,
    status: 'Completed',
    notaryName: 'Amanda Johnson',
    notes: '1st mortgage purchase. Dual-tray laser printer required.',
    documents: [
      { name: 'Loan Package', required: true, uploaded: true },
      { name: 'Deed of Trust', required: true, uploaded: true },
      { name: 'Closing Disclosure', required: true, uploaded: true },
      { name: 'ID Verification', required: true, uploaded: true }
    ]
  },
  {
    id: 'APT-1006',
    date: '2026-06-29',
    time: '01:30 PM',
    clientName: 'Mary Jones',
    clientPhone: '(321) 555-9876',
    clientEmail: 'mary.jones@yahoo.com',
    address: '456 Oak Ave, Kissimmee, FL 34741',
    signingType: 'Refinance',
    fee: 120.00,
    status: 'En Route',
    notaryName: 'Amanda Johnson',
    notes: 'Heloc closing. Signer requested morning contact to confirm.',
    documents: [
      { name: 'Heloc Package', required: true, uploaded: true },
      { name: 'Right to Cancel', required: true, uploaded: true },
      { name: '1003 Loan App', required: true, uploaded: true }
    ]
  },
  {
    id: 'APT-1007',
    date: '2026-06-30',
    time: '09:00 AM',
    clientName: 'Robert Brown',
    clientPhone: '(407) 555-2233',
    clientEmail: 'robert.brown@hotmail.com',
    address: '789 Pine Rd, Winter Park, FL 32789',
    signingType: 'Seller Only',
    fee: 90.00,
    status: 'Assigned',
    notaryName: 'Amanda Johnson',
    notes: 'Seller package, 15 pages. Overnight return FedEx envelope pre-packaged.',
    documents: [
      { name: 'Warranty Deed', required: true, uploaded: true },
      { name: 'Seller Affidavit', required: true, uploaded: true },
      { name: 'HUD-1 Settlement', required: true, uploaded: true }
    ]
  },
  {
    id: 'APT-1008',
    date: '2026-07-02',
    time: '11:00 AM',
    clientName: 'Susan Miller',
    clientPhone: '(321) 555-4411',
    clientEmail: 'susan.miller@outlook.com',
    address: '101 Lake Dr, St. Cloud, FL 34769',
    signingType: 'Jurat',
    fee: 75.00,
    status: 'Unassigned',
    notes: 'Signer needs help with multiple healthcare power of attorneys.',
    documents: [
      { name: 'Medical POA', required: true, uploaded: false },
      { name: 'Living Will', required: true, uploaded: false }
    ]
  }
];

export const initialExpenses: NotaryExpense[] = [
  { id: 'EXP-001', date: '2026-06-15', category: 'Supplies', description: 'Dual-tray printer ink, paper, legal folders', amount: 85.50, paymentMethod: 'Credit Card' },
  { id: 'EXP-002', date: '2026-06-18', category: 'Gas', description: 'Trip to Windermere and Kissimmee closings', amount: 35.00, paymentMethod: 'Debit Card' },
  { id: 'EXP-003', date: '2026-06-20', category: 'Insurance', description: 'Notary E&O Monthly Premium installment', amount: 45.00, paymentMethod: 'Auto-Pay' },
  { id: 'EXP-004', date: '2026-06-22', category: 'Printing', description: 'Professional package binding at local center', amount: 24.15, paymentMethod: 'Credit Card' },
  { id: 'EXP-005', date: '2026-06-25', category: 'Tolls', description: 'E-Pass toll charges for highway mileage', amount: 12.80, paymentMethod: 'E-Pass Wallet' }
];

export const certificateTemplates: CertificateTemplate[] = [
  {
    id: 'tpl_fl_ack',
    title: 'Florida Acknowledgment (Individual)',
    state: 'FL',
    actType: 'Acknowledgment',
    text: 'State of Florida\nCounty of ______________\n\nThe foregoing instrument was acknowledged before me by means of [ ] physical presence or [ ] online notarization, this _____ day of ________________, 20____, by _____________________________________, who is personally known to me or who has produced ____________________________________ as identification.'
  },
  {
    id: 'tpl_fl_jur',
    title: 'Florida Jurat (Oath or Affirmation)',
    state: 'FL',
    actType: 'Jurat',
    text: 'State of Florida\nCounty of ______________\n\nSubscribed and sworn to (or affirmed) before me by means of [ ] physical presence or [ ] online notarization, this _____ day of ________________, 20____, by _____________________________________, who is personally known to me or who has produced ____________________________________ as identification.'
  },
  {
    id: 'tpl_ca_ack',
    title: 'California Acknowledgment (Individual)',
    state: 'CA',
    actType: 'Acknowledgment',
    text: 'A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.\n\nState of California\nCounty of ______________\n\nOn _____________________ before me, _____________________________________, Notary Public, personally appeared _____________________________________, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.'
  },
  {
    id: 'tpl_tx_jur',
    title: 'Texas Jurat (With ID)',
    state: 'TX',
    actType: 'Jurat',
    text: 'State of Texas\nCounty of ______________\n\nSubscribed and sworn to before me on this _____ day of ________________, 20____, by _____________________________________, proved to me on the oath of ___________________________ or through ______________________________________ to be the person who appeared before me.'
  },
  {
    id: 'tpl_copy_cert',
    title: 'Copy Certification',
    state: 'FL',
    actType: 'Copy Certification',
    text: 'State of ______________\nCounty of ______________\n\nOn this _____ day of ________________, 20____, I attest that the preceding document is a true, exact, complete, and unaltered photocopy of the original document presented to me by _____________________________________, and that, to the best of my knowledge, the photocopied document is neither a public record nor a publicly recordable document, certified copies of which are available from an official source.'
  }
];
