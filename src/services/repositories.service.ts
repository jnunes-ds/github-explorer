import { api } from "./api";
import { IRepositoriesService, IOwnerProps, IRepositorieProps, RepositoryResponseProps, RepositoriesResponseProps, IGetIssuesResponse } from "~/Models/repositories-service.model";
import { AxiosResponse } from "axios";
import { IssueProps, RepositoryProps } from "~/Models/Repository";

export class RepositoriesService implements IRepositoriesService {
	// @ts-ignore
	getOwnerRepositories(props: IOwnerProps): Promise<AxiosResponse<RepositoryProps[]>> {}
	public static async getOwnerRepositories({ owner }: IOwnerProps): Promise<AxiosResponse<RepositoriesResponseProps>> {
		return await api.get(`/users/${owner}/repos`);
	}

	// @ts-ignore
	getRepository(props: IRepositorieProps): Promise<RepositoryProps> {}
	public static async getRepository({ repo }: IRepositorieProps): Promise<RepositoryResponseProps>  {
		return await api.get(`/repos/${repo}`);
	}

	// @ts-ignore
	getRepositoryIssues(props: IRepositorieProps): Promise<IGetIssuesResponse> {} 
	public static async getRepositoryIssues({ repo }: IRepositorieProps): Promise<IGetIssuesResponse> {
		return await api.get(`/repos/${repo}/issues`);
	} 
}
