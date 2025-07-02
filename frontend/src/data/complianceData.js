export const complianceData = [
  {
    licenseName: 'Business License',
    companyName: 'ABC Trading',
    expiryDate: '2025-10-15',
    complianceSteps: [
      { step: 'Submit annual report', dueDate: '2025-09-30', completed: false },
      { step: 'Pay renewal fee', dueDate: '2025-10-01', completed: false },
    ],
  },
  {
    licenseName: 'Tax Registration',
    companyName: 'ABC Trading',
    expiryDate: '2026-01-31',
    complianceSteps: [
      { step: 'File quarterly tax returns', dueDate: '2025-07-15', completed: true },
      { step: 'Update tax details', dueDate: '2025-12-31', completed: false },
    ],
  },
];
