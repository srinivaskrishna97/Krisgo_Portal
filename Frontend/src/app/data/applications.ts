export interface Application {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'operations' | 'finance' | 'customer' | 'tools' | 'analytics';
  status: 'active' | 'beta' | 'new' | 'maintenance';
  link: string;
  deepLinks?: { name: string; path: string }[];
}

export const applications: Application[] = [
  // Operations
  {
    id: 'inventory',
    name: 'Inventory Management',
    description: 'Track and manage inventory across all locations',
    icon: '📦',
    category: 'operations',
    status: 'active',
    link: '/apps/inventory',
    deepLinks: [
      { name: 'Stock Levels', path: '/apps/inventory/stock' },
      { name: 'Orders', path: '/apps/inventory/orders' },
      { name: 'Suppliers', path: '/apps/inventory/suppliers' },
    ],
  },
  {
    id: 'warehouse',
    name: 'Warehouse Management',
    description: 'Optimize warehouse operations and logistics',
    icon: '🏭',
    category: 'operations',
    status: 'active',
    link: '/apps/warehouse',
  },
  {
    id: 'shipping',
    name: 'Shipping & Logistics',
    description: 'Manage shipments and delivery tracking',
    icon: '🚚',
    category: 'operations',
    status: 'new',
    link: '/apps/shipping',
  },
  {
    id: 'quality',
    name: 'Quality Control',
    description: 'Quality assurance and inspection workflows',
    icon: '✅',
    category: 'operations',
    status: 'beta',
    link: '/apps/quality',
  },

  // Finance
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Complete accounting and financial management',
    icon: '💰',
    category: 'finance',
    status: 'active',
    link: '/apps/accounting',
    deepLinks: [
      { name: 'General Ledger', path: '/apps/accounting/ledger' },
      { name: 'Invoices', path: '/apps/accounting/invoices' },
      { name: 'Reports', path: '/apps/accounting/reports' },
    ],
  },
  {
    id: 'payroll',
    name: 'Payroll',
    description: 'Employee payroll and compensation management',
    icon: '💵',
    category: 'finance',
    status: 'active',
    link: '/apps/payroll',
  },
  {
    id: 'expenses',
    name: 'Expense Management',
    description: 'Track and approve employee expenses',
    icon: '🧾',
    category: 'finance',
    status: 'active',
    link: '/apps/expenses',
  },
  {
    id: 'budgeting',
    name: 'Budgeting & Forecasting',
    description: 'Financial planning and budget management',
    icon: '📊',
    category: 'finance',
    status: 'new',
    link: '/apps/budgeting',
  },

  // Customer
  {
    id: 'crm',
    name: 'CRM',
    description: 'Customer relationship management system',
    icon: '👥',
    category: 'customer',
    status: 'active',
    link: '/apps/crm',
    deepLinks: [
      { name: 'Contacts', path: '/apps/crm/contacts' },
      { name: 'Deals', path: '/apps/crm/deals' },
      { name: 'Activities', path: '/apps/crm/activities' },
    ],
  },
  {
    id: 'support',
    name: 'Customer Support',
    description: 'Help desk and ticket management',
    icon: '🎧',
    category: 'customer',
    status: 'active',
    link: '/apps/support',
  },
  {
    id: 'marketing',
    name: 'Marketing Automation',
    description: 'Campaign management and marketing analytics',
    icon: '📢',
    category: 'customer',
    status: 'beta',
    link: '/apps/marketing',
  },
  {
    id: 'loyalty',
    name: 'Loyalty Program',
    description: 'Customer rewards and loyalty management',
    icon: '🎁',
    category: 'customer',
    status: 'new',
    link: '/apps/loyalty',
  },

  // Tools
  {
    id: 'documents',
    name: 'Document Management',
    description: 'Store and manage business documents',
    icon: '📄',
    category: 'tools',
    status: 'active',
    link: '/apps/documents',
  },
  {
    id: 'calendar',
    name: 'Calendar & Scheduling',
    description: 'Team calendar and appointment scheduling',
    icon: '📅',
    category: 'tools',
    status: 'active',
    link: '/apps/calendar',
  },
  {
    id: 'tasks',
    name: 'Task Management',
    description: 'Project tasks and collaboration',
    icon: '✓',
    category: 'tools',
    status: 'active',
    link: '/apps/tasks',
  },
  {
    id: 'workflows',
    name: 'Workflow Builder',
    description: 'Create and automate business workflows',
    icon: '⚙️',
    category: 'tools',
    status: 'beta',
    link: '/apps/workflows',
  },

  // Analytics
  {
    id: 'analytics',
    name: 'Business Analytics',
    description: 'Comprehensive business intelligence and reporting',
    icon: '📈',
    category: 'analytics',
    status: 'active',
    link: '/apps/analytics',
    deepLinks: [
      { name: 'Dashboards', path: '/apps/analytics/dashboards' },
      { name: 'Reports', path: '/apps/analytics/reports' },
      { name: 'Data Explorer', path: '/apps/analytics/explorer' },
    ],
  },
  {
    id: 'sales-analytics',
    name: 'Sales Analytics',
    description: 'Sales performance and forecasting',
    icon: '💹',
    category: 'analytics',
    status: 'active',
    link: '/apps/sales-analytics',
  },
  {
    id: 'customer-insights',
    name: 'Customer Insights',
    description: 'Customer behavior and segmentation analysis',
    icon: '🔍',
    category: 'analytics',
    status: 'new',
    link: '/apps/customer-insights',
  },
];

export const categoryLabels = {
  operations: 'Operations',
  finance: 'Finance',
  customer: 'Customer',
  tools: 'Tools',
  analytics: 'Analytics',
};

export const statusColors = {
  active: 'bg-green-100 text-green-800',
  beta: 'bg-blue-100 text-blue-800',
  new: 'bg-purple-100 text-purple-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
};
