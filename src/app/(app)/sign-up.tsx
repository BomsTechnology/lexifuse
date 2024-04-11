import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { createUser } from '~/src/services/useAuth';
import { createGame } from '~/src/services/useGame';
import { getLanguageByIso } from '~/src/services/useLanguage';
import { Database } from '~/src/types/database.types';
import {
  currGameWithStorage,
  gamesWithStorage,
  settingsWithStorage,
  userWithStorage,
} from '~/src/utils/storage';
import { Title, Subtitle } from '~/tamagui.config';

type Language = Database['public']['Tables']['languages']['Row'];

export default function SignUp() {
  const { control, handleSubmit, setError } = useForm();
  const router = useRouter();
  const toast = useToast();
  const theme = useTheme();
  const [settings] = useAtom(settingsWithStorage);
  const [user, setUser] = useAtom(userWithStorage);
  const [gamesStorage, setGamesStorage] = useAtom(gamesWithStorage);
  const [game, setCurrGameStorage] = useAtom(currGameWithStorage);
  const onSubmit = (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: i18n.t('confirm_pass_error'),
      });
      return;
    }
    mutationUser.mutate({
      email: data.email,
      password: data.password,
      username: data.username,
      user_id: user && user.id ? user.id : '',
    });
  };
  const { data } = useQuery<Language, Error>({
    queryKey: ['languages', settings.language],
    queryFn: () => {
      return getLanguageByIso(settings.language);
    },
  });
  const mutationUser = useMutation({
    mutationFn: ({
      email,
      password,
      username,
      user_id,
    }: {
      email: string;
      password: string;
      username: string;
      user_id: string;
    }) => createUser({ email, password, username, user_id }),
    onSuccess: (res) => {
      setUser(res!);
      if (game.id !== '') {
        router.replace('/(app)/(home)/home/');
      } else {
        mutationGame.mutate({ userId: res!.id, languageId: data?.id! });
      }
      toast.show(i18n.t('account_created'), {
        type: 'success',
        placement: 'top',
      });
    },
    onError: (error) => {
      toast.show(error.message || i18n.t('default_error_msg'), {
        type: 'danger',
        placement: 'top',
      });
    },
  });
  const mutationGame = useMutation({
    mutationFn: ({ userId, languageId }: { userId: string; languageId: string }) =>
      createGame(userId, languageId),
    onSuccess: (data) => {
      setCurrGameStorage(data.game!);
      setGamesStorage([...gamesStorage, data.game!]);
      router.replace('/(app)/(home)/home/');
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
            <Title>{i18n.t('register_title')}</Title>
            <Subtitle mt="$2">{i18n.t('register_subtitle')}</Subtitle>
            <YStack bg="$gray5" p="$4" borderRadius="$10" my="$5" gap="$2">
              <Input
                backgroundColor="$gray1"
                placeholder={i18n.t('username')}
                color="$gray12"
                name="username"
                control={control}
                icon={<Ionicons name="person" size={20} color={theme.gray9.get()} />}
                rules={{
                  required: i18n.t('required_error', { field: i18n.t('username') }),
                }}
              />
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
                  minLength: {
                    value: 6,
                    message: i18n.t('min_length_error', { field: i18n.t('password'), min: 6 }),
                  },
                }}
                icon={<Ionicons name="lock-closed" size={20} color={theme.gray9.get()} />}
              />
              <Input
                backgroundColor="$gray1"
                placeholder={i18n.t('confirm_password')}
                color="$gray12"
                name="confirmPassword"
                control={control}
                secureTextEntry
                rules={{
                  required: i18n.t('required_error', { field: i18n.t('confirm_password') }),
                  minLength: {
                    value: 6,
                    message: i18n.t('min_length_error', { field: i18n.t('password'), min: 6 }),
                  },
                }}
                icon={<Ionicons name="lock-closed" size={20} color={theme.gray9.get()} />}
              />
            </YStack>
            <XStack flexWrap="wrap" gap="$2">
              <Subtitle color="$gray12">{i18n.t('have_account')}</Subtitle>
              <Link href={{ pathname: '/sign-in' }} asChild>
                <Subtitle color={colors.blue1}>{i18n.t('login')}</Subtitle>
              </Link>
            </XStack>
          </ScrollView>
        </YStack>
        <Button
          disabled={mutationUser.isPending || mutationGame.isPending}
          loading={mutationUser.isPending || mutationGame.isPending}
          backgroundColor={colors.green1}
          borderBottomColor={colors.green2}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          onPress={handleSubmit(onSubmit)}
          animation="bouncy">
          <H6 lineHeight={16} color="#fff">
            {i18n.t('register')}
          </H6>
        </Button>
      </Main>
      <StatusBar style="dark" />
    </Container>
  );
}
