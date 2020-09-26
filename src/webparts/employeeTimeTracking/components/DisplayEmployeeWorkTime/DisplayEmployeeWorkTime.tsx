import * as React from 'react';
import { Component } from 'react';
import styles from '../EmployeeTimeTracking.module.scss';
import IDisplayEmployeeWorkTimeProps from './IDisplayEmployeeWorkTimeProps';
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

export default class DisplayEmployeeWorkTime extends React.Component<IDisplayEmployeeWorkTimeProps, IDisplay> {
  private _allItems: IDataFields[];
  
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        title: "test",
        description: "test",
        catagory: "test",
        time: "test",
        createdAt: "test",
        createdBy: "test"
      },
      {
        title: "Name 1",
        description: "test",
        catagory: "test",
        time: "test",
        createdAt: "test",
        createdBy: "test"
      }],
    };
  }

  private _getKey = (item: any, index?: number) => {
    return item.key;
  }

  public render(): React.ReactElement<IDisplayEmployeeWorkTimeProps> {
    const columns: IColumn[] = [      
      {
        key: 'title',
        name: 'Title',
        fieldName: 'title',
        minWidth: 70,
        maxWidth: 90,
        headerClassName: styles.tableHeader,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
        onRender: (item: IDataFields) => {
          return <span>{item.title}</span>;
        },
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 70,
        maxWidth: 90,
        headerClassName: styles.tableHeader,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'catagory',
        name: 'Catagory',
        fieldName: 'catagory',
        minWidth: 70,
        maxWidth: 90,
        headerClassName: styles.tableHeader,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'time',
        name: 'Time Logged',
        fieldName: 'time',
        minWidth: 70,
        maxWidth: 90,        
        headerClassName: styles.tableHeader,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'createdAt',
        name: 'Created At',
        fieldName: 'createdAt',
        minWidth: 70,
        maxWidth: 90,
        headerClassName: styles.tableHeader,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'createdBy',
        name: 'Created By',
        fieldName: 'createdBy',
        minWidth: 70,
        maxWidth: 90,
        headerClassName: styles.tableHeader,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
      }

    ];

    return (
      <div>
        <Stack>
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
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
        </Stack>
      </div>
    );
  }
}