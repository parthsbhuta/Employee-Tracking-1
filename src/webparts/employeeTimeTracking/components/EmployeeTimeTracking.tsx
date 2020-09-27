import * as React from 'react';
import styles from './EmployeeTimeTracking.module.scss';
import { IEmployeeTimeTrackingProps } from './IEmployeeTimeTrackingProps';
import DisplayEmployeeWorkTime from '../components/DisplayEmployeeWorkTime/DisplayEmployeeWorkTime';
import AddEmployeeWorkTime from '../components/AddEmployeeWorkTime/AddEmployeeWorkTime';
import { Fabric } from 'office-ui-fabric-react';
import EmployeeLogStore from '../stores/EmployeeLogStore';

export default class EmployeeTimeTracking extends React.Component<IEmployeeTimeTrackingProps, {}> {
  
  private employeeLogStore: EmployeeLogStore = new EmployeeLogStore(this.props.context);
  
  constructor(props) {
    super(props);
  }
  
  public render(): React.ReactElement<IEmployeeTimeTrackingProps> {
    return (
      <React.StrictMode>
        <Fabric className={styles.employeeTimeTracking}>        
          <DisplayEmployeeWorkTime employeeLogStore={this.employeeLogStore} />
          <AddEmployeeWorkTime employeeLogStore={this.employeeLogStore} />
        </Fabric>
      </React.StrictMode>
    );
  }
}
