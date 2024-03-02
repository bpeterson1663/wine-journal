import { useState } from 'react'
import { IconUpload } from '@tabler/icons-react'
import { UserProfileSchema, UserProfileT } from 'schemas/user'
import Footer from 'components/footer/footer.component'
import { Avatar, Button, Group, FileInput, rem, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import PageContainer from 'components/page-container/page-container.component'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchLogout } from 'features/auth/authSlice'
import styles from 'pages/styles/pages.module.css'
import { useForm, zodResolver } from '@mantine/form'
import { editUserProfile } from 'features/user/userSlice'
import { notifications } from '@mantine/notifications'

export default function Profile() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.auth)
  const { userProfile } = useAppSelector((state) => state.user)
  const [fileValue, setValue] = useState<File | null>(null)

  const handleLogout = async () => {
    await dispatch(fetchLogout(null))
    if (!currentUser) {
      navigate('/')
    }
  }

  const onSubmitHandler = async (data: UserProfileT) => {
    try {
      await dispatch(editUserProfile(data))
      notifications.show({
        message: 'Your profile was saved.',
      })
    } catch (err) {
      notifications.show({
        color: 'red',
        message: 'An error occurred trying to save your profile. Please try again later.',
      })
    }
  }

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      avatar: '',
      displayName: '',
      ...userProfile,
      id: userProfile?.id ?? '',
      userId: currentUser?.uid ?? '',
      email: currentUser?.email ?? '',
    },
    validate: zodResolver(UserProfileSchema),
  })

  return (
    <PageContainer title="Profile">
      <section className={styles.container}>
        <Group className={styles.column}>
          <Avatar color="white" className={styles.avatar} radius="sm" size="xl" />

          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput type="firstName" label="First Name" {...form.getInputProps('firstName')} />
            <TextInput type="lastName" label="Last Name" {...form.getInputProps('lastName')} />
            <TextInput type="email" label="Email" disabled {...form.getInputProps('email')} />
            <TextInput type="displayName" label="Display Name" {...form.getInputProps('displayName')} />
            <FileInput
              leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
              placeholder="Upload avatar"
              value={fileValue}
              onChange={setValue}
            />

            <Button type="submit">
              Save
            </Button>
          </form>
        </Group>
      </section>
      <Footer>
        <Button onClick={handleLogout}>
          Sign Out
        </Button>
      </Footer>
    </PageContainer>
  )
}
