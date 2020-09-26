import * as React from 'react';
import { Component } from 'react';
import styles from '../EmployeeTimeTracking.module.scss';
import IAddEmployeeWorkTimeProps from './IAddEmployeeWorkTimeProps';
import IEntryData from '../../models/IEntryData';
// import { Stack, Label, TextField } from '@fluentui/react';
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
      isSuccess: false
    };
  }

  private titleChange = (ele) => {
    this.setState({
      title: ele.target.value,
      isSuccess: false
    });
  }

  private timeChange = (ele) => {
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
      isSuccess: true,
      title: '',
      description: '',
      category: '',
      time: 0
    });
  }

  public render(): React.ReactElement<IAddEmployeeWorkTimeProps> {
    return (
      <div>
        {this.state.isSuccess === true && <MessageBar messageBarType={MessageBarType.success} isMultiline={false} >
          Successfully added item to sharepoint list.
      </MessageBar>}
        <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
          {this.state.isLoading ? (<Spinner label="Adding Please wait..." ariaLive="assertive" labelPosition="bottom" />) : (
            <Stack.Item grow>
              <Label>Title</Label>
              <TextField placeholder="Title" value={this.state.title} onChange={this.titleChange} />
              <Label>Description</Label>
              <TextField multiline={true} onChange={this.descChange} value={this.state.description} style={{"resize":"vertical"}} className={styles.txtarea} placeholder="Description" />  
              <Dropdown
                label={'Category'} placeholder="Select a Category"
                onChange={this.catagoryChange}
                defaultSelectedKey={this.state.category}
                options={[
                  { text: 'Billable', key: 'Billable' },
                  { text: 'Non-Billable', key: 'Non-Billable' },
                  { text: 'Upskilling', key: 'Upskilling' },
                  { text: 'Meeting', key: 'Meeting' }
                ]}
              />
              <Label>Time1</Label>
              <TextField placeholder="Time" type="number" value={String(this.state.time)} onChange={this.timeChange} />
            </Stack.Item>
          )}
        </Stack>
        <Stack className={styles.btnsave} horizontal verticalAlign="center" horizontalAlign="space-between">
          <PrimaryButton disabled={!(this.state.title && this.state.category && this.state.description && this.state.time && this.state.time != 0)} text="Add Logs" onClick={this.onSave} allowDisabledFocus />
        </Stack>
      </div>
    );
  }
}