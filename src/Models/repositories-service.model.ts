import { AxiosError, AxiosResponse } from "axios";
import { IssueProps, RepositoryProps } from "./Repository";
export interface IOwnerProps {
	owner: string;
}

export interface IRepositorieProps {
	repo: string;
}

export interface RepositoriesResponseProps {
	data: RepositoryProps[]
}

export interface RepositoryResponseProps {
	data: RepositoryProps;
}

export interface IGetIssuesResponse {
	data: IssueProps[];
}
export interface IRepositoriesService {
	getOwnerRepositories(props: IOwnerProps): Promise<AxiosResponse<RepositoriesResponseProps>>;
	getRepository(props:IRepositorieProps): Promise<RepositoryResponseProps>;
	getRepositoryIssues(props: IRepositorieProps): Promise<IGetIssuesResponse>;
}