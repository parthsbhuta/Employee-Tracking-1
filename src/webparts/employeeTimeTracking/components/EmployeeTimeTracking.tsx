import * as React from 'react';
import styles from './EmployeeTimeTracking.module.scss';
import { IEmployeeTimeTrackingProps } from './IEmployeeTimeTrackingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DisplayEmployeeWorkTime from '../components/DisplayEmployeeWorkTime/DisplayEmployeeWorkTime';
// import IDisplayEmployeeWorkTimeProps from '../components/DisplayEmployeeWorkTime/IDisplayEmployeeWorkTimeProps';
import AddEmployeeWorkTime from '../components/AddEmployeeWorkTime/AddEmployeeWorkTime';
import { Fabric, Stack, Label } from 'office-ui-fabric-react';

export default class EmployeeTimeTracking extends React.Component<IEmployeeTimeTrackingProps, {}> {
  public render(): React.ReactElement<IEmployeeTimeTrackingProps> {
    return (
      <React.StrictMode>
        <Fabric className={styles.employeeTimeTracking}>
          <DisplayEmployeeWorkTime description="test Display" />
          <AddEmployeeWorkTime description="test Add Employee" />
        </Fabric>
      </React.StrictMode>
    );
  }
}
