import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { Alert, Linking } from 'react-native';
import { useRepositories } from '../../hooks/useRepositories';

import { Background } from '../../components/Background';
import { Card } from '../../components/Card';

import {
  Container,
  RepoInfo,
  OwnerAvatar,
  TextGroup,
  Description,
  RepoStats,
  Stars,
  StarsCounter,
  StarsText,
  Forks,
  ForksCounter,
  ForksText,
  OpenIssues,
  OpenIssuesCounter,
  OpenIssuesText,
  IssuesList,
} from './styles';
import { TitleAnimation } from './TitleAnimation';
import AppLoading from 'expo-app-loading';
import { IssueProps } from '../../Models/Repository';

interface RepositoryParams {
  repositoryId: number;
}

export function Repository() {
  const { params } = useRoute();
  const { repositoryId } = params as RepositoryParams;
	const [loading, setLoading] = useState<boolean>(true);
  const { findRepositoryById } = useRepositories();
  const repository = findRepositoryById(repositoryId);

	useEffect(() => {
		console.log('sim');
		console.log(repositoryId);
		if (repository && repository.id) {
			console.log('continua sim');
			setLoading(false);
		}
	}, [repository]);

  const handleIssueNavigation = useCallback(async (issueUrl: number) => {
		try {
			const url = `https://github.com/${repository.full_name}/issues/${issueUrl}`;
			const supported = await Linking.canOpenURL(url);

			if (supported) {
				await Linking.openURL(url);
			} else{
				Alert.alert('Atenção', `Não foi possível abrir a url: ${url}`);
			}
		} catch (error) {
			console.error(error);
		}
  }, [Linking, repository])

	if (loading) {
		return <AppLoading />
	}

  return (
    <Background>
      <Container>
        <RepoInfo>
          {/* <OwnerAvatar source={{ uri:  }} /> */}

          <TextGroup>
            <TitleAnimation>
              {
                // TODO - full name of the repository
								repository &&
								repository?.full_name &&
								repository?.full_name

              }
            </TitleAnimation>

            <Description numberOfLines={2}>{
              //TODO - repository description
            }</Description>
          </TextGroup>
        </RepoInfo>

        <RepoStats>
          <Stars>
            <StarsCounter>{
							repository &&
							repository.stargazers_count &&
							repository.stargazers_count
            }</StarsCounter>
            <StarsText>Stars</StarsText>
          </Stars>

          <Forks>
            <ForksCounter>{
							repository &&
							repository.forks_count &&
							repository.forks_count
            }</ForksCounter>
            <ForksText>Forks</ForksText>
          </Forks>

          <OpenIssues>
            <OpenIssuesCounter>{
							repository &&
							repository.open_issues_count &&
							repository.open_issues_count
            }</OpenIssuesCounter>
            <OpenIssuesText>Issues{'\n'}Abertas</OpenIssuesText>
          </OpenIssues>
        </RepoStats>

        <IssuesList
          data={
						repository &&
						repository.issues &&
						repository.issues
					}
          keyExtractor={issue => String(issue.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: issue }) => (
            <Card
							onPress={(issue: IssueProps) => handleIssueNavigation(issue.id)}
              data={{
                id: issue.id,
                title: issue.title,
                subTitle: issue.user.login,
              }}
            // TODO - onPress prop calling 
            />
          )}
        />
      </Container>
    </Background>
  )
}