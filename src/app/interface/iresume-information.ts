export interface IResumeInformation {
  page_title: string;
  page_subTitle: string;
  donwloadResume: string;
  resumeFilePath: string;
  workExperience: string;
  currentCompany: ICurrentCompany;
  
}

export interface ICurrentCompany {
  companyName: string;
  location: string;
  workInformation: string;
}
