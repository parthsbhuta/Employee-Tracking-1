import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'EmployeeTimeTrackingWebPartStrings';
import EmployeeTimeTracking from './components/EmployeeTimeTracking';
import { IEmployeeTimeTrackingProps } from './components/IEmployeeTimeTrackingProps';

export interface IEmployeeTimeTrackingWebPartProps {
}

export default class EmployeeTimeTrackingWebPart extends BaseClientSideWebPart<IEmployeeTimeTrackingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEmployeeTimeTrackingProps > = React.createElement(
      EmployeeTimeTracking,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
