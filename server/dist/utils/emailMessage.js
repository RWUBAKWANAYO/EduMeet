"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingEmailMessage = void 0;
const meetingEmailMessage = (options) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #333333;
        }
        .content {
          line-height: 1.6;
          color: #333333;
        }
        .content p {
          margin: 10px 0;
        }
        .button {
          display: block;
          width: fit-content;
          margin: 20px auto;
          padding: 10px 20px;
          background-color: #007BFF;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Meeting Invitation</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>You have been invited to a meeting by <strong>${options.full_name}</strong>.</p>
          <p>The meeting is scheduled for <strong>${options.scheduled_at}</strong>.</p>
          <p>Use the following link to join the meeting:</p>
          <a href="${options.client_url}" class="button">Join Meeting</a>
          <p>or use the meeting ID: <strong>${options.meeting_id}</strong></p>
          ${options.passcodeRequired
        ? `<p>The passcode for the meeting is: <strong>${options.passcode}</strong></p>`
        : ""}
          ${options.confirmationLink
        ? `<p>Please confirm your participation by clicking the link below:</p>
                 <a href="${options.confirmationLink}" class="button">Confirm Invitation</a>`
        : ""}
          <p>Looking forward to your participation.</p>
        </div>
        <div class="footer">
          <p>If you have any questions, feel free to contact us.</p>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};
exports.meetingEmailMessage = meetingEmailMessage;
