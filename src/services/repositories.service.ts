import { api } from "./api";
import { IRepositoriesService, IOwnerProps, IRepositorieProps, RepositoryResponseProps, RepositoriesResponseProps } from "~/Models/repositories-service.model";
import { AxiosError, AxiosResponse } from "axios";
import { RepositoryProps } from "~/Models/Repository";

export class RepositoriesService implements IRepositoriesService {
	// @ts-ignore
	getOwnerRepositories(props: IOwnerProps): Promise<AxiosResponse<RepositoryProps[]>> {}
	public static async getOwnerRepositories({ owner }: IOwnerProps): Promise<AxiosResponse<RepositoriesResponseProps>> {
		return await api.get(`/users/${owner}/repos`);
	}

	// @ts-ignore
	getRepositorie(props: IRepositorieProps): Promise<AxiosResponse<any>> {}
	public static async getRepositorie({ owner, repo }: IRepositorieProps): Promise<RepositoryResponseProps>  {
		return await api.get(`/repos/${owner}/${repo}`);
	}
}
