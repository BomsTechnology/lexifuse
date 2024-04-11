import { AlertDialog, AlertDialogProps, Button, H6, XStack, YStack } from 'tamagui';

import colors from '~/src/constants/colors';

type ConfirmModalProps = AlertDialogProps & {
  title?: string;
  description: string;
  confirmText: string;
  cancelText: string;
  btnConfirmColor1?: string;
  btnConfirmColor2?: string;
  btnCancelColor1?: string;
  btnCancelColor2?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  hideConfirmBtn?: boolean;
};

const CustomModal = (props: ConfirmModalProps) => {
  return (
    <AlertDialog {...props}>
      <AlertDialog.Trigger asChild>{props.children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          maxWidth="90%"
          minWidth="80%"
          borderRadius={30}
          p={30}
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}>
          <YStack space>
            {props.title && <AlertDialog.Title textAlign="center">{props.title}</AlertDialog.Title>}
            <AlertDialog.Description textAlign="center" fontWeight="500">
              {props.description}
            </AlertDialog.Description>

            <XStack space="$3" justifyContent="center" mt={10}>
              <AlertDialog.Cancel asChild>
                <Button
                  backgroundColor={props.btnCancelColor1 || colors.red1}
                  borderBottomColor={props.btnCancelColor2 || colors.red2}
                  color="#fff"
                  fontFamily="$heading"
                  onPress={props.onCancel}
                  flex={1}>
                  <H6 lineHeight={16} color="#fff" textAlign="center">
                    {props.cancelText}
                  </H6>
                </Button>
              </AlertDialog.Cancel>
              {!props.hideConfirmBtn && (
                <AlertDialog.Action asChild>
                  <Button
                    backgroundColor={props.btnConfirmColor1 || colors.blue1}
                    borderBottomColor={props.btnConfirmColor2 || colors.blue2}
                    color="#fff"
                    fontFamily="$heading"
                    onPress={props.onConfirm}
                    flex={1}>
                    <H6 lineHeight={16} color="#fff" textAlign="center">
                      {' '}
                      {props.confirmText}{' '}
                    </H6>
                  </Button>
                </AlertDialog.Action>
              )}
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export default CustomModal;
