import * as React from 'react';
import styles from '../EmployeeTimeTracking.module.scss';
import IAddEmployeeWorkTimeProps from './IAddEmployeeWorkTimeProps';
import IEntryData from '../../models/IEntryData';
import { CatagoryOptions } from '../../common/Constants';
import ISPInsertData from '../../models/ISPInsertData';
import { Stack, Label, TextField, PrimaryButton, Spinner, MessageBar, MessageBarType, Dropdown } from 'office-ui-fabric-react';

export default class AddEmployeeWorkTime extends React.Component<IAddEmployeeWorkTimeProps, IEntryData> {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: '',
      time: 0,
      isLoading: false,
      isSuccess: false,
      isError: false,
      isHoursExistsWarning: false
    };
  }

  private titleChange = (ele) => {
    this.setState({
      title: ele.target.value,
      isSuccess: false
    });
  }

  private timeChange = (ele) => {
    if((this.props.employeeLogStore.totalHours + parseInt(ele.target.value)) > 8){
      this.setState({
        isHoursExistsWarning: true
      });
    }
    else{
      this.setState({
        isHoursExistsWarning: false
      });
    }

    this.setState({
      time: ele.target.value,
      isSuccess: false
    });
  }

  private descChange = (ele) => {
    this.setState({
      description: ele.target.value,
      isSuccess: false
    });
  }

  private catagoryChange = (e, selectedOption) => {
    this.setState({
      category: selectedOption.key,
      isSuccess: false
    });
  }

  private onSave = () => {
    this.setState({
      isLoading: true
    });

    const data: ISPInsertData = {
      Title: this.state.title,
      TimeSheetDescription: this.state.description,
      Catagory: this.state.category,
      Time: this.state.time
    };

    this.props.employeeLogStore.saveEmployeeLog(data).then((data: any) => {
      this.setState({
        isSuccess: true,
        isError: false,
        title: '',
        description: '',
        category: '',
        time: 0,
        isLoading: false
      });

      window.location.reload();
    }).catch((err: any) => {
      console.log(err);
      this.setState({
        isError: true,
        isLoading: false
      });
    });
  }

  public render(): React.ReactElement<IAddEmployeeWorkTimeProps> {
    return (
      <div>
        <div className={styles.containerHeader}>Add New Logs</div>
        {this.state.isSuccess === true && <MessageBar messageBarType={MessageBarType.success} isMultiline={false} >
          Successfully added item to sharepoint list.
      </MessageBar>}
        {this.state.isError === true && <MessageBar messageBarType={MessageBarType.error} isMultiline={false} >
          Getting Error while add logs in sharepoint list. Please try it again.
      </MessageBar>}
        {this.state.isHoursExistsWarning === true && <MessageBar messageBarType={MessageBarType.warning} isMultiline={false} >
          Overtime and requires manager approval.
      </MessageBar>}
        <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
          {this.state.isLoading ? (<Spinner label="Adding Logs Please wait..." className={styles.spinner} ariaLive="assertive" labelPosition="bottom" />) : (
            <Stack.Item grow>
              <Label>Title</Label>
              <TextField placeholder="Title" value={this.state.title} onChange={this.titleChange} />
              <Label>Description</Label>
              <TextField multiline={true} onChange={this.descChange} value={this.state.description} style={{ "resize": "vertical" }} className={styles.txtarea} placeholder="Description" />
              <Dropdown
                label={'Category'} placeholder="Select a Category"
                onChange={this.catagoryChange}
                defaultSelectedKey={this.state.category}
                options={CatagoryOptions}
              />
              <Label>Time1023</Label>
              <TextField placeholder="Time" type="number" value={String(this.state.time)} onChange={this.timeChange} />
            </Stack.Item>
          )}
        </Stack>
        <Stack className={styles.btnsave} horizontal verticalAlign="center" horizontalAlign="space-between">
          <PrimaryButton disabled={!(this.state.title && this.state.category && this.state.description && this.state.time && this.state.time != 0 && !this.state.isLoading)} text="Add Logs" onClick={this.onSave} allowDisabledFocus />
        </Stack>
      </div>
    );
  }
}