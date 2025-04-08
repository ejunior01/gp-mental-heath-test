export type UploadSurveyStatus = "COMPLETED" | "IN_PROCESS" | "FAILURE";

export type UploadSurvey = {
  id: number;
  totalRecords: number;
  status: UploadSurveyStatus;
  filepath: string;
  filepathResult: string;
  createdAt: Date;
  updatedAt: Date;
};
