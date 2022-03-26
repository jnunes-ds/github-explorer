import axios from 'axios';
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { RepositoriesService } from '~/services/repositories.service';
import { IssueProps, RepositoryProps } from '../Models/Repository';

import { api } from '../services/api';


interface RepositoriesContextData {
  repositories: RepositoryProps[];
  addRepository: (repositoryName: string) => void;
  removeRepository: (repositoryId: number) => void;
  findRepositoryById: (repositoryId: number) => RepositoryProps;
}

interface RepositoriesProviderProps {
  children: React.ReactNode;
}

const RepositoriesContext = createContext<RepositoriesContextData>({} as RepositoriesContextData);

function RepositoriesProvider({ children }: RepositoriesProviderProps) {
  const [repositories, setRepositories] = useState<RepositoryProps[]>([]);

  async function addRepository(repositoryName: string) {
    try {
      const repoAlreadyExists = repositories.find(repository => repository.full_name === repositoryName);

      if (repoAlreadyExists) {
        return Alert.alert(
          "Erro ao cadastrar repositório",
          "Esse repositório já está cadastrado."
        );
      }

      const response = await RepositoriesService.getRepository({repo: repositoryName});
      const { data: issues } = await RepositoriesService.getRepositoryIssues({repo: repositoryName});
      setRepositories([...repositories, {
        ...response.data,
        issues
      }]);
    } catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('addRepository', error.response?.data);
			}
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao buscar pelo repositório. Verifique a sua conexão e o nome do repositório e tente novamente."
      )
    }
  }

  function findRepositoryById(repositoryId: number) {
    return repositories.find(repository => repository.id === repositoryId) as RepositoryProps;
  }

  function removeRepository(repositoryId: number) {
    const filteredRepositories = repositories.filter(repository =>
      repository.id !== repositoryId
    );

    setRepositories(filteredRepositories);
  }

  return (
    <RepositoriesContext.Provider value={{ repositories, addRepository, removeRepository, findRepositoryById }}>
      {children}
    </RepositoriesContext.Provider>
  )
}

export { RepositoriesProvider, RepositoriesContext }