export interface IssueProps {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

export interface RepositoryProps {
  id: number,
  full_name: string;
  owner: {
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  issues_url: string;

  issues: IssueProps[]
}