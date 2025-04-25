import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

export interface DailyReport {
  storeName: string;
  currentValue: number;
  previousValue: number;
  target: number;
}

export interface WeeklyReport {
  storeName: string;
  currentWeekValue: number;
  previousWeekValue: number;
  target: number;
}

export interface ReportData {
  daily: DailyReport[];
  weekly: WeeklyReport[];
}

const reportService = {
  getDailyReports: async (): Promise<DailyReport[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/daily`);
      return response.data;
    } catch (error) {
      console.error("Error fetching daily reports:", error);
      throw error;
    }
  },

  getWeeklyReports: async (): Promise<WeeklyReport[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/weekly`);
      return response.data;
    } catch (error) {
      console.error("Error fetching weekly reports:", error);
      throw error;
    }
  },

  getAllReports: async (): Promise<ReportData> => {
    try {
      const [dailyReports, weeklyReports] = await Promise.all([
        reportService.getDailyReports(),
        reportService.getWeeklyReports(),
      ]);

      return {
        daily: dailyReports,
        weekly: weeklyReports,
      };
    } catch (error) {
      console.error("Error fetching all reports:", error);
      throw error;
    }
  },
};

export default reportService;
