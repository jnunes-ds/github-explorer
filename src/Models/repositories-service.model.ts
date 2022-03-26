import { AxiosError, AxiosResponse } from "axios";
import { RepositoryProps } from "./Repository";
export interface IOwnerProps {
	owner: string;
}

export interface IRepositorieProps extends IOwnerProps {
	repo: string;
}

export interface RepositoriesResponseProps {
	data: RepositoryProps[]
}

export interface RepositoryResponseProps {
	data: RepositoryProps;
}
export interface IRepositoriesService {
	getOwnerRepositories(props: IOwnerProps): Promise<AxiosResponse<RepositoriesResponseProps>>;
	getRepositorie(props:IRepositorieProps): Promise<RepositoryResponseProps>;
}