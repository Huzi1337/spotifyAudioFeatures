import { AudioFeaturesResponse } from "../models/types.js";

function convertToCSV(data: AudioFeaturesResponse[]) {
  let csv = [];

  let headers = getCSV(data[0], "headers").join(",");
  csv.push(headers);

  for (const object of data) {
    let values = getCSV(object, "values").join(",");
    csv.push(values);
  }

  return csv.join("\n");
}

function getCSV(
  object: AudioFeaturesResponse,
  arg: "headers" | "values"
): string[] {
  let result = [];
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === "object") {
      result.push(...getCSV(value, arg));
    } else {
      let requestedValue = arg === "headers" ? key : value;
      result.push(requestedValue);
    }
  }
  return result;
}

export default convertToCSV;
