export interface IUtilitiesInformation {
  page_utilities_title: string;
  page_utilities_subtitle: string;
  uitilitiesToolsInformation: IUitilitiesToolsInformation[];
}

export interface IUitilitiesToolsInformation {
  utilities_title: string;
  utilities_description: string;
  utilities_buttonName: string;
  utilities_url: string;
}
