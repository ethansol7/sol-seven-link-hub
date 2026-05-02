const DEFAULT_SHEET_NAME = "Waitlist";

const SHEET_HEADERS = {
  Waitlist: [
    "timestamp",
    "name",
    "email",
    "company_or_organization",
    "role_or_title",
    "interest_type",
    "message_or_notes",
    "source_page",
    "campaign",
    "submission_id"
  ],
  "ICFF Contact List": [
    "timestamp",
    "name",
    "email",
    "phone",
    "interest_type",
    "message",
    "source_page",
    "campaign",
    "submission_id",
    "capture_mode",
    "discount_code",
    "form_name"
  ]
};

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "Sol Seven lead capture endpoint is live."
  });
}

function doPost(event) {
  try {
    const payload = parsePayload_(event);
    const sheetName = getTargetSheetName_(payload);
    const headers = SHEET_HEADERS[sheetName] || SHEET_HEADERS[DEFAULT_SHEET_NAME];
    const sheet = getSheet_(sheetName);

    ensureHeaders_(sheet, headers);

    const submissionId = normalize_(payload.submissionId || payload.submission_id);
    if (submissionId && isDuplicateSubmission_(sheet, headers, submissionId)) {
      return jsonResponse_({
        ok: true,
        duplicate: true,
        sheetName,
        message: "Submission already captured."
      });
    }

    sheet.appendRow(headers.map((header) => valueForHeader_(header, payload, submissionId)));

    return jsonResponse_({
      ok: true,
      sheetName,
      message: "Submission captured."
    });
  } catch (error) {
    return jsonResponse_(
      {
        ok: false,
        message: error && error.message ? error.message : "Submission failed."
      },
      500
    );
  }
}

function parsePayload_(event) {
  const raw = event && event.postData && event.postData.contents;
  if (!raw) {
    throw new Error("Missing request body.");
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error("Request body must be JSON.");
  }
}

function getTargetSheetName_(payload) {
  const requested = normalize_(payload.sheetName || payload.targetSheet || payload.listName);
  if (requested && SHEET_HEADERS[requested]) {
    return requested;
  }

  return DEFAULT_SHEET_NAME;
}

function getSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders_(sheet, headers) {
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const currentHeaders = headerRange.getValues()[0];
  const hasHeaders = currentHeaders.some((value) => String(value || "").trim() !== "");

  if (!hasHeaders) {
    headerRange.setValues([headers]);
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function isDuplicateSubmission_(sheet, headers, submissionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const submissionIdColumn = headers.indexOf("submission_id") + 1;
  if (submissionIdColumn < 1) return false;

  const values = sheet
    .getRange(2, submissionIdColumn, lastRow - 1, 1)
    .getValues()
    .flat();

  return values.some((value) => normalize_(value) === submissionId);
}

function valueForHeader_(header, payload, submissionId) {
  const values = {
    timestamp: normalize_(payload.timestamp || payload.submittedAt) || new Date().toISOString(),
    name: normalize_(payload.name || payload.fullName),
    email: normalize_(payload.email),
    phone: normalize_(payload.phone),
    company_or_organization: normalize_(payload.company || payload.companyOrOrganization),
    role_or_title: normalize_(payload.roleTitle || payload.role || payload.title),
    interest_type: normalize_(payload.interestType || payload.interest_type),
    message: normalize_(payload.message || payload.notes),
    message_or_notes: normalize_(payload.message || payload.notes),
    source_page: normalize_(payload.sourcePage || payload.source_page),
    campaign: normalize_(payload.campaign),
    submission_id: submissionId,
    capture_mode: normalize_(payload.captureMode || payload.capture_mode),
    discount_code: normalize_(payload.discountCode || payload.discount_code),
    form_name: normalize_(payload.formName || payload.form_name)
  };

  return values[header] || "";
}

function normalize_(value) {
  return String(value || "").trim();
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
