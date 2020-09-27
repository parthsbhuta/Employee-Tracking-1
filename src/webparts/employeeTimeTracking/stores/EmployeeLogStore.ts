import { WebPartContext } from "@microsoft/sp-webpart-base";
import EmployeeDataProvider from '../dataProviders/EmployeeDataProvider';
import IEmployeeDataProvider from '../dataProviders/IEmployeeDataProvider';
import IDataFields from '../models/IDataFields';
import ISPInsertData from '../models/ISPInsertData';

export default class EmployeeLogStore {
    public context: WebPartContext;
    private employeeDataProvider: IEmployeeDataProvider;
    public employeeLogs: IDataFields[] = [];
    public totalHours: number = 0;

    constructor(webpartContext?: any) {
        if (webpartContext !== undefined) {
            this.context = webpartContext;
        }
        this.employeeDataProvider = new EmployeeDataProvider();
        this.init();
    }

    public async init() {
        this.employeeLogs = await this.employeeDataProvider.getEmployeeLogs();
        this.employeeLogs.map(d => {
            this.totalHours += parseInt(d.time);
        });
    }

    public async getEmployeeLogs(): Promise<IDataFields[]> {
        return await this.employeeDataProvider.getEmployeeLogs();
    }

    public async saveEmployeeLog(data: ISPInsertData): Promise<IDataFields> {
        return await this.employeeDataProvider.saveEmployeeLog(data);
    }
}