import { replaceMongoId } from "@/lib/convertData";
import { Assessment } from "@/models/assessment-model";
import { Report } from "@/models/report-model";

export async function getReport(filter) {
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();

    if (!report) {
      return null;
    }
    return replaceMongoId(report);
  } catch (error) {
    throw error;
  }
}
