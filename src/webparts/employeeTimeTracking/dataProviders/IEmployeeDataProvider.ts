import IDataFields from '../models/IDataFields';
import ISPInsertData from '../models/ISPInsertData';

export default interface IMapDataProvider {
    getEmployeeLogs: () => Promise<IDataFields[]>;
    saveEmployeeLog: (data: ISPInsertData) => Promise<IDataFields>;
    getEmployeeLog: (itemId?: number) => Promise<IDataFields>;
}