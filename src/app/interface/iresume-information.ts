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
  project: string;
  projectDetails: projectDetails[];
  education: string;
  schoolDetails: schoolDetails[];
}

export interface ICurrentCompany {
  companyName: string;
  location: string;
  workInformation: string;
}

export interface skills {
  skillName: string;
}

export interface projectDetails {
  projectName: string;
  tech_Used: technology[];
  client_name: string;
  project_Description: string;
}

export interface technology {
  techName: string;
}

export interface schoolDetails {
  schoolName: string;
  schoolLocation: string;
  schoolCourse: string;
}
