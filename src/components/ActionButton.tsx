import {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../theme';

interface Props {
  isActive?: boolean;
  onPress: () => void;
  innerColor?: string;
  outerColor?: string;
  size: number;
  children?: React.ReactNode;
  transform?: boolean;
}

export const ActionButton = ({
  isActive = false,
  transform = false,
  ...props
}: Props) => {
  const scaleValue = useRef(new Animated.Value(1)).current; // Valor inicial para la escala
  const borderRadiusValue = useRef(new Animated.Value(50)).current; // Valor inicial para el borderRadius

  useEffect(() => {
    // Animación cuando cambia `isActive`
    Animated.timing(scaleValue, {
      toValue: isActive && transform ? 0.45 : 1, // Escala a 0.45 si está activo, sino vuelve a 1
      duration: 200, // Duración de la animación
      useNativeDriver: false, // `false` para animar propiedades que no son de transform
    }).start();

    Animated.timing(borderRadiusValue, {
      toValue: isActive && transform ? 10 : 50, // borderRadius cambia si está activo
      duration: 200, // Duración de la animación
      useNativeDriver: false, // `false` para animar el borderRadius
    }).start();
  }, [isActive, transform]);

  return (
    <Pressable onPress={props.onPress} style={styles.wrapper}>
      <View
        style={[
          styles.outerContent,
          {
            width: props.size,
            height: props.size,
          },
          props.outerColor && {
            borderColor: props.outerColor,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.innerContent,
          {
            width: props.size - 14,
            height: props.size - 14,
            backgroundColor: props.innerColor || colors.red,
            transform: [{scale: scaleValue}], // Animación de escala
            borderRadius: borderRadiusValue, // Animación de borderRadius
          },
        ]}>
        {props.children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerContent: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  innerContent: {
    borderRadius: 50,
    backgroundColor: colors.red,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
