import IEmployeeDataProvider from './IEmployeeDataProvider';
import IDataFields from '../models/IDataFields';
import ISPDataFields from '../models/ISPDataFields';
import ISPInsertdata from '../models/ISPInsertData';
import pnp from "sp-pnp-js";
import { EmployeeListTitle } from '../common/Constants';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export default class EmployeeDataProvider implements IEmployeeDataProvider {
    public async getEmployeeLogs(context: WebPartContext): Promise<IDataFields[]> {

        pnp.setup({
            spfxContext: context
        });

        return new Promise<IDataFields[]>(async (resolve, reject) => {
            try {
                const { Id: principalId } = await pnp.sp.web.currentUser.select('Id').get();
                let today = new Date();
                let startDate = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + "T00:00:00.000Z";
                let endDate = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + "T23:59:59.000Z";
                const spItems: ISPDataFields[] = await pnp.sp.web.lists
                    .getByTitle(EmployeeListTitle)
                    .items.select("ID,Title,Catagory,TimeSheetDescription,Time,Created,Author/Title,Author/Id")
                    .expand("Author")
                    .filter("Author/Id eq '"+principalId+"' and Created ge '"+startDate+"' and Created le '"+endDate+"'" )
                    .orderBy("Title")
                    .get();
                resolve(this.parseEmployeeLogs(spItems));
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    private async breakPermission(itemId?: number): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const list = await pnp.sp.web.lists.getByTitle(EmployeeListTitle);
                const item = await list.items.getById(itemId);

                await item.breakRoleInheritance(false);
                // Get user/group proncipal Id
                const { Id: principalId } = await pnp.sp.web.currentUser.select('Id').get();
                // Get role definition Id
                const { Id: roleDefId } = await pnp.sp.web.roleDefinitions.getByName('Edit').get();
                await item.roleAssignments.add(principalId, roleDefId);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }

    public async getEmployeeLog(itemId?: number): Promise<IDataFields> {
        return new Promise<IDataFields>(async (resolve, reject) => {
            try {
                await pnp.sp.web.lists
                    .getByTitle(EmployeeListTitle)
                    .items.getById(itemId).select("ID,Title,Catagory,TimeSheetDescription,Time,Created,Author/Title")
                    .expand("Author")
                    .get()
                    .then(async (spItem: ISPDataFields) => {
                        await this.breakPermission(itemId);
                        resolve(this.parseEmployeeLog(spItem));
                    });
            } catch (e) {
                reject(e);
            }
        });
    }

    public saveEmployeeLog(data: ISPInsertdata, context: WebPartContext): Promise<IDataFields> {
        pnp.setup({
            spfxContext: context
        });
        return new Promise<IDataFields>(async (resolve, reject) => {
            try {
                await pnp.sp.web.lists
                    .getByTitle(EmployeeListTitle)
                    .items.add(data).then((item: any) => {
                        resolve(this.getEmployeeLog(item.data.Id));
                    });
            } catch (e) {
                reject(e);
            }
        });
    }

    private parseEmployeeLog(data: ISPDataFields): IDataFields {
        return {
            id: data.Id,
            title: data.Title,
            description: data.TimeSheetDescription,
            catagory: data.Catagory,
            time: data.Time,
            createdAt: data.Created,
            createdBy: data.Author["Title"]
        } as IDataFields;
    }

    private parseEmployeeLogs(data: ISPDataFields[]): IDataFields[] {
        return data.map(d => {
            return {
                title: d.Title,
                description: d.TimeSheetDescription,
                catagory: d.Catagory,
                time: d.Time.toString(),
                createdAt: d.Created,
                createdBy: d.Author["Title"]
            } as IDataFields;
        });
    }
}