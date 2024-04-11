import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAtom } from 'jotai';
import { FieldValues, useForm } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';
import { YStack, XStack, useTheme, ScrollView, H6 } from 'tamagui';

import i18n from '../../i18n/index';

import Button from '~/src/components/form/Button';
import Input from '~/src/components/form/Input';
import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import colors from '~/src/constants/colors';
import { login } from '~/src/services/useAuth';
import { currGameWithStorage, gamesWithStorage, userWithStorage } from '~/src/utils/storage';
import { Title, Subtitle } from '~/tamagui.config';

export default function SingIn() {
  const toast = useToast();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [, setUser] = useAtom(userWithStorage);
  const [, setGamesStorage] = useAtom(gamesWithStorage);
  const [, setCurrGameStorage] = useAtom(currGameWithStorage);
  const onSubmit = (data: FieldValues) => {
    mutationUser.mutate({
      email: data.email,
      password: data.password,
    });
  };
  const theme = useTheme();

  const mutationUser = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (res) => {
      setUser(res.user!);
      setGamesStorage(res.games!);
      setCurrGameStorage(res.games![0]);
      toast.show(i18n.t('login_success'), {
        type: 'success',
        placement: 'top',
      });
      router.replace('/');
    },
    onError: (error) => {
      toast.show(error.message || i18n.t('default_error_msg'), {
        type: 'danger',
        placement: 'top',
      });
    },
  });
  return (
    <Container bg="$gray1">
      <Main justifyContent="space-between" borderRadius={0} mt={0}>
        <YStack enterStyle={{ opacity: 0, scale: 0.5 }} animation="bouncy" flex={1}>
          <ScrollView flex={1}>
            <Title>{i18n.t('login_title')}</Title>
            <Subtitle mt="$2">{i18n.t('login_subtitle')}</Subtitle>
            <YStack bg="$gray5" p="$4" borderRadius="$10" my="$5" gap="$2">
              <Input
                backgroundColor="$gray1"
                placeholder={i18n.t('email')}
                color="$gray12"
                name="email"
                control={control}
                rules={{
                  required: i18n.t('required_error', { field: i18n.t('email') }),
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: i18n.t('email_error'),
                  },
                }}
                icon={<Ionicons name="at" size={20} color={theme.gray9.get()} />}
              />
              <Input
                backgroundColor="$gray1"
                placeholder={i18n.t('password')}
                color="$gray12"
                name="password"
                control={control}
                secureTextEntry
                rules={{
                  required: i18n.t('required_error', { field: i18n.t('password') }),
                }}
                icon={<Ionicons name="lock-closed" size={20} color={theme.gray9.get()} />}
              />
            </YStack>
            <XStack flexWrap="wrap" gap="$2">
              <Subtitle color="$gray12">{i18n.t('no_account')}</Subtitle>
              <Link href={{ pathname: '/sign-up' }} asChild>
                <Subtitle color={colors.blue1}>{i18n.t('register')}</Subtitle>
              </Link>
            </XStack>
          </ScrollView>
        </YStack>

        <Button
          disabled={mutationUser.isPending}
          loading={mutationUser.isPending}
          backgroundColor={colors.green1}
          borderBottomColor={colors.green2}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          onPress={handleSubmit(onSubmit)}
          animation="bouncy">
          <H6 lineHeight={16} color="#fff">
            {i18n.t('login')}
          </H6>
        </Button>
      </Main>
      <StatusBar style="dark" />
    </Container>
  );
}
