export interface IResumeInformation {
  page_title: string;
  page_subTitle: string;
  donwloadResume: string;
  resumeFilePath: string;
  workExperience: string;
  previousExperience: string;
  currentCompany: ICurrentCompany[];
  devSkillsName: skills[];
  gisSkillsName: skills[];
  programmingSkills: string;
  gisSkills: string;
  skills: string;
}

export interface ICurrentCompany {
  companyName: string;
  location: string;
  workInformation: string;
}

export interface skills {
  skillName: string;
}
