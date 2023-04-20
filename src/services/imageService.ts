import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./backend/src/credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth: auth });

async function getFolderId(folderName: string) {
  const response = await drive.files.list({
    q: `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed = false`,
    fields: "nextPageToken, files(id, name)",
  });
  if (response.data.files) {
    if (response.data.files!.length > 0) {
      return response.data.files![0].id;
    }
  }

  return null;
}

export const getDriverImageFileId = async (employeeId: number) => {
  const folderName = "FHT/Images";
  const folderId = await getFolderId(folderName);

  if (!folderId) {
    console.log(`Folder not found: ${folderName}`);
    return null;
  }

  const response = await drive.files.list({
    q: `'${folderId}' in parents and name = '${employeeId}profile.png' and mimeType = 'image/png' and trashed = false`,
    fields: "nextPageToken, files(id, name, mimeType)",
  });
  if (response.data.files) {
    if (response.data.files!.length > 0) {
      return response.data.files![0].id;
    }
  }
  return null;
};
