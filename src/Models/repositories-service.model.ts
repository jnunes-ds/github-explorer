import { AxiosResponse } from "axios";
export interface IOwnerProps {
	owner: string;
}

export interface IRepositorieProps extends IOwnerProps {
	repo: string;
}

export interface IRepositoriesService {
	getOwnerRepositories(props: IOwnerProps): Promise<AxiosResponse>;
	getRepositorie(props:IRepositorieProps): Promise<AxiosResponse>;
}