import { api } from "./api";
import { IRepositoriesService, IOwnerProps, IRepositorieProps } from "~/Models/repositories-service.model";
import { AxiosResponse } from "axios";

export class RepositoriesService implements IRepositoriesService {
	// @ts-ignore
	getOwnerRepositories(props: IOwnerProps): Promise<AxiosResponse<any>> {}
	public static async getOwnerRepositories({ owner }: IOwnerProps): Promise<AxiosResponse> {
		return await api.get(`/users/${owner}/repos`);
	}

	// @ts-ignore
	getRepositorie(props: IRepositorieProps): Promise<AxiosResponse<any>> {}
	public static async getRepositorie({ owner, repo }: IRepositorieProps): Promise<AxiosResponse<any>> {
		return await api.get(`/repos/${owner}/${repo}`);
	}
}
