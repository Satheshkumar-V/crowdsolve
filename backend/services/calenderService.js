const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const auth = new JWT({
  keyFile: path.join(__dirname, '../config/google-service-account.json'),
  scopes: SCOPES
});

const calendar = google.calendar({ version: 'v3', auth });

exports.addTaskToCalendar = async (task, userEmail) => {
  try {
    const event = {
      summary: task.title,
      description: task.description || 'CrowdSolve Task',
      start: { dateTime: new Date(task.dueDate).toISOString() },
      end: { dateTime: new Date(task.dueDate).toISOString() },
      attendees: [{ email: userEmail }],
    };

    const res = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return res.data;
  } catch (err) {
    console.error('Calendar API Error:', err.message);
    return null;
  }
};