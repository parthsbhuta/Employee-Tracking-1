import IDataFields from '../models/IDataFields';
import ISPInsertData from '../models/ISPInsertData';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default interface IMapDataProvider {
    getEmployeeLogs: (context: WebPartContext) => Promise<IDataFields[]>;
    saveEmployeeLog: (data: ISPInsertData, context: WebPartContext) => Promise<IDataFields>;
    getEmployeeLog: (itemId?: number) => Promise<IDataFields>;
}