import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { Linking } from 'react-native';
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

  function handleIssueNavigation(issueUrl: string) {
    // TODO - use Linking to open issueUrl in a browser
  }

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
								repository.full_name

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
              // TODO - repository stargazers count
            }</StarsCounter>
            <StarsText>Stars</StarsText>
          </Stars>

          <Forks>
            <ForksCounter>{
              // TODO - repository forks count
            }</ForksCounter>
            <ForksText>Forks</ForksText>
          </Forks>

          <OpenIssues>
            <OpenIssuesCounter>{
              // TODO - repository issues count
            }</OpenIssuesCounter>
            <OpenIssuesText>Issues{'\n'}Abertas</OpenIssuesText>
          </OpenIssues>
        </RepoStats>

        <IssuesList
          data={repository.issues}
          keyExtractor={issue => String(issue.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: issue }) => (
            <Card
							onPress={() => {}}
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