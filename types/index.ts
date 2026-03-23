export type EmployeeRange = '1-5' | '6-10' | '11-30' | '31-50' | '51+';
export type MeetingCount = '0-5' | '6-10' | '11-20' | '21+';
export type MeetingDuration = '0.5' | '1' | '1.5' | '2+';
export type ReportHours = '<5' | '5-10' | '10-20' | '20+';
export type AggregationCount = '0-5' | '6-10' | '11-20' | '21+';
export type InvoiceCount = '<5' | '5-10' | '11-20' | '21+';
export type PaperFrequency = 'none' | 'monthly' | 'weekly' | 'daily';
export type PhoneFrequency = 'none' | 'monthly' | 'weekly' | 'daily';
export type InfoSharingMethod = 'email' | 'verbal' | 'chat' | 'mixed';
export type WastePerception = 'meeting' | 'report' | 'data-entry' | 'invoice' | 'paper' | 'phone';

export interface DiagnosisAnswers {
  employees: EmployeeRange;
  meetingCount: MeetingCount;
  meetingDuration: MeetingDuration;
  reportHours: ReportHours;
  aggregationCount: AggregationCount;
  invoiceCount: InvoiceCount;
  paperFrequency: PaperFrequency;
  phoneFrequency: PhoneFrequency;
  infoSharing: InfoSharingMethod;
  wastePerception: WastePerception;
  email: string;
}

export interface ReductionBreakdown {
  label: string;
  monthlyHours: number;
  annualHours: number;
  annualCost: number;
}

export interface DiagnosisResult {
  monthlyHours: number;
  annualHours: number;
  annualCost: number;
  breakdown: ReductionBreakdown[];
  topActions: string[];
}
