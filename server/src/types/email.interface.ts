export interface IEmailOptions {
  type: string;
  email: string;
  subject: string;
  message: string;
}

export interface IMeetingEmailOptions {
  full_name: string | undefined;
  meeting_id: string;
  scheduled_at: Date;
  passcodeRequired: boolean;
  passcode: string;
  client_url: string;
  confirmationLink?: string;
}

export interface ISendInvitationEmails {
  createdInvitations: any[];
  tokens: Record<string, string | undefined>;
  meeting?: any;
  full_name: string;
}
