/**************************************************************
 * Western School & College - Google Apps Script Backend
 * Use this later for login and Google Drive search.
 **************************************************************/

const WSC_CONFIG = {
  USERS_SHEET_NAME: 'Users',
  DRIVE_FOLDER_ID: '1nSfSwnd5YOZc7ofmrtMt2swhYbdDNykE',
  HEADERS: ['Username', 'Password', 'Role', 'Active', 'CreatedAt', 'LastLogin', 'Note']
};

function doGet(e) {
  const action = String(e.parameter.action || '').trim();

  if (action === 'setup') {
    setupUsersSheet_();
    return jsonResponse({ success: true, message: 'Setup complete' });
  }

  if (action === 'login') {
    return jsonResponse(loginUser_(e.parameter.username, e.parameter.password));
  }

  if (action === 'searchDrive') {
    return jsonResponse({ success: true, files: searchDriveFolder_(e.parameter.query || '') });
  }

  return jsonResponse({ success: false, message: 'Invalid action' });
}

function setupUsersSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(WSC_CONFIG.USERS_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(WSC_CONFIG.USERS_SHEET_NAME);

  sheet.getRange(1, 1, 1, WSC_CONFIG.HEADERS.length).setValues([WSC_CONFIG.HEADERS]);
  sheet.getRange(1, 1, 1, WSC_CONFIG.HEADERS.length).setFontWeight('bold').setBackground('#2563eb').setFontColor('#ffffff');

  if (sheet.getLastRow() < 2) {
    sheet.appendRow(['Admin', 'admin123', 'Admin', true, new Date(), '', 'Default admin user']);
  }
}

function loginUser_(username, password) {
  setupUsersSheet_();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WSC_CONFIG.USERS_SHEET_NAME);
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === String(username).trim() && String(rows[i][1]) === String(password)) {
      if (String(rows[i][3]).toUpperCase() !== 'TRUE') return { success: false, message: 'Inactive user' };
      sheet.getRange(i + 1, 6).setValue(new Date());
      return { success: true, user: { username: rows[i][0], role: rows[i][2] } };
    }
  }

  return { success: false, message: 'Invalid username or password' };
}

function searchDriveFolder_(query) {
  const q = String(query || '').toLowerCase().trim();
  if (!q) return [];

  const folder = DriveApp.getFolderById(WSC_CONFIG.DRIVE_FOLDER_ID);
  const files = [];
  searchFolderRecursive_(folder, q, files, folder.getName());
  return files.slice(0, 50);
}

function searchFolderRecursive_(folder, query, files, path) {
  const fileIterator = folder.getFiles();
  while (fileIterator.hasNext()) {
    const file = fileIterator.next();
    if (file.getName().toLowerCase().includes(query)) {
      files.push({ name: file.getName(), title: file.getName(), url: file.getUrl(), type: file.getMimeType(), path: path });
    }
  }

  const folderIterator = folder.getFolders();
  while (folderIterator.hasNext()) {
    const child = folderIterator.next();
    searchFolderRecursive_(child, query, files, path + ' / ' + child.getName());
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
