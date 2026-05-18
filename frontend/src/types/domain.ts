export type CompanyType = 'Internal' | 'Partner' | 'Customer';
export type ProjectType = 'Main' | 'Additional';
export type ProjectRole = 'Admin' | 'Member' | 'Viewer' | 'External';
export type StatusCategory = 'Todo' | 'InProgress' | 'Done';
export type ScreenType = 'Input' | 'Process' | 'Query' | 'Output' | 'Integration';
export type DevPlatform = 'Erp' | 'Mobile' | 'Pc' | 'Pda';
export type NotificationType =
  | 'NewTask' | 'NewComment' | 'Mention' | 'DueSoon' | 'StatusChange';
export type NotificationChannel = 'Inapp' | 'Email' | 'Teams';
