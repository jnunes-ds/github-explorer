import React, { useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Dashboard } from '~/screens/Dashboard';

import { useRepositories } from '../../hooks/useRepositories';
import { CardAnimation } from './CardAnimation';
import { useNavigation } from '@react-navigation/core';

import {
  SwipeableContainer,
  CardContainer,
  Info,
  Image,
  TextGroup,
  Title,
  Description,
  Icon,
  DeleteContainer,
  DeleteIcon,
} from './styles';
import { IssueProps } from '~/Models/Repository';

interface CardProps {
	id: number;
	title: string;
	subTitle: string;
	imageUrl?: string;
}
interface Props {
  data: CardProps;
  onPress(arg: number | IssueProps): void | Promise<void>;
}

export function Card({ data, onPress }: Props) {
  const swipeableRef = useRef<Swipeable>(null);
	const { navigate } = useNavigation();

  const { removeRepository } = useRepositories();


  const handleDeleteAlert = useCallback(() => {
    Alert.alert(
      "Remover item",
      "Você tem certeza que deseja remover esse repositório da lista?",
      [
        {
          text: "Não",
          onPress: () => swipeableRef.current?.close(),
          style: "cancel"
        },
        { text: "Sim", onPress: () => removeRepository(data.id) }
      ]
    );
  }, [swipeableRef, removeRepository])

  function CardContent() {
    return (
      <CardContainer
        hasImage={!!data.imageUrl}
        onPress={onPress as never}
      >
        <Info>
          {data.imageUrl && (
            <Image source={{ uri: data.imageUrl }} />
          )}

          <TextGroup>
            <Title numberOfLines={1}>{data.title}</Title>
            <Description numberOfLines={1}>{data.subTitle}</Description>
          </TextGroup>
        </Info>

        <Icon name="chevron-right" size={20} />
      </CardContainer>
    )
  }

  function SwipeableDelete() {
    return (
      <DeleteContainer>
        <DeleteIcon name="trash" size={24} />
      </DeleteContainer>
    )
  }

  if (data.imageUrl) {
    return (
      <CardAnimation testID="repository-card">
        <SwipeableContainer
          ref={swipeableRef}
          rightThreshold={42}
          overshootRight={false}
          renderRightActions={() => <SwipeableDelete />}
          onSwipeableRightOpen={handleDeleteAlert}
        >
          <CardContent />
        </SwipeableContainer>
      </CardAnimation>
    )
  }

  return (
    <CardAnimation>
      <CardContent />
    </CardAnimation>
  )
}