import * as React from 'react';
import IDisplayEmployeeWorkTimeProps from './IDisplayEmployeeWorkTimeProps';
import { columns } from '../../common/Constants';
import IDataFields from '../../models/IDataFields';
import IDisplay from '../../models/IDisplay';
import {
  Stack, Label, DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  mergeStyleSets
} from 'office-ui-fabric-react';
import styles from '../EmployeeTimeTracking.module.scss';

export default class DisplayEmployeeWorkTime extends React.Component<IDisplayEmployeeWorkTimeProps, IDisplay> {

  private items: IDataFields[];
  public timeHourCount: number = 0;

  constructor(props) {
    super(props);
    this.init();

    this.state = {
      items: []
    };
  }

  public async init() {
    this.items = await this.props.employeeLogStore.getEmployeeLogs();

    this.items.map(d => {
      this.timeHourCount += parseInt(d.time);
    });

    this.setState({
      items: this.items
    });

    this.render();
  }

  private _getKey = (item: any, index?: number) => {
    return item.key;
  }

  public render(): React.ReactElement<IDisplayEmployeeWorkTimeProps> {
    return (
      <div>
        <div className={styles.containerHeader}>Today's Logs</div>
        <Stack className={styles.tableContainer} horizontal verticalAlign="center" horizontalAlign="space-between">
          <DetailsList
            items={this.state.items}
            compact={false}
            columns={columns}
            selectionMode={SelectionMode.none}
            getKey={this._getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
          />
        </Stack>
      </div>
    );
  }
}