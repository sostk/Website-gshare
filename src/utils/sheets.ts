import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY;

export async function addEmailToSheet(email: string) {
  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.addRow({
      Email: email,
      Timestamp: new Date().toISOString(),
      Status: 'Pending'
    });

    return true;
  } catch (error) {
    console.error('Error adding email to sheet:', error);
    throw error;
  }
}