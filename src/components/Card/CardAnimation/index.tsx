import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
	Easing,
	interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

	// @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    return {
			transform: [{ translateX: withTiming(cardOffset.value, {
				duration: 500,
				easing: Easing.linear
			}) }],
			opacity: cardOpacity.value
  	}
	})

  useEffect(() => {
		cardOffset.value = withTiming(0, { duration: 750 });
		cardOpacity.value = withTiming(1, { duration: 1250 });
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}