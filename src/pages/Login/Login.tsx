import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Notification ,
  Anchor,
  Stack,
  Container,
} from '@mantine/core';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../../hooks/auth';

export function Login() {
  const { signIn, loading } = useContext(AuthContext) as AuthContextType;

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper radius="md" m="0 auto" w={500} p="xl" withBorder>
        <Text size="lg" weight={500} align='center'>
          Welcome to Mangoes
        </Text>

        <form onSubmit={form.onSubmit(() => signIn(form.values.email, form.values.password))}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="example@email.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
              disabled={loading}
            />

            <PasswordInput
              required
              label="Password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
              disabled={loading}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => {}}
              size="xs"
            >
              Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl" loading={loading}>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}