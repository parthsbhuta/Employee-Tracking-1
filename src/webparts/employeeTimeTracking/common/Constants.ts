import { IColumn, IDropdownOption } from 'office-ui-fabric-react';
import styles from '../components/EmployeeTimeTracking.module.scss';

export const EmployeeListTitle: string = "Employee Time Tracking";
export const columns: IColumn[] = [      
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 70,
      maxWidth: 90,
      headerClassName: styles.tableHeader,
      isRowHeader: true,
      isResizable: true,
      isPadded: true
    },
    {
      key: 'description',
      name: 'Description',
      fieldName: 'description',
      minWidth: 150,
      maxWidth: 200,
      headerClassName: styles.tableHeader,
      isRowHeader: true,
      isResizable: true,
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
      isPadded: true,
    },
    // {
    //   key: 'createdAt',
    //   name: 'Created At',
    //   fieldName: 'createdAt',
    //   minWidth: 70,
    //   maxWidth: 90,
    //   headerClassName: styles.tableHeader,
    //   isRowHeader: true,
    //   isResizable: true,
    //   isPadded: true,      
    // },
    // {
    //   key: 'createdBy',
    //   name: 'Created By',
    //   fieldName: 'createdBy',
    //   minWidth: 70,
    //   maxWidth: 90,
    //   headerClassName: styles.tableHeader,
    //   isRowHeader: true,
    //   isResizable: true,
    //   isPadded: true,
    // }

  ];

export const CatagoryOptions: IDropdownOption[] = [
  { text: 'Billable', key: 'Billable' },
  { text: 'Non-Billable', key: 'Non-Billable' },
  { text: 'Upskilling', key: 'Upskilling' },
  { text: 'Meeting', key: 'Meeting' }
];