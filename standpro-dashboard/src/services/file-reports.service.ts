import { BaseService } from "./base.service";

export class FileReportsService extends BaseService {
  public async getFilesByCategory(category: "daily" | "monthly" | "yearly") {
    return await this.http
      .get("/admin/files-report/" + category)
      .then((response) => response.data)
      .catch((error) => this.handleError(error));
  }
}
